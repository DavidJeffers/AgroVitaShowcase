import { useState, useEffect, useMemo } from "react";
import { Form, useNavigate } from "react-router";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Stack,
  Alert,
  Tab,
  Tabs,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTableLogic } from "~/components/farms/table/FarmTable";
import { useFetcher } from "react-router";
import { MaterialReactTable } from "material-react-table";
import { PostsResponse } from "./SocialProfile";
import PostCard from "./PostCard";
import { Tables } from "database.types";
import { User } from "@supabase/supabase-js";
import PostForm from "./PostForm";

const PROFILE_IMAGES = Array.from(
  { length: 12 },
  (_, i) => `/profile${i + 1}.jpg`
);

interface ActionData {
  error?: string;
  success?: boolean;
}

interface ProfilePageProps {
  profile: Tables<"profiles">;
  actionData?: ActionData;
  favorites: Set<string>;
  followStats: {
    followers_count: number;
    following_count: number;
  };
  posts: PostsResponse[] | null | undefined;
  currentUser: User | null;
  canUserPost: boolean;
}

const ProfilePage = ({
  profile,
  actionData,
  favorites,
  posts,
  currentUser,
  followStats,
  canUserPost,
}: ProfilePageProps) => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>(
    profile.profile_pic_url || PROFILE_IMAGES[0]
  );
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.full_name || "",
    username: profile.username || "",
    description: profile.description || "",
  });
  const [tabValue, setTabValue] = useState(0);
  const favoritesFetcher = useFetcher();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (favoritesFetcher.state === "idle" && !favoritesFetcher.data) {
      favoritesFetcher.load("/api/favFarms");
    }

    if (favoritesFetcher.data) {
      setIsDataLoaded(true);
    }
  }, [tabValue, favoritesFetcher]);

  const tableData = useMemo(
    () => favoritesFetcher.data || [],
    [favoritesFetcher.data]
  );

  const { table } = useTableLogic(
    tableData,
    null,
    null,
    favorites,
    true,
    "any"
  );

  const handleCancel = () => {
    setFormData({
      name: profile.full_name || "",
      username: profile.username || "",
      description: profile.description || "",
    });
    setSelectedImage(profile.profile_pic_url || PROFILE_IMAGES[0]);
    setEditMode(false);
    setShowImageSelector(false);
    navigate(".", { replace: true });
  };

  useEffect(() => {
    if (actionData?.success) {
      setEditMode(false);
      setShowImageSelector(false);
      navigate(".", { replace: true });
    }
  }, [actionData?.success, navigate]);

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      {/* Profile Card */}

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 2,
          mb: 0,
          backgroundColor: "background.default",
        }}
      >
        <Form method="post">
          <Stack spacing={3}>
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                mb: 4,
              }}
            >
              {!editMode ? (
                <Button
                  startIcon={<EditIcon />}
                  variant="outlined"
                  sx={{
                    borderColor: "#1976D2",
                    color: "#1976D2",
                    px: 3,
                    py: 1.2,
                    borderRadius: "30px",
                    fontWeight: "500",
                    fontSize: "1rem",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#E3F2FD",
                      borderColor: "#1565C0",
                      color: "#1565C0",
                    },
                  }}
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </Button>
              ) : (
                <Stack direction="row" spacing={2}>
                  <Button
                    startIcon={<SaveIcon />}
                    variant="outlined"
                    sx={{
                      px: 3,
                      py: 1.2,
                      borderRadius: "30px",
                      fontWeight: "500",
                      fontSize: "1rem",
                      textTransform: "none",
                    }}
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button
                    startIcon={<CancelIcon />}
                    variant="outlined"
                    sx={{
                      borderColor: "#1976D2",
                      color: "#1976D2",
                      px: 3,
                      py: 1.2,
                      borderRadius: "30px",
                      fontWeight: "500",
                      fontSize: "1rem",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#E3F2FD",
                        borderColor: "#1565C0",
                        color: "#1565C0",
                      },
                    }}
                    color="error"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Stack>
              )}
            </Box>

            {/* Error Display */}
            {actionData?.error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {actionData.error}
              </Alert>
            )}
            <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
              {/* Profile Image */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  src={selectedImage}
                  sx={{
                    width: 120,
                    height: 120,
                    border: "4px solid #ffffff",
                    cursor: editMode ? "pointer" : "default",
                  }}
                  onClick={() =>
                    editMode && setShowImageSelector(!showImageSelector)
                  }
                />

                {editMode && (
                  <Button
                    variant="outlined"
                    size="medium"
                    sx={{
                      width: "auto",
                      minWidth: 150,
                      padding: "6px 16px",
                      textTransform: "none",
                      fontSize: "0.875rem",
                      borderRadius: 2,
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => setShowImageSelector(!showImageSelector)}
                  >
                    Change Profile Picture
                  </Button>
                )}
                {/* Hidden input for selected image */}
                <input
                  type="hidden"
                  name="profile_pic_url"
                  value={selectedImage}
                />
              </Box>

              {/* Profile Form */}
              <Stack
                spacing={2}
                sx={{
                  width: "100%",
                  alignItems: "flex-start",
                }}
              >
                {/* Full Name */}
                {!editMode ? (
                  <Typography variant="h5">
                    {formData.name || "No name provided"}
                  </Typography>
                ) : (
                  <TextField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    size="small"
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "& fieldset": {
                          borderColor: "lightgray",
                        },
                        "&:hover fieldset": {
                          borderColor: "primary.main",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "primary.dark",
                          borderWidth: "2px",
                        },
                      },
                    }}
                  />
                )}

                {/* Username */}
                {!editMode ? (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "grey.600",
                    }}
                  >
                    @{formData.username || "No username provided"}
                  </Typography>
                ) : (
                  <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    size="small"
                    fullWidth
                    variant="outlined"
                    error={actionData?.error?.includes("username")}
                    helperText={
                      actionData?.error?.includes("username")
                        ? actionData.error
                        : ""
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "& fieldset": {
                          borderColor: "lightgray",
                        },
                        "&:hover fieldset": {
                          borderColor: "primary.main",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "primary.dark",
                          borderWidth: "2px",
                        },
                      },
                    }}
                  />
                )}
                {/* Description */}
                {!editMode ? (
                  <Typography
                    variant="body1"
                    sx={{
                      fontStyle: "italic",
                      color: "text.secondary",
                    }}
                  >
                    {formData.description || ""}
                  </Typography>
                ) : (
                  <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    size="small"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    InputProps={{
                      sx: {
                        alignItems: "baseline",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "& fieldset": {
                          borderColor: "lightgray",
                        },
                        "&:hover fieldset": {
                          borderColor: "primary.main",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "primary.dark",
                          borderWidth: "2px",
                        },
                      },
                    }}
                  />
                )}
                <Box sx={{ display: "flex", gap: 3, mb: 0 }}>
                  <Typography>
                    {followStats.followers_count} followers
                  </Typography>
                  <Typography>
                    {followStats.following_count} following
                  </Typography>
                </Box>
                {/* Image Selection Grid */}
                {showImageSelector && editMode && (
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 4,
                      borderRadius: 2,
                      mb: 4,
                      backgroundColor: "#fff",
                      border: "1px solid #f0f0f0",
                    }}
                  >
                    <Grid container spacing={2} justifyContent="center">
                      {PROFILE_IMAGES.map((image, index) => (
                        <Grid item key={index}>
                          <Avatar
                            src={image}
                            sx={{
                              width: 60,
                              height: 60,
                              cursor: "pointer",
                              border:
                                selectedImage === image
                                  ? "3px solid"
                                  : "3px solid transparent",
                              borderColor:
                                selectedImage === image
                                  ? "primary.main"
                                  : "transparent",
                              "&:hover": {
                                transform: "scale(1.05)",
                                transition: "transform 0.2s ease-in-out",
                              },
                            }}
                            onClick={() => setSelectedImage(image)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                )}
              </Stack>
            </Box>
          </Stack>
        </Form>
      </Paper>

      <Divider sx={{ mb: 4 }} />
      {/* Main Content Section */}
      <Grid container spacing={2}>
        {/* Left Section */}
        <Grid item xs={12} md={8}>
          {/* Tabs Section */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 2,
              mb: 4,
              backgroundColor: "background.default",
            }}
          >
            <PostForm canUserPost={canUserPost} />
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Activity" />
              <Tab label="Favorites" />
            </Tabs>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mt: 3 }}>
              {tabValue === 0 ? (
                posts ? (
                  posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      currentUser={currentUser}
                      profile={profile}
                    />
                  ))
                ) : (
                  <Typography>
                    This is the Activity tab. Add your recent activities here.
                  </Typography>
                )
              ) : null}
              {tabValue === 1 && (
                <>
                  {!isDataLoaded && (
                    <Typography>Loading favorites...</Typography>
                  )}
                  {isDataLoaded && table.getRowCount() > 0 && (
                    <Box sx={{ width: "100%", overflow: "auto" }}>
                      <MaterialReactTable
                        table={table}
                        key={`favorites-table-${favoritesFetcher.data.length}`}
                      />
                    </Box>
                  )}
                  {isDataLoaded && (!table || table.getRowCount() === 0) && (
                    <Typography>No favorites found</Typography>
                  )}
                </>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={4} sx={{ display: "sticky" }}>
          {/* Suggestions Section */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 2,
              mb: 4,
              backgroundColor: "background.default",
              border: "1px solid #f0f0f0",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Saved Filters
            </Typography>
            <Typography variant="body2">- Filter 1 Name</Typography>
            <Typography variant="body2">- Filter 2 Name</Typography>
            <Typography variant="body2">- Filter 3 Name</Typography>
          </Paper>

          {/* Additional Details Section */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 2,
              mb: 4,
              backgroundColor: "background.default",
              border: "1px solid #f0f0f0",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Featured Farms
            </Typography>
            <Typography variant="body2">- Featured Farm 1</Typography>
            <Typography variant="body2">- Featured Farm 2</Typography>
            <Typography variant="body2">- Featured Farm 3</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
