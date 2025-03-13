import {
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  useLoaderData,
  LoaderFunctionArgs,
  ActionFunctionArgs,
  useActionData,
  redirect,
} from "react-router";
import { createSupabaseServerClient } from "~/utils/supabase.server";
import PriceFilter from "~/components/products/filters/PriceFilter";
import RatingFilter from "~/components/products/filters/RatingFilter";
import { useState } from "react";
import CategoriesFilter from "~/components/products/filters/CategoriesFilter";
import { MainFilter } from "~/components/products/utils/FilterEnums";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTableLogic } from "~/components/products/table/ProductTable";
import { MaterialReactTable } from "material-react-table";
import { IoSearchCircle } from "react-icons/io5";
import ClearIcon from "@mui/icons-material/Clear";

/* interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  created_at?: string;
  updated_at?: string;
  website_url: string;
  isFeatured: boolean;
  isMultipleSizes: boolean;
  categories: string[] | null;
  favs: number;
  rating?: number; // fake rating for now.
} */

export async function loader({ request }: LoaderFunctionArgs) {
  const supabase = createSupabaseServerClient(request);

  const { data: allProducts, error } = await supabase.client
    .from("products")
    .select("*")
    .order("isFeatured", { ascending: false });

  const {
    data: { user },
  } = await supabase.client.auth.getUser();

  if (
    user?.id !== "8ee61fed-8c10-4954-ad31-8d02b8d5f959" &&
    user?.id !== "70b47f2a-eade-45de-8406-2d14c6618e3a" &&
    user?.id !== "70b47f2a-eade-45de-8406-2d14c6618e3a"
  ) {
    return redirect("/");
  }

  let userFavorites = null;

  if (user) {
    const { data } = await supabase.client
      .from("products_favorites")
      .select("product_id")
      .eq("user_id", user.id);
    userFavorites = data;
  }

  if (error) {
    console.error("Error fetching products:", error.message);
    return { products: [] };
  }

  console.log("allProducts", allProducts.length);
  const productsWithFakeRating = (allProducts || []).map((product) => ({
    ...product,
    rating: 5,
    created_at: product.created_at || undefined,
    updated_at: product.updated_at || undefined,
    isMultipleSizes: product.isMultipleSizes || false,
  }));

  return { products: productsWithFakeRating, userFavorites };
}

export interface FavActionData {
  error?: string;
  success: boolean;
  favorites?: Set<string> | null;
  status?: number;
}

export async function action({ request }: ActionFunctionArgs) {
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

        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: "Failed to add favorite",
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

        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: "Failed to remove favorite",
          errorMsg: error,
        };
      }
    }
  }
}

export default function Products() {
  const { products, userFavorites } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [category, setCategory] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const {
    table,
    handleSortChange,
    handleCategoryFilterChange,
    handleRatingFilterChange,
    handlePriceFilterChange,
    handleFavoritesFilterChange,
    handleSearchChange,
  } = useTableLogic(
    products,
    actionData,
    new Set(userFavorites?.map((p) => p.product_id) || [])
  );

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = (newSortBy?: string) => {
    setSortAnchorEl(null);
    if (newSortBy && newSortBy !== sortBy) {
      setSortBy(newSortBy);
      handleSortChange(newSortBy);
    }
  };

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    handlePriceFilterChange(newRange);
  };

  const handleRatingChange = (newRating: number | null) => {
    setMinRating(newRating);
    handleRatingFilterChange(newRating);
  };

  const handleCategoryChange = (newCategories: string[]) => {
    setCategory(newCategories);
    handleCategoryFilterChange(newCategories);
  };

  const handleFavoritesToggle = () => {
    const newShowFavorites = !showFavorites;
    setShowFavorites(newShowFavorites);
    handleFavoritesFilterChange(newShowFavorites);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    handleSearchChange(value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    handleSearchChange("");
  };

  const handleClearFilters = () => {
    setPriceRange([0, 500]);
    setMinRating(null);
    setShowFavorites(false);
    setCategory([]);
    setSearchValue("");
    table.resetColumnFilters();
    table.setGlobalFilter("");
    setIsFiltered(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        // overflow: "hidden",
        p: 4,
        pt: 4,
        position: "relative",
      }}
    >
      <Stack spacing={2} sx={{ height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            // justifyContent: "space-between",
            gap: 2.5,
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography component="h2" variant="h6" sx={{ fontWeight: "medium" }}>
            Products
          </Typography>
          <TextField
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search products..."
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoSearchCircle />
                </InputAdornment>
              ),
              endAdornment: searchValue ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClearSearch}
                    size="small"
                    sx={{
                      border: "none",
                      backgroundColor: "transparent",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
            sx={{
              width: 300,
              mb: 0,
            }}
          />
          {/* <TextField
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search farms..."
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoSearchCircle />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {searchValue && (
                    <IconButton
                      onClick={handleClearSearch}
                      size="small"
                      sx={{
                        // color: "black",
                        border: "none",
                        backgroundColor: "transparent",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            sx={{
              width: 300,
              mb: 0,
            }}
          ></TextField> */}
          {/* <Button
            onClick={() => setShowMap(!showMap)}
            sx={{
              height: "40px",
              minWidth: { xs: "42px", sm: "auto" },
              bgcolor: showMap ? "primary.light" : "transparent",
            }}
          >
            {showMap ? "Hide Map" : "Show Map"}
          </Button>

          <Box
            className="hover-container"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            sx={{
              cursor: "pointer",
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GrInfo size={20} />
          </Box>

          <Box
            onClick={() => setIsVideoOpen(true)}
            sx={{
              cursor: "pointer",
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MdOndemandVideo size={20} />
          </Box> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
            p: 2,
            borderRadius: "20px",
          }}
        >
          {/* Filters and Clear All */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 0.5, sm: 2 },
              alignItems: "center",
              flex: 1,
            }}
          >
            <CategoriesFilter
              value={category}
              onChange={handleCategoryChange}
              categories={Object.values(MainFilter)}
            />
            <PriceFilter value={priceRange} onChange={handlePriceChange} />
            <RatingFilter value={minRating} onChange={handleRatingChange} />
            <Button
              onClick={handleFavoritesToggle}
              startIcon={
                showFavorites ? <FavoriteIcon /> : <FavoriteBorderIcon />
              }
              sx={{
                height: "40px",
                minWidth: { xs: "42px", sm: "auto" },
                bgcolor: showFavorites ? "primary.light" : "transparent",
                // "& .MuiButton-startIcon": {
                //   margin: 0,
                //   justifyContent: "center",
                //   alignItems: "center",
                // },
              }}
            >
              {/* {!isMobile && "Favorites"} */}
              <Box
                component="span"
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                Favorites
              </Box>
            </Button>

            {isFiltered && (
              <Box
                onClick={handleClearFilters}
                sx={{
                  height: "40px",
                  bgcolor: "background.paper",
                  color: "text.primary",
                  border: "none",
                  boxShadow: "none",
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  padding: "0 16px",
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    bgcolor: "primary.light",
                  },
                }}
              >
                Clear All
              </Box>
            )}
            <Box sx={{ marginLeft: "auto" }}>
              <Button
                onClick={handleSortClick}
                endIcon={<ArrowDropDownIcon />}
                sx={{
                  height: "40px",
                  bgcolor: "transparent",
                  border: "none",
                  borderColor: "divider",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "background.paper",
                    borderColor: "primary.main",
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{ display: { xs: "inline", sm: "none" } }}
                >
                  Sort
                </Box>
                <Box
                  component="span"
                  sx={{ display: { xs: "none", sm: "inline" } }}
                >
                  {`Sort by: ${sortBy
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}`}
                </Box>
              </Button>

              <Menu
                anchorEl={sortAnchorEl}
                open={Boolean(sortAnchorEl)}
                onClose={() => handleSortClose()}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    minWidth: 180,
                  },
                }}
              >
                <MenuItem
                  onClick={() => handleSortClose("featured")}
                  selected={sortBy === "featured"}
                >
                  Featured
                </MenuItem>
                <MenuItem
                  onClick={() => handleSortClose("price-low")}
                  selected={sortBy === "price-low"}
                >
                  Price: Low to High
                </MenuItem>
                <MenuItem
                  onClick={() => handleSortClose("price-high")}
                  selected={sortBy === "price-high"}
                >
                  Price: High to Low
                </MenuItem>
                <MenuItem
                  onClick={() => handleSortClose("rating")}
                  selected={sortBy === "rating"}
                >
                  Highest Rated
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>

        {/* Render the table */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            overflow: "hidden",
            "& .MuiPaper-root": {
              boxShadow: "none",
              borderColor: "divider",
            },
          }}
        >
          {table.getRowModel().rows.length ? (
            <MaterialReactTable table={table} />
          ) : (
            <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
              No products found
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
}

/* const ProductCard = ({
  product,
  userFavorites,
  actionData,
}: {
  product: Product;
  userFavorites: Set<string> | null;
  actionData?: FavActionData | null;
}) => {
  const isFavorite = userFavorites ? userFavorites.has(product.id) : false;

  console.log("actionData", actionData);
  return (
    <Box
      sx={{
        position: "relative",
        // overflow: "hidden",
        borderRadius: "16px",

        border: "1px solid #e0e0e0",
        boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
        "&:hover .hover-button": { opacity: 1 },
      }}
    >
      {product.isMultipleSizes && (
        <Tooltip title="Available in different sizes" arrow>
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              bgcolor: "rgba(255,255,255,0.9)",
              borderRadius: "50%",
              width: 28,
              height: 28,
              padding: 0,
              boxShadow: 1,
              // border: "none",
              // boxShadow: "none",
              "&:hover": { bgcolor: "rgba(255,255,255,1)" },
            }}
          >
            <TbLibraryPlus size={16} color="gray" />
          </IconButton>
        </Tooltip>
      )}


      <Form method="post" style={{ display: "contents" }}>
        <input type="hidden" name="productId" value={product.id} />
        <input
          type="hidden"
          name="action"
          value={isFavorite ? "removeFav" : "addFav"}
        />
        <Tooltip
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          arrow
        >
          <IconButton
            type="submit"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(255,255,255,0.9)",
              borderRadius: "50%",
              width: 28,
              height: 28,
              padding: 0,
              // boxShadow: 1,
              border: "none",
              boxShadow: "none",
              "&:hover": { bgcolor: "rgba(255,255,255,1)" },
            }}
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ color: "red", fontSize: "1rem" }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: "gray", fontSize: "1rem" }} />
            )}
          </IconButton>
        </Tooltip>
      </Form>

      <Link to={`/product/${product.id}`}>
        <CardMedia
          component="img"
          height="290"
          image={product.image_url}
          alt={product.name}
          sx={{
            objectFit: "cover",
            borderRadius: "8px",
            width: "100%",
            transformOrigin: "center",
          }}
        />
      </Link>
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          bgcolor: "#fff",
          padding: "10px",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          opacity: 0.98,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontSize: "0.9rem", lineHeight: 1.3 }}
          noWrap
        >
          {product.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "4px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Rating
              value={product.rating}
              precision={0.1}
              readOnly
              size="small"
              sx={{ fontSize: "0.9rem" }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.7rem" }}
            >
              ({(product.rating || 0).toFixed(1)})
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", fontSize: "0.8rem", color: "#16A34A" }}
          >
            ${product.price}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "8px",
          }}
        >
          {product.categories && product.categories.length > 0 && (
            <Typography
              variant="caption"
              sx={{
                display: "inline-block",
                px: 1.5,
                //py: 0.5,
                borderRadius: "12px",
                bgcolor: "rgba(128,128,128,0.1)",
                color: "gray",
                fontSize: "0.8rem",
                fontWeight: "500",
              }}
            >
              {product.categories[0]} 
            </Typography>
          )}

          {product.categories &&
            product.categories.length > 1 &&
            (product.categories.length > 2 ? (
              <Tooltip
                arrow
                slotProps={{
                  tooltip: {
                    sx: {
                      position: "relative",
                      p: 1,
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      border: "1px solid",
                      borderColor: "divider",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      width: 150,
                      "& .MuiTooltip-arrow": {
                        color: "#fff",
                        "&::before": {
                          backgroundColor: "#fff",
                          border: "1px solid",
                          borderColor: "divider",
                        },
                      },
                    },
                  },
                  arrow: {
                    sx: {
                      "&::before": {
                        backgroundColor: "#fff",
                        border: "1px solid",
                        borderColor: "divider",
                      },
                    },
                  },
                }}
                title={
                  <Box sx={{ p: 1, maxWidth: 150 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                        color: "text.primary",
                        textAlign: "left",
                        justifyContent: "center",
                        borderBottom: "2px solid",
                        borderColor: "divider",
                      }}
                    >
                      Categories
                    </Typography>
                    {product.categories.map(
                      (category: string, index: number) => (
                        <Typography
                          key={index}
                          variant="body2"
                          sx={{
                            color: "text.primary",
                            textAlign: "left",
                            justifyContent: "center",
                          }}
                        >
                          • {category}
                        </Typography>
                      )
                    )}
                  </Box>
                }
              >
                <Typography
                  variant="caption"
                  sx={{ fontSize: "0.8rem", color: "gray", cursor: "pointer" }}
                >
                  {product.categories[1]}...
                </Typography>
              </Tooltip>
            ) : (
              <Typography
                variant="caption"
                sx={{ fontSize: "0.8rem", color: "gray" }}
              >
                {product.categories[1]}
              </Typography>
            ))}

          <Link to={product.website_url} target="_blank">
            <Button
              className="hover-button"
              sx={{
                bgcolor: "#16A34A",
                color: "white",
                padding: "2px 4px",
                fontSize: "0.8rem",
                borderRadius: "12px",
                textTransform: "none",
                height: "28px",
                opacity: 0,
                transition: "opacity 0.3s ease-in-out",
                "&:hover": { bgcolor: "#16A34A" },
              }}
            >
              Buy
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}; */
