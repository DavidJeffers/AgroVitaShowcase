import { IconButton, Box, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Form } from "react-router";
import { FavActionData } from "~/routes/products";

interface Row {
  original: {
    id: string;
    favs: number;
  };
}

interface FavPageProps {
  row: Row;
  actionData?: FavActionData | null;
  favs: Set<string> | null;
  isLoggedIn: boolean;
}

export const FavoritesCell = ({
  row,
  actionData,
  favs,
  isLoggedIn,
}: FavPageProps) => {
  const productId = row.original.id;
  const isFavorite = actionData
    ? actionData?.favorites?.has(row.original.id)
    : favs
    ? favs.has(row.original.id)
    : false;

  const totalFavorites = row.original.favs || 0;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        cursor: "pointer",
        borderColor: "transparent",
      }}
    >
      {isLoggedIn ? (
        <Form method="post" style={{ display: "contents" }}>
          <input type="hidden" name="productId" value={productId} />
          <input
            type="hidden"
            name="action"
            value={isFavorite ? "removeFav" : "addFav"}
          />
          <IconButton
            type="submit"
            size="small"
            sx={{
              color: isFavorite ? "red" : "inherit",
              "&:hover": {
                color: isFavorite ? "#ff4444" : "#ff8888",
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
        </Form>
      ) : (
        <IconButton
          size="small"
          sx={{
            color: "inherit",
            "&:hover": {
              color: "#ff8888",
            },
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
        >
          <FavoriteBorderIcon fontSize="large" />
        </IconButton>
      )}
      <Typography variant="body2" color="text.secondary">
        {totalFavorites}
      </Typography>
    </Box>
  );
};
