import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Paper,
  Grid,
  Typography,
  InputBase,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClearIcon from "@mui/icons-material/Clear";

interface CategoriesFilterProps {
  value: string[];
  onChange: (categories: string[]) => void;
  categories: string[];
}

const CategoriesFilter = ({
  value,
  onChange,
  categories,
}: CategoriesFilterProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(value);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedCategories(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCategory = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    onChange(updatedCategories);
  };

  const handleApply = () => {
    onChange(selectedCategories);
    setShowFilter(false);
  };

  const handleClear = () => {
    setSelectedCategories([]);
    onChange([]);
    setShowFilter(false);
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ position: "relative" }} ref={boxRef}>
      <Button
        onClick={() => setShowFilter((prev) => !prev)}
        sx={{
          height: "40px",
          bgcolor:
            selectedCategories.length > 0 ? "primary.light" : "transparent",
        }}
      >
        <CategoryIcon
          sx={{
            fontSize: "0.9rem",
            mr: 0.5,
            display: { xs: "none", md: "inline-flex" },
          }}
        />
        {selectedCategories.length > 0
          ? `${selectedCategories.length} selected`
          : "Categories"}
        <ArrowDropDownIcon sx={{ fontSize: "1rem", ml: 0.5 }} />{" "}
      </Button>

      {showFilter && (
        <Paper
          sx={{
            position: "absolute",
            top: "100%",
            mt: 1,
            p: 2,
            width: 400,
            zIndex: 1000,
            bgcolor: "background.paper",
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            Select Categories
          </Typography>

          {/* Search Bar
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "4px",
              mb: 2,
            }}
          >
            <SearchIcon sx={{ fontSize: "1rem", mx: 1, color: "gray" }} />
            <InputBase
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flex: 1, fontSize: "0.9rem" }}
            />
          </Box> */}

          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "4px",
              mb: 2,
            }}
          >
            <SearchIcon sx={{ fontSize: "1rem", mx: 1, color: "gray" }} />
            <InputBase
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flex: 1, fontSize: "0.9rem" }}
            />
            {searchQuery && (
              <IconButton
                onClick={() => setSearchQuery("")}
                size="small"
                sx={{ color: "gray", mr: 1, border: "none" }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          {/* Selected Categories as a Custom Styled Chip*/}
          {selectedCategories.length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
                padding: "12px 16px",
                boxShadow: "none",
                width: "100%",
                maxWidth: "100%",
                border: "none",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  flex: 1,
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  lineHeight: 1.6,
                  color: "#333333",
                }}
              >
                {selectedCategories.join(" + ")}
              </Typography>
            </Box>
          )}

          {/* Selected Categories as a Multi-Line Chip
          {selectedCategories.length > 0 && (
            <Box
              sx={{
                display: "flex",
                mb: 2,
                maxWidth: "100%", // Ensure the box doesn't exceed its parent's width
              }}
            >
              <Chip
                label={selectedCategories.join(" + ")}
                onDelete={handleClear}
                size="small"
                sx={{
                  maxWidth: "100%", // Make the chip adjust to the Box
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                  // textOverflow: "clip", // text-overflow is not the correct method, removing
                }}
              />
            </Box>
          )} */}

          {/* Scrollable Category Selection */}
          <Box sx={{ maxHeight: 200, overflowY: "auto", pr: 1 }}>
            <Grid container spacing={1}>
              {filteredCategories.map((category) => (
                <Grid item xs={4} key={category}>
                  <Button
                    onClick={() => toggleCategory(category)}
                    variant={"outlined"}
                    sx={{
                      width: "100%",
                      textTransform: "none",
                      fontSize: "0.8rem",
                      borderRadius: "12px",
                      bgcolor: selectedCategories.includes(category)
                        ? "primary.light"
                        : "background.paper",
                      color: selectedCategories.includes(category)
                        ? "primary.dark"
                        : "inherit",
                      "&:hover": {
                        bgcolor: selectedCategories.includes(category)
                          ? "primary.main"
                          : "grey.200",
                        color: selectedCategories.includes(category)
                          ? "common.white"
                          : "inherit",
                      },
                    }}
                  >
                    {category}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Clear & Apply Buttons */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}
          >
            <Button size="small" variant="outlined" onClick={handleClear}>
              Clear
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={handleApply}
              sx={{
                borderColor: "#1976D2",
                color: "#1976D2",
                ml: 1,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#E3F2FD",
                  borderColor: "#1565C0",
                  color: "#1565C0",
                },
              }}
            >
              Apply
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default CategoriesFilter;
