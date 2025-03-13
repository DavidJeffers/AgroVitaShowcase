import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import { createSupabaseServerClient } from "~/utils/supabase.server";
import {
  Container,
  Typography,
  Box,
  Button,
  CardMedia,
  Chip,
  Grid,
  Divider,
} from "@mui/material";
import { Link, ActionFunctionArgs, useActionData } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Tables } from "database.types";
import { FavoritesCell } from "~/components/products/buttons/Favorites";

export type ProductResponse = Tables<"products"> & {
  products_details: Pick<Tables<"products_details">, "description"> | null;
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { id } = params;
  if (!id) {
    return redirect("/products");
  }

  const supabase = createSupabaseServerClient(request);

  // Get the logged-in user
  const {
    data: { user },
  } = await supabase.client.auth.getUser();

  let product = null;
  let favoritesResponse = null;

  if (!user) {
    // Fetch product details if the user is not logged in
    const { data } = await supabase.client
      .from("products")
      .select("*, products_details(description)")
      .eq("id", id)
      .single();
    product = data;
  } else {
    // Fetch both product details and user's favorite status
    [favoritesResponse, { data: product }] = await Promise.all([
      supabase.client
        .from("products_favorites")
        .select("product_id")
        .eq("user_id", user.id),
      supabase.client
        .from("products")
        .select("*, products_details(description)")
        .eq("id", id)
        .single(),
    ]);
  }
  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }

  const isLoggedIn = user ? true : false;

  return {
    product,
    favorites: favoritesResponse?.data
      ? new Set(favoritesResponse.data.map((fav) => fav.product_id ?? ""))
      : null,
    isLoggedIn,
    user,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("fav action ran");
  const supabase = createSupabaseServerClient(request);
  const formData = await request.formData();
  const productId = formData.get("productId") as string;

  const action = formData.get("action") as "addFav" | "removeFav";
  const {
    data: { user },
  } = await supabase.client.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated", status: 401 };
  }
  switch (action) {
    case "addFav": {
      try {
        await supabase.client
          .from("products_favorites")
          .insert({ user_id: user.id, product_id: productId });

        return {
          success: true,
        };
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
          .from("products_favorites")
          .delete()
          .match({ user_id: user.id, product_id: productId });

        return {
          success: true,
        };
      } catch (error) {
        return {
          success: false,
          error: "Failed to update favorite",
          errorMsg: error,
        };
      }
    }
  }
}

export default function ProductRoute() {
  const { product, favorites, isLoggedIn } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  if (!product) {
    return <Typography>Product not found</Typography>;
  }
  return (
    <Container sx={{ py: 4 }}>
      {/* Back Button */}
      <Link to="/products" style={{ textDecoration: "none" }}>
        <Button startIcon={<ArrowBackIcon />} sx={{ mb: 4 }}>
          Back to Products
        </Button>
      </Link>

      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            height="400"
            image={product.image_url}
            alt={product.name}
            sx={{
              borderRadius: "16px",
              width: "100%",
              objectFit: "contain",
            }}
          />
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          {/* Product Name and Favorite Button */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {product.name}
            </Typography>
            <FavoritesCell
              row={{ original: { id: product.id, favs: product.favs } }}
              actionData={actionData}
              favs={favorites}
              isLoggedIn={isLoggedIn}
            />
          </Box>

          {/* Categories */}
          {product.categories && product.categories.length > 0 && (
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
              {product.categories.map((category, index) => (
                <Chip key={index} label={category} variant="outlined" />
              ))}
            </Box>
          )}

          {/* Conditional Chip for sizes */}
          {product.isMultipleSizes && (
            <Chip
              label="Available in different sizes"
              color="primary"
              variant="outlined"
              sx={{ mb: 2 }}
            />
          )}

          {product.products_details?.description && (
            <Box sx={{ mb: 2, color: "gray" }}>
              <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
                {product.products_details.description
                  .split("\\n")
                  .map((line, index) => (
                    <li key={index} style={{ marginBottom: "0.5rem" }}>
                      <Typography variant="body1">{line.trim()}</Typography>
                    </li>
                  ))}
              </ul>
            </Box>
          )}

          <Typography variant="h6" color="black" sx={{ mb: 2 }}>
            ${product.price}
          </Typography>

          {/* Ratings */}
          {/* <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Rating
              name="read-only"
              value={product.rating}
              readOnly
              precision={0.1}
            />
            <Typography sx={{ ml: 1 }}>
              {product.rating.toFixed(1)} ({product.review_count} reviews)
            </Typography>
          </Box> */}

          <Link to={product.website_url} target="_blank">
            <Button
              variant="outlined"
              sx={{
                bgcolor: "#16A34A",
                color: "white",
                padding: "2px 4px",
                fontSize: "0.8rem",
                borderRadius: "8px",
                textTransform: "none",
                height: "28px",

                transition: "opacity 0.3s ease-in-out",
                "&:hover": { bgcolor: "#16A34A" },
              }}
            >
              Buy
            </Button>
          </Link>
        </Grid>
      </Grid>

      {/* Reviews */}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" sx={{ mb: 2 }}>
        Customer Reviews
      </Typography>
      {/* {product.reviews && product.reviews.length > 0 ? (
        product.reviews.map((review, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="body1" fontWeight="bold">
              {review.author}
            </Typography>
            <Rating value={review.rating} readOnly />
            <Typography variant="body2">{review.comment}</Typography>
          </Box>
        ))
      ) : (
        <Typography>No reviews yet.</Typography>
      )} */}
    </Container>
  );
}
