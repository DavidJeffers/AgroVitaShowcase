import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Avatar,
  TextField,
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import three dots icon
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link, useFetcher } from "react-router";
import { User } from "@supabase/supabase-js";
import { PostsResponse } from "./SocialProfile";
import { Tables } from "database.types";

interface PostCardProps {
  post: PostsResponse;
  currentUser: User | null;
  profile: Pick<Tables<"profiles">, "username" | "profile_pic_url">;
  farm?: Tables<"farms">;
}

export default function PostCard({
  post,
  currentUser,
  profile,
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null); // State for menu anchor
  const likeFetcher = useFetcher();
  const commentFetcher = useFetcher();
  const deleteFetcher = useFetcher();

  const liked_by_user = post.likes.find(
    (like) => like.user_id === currentUser?.id
  );
  const likeCount = post.likes.length;

  const handleLike = () => {
    if (!currentUser) return;

    likeFetcher.submit(
      {
        action: liked_by_user ? "unlike" : "like",
        postId: post.id,
        userId: currentUser.id,
      },
      { method: "POST", action: "/api/social" }
    );
  };

  const handleComment = () => {
    if (!currentUser || !comment.trim()) return;
    commentFetcher.submit(
      {
        action: "comment",
        postId: post.id,
        userId: currentUser.id,
        content: comment,
      },
      { method: "POST", action: "/api/social" }
    );
    setComment("");
  };

  const handleDelete = () => {
    deleteFetcher.submit(
      {
        action: "delete",
        postId: post.id,
      },
      { method: "POST", action: "/api/social" }
    );
    setDeleteDialogOpen(false);
    handleMenuClose();
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (post.image_urls?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === (post.image_urls?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Card sx={{ mb: 2, backgroundColor: "background.default" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mt: -1 }}>
          <Avatar
            src={profile.profile_pic_url || "/profile1.webp"}
            sx={{ mr: 1 }}
          />
          <Link
            to={`/${profile.username}`}
            style={{
              textDecoration: "none",
              color: "black",
              display: "block",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              paddingRight: 2,
              fontWeight: "bold",
              marginBottom: 18,
            }}
          >
            <Typography variant="subtitle2">{profile.username}</Typography>
          </Link>

          {post.farms && (
            <>
              <Typography
                variant="subtitle2"
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "block",
                  paddingLeft: 3,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  marginBottom: 18,
                }}
              >
                @
              </Typography>
              <Link
                to={`/farm/${post.farm_mention}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "block",
                  paddingLeft: 3,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  marginBottom: 18,
                }}
              >
                <Typography variant="subtitle2">{post.farms.name}</Typography>
              </Link>
            </>
          )}
          {/* Date  make it italic*/}
          <Typography
            variant="caption"
            sx={{
              ml: 1,
              fontStyle: "italic",
              fontSize: "0.6rem",
              marginBottom: 1.8,
            }}
          >
            {new Date(post.created_at).toLocaleString()}
          </Typography>
          {currentUser?.id === post.user_id && (
            <>
              <IconButton
                onClick={handleMenuOpen}
                sx={{ ml: "auto", borderColor: "transparent" }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={() => {
                    setDeleteDialogOpen(true);
                    handleMenuClose();
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
        <Typography variant="body1" sx={{ ml: 6, mt: -2.5 }}>
          {post.content}
        </Typography>
        {post.image_urls && post.image_urls.length > 0 && (
          <Box sx={{ position: "relative", mt: 2 }}>
            <img
              src={`https://rjtapsiizkqvcgjvibra.supabase.co/storage/v1/object/public/post-images/${post.image_urls[currentImageIndex]}`}
              alt="post"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 8,
                maxHeight: "500px",
                objectFit: "contain",
              }}
            />
            {post.image_urls.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrevImage}
                  sx={{
                    position: "absolute",
                    left: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "none",
                    color: "black",
                    bgcolor: "rgba(255, 255, 255, 0.3)",
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.9)" },
                  }}
                >
                  <NavigateBeforeIcon />
                </IconButton>
                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(255, 255, 255, 0.5)",
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.9)" },
                  }}
                >
                  <NavigateNextIcon />
                </IconButton>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    left: "50%",
                    transform: "translateX(-50%)",
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  {currentImageIndex + 1} / {post.image_urls.length}
                </Box>
              </>
            )}
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          onClick={handleLike}
          sx={{ borderColor: "transparent" }}
          size="small"
        >
          {liked_by_user ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <Typography>{likeCount}</Typography>

        <IconButton
          onClick={() => setShowComments(!showComments)}
          sx={{ borderColor: "transparent" }}
          size="small"
        >
          <CommentIcon />
        </IconButton>
        <Typography>{post.comments.length}</Typography>
      </CardActions>

      <Box sx={{ px: 2 }}>
        {post.comments.length > 0 && <Divider sx={{ mb: 2 }} />}
        {post.comments.map((comment) => (
          <Box key={comment.id} sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar
                src={comment.profiles?.profile_pic_url || "/profile1.webp"}
                sx={{ width: 24, height: 24, mr: 1 }}
              />
              <Link to={`/${comment.profiles?.username}`}>
                <Typography variant="subtitle2">
                  {comment.profiles?.username}
                </Typography>
              </Link>
              <Typography variant="caption" sx={{ ml: 1 }}>
                {new Date(comment.created_at).toLocaleString()}
              </Typography>
            </Box>
            <Typography variant="body2">{comment.content}</Typography>
          </Box>
        ))}

        {currentUser && showComments && (
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              variant="filled"
              multiline
              rows={2}
              value={comment}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setComment(e?.target?.value)
              }
              label="Write a comment..."
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
            <Button
              variant="outlined"
              onClick={handleComment}
              disabled={!comment.trim()}
              sx={{
                borderColor: comment ? "primary" : "#1976D2",
                color: "#1976D2",
                border: "1px solid",
                mt: 2,
              }}
            >
              Post
            </Button>
          </Box>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
