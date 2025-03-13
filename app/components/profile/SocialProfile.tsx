import { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Avatar,
  Divider,
  Grid,
  Paper,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { RiUserUnfollowLine } from "react-icons/ri";
import { RiUserFollowLine } from "react-icons/ri";
import { User } from "@supabase/supabase-js";
import { Form, useFetcher } from "react-router";
import PostCard from "./PostCard";
import { MaterialReactTable } from "material-react-table";
import { useTableLogic } from "../farms/table/FarmTable";
import { Tables } from "database.types";

export type PostsResponse = Tables<"posts"> & {
  farms?: Pick<Tables<"farms">, "name" | "verified"> | null;
  profiles?: Pick<Tables<"profiles">, "username"> | null;
  comments: (Omit<Tables<"comments">, "updated_at" | "user_id" | "post_id"> & {
    profiles: Pick<Tables<"profiles">, "username" | "profile_pic_url"> | null;
  })[];
  likes: Tables<"likes">[];
};

interface SocialProfileProps {
  currentUser: User | null;
  profile: Tables<"profiles">;
  currentUserFavorites: Set<string> | null;
  followStats: {
    followers_count: number;
    following_count: number;
  } | null;
  isFollowing: boolean;
  posts: PostsResponse[] | null | undefined;
}

export default function SocialProfile({
  currentUser,
  profile,
  currentUserFavorites,
  followStats,
  isFollowing,
  posts,
}: SocialProfileProps) {
  const [tabValue, setTabValue] = useState(0);
  /* const [tab, setTab] = useState(0); */
  const followFetcher = useFetcher();
  const favoritesFetcher = useFetcher();

  const handleFollow = () => {
    if (!currentUser) return;

    followFetcher.submit(
      {
        action: isFollowing ? "unfollow" : "follow",
        followerId: currentUser.id,
        followingId: profile.id,
      },
      { method: "POST", action: "/api/social" }
    );
  };

  useEffect(() => {
    if (
      tabValue === 1 &&
      favoritesFetcher.state === "idle" &&
      !favoritesFetcher.data
    ) {
      favoritesFetcher.load(`/api/favFarms/${profile.id}`);
    }
  }, [tabValue, favoritesFetcher, profile.id]);

  const { table } = useTableLogic(
    favoritesFetcher.data || [],
    null,
    null,
    currentUserFavorites,
    currentUser !== null,
    "any"
  );

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
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                mb: 4,
              }}
            > */}

            {/* </Box> */}
            {/* Header */}
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
                  src={profile.profile_pic_url || "/profile1.webp"}
                  sx={{
                    width: 120,
                    height: 120,
                    border: "4px solid #ffffff",
                    cursor: "default",
                  }}
                />
                <Box sx={{ display: "flex", gap: 3, mb: 0 }}>
                  <Typography>
                    <Typography sx={{ display: "flex", ml: 3 }}>
                      {followStats?.followers_count}
                    </Typography>
                    followers
                  </Typography>
                  <Typography>
                    <Typography sx={{ display: "flex", ml: 3 }}>
                      {followStats?.following_count}
                    </Typography>
                    following
                  </Typography>
                </Box>
              </Box>

              {/* Profile Form */}
              <Stack
                spacing={2}
                sx={{
                  width: "70%",
                  alignItems: "flex-start",
                }}
              >
                {/* Full Name */}

                <Typography variant="h5">
                  {profile.full_name || "No name provided"}
                </Typography>

                {/* Username */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "grey.600",
                  }}
                >
                  @{profile.username || "No username provided"}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: "italic",
                    color: "text.secondary",
                  }}
                >
                  {profile.description || ""}
                </Typography>

                {/* Image Selection Grid */}
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "right",
                  mb: 4,
                }}
              >
                {currentUser && currentUser.id !== profile.id && (
                  <Tooltip title={isFollowing ? "Unfollow" : "Follow"}>
                    <IconButton
                      onClick={handleFollow}
                      sx={{ color: isFollowing ? "black" : "#1976D2" }}
                    >
                      {isFollowing ? (
                        <RiUserUnfollowLine />
                      ) : (
                        <RiUserFollowLine />
                      )}
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
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
                  <Typography>No posts found</Typography>
                )
              ) : null}
              {tabValue === 1 &&
                (favoritesFetcher.data ? (
                  <Box sx={{ width: "100%", overflow: "auto" }}>
                    <MaterialReactTable table={table} />
                  </Box>
                ) : (
                  <Typography>Loading favorites...</Typography>
                ))}
            </Box>
          </Paper>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={4}>
          {/* Suggestions Section */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 2,
              mb: 4,
              backgroundColor: "background.default",
              border: "1px solid #f0f0f0",
              borderLeft: "1px solid #f0f0f0",
              borderBottom: "1px solid #f0f0f0",
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
}
