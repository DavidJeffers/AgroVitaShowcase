import {
  ActionFunctionArgs,
  redirect,
  type LoaderFunctionArgs,
} from "react-router";
import { useLoaderData, Link } from "react-router";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Chip,
  Tooltip,
  // Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useState } from "react";
import { FarmMap } from "~/components/farms/map/FarmMap";
import { createSupabaseServerClient } from "~/utils/supabase.server";
import { getMetadata } from "~/utils/metadataFetcher.server";
import { cleanText } from "~/components/farms/LinkPreview";
import { getStandardsByCategory } from "~/components/farms/table/utils/FilterHelpers";
import {
  StandardsCategory,
  StandardsOption,
} from "~/components/farms/table/utils/FilterEnums";
import { Divider } from "@mui/material";
import { FavoritesCell } from "~/components/ui/buttons/Favorites";
import PostForm from "~/components/profile/PostForm";
import PostCard from "~/components/profile/PostCard";
import { Tables } from "database.types";
import { PriceSnap } from "~/components/farms/table/FarmTable";
import { User } from "@supabase/supabase-js";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

export type FarmPostsResponse = Tables<"posts"> & {
  profiles: Pick<Tables<"profiles">, "username" | "profile_pic_url" | "id">;
  comments: (Omit<Tables<"comments">, "updated_at" | "user_id" | "post_id"> & {
    profiles: Pick<Tables<"profiles">, "username" | "profile_pic_url"> | null;
  })[];
  likes: Tables<"likes">[];
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { id } = params;
  if (!id) {
    return redirect("/farms");
  }

  const supabase = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabase.client.auth.getUser();

  let farm = null;
  let favoritesResponse = null;

  if (!user) {
    const { data } = await supabase.client
      .from("farms")
      .select(
        `
      *,
      farm_details (
        description
      )
    `
      )
      .eq("id", id)
      .single();
    farm = data;
  } else {
    [favoritesResponse, { data: farm }] = await Promise.all([
      supabase.client
        .from("favorites")
        .select("farm_id")
        .eq("user_id", user.id),
      supabase.client
        .from("farms")
        .select(
          `
      *,
      farm_details (
        description
      )
    `
        )
        .eq("id", id)
        .single(),
    ]);
  }

  const { data: farmPosts } = await supabase.client
    .from("posts")
    .select(
      `
      *,
      profiles!posts_user_id_fkey(
        username, profile_pic_url, id
      ),
      farms (name, verified),
      comments (
        id, content, created_at, profiles (username, profile_pic_url)
      ),
      likes (*)
    `
    )
    .eq("farm_mention", id)
    .order("created_at", { ascending: false });

  if (!farm) {
    throw new Response("Farm not found", { status: 404 });
  }
  let ogData = null;
  if (farm.site) {
    try {
      const formattedUrl = farm.site.startsWith("http")
        ? farm.site
        : `https://${farm.site}`;
      const response = await getMetadata(formattedUrl);
      ogData = response;
    } catch (error) {
      console.error("Failed to fetch OpenGraph data:", error);
    }
  }

  const isLoggedIn = user ? true : false;
  let canUserPost = true;
  const POST_LIMIT = 3;

  if (user && farmPosts) {
    const userPostCount = (farmPosts as FarmPostsResponse[]).filter(
      (post) =>
        post.profiles.id === user.id &&
        new Date(post.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    ).length;
    canUserPost = userPostCount < POST_LIMIT;
  }

  console.log("canUserPost", canUserPost);

  return {
    farm,
    ogData,
    favorites: favoritesResponse?.data,
    isLoggedIn,
    posts: farmPosts as FarmPostsResponse[] | null,
    user,
    canUserPost,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const supabase = createSupabaseServerClient(request);
  const formData = await request.formData();
  const farmId = formData.get("farmId") as string;
  const action = formData.get("action") as
    | "createPost"
    | "addFav"
    | "removeFav";

  const {
    data: { user },
  } = await supabase.client.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated", status: 401 };
  }

  switch (action) {
    case "createPost": {
      const content = formData.get("content") as string;
      const images = formData.getAll("image") as File[];
      let imageUrls: string[] = [];

      if (images.length > 0) {
        const uploadPromises = images.map(async (image) => {
          const fileName = `${user.id}/${Date.now()}-${image.name}`;
          const { data, error } = await supabase.client.storage
            .from("post-images")
            .upload(fileName, image);
          if (error) throw error;
          return data.path;
        });
        imageUrls = await Promise.all(uploadPromises);
      }

      const { error: postError } = await supabase.client
        .from("posts")
        .insert({
          content,
          user_id: user.id,
          image_urls: imageUrls.length > 0 ? imageUrls : null,
          farm_mention: farmId,
        })
        .select()
        .single();

      if (postError) throw postError;
      return { success: true };
    }
    case "addFav": {
      try {
        await supabase.client
          .from("favorites")
          .insert({ user_id: user.id, farm_id: farmId });
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: "Failed to update favorite",
          errorMsg: error,
        };
      }
    }
    case "removeFav": {
      try {
        await supabase.client
          .from("favorites")
          .delete()
          .match({ user_id: user.id, farm_id: farmId });
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: "Failed to update favorite",
          errorMsg: error,
        };
      }
    }
    default:
      return { success: false, error: "Invalid action" };
  }
}

export default function FarmRoute() {
  const { farm, ogData, favorites, isLoggedIn, posts, user, canUserPost } =
    useLoaderData<typeof loader>();
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showMap, setShowMap] = useState(true);
  const displayedCerts = showAllCerts
    ? farm.standards
    : farm.standards?.slice(0, 7);
  const displayedProducts = showAllProducts
    ? farm.foods
    : farm.foods?.slice(0, 7);

  const description =
    farm.farm_details?.description ||
    ogData?.openGraph?.ogDescription ||
    ogData?.description;

  const cleanDescription = cleanText(description);

  const organicStandards = getStandardsByCategory(StandardsCategory.Organic);
  const regenerativeStandards = getStandardsByCategory(
    StandardsCategory.Regenerative
  );

  const hasOrganic = farm.standards?.some((standard) =>
    organicStandards.includes(standard as StandardsOption)
  );

  const hasRegenerative = farm.standards?.some((standard) =>
    regenerativeStandards.includes(standard as StandardsOption)
  );

  return (
    <Box sx={{ px: 4, maxWidth: "1200px", margin: "0 auto" }}>
      {/* Back Button */}
      <Link to="/farms" style={{ textDecoration: "none" }}>
        <Button startIcon={<ArrowBackIcon />} sx={{ mb: 4 }}>
          Back to Farms
        </Button>
      </Link>

      <Grid container spacing={3}>
        {/* Left Column - Main Content */}
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            maxHeight: "100vh",
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {/* Main Profile Card */}
          <Paper
            sx={{
              px: 4,
              py: 4,
              borderRadius: 2,
              mb: 2,
              backgroundColor: "background.default",
            }}
          >
            {/* Profile Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="h4">{farm.name}</Typography>
                  {farm.state && (
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {farm.state}
                    </Typography>
                  )}
                  {farm.verified && (
                    <Tooltip title="AgroVita Verified Farm">
                      <VerifiedIcon color="primary" />
                    </Tooltip>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {farm.shipping && (
                    <Chip
                      label="Shipping Available"
                      color="primary"
                      size="small"
                      sx={{
                        fontSize: "0.7rem",
                        height: "22px",
                        padding: "0 10px",
                        borderRadius: "16px",
                        whiteSpace: "nowrap",
                      }}
                    />
                  )}
                  {/* Organic Chip */}
                  {hasOrganic && (
                    <Chip
                      label="Organic"
                      color="success"
                      size="small"
                      sx={{
                        fontSize: "0.7rem",
                        height: "22px",
                        padding: "0 10px",
                        borderRadius: "16px",
                        whiteSpace: "nowrap",
                      }}
                    />
                  )}
                  {/* Regenerative Chip */}
                  {hasRegenerative && (
                    <Chip
                      label="Regenerative"
                      color="secondary"
                      size="small"
                      sx={{
                        fontSize: "0.7rem",
                        height: "22px",
                        padding: "0 10px",
                        borderRadius: "16px",
                        whiteSpace: "nowrap",
                      }}
                    />
                  )}
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <FavoritesCell
                  row={{ original: { id: farm.id, favs: farm.favs } }}
                  favs={new Set(favorites?.map((f) => f.farm_id) || [])}
                  isloggedIn={isLoggedIn}
                />
                {farm.site && (
                  <Button
                    variant="outlined"
                    href={farm.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                  >
                    Visit Website
                  </Button>
                )}
              </Box>
            </Box>

            {/* Farm Avatar */}
            <Box
              sx={{
                width: "100%",
                borderRadius: 2,
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
              }}
            >
              <img
                src={ogData?.openGraph?.ogImage || `/1.webp`}
                alt="Avatar"
                style={{
                  maxWidth: "250px",
                  maxHeight: "300px",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
                crossOrigin="anonymous"
              />
            </Box>

            {cleanDescription && (
              <Typography variant="body1" paragraph>
                {cleanDescription}
              </Typography>
            )}
          </Paper>

          <Divider sx={{}} />

          <Paper
            sx={{
              p: 4,
              borderRadius: 2,
              mb: 4,
              backgroundColor: "background.default",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Posts
            </Typography>

            {isLoggedIn && canUserPost && (
              <Box sx={{ mb: 4 }}>
                <PostForm
                  farmId={farm.id}
                  farmName={farm.name ?? undefined}
                  canUserPost={canUserPost}
                />
              </Box>
            )}

            {isLoggedIn && !canUserPost && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                You have reached the maximum number of posts allowed for this
                farm today. Come back tomorrow!
              </Typography>
            )}

            {posts?.length ? (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUser={user as User}
                  profile={post.profiles}
                  farm={farm}
                />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No posts yet
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Right Column - Additional Info */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: "sticky", top: 24 }}>
            {/* Standards Section */}
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                mb: 2,
                backgroundColor: "background.default",
              }}
            >
              <FarmMap
                filteredFarms={[
                  {
                    ...farm,
                    price_snap: farm.price_snap
                      ? (farm.price_snap as unknown as PriceSnap)
                      : null,
                  },
                ]}
                onToggle={() => setShowMap(!showMap)}
                alwaysShow={true}
                isVisible={showMap}
                showToggle={false}
              />
              {farm.updated_at && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mb: 1, mt: -2 }}
                >
                  Last updated: {new Date(farm.updated_at).toLocaleDateString()}
                </Typography>
              )}
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 4,
                    height: 24,
                    backgroundColor: "primary.main",
                    borderRadius: 1,
                    display: "inline-block",
                  }}
                />
                Standards
              </Typography>
              {farm.standards && farm.standards.length > 0 ? (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    {displayedCerts?.map((cert, index) => (
                      <Chip
                        key={index}
                        label={cert}
                        variant="outlined"
                        size="small"
                        sx={{
                          backgroundColor: "background.paper",
                          borderColor: "primary.light",
                          "&:hover": {
                            backgroundColor: "primary.50",
                          },
                          transition: "all 0.2s ease",
                        }}
                      />
                    ))}
                  </Box>
                  {farm.standards.length > 7 && (
                    <Button
                      onClick={() => setShowAllCerts(!showAllCerts)}
                      sx={{ mt: 2, fontSize: "0.8rem" }}
                      size="small"
                      endIcon={
                        showAllCerts ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown />
                        )
                      }
                    >
                      {showAllCerts
                        ? "Show Less"
                        : `Show ${farm.standards.length - 7} More`}
                    </Button>
                  )}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No standards listed
                </Typography>
              )}
            </Paper>

            {/* Products Section */}
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                mb: 2,
                backgroundColor: "background.default",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 4,
                    height: 24,
                    backgroundColor: "success.light",
                    borderRadius: 1,
                    display: "inline-block",
                  }}
                />
                Products
              </Typography>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    mt: 2,
                  }}
                >
                  {displayedProducts?.map((food, index) => (
                    <Chip
                      key={index}
                      label={food}
                      variant="outlined"
                      size="small"
                      sx={{
                        backgroundColor: "background.paper",
                        borderColor: "success.light",
                        "&:hover": {
                          backgroundColor: "secondary.50",
                        },
                        transition: "all 0.2s ease",
                      }}
                    />
                  ))}
                </Box>
                {farm.foods?.length
                  ? farm.foods?.length > 7 && (
                      <Button
                        onClick={() => setShowAllProducts(!showAllProducts)}
                        sx={{ mt: 2, fontSize: "0.8rem" }}
                        size="small"
                        endIcon={
                          showAllProducts ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )
                        }
                      >
                        {showAllProducts
                          ? "Show Less"
                          : `Show ${farm.foods.length - 7} More`}
                      </Button>
                    )
                  : null}
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
