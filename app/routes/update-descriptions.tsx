// app/routes/admin.update-descriptions.tsx
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useFetcher,
} from "react-router";
import { useLoaderData } from "react-router";
import { createSupabaseServerClient } from "~/utils/supabase.server";
import { getUser } from "~/utils/auth.supabase.server";
import { UserRole } from "~/components/auth/userRoles";
import { getMetadata } from "~/utils/metadataFetcher.server";
import { cleanText } from "~/components/farms/LinkPreview";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  LinearProgress,
  Alert,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Farm } from "./edit-farm";

export async function loader({ request }: LoaderFunctionArgs) {
  const supabase = createSupabaseServerClient(request);
  const user = await getUser(request);

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: profile } = await supabase.client
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== UserRole.ADMIN) {
    return redirect("/");
  }

  // Get farms with websites but potentially no descriptions
  const { data: farms } = await supabase.client
    .from("farms")
    .select(
      `*,
      farm_details (
        description
      )
    `
    )
    .not("site", "is", null)
    .order("updated_at", { ascending: false });

  return JSON.stringify({ farms });
}

export async function action({ request }: ActionFunctionArgs) {
  const supabase = createSupabaseServerClient(request);
  const user = await getUser(request);

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { data: profile } = await supabase.client
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== UserRole.ADMIN) {
    return { error: "Insufficient permissions" };
  }

  const formData = await request.formData();
  const action = formData.get("_action") as string;

  if (action === "fetch-metadata") {
    const farmId = formData.get("farmId") as string;
    const farmSite = formData.get("farmSite") as string;

    if (!farmSite) {
      return { error: "No website URL provided" };
    }

    try {
      // Format URL properly
      const formattedUrl = farmSite.startsWith("http")
        ? farmSite
        : `https://${farmSite}`;

      // Get metadata from the farm's website
      const metadata = await getMetadata(formattedUrl);

      // Extract description from OpenGraph or standard meta
      const description =
        metadata.openGraph?.ogDescription || metadata.description;

      if (!description) {
        return { error: "No description found", farmId };
      }

      const cleanDescription = cleanText(description);

      return {
        success: true,
        farmId,
        description: cleanDescription,
        metadata,
      };
    } catch (error) {
      return {
        error: `Failed to fetch metadata: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        farmId,
      };
    }
  }

  if (action === "fetch-all-metadata") {
    const farmData = JSON.parse(formData.get("farmData") as string);

    if (!Array.isArray(farmData) || farmData.length === 0) {
      return { error: "No farms data provided" };
    }

    const results = [];

    // Process each farm sequentially to avoid overwhelming the server
    for (const farm of farmData) {
      if (!farm.site) continue;

      try {
        // Format URL properly
        const formattedUrl = farm.site.startsWith("http")
          ? farm.site
          : `https://${farm.site}`;

        // Get metadata from the farm's website
        const metadata = await getMetadata(formattedUrl);

        // Extract description from OpenGraph or standard meta
        const description =
          metadata.openGraph?.ogDescription || metadata.description;

        if (!description) {
          results.push({
            farmId: farm.id,
            error: "No description found",
          });
          continue;
        }

        const cleanDescription = cleanText(description);

        // Automatically update the description in the database
        const { error: upsertError } = await supabase.client
          .from("farm_details")
          .upsert(
            {
              id: farm.id,
              description: cleanDescription,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "id" }
          );

        if (upsertError) {
          results.push({
            farmId: farm.id,
            error: `Failed to update: ${upsertError.message}`,
          });
        } else {
          results.push({
            farmId: farm.id,
            success: true,
            description: cleanDescription,
            message: "Description updated successfully",
          });
        }
      } catch (error) {
        results.push({
          farmId: farm.id,
          error: `Failed to fetch metadata: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        });
      }
    }

    return {
      batchResults: results,
      success: true,
      message: `Processed ${results.length} farms`,
    };
  }

  if (action === "update-description") {
    const farmId = formData.get("farmId") as string;
    const description = formData.get("description") as string;

    if (!farmId || !description) {
      return { error: "Missing required fields" };
    }

    try {
      // Upsert into farm_details
      const { error: upsertError } = await supabase.client
        .from("farm_details")
        .upsert(
          {
            id: farmId,
            description,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );

      if (upsertError) throw upsertError;

      return {
        success: true,
        message: "Description updated successfully",
        farmId,
      };
    } catch (error) {
      return {
        error: `Failed to update description: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        farmId,
      };
    }
  }

  return { error: "Invalid action" };
}

export default function UpdateDescriptions() {
  const loaderData = useLoaderData<typeof loader>();
  const { farms } = JSON.parse(loaderData as string);
  const fetcher = useFetcher();
  const [batchResults, setBatchResults] = useState<any[]>([]);

  useEffect(() => {
    if (fetcher.data?.batchResults) {
      setBatchResults(fetcher.data.batchResults);
    }
  }, [fetcher.data]);

  const fetchAllMetadata = () => {
    fetcher.submit(
      {
        _action: "fetch-all-metadata",
        farmData: JSON.stringify(farms),
      },
      { method: "post" }
    );
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Update Farm Descriptions
      </Typography>
      <Typography variant="body1" paragraph>
        This tool helps you update farm descriptions from their website
        metadata.
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchAllMetadata}
          disabled={fetcher.state !== "idle"}
        >
          {fetcher.state !== "idle"
            ? "Processing..."
            : "Fetch & Update All Descriptions"}
        </Button>
      </Box>

      {fetcher.data?.message && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {fetcher.data.message}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Farm Name</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Current Description</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {farms.map((farm: Farm) => (
              <FarmRow
                key={farm.id}
                farm={farm}
                batchResult={batchResults.find(
                  (result) => result.farmId === farm.id
                )}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function FarmRow({ farm, batchResult }: { farm: Farm; batchResult?: any }) {
  const fetcher = useFetcher();
  const [editDescription, setEditDescription] = useState(false);
  const [description, setDescription] = useState(
    fetcher.data?.description || farm.farm_details?.description || ""
  );

  // Update local state when fetcher data changes
  useEffect(() => {
    if (fetcher.data?.farmId === farm.id && fetcher.data?.description) {
      setDescription(fetcher.data.description);
    }
    // Also update if we get a batch result with a description
    if (batchResult?.farmId === farm.id && batchResult?.description) {
      setDescription(batchResult.description);
    }
  }, [fetcher.data, farm.id, batchResult]);

  const isLoading = fetcher.state !== "idle";
  const hasCurrentDescription =
    farm.farm_details?.description && farm.farm_details.description.length > 0;

  const fetchMetadata = () => {
    fetcher.submit(
      {
        _action: "fetch-metadata",
        farmId: farm.id,
        farmSite: farm.site,
      },
      { method: "post" }
    );
  };

  const updateDescription = () => {
    fetcher.submit(
      {
        _action: "update-description",
        farmId: farm.id,
        description,
      },
      { method: "post" }
    );
    setEditDescription(false);
  };

  const handleOpenDialog = () => {
    setEditDescription(true);
  };

  const handleCloseDialog = () => {
    setEditDescription(false);
  };

  return (
    <TableRow key={farm.id}>
      <TableCell>{farm.name}</TableCell>
      <TableCell>
        <a
          href={
            farm.site?.startsWith("http") ? farm.site : `https://${farm.site}`
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          {farm.site}
        </a>
      </TableCell>
      <TableCell sx={{ maxWidth: 250, overflow: "hidden" }}>
        {hasCurrentDescription ? (
          <Chip
            label="Has description"
            color="success"
            size="small"
            sx={{ mb: 1 }}
          />
        ) : (
          <Chip
            label="No description"
            color="warning"
            size="small"
            sx={{ mb: 1 }}
          />
        )}
        <Typography variant="body2">
          {farm.farm_details?.description || "No description available"}
        </Typography>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={fetchMetadata}
            disabled={isLoading}
          >
            Fetch Metadata
          </Button>
          {fetcher.data?.farmId === farm.id && fetcher.data?.description && (
            <Button
              variant="outlined"
              size="small"
              onClick={handleOpenDialog}
              disabled={isLoading}
            >
              Edit
            </Button>
          )}
        </Box>

        {/* Description Edit Dialog */}
        <Dialog
          open={editDescription}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Edit Farm Description</DialogTitle>
          <DialogContent>
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 1 }}>
              Editing description for: {farm.name}
            </Typography>
            <TextField
              autoFocus
              multiline
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              variant="filled"
              sx={{
                "& .MuiFilledInput-root": {
                  backgroundColor: "background.default",
                  borderRadius: 2,
                  border: "2px solid #f0f0f0",
                },
                "& .MuiFilledInput-root::before": {
                  borderBottom: "none",
                },
                "& .MuiFilledInput-root::after": {
                  borderBottom: "none",
                },
                "& .MuiFilledInput-root:hover::before": {
                  content: "none",
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              onClick={updateDescription}
              variant="contained"
              color="primary"
              disabled={isLoading || !description}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </TableCell>
      <TableCell sx={{ maxWidth: 200 }}>
        {isLoading && fetcher.formData?.get("farmId") === farm.id && (
          <LinearProgress sx={{ mb: 1 }} />
        )}

        {fetcher.data?.farmId === farm.id && fetcher.data?.error && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {fetcher.data.error}
          </Alert>
        )}

        {batchResult?.error && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {batchResult.error}
          </Alert>
        )}

        {((fetcher.data?.farmId === farm.id && fetcher.data?.success) ||
          batchResult?.success) &&
          !editDescription && (
            <Alert severity="success" sx={{ mb: 1 }}>
              {fetcher.data?.message ||
                batchResult?.message ||
                "Metadata fetched successfully"}
            </Alert>
          )}

        {((fetcher.data?.farmId === farm.id && fetcher.data?.description) ||
          batchResult?.description) &&
          !editDescription && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" fontWeight="bold">
                New description:
              </Typography>
              <Typography variant="body2">
                {fetcher.data?.description || batchResult?.description}
              </Typography>
            </Box>
          )}
      </TableCell>
    </TableRow>
  );
}
