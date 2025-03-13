import React, { useState, useRef } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useFetcher } from "react-router";
import { compressImage } from "~/utils/imageCompressor";

interface PostFormProps {
  farmId?: string;
  farmName?: string;
  canUserPost: boolean;
}

const PostForm = ({ farmId, farmName, canUserPost }: PostFormProps) => {
  const [content, setContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [compressing, setCompressing] = useState(false);
  const fetcher = useFetcher();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleClearImages = () => {
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canUserPost) {
      return;
    }
    const formData = new FormData(e.currentTarget);

    formData.delete("image");

    if (selectedFiles.length > 0) {
      setCompressing(true);
      try {
        const compressedFiles = await Promise.all(
          selectedFiles.map(async (file) => {
            const compressedBlob = await compressImage(file);
            return new File([compressedBlob], file.name, {
              type: file.type,
            });
          })
        );

        compressedFiles.forEach((file) => {
          formData.append(`image`, file);
        });
      } catch (error) {
        console.error("Compression failed:", error);
        setCompressing(false);
        return;
      }
      setCompressing(false);
    }

    formData.append("action", "createPost");
    fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });

    setContent("");
    handleClearImages();
  };

  return (
    <fetcher.Form
      method="post"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          mb: 4,
          backgroundColor: "background.default",
        }}
      >
        {canUserPost ? (
          <>
            <TextField
              id="post-form-content"
              name="content"
              label={
                farmName
                  ? `Tell everyone about ${farmName}?`
                  : "What's on your table?"
              }
              multiline
              minRows={1}
              maxRows={8}
              variant="filled"
              value={content}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setContent(e.target.value)
              }
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
            <input type="hidden" name="farmId" value={farmId} />
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<PhotoCameraIcon />}
              >
                {selectedFiles.length > 0
                  ? `${selectedFiles.length} images selected`
                  : "Add Photos"}
                <input
                  ref={fileInputRef}
                  type="file"
                  name="image"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              {selectedFiles.length > 0 && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleClearImages}
                  sx={{
                    bgcolor: "#e3bd5f",
                    color: "text.primary",
                  }}
                >
                  Clear Images
                </Button>
              )}
              <Button
                type="submit"
                disabled={
                  compressing || (!content.trim() && selectedFiles.length === 0)
                }
                variant="outlined"
                sx={{ px: 4 }}
              >
                {compressing ? "Compressing..." : "Post"}
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            You have reached the maximum number of posts allowed today. Come
            back tomorrow!
          </Typography>
        )}
        {selectedFiles.length > 0 && (
          <Typography variant="caption" color="text.secondary">
            Selected files: {selectedFiles.map((f) => f.name).join(", ")}
          </Typography>
        )}
      </Box>
    </fetcher.Form>
  );
};

export default PostForm;
