import { IconButton, Box, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFetcher } from "react-router";

interface Row {
  original: {
    id: string;
    favs: number;
  };
}
interface FavPageProps {
  row: Row;
  favs: Set<string> | null;
  isloggedIn: boolean;
}

export function FavoritesCell({ row, favs, isloggedIn }: FavPageProps) {
  const farmId = row.original.id;
  const isFavorite = favs ? favs.has(row.original.id) : false;
  const totalFavorites = row.original.favs || 0;
  const fetcher = useFetcher();

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isloggedIn) return;

    const formData = new FormData();
    formData.append("farmId", farmId);
    formData.append("action", isFavorite ? "remove" : "add");

    // Use the fetcher to submit to the farms route action
    fetcher.submit(formData, { method: "post", action: "/farms" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        borderColor: "transparent",
      }}
    >
      {isloggedIn ? (
        <IconButton
          onClick={handleFavoriteClick}
          size="small"
          disabled={fetcher.state === "submitting"}
          sx={{
            color: isFavorite ? "red" : "inherit",
            "&:hover": {
              color: isFavorite ? "#ff4444" : "#ff8888",
              borderColor: "transparent",
              backgroundColor: "transparent",
            },
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
        >
          {isFavorite ? (
            <FavoriteIcon fontSize="large" />
          ) : (
            <FavoriteBorderIcon fontSize="large" />
          )}
        </IconButton>
      ) : (
        <IconButton
          disabled
          size="small"
          sx={{
            color: "inherit",
            opacity: 0.5,
            "&:hover": {
              backgroundColor: "transparent",
              borderColor: "transparent",
            },
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
        >
          <FavoriteBorderIcon fontSize="large" />
        </IconButton>
      )}
      <Typography
        variant="body2"
        sx={{
          fontWeight: "bold",
          color: "text.secondary",
        }}
      >
        {totalFavorites}
      </Typography>
    </Box>
  );
}
