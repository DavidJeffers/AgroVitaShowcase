/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import {
  MRT_ColumnDef,
  MRT_RowVirtualizer,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import { Form, Link } from "react-router";
import { VscBlank } from "react-icons/vsc";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import lozad from "lozad";

export interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  website_url: string;
  isFeatured: boolean;
  isMultipleSizes: boolean;
  categories: string[] | null;
  favs: number;
  rating?: number;
}

interface Row {
  getValue: <T>(key: string) => T;
  original: Product;
  index: number;
}

export interface FavActionData {
  error?: string;
  success: boolean;
  favorites?: Set<string> | null;
  status?: number;
}

const normalizeString = (str: string) => str.toLowerCase().trim();

const matchesSearchTerm = (
  searchValue: string,
  target: string | null | undefined
): boolean => {
  if (!target) return false;
  const normalizedTarget = normalizeString(target);
  const normalizedSearch = normalizeString(searchValue);

  return (
    normalizedTarget.includes(normalizedSearch) ||
    (normalizedSearch.length > 3 &&
      (normalizedTarget.startsWith(normalizedSearch) ||
        normalizedTarget.endsWith(normalizedSearch)))
  );
};

const matchesCategories = (
  searchValue: string,
  categories: string[] | null
): boolean => {
  if (!categories?.length) return false;
  return categories.some((category) =>
    matchesSearchTerm(searchValue, category)
  );
};

export const useTableLogic = (
  products: Product[],
  actionData: FavActionData | undefined,
  favorites: Set<string> | null
) => {
  const rowVirtualizerInstanceRef = React.useRef<MRT_RowVirtualizer>(null);

  const lozadObserverRef = React.useRef<lozad.Observer | null>(null);

  const columns = React.useMemo<MRT_ColumnDef<Product>[]>(() => {
    const baseColumns: MRT_ColumnDef<Product>[] = [
      {
        accessorKey: "image_url",
        header: "",
        size: 60,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: 60,
              height: 60,
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <img
              className="lozad"
              data-src={row.original.image_url}
              alt={row.original.name}
              loading="lazy"
              width={80}
              height={80}
              style={{
                objectFit: "cover",
                opacity: 0,
                transition: "opacity 0.3s ease",
              }}
              onLoad={(e) => {
                (e.target as HTMLImageElement).style.opacity = "1";
              }}
            />
          </Box>
        ),
      },
      {
        accessorKey: "name",
        header: "Product",
        size: 200,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          const name = row.original.name;
          const site = row.original.website_url;
          const id = row.original.id;

          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {site ? null : <VscBlank />}
              <Link
                to={`/product/${id}`}
                style={{ color: "inherit", textDecoration: "link" }}
              >
                {name}
              </Link>
            </Box>
          );
        },
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 100,
        enableColumnFilter: true,
        filterFn: (row: Row, id: string, filterValue: [number, number]) => {
          const price = row.getValue<number>(id);
          if (!filterValue || !price) return true;
          const [min, max] = filterValue;
          return price >= min && price <= max;
        },
      },
      {
        accessorKey: "categories",
        header: "Categories",
        size: 150,
        enableColumnFilter: true,
        Cell: ({ cell }) => {
          const categories = cell.getValue() as string[];
          const renderedCellValue: React.ReactNode = Array.isArray(categories)
            ? (categories as React.ReactNode[]).join(", ")
            : (categories as React.ReactNode);

          return renderedCellValue;
        },
        filterFn: (row: Row, id: string, filterValue: string[]) => {
          const rowCategories = row.getValue<string[]>(id);
          if (!rowCategories?.length || !filterValue.length) return true;
          return filterValue.some((category) =>
            rowCategories.includes(category)
          );
        },
      },
      {
        accessorKey: "rating",
        header: "Rating",
        size: 150,
        enableColumnFilter: true,
        filterFn: (row: Row, id: string, filterValue: number) => {
          const rating = row.getValue<number>(id);
          if (!filterValue || !rating) return true;
          return rating >= filterValue;
        },
      },
      {
        accessorKey: "favs",
        header: "Favorites",
        size: 100,
        enableColumnFilter: true,
        Cell: ({ row }) => {
          const id = row.original.id;
          const isFavorite = favorites ? favorites.has(id) : false;
          const totalFavorites = row.original.favs || 0;
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0,
                cursor: "pointer",
                borderColor: "transparent",
              }}
            >
              <Form method="post" style={{ display: "contents" }}>
                <input type="hidden" name="productId" value={id} />
                <input
                  type="hidden"
                  name="action"
                  value={isFavorite ? "removeFav" : "addFav"}
                />
                <Tooltip
                  title={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                  arrow
                >
                  <IconButton
                    type="submit"
                    size="small"
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
                      <FavoriteIcon sx={{ color: "red", fontSize: "1rem" }} />
                    ) : (
                      <FavoriteBorderIcon
                        sx={{ color: "gray", fontSize: "1rem" }}
                      />
                    )}
                  </IconButton>
                </Tooltip>
              </Form>
              <Typography variant="body2" color="text.secondary">
                {totalFavorites}
              </Typography>
            </Box>
          );
        },
        filterFn: (row: Row, _columnId: string, filterValue: boolean) => {
          const id = row.original.id;
          const isFavorite = favorites ? favorites.has(id) : false;

          if (filterValue === undefined || filterValue === null) {
            return true;
          }
          return filterValue === true ? isFavorite === true : true;
        },
      },
    ];

    return baseColumns;
  }, [favorites]);

  const table = useMaterialReactTable({
    columns,
    data: products,
    enableKeyboardShortcuts: false,
    enablePagination: false,
    enableColumnPinning: false,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableGlobalFilter: true,
    globalFilterFn: "myCustomFilterFn",
    filterFns: {
      myCustomFilterFn: (row, id, filterValue: string) => {
        const searchTerms = filterValue.toLowerCase().trim().split(/\s+/);
        const product = row.original;

        if (!searchTerms.length) return true;

        return searchTerms.every((term) => {
          const searchValue = term.endsWith("s") ? term.slice(0, -1) : term;

          return (
            matchesSearchTerm(searchValue, product.name) ||
            matchesCategories(searchValue, product.categories)
          );
        });
      },
    },
    initialState: {
      sorting: [{ id: "rating", desc: true }],
    },
    layoutMode: "semantic",
    enableTopToolbar: false,
    enableStickyHeader: true,
    muiTableProps: {
      sx: {
        width: "100%",
        tableLayout: "fixed",
        "& th, & td": {
          scrollSnapAlign: "start",
        },
      },
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: "600px",
        scrollSnapType: "x mandatory",
        maxWidth: "100%",
        overflowX: "auto",
      },
    },

    muiTableHeadCellProps: {
      sx: {
        ".MuiTableSortLabel-icon": {
          display: "none",
        },
        ".MuiTableSortLabel-root.Mui-active": {
          color: "inherit",
        },
        ".MuiBadge-badge": {
          display: "none",
        },
        ".MuiBadge-root": {
          display: "none",
        },
      },
    },
    rowVirtualizerInstanceRef,
    rowVirtualizerOptions: { overscan: 4 },
  });

  const handleSortChange = React.useCallback(
    (sortBy: string) => {
      switch (sortBy) {
        case "featured":
          table.setSorting([{ id: "isFeatured", desc: true }]);
          break;
        case "price-low":
          table.setSorting([{ id: "price", desc: false }]);
          break;
        case "price-high":
          table.setSorting([{ id: "price", desc: true }]);
          break;
        case "rating":
          table.setSorting([{ id: "rating", desc: true }]);
          break;
        default:
          table.resetSorting();
      }
    },
    [table]
  );

  const handleCategoryFilterChange = React.useCallback(
    (categories: string[]) => {
      table.setColumnFilters((prev) => {
        const otherFilters = prev.filter(
          (filter) => filter.id !== "categories"
        );
        if (!categories.length) return otherFilters;
        return [...otherFilters, { id: "categories", value: categories }];
      });
    },
    [table]
  );

  const handleRatingFilterChange = React.useCallback(
    (rating: number | null) => {
      table.setColumnFilters((prev) => {
        const otherFilters = prev.filter((filter) => filter.id !== "rating");
        if (!rating) return otherFilters;
        return [...otherFilters, { id: "rating", value: rating }];
      });
    },
    [table]
  );

  const handlePriceFilterChange = React.useCallback(
    (range: [number, number]) => {
      table.setColumnFilters((prev) => {
        const otherFilters = prev.filter((filter) => filter.id !== "price");
        return [...otherFilters, { id: "price", value: range }];
      });
    },
    [table]
  );

  const handleFavoritesFilterChange = React.useCallback(
    (showFavorites: boolean) => {
      table.setColumnFilters((prev) => {
        const otherFilters = prev.filter((filter) => filter.id !== "favs");
        if (!showFavorites) return otherFilters;
        return [...otherFilters, { id: "favs", value: true }];
      });
    },
    [table]
  );

  const handleSearchChange = React.useCallback(
    (value: string) => {
      table.setGlobalFilter(value);
    },
    [table]
  );

  useEffect(() => {
    lozadObserverRef.current = lozad(".lozad", {
      rootMargin: "50px 0px",
      threshold: 0.1,
      loaded: function (el: HTMLElement) {
        el.classList.add("loaded");
      },
    });

    lozadObserverRef.current.observe();

    return () => {
      if (lozadObserverRef.current) {
        lozadObserverRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (lozadObserverRef.current) {
        lozadObserverRef.current.observe();
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [table]);

  return {
    table,
    handleSortChange,
    handleCategoryFilterChange,
    handleRatingFilterChange,
    handlePriceFilterChange,
    handleFavoritesFilterChange,
    handleSearchChange,
    rowVirtualizerInstanceRef,
  };
};
