import React, { useState, useEffect, useRef, useMemo } from "react";
import { IoSearchCircle } from "react-icons/io5";
import ClearIcon from "@mui/icons-material/Clear";
import {
  MainFilter,
  StandardsOption,
} from "~/components/farms/table/utils/FilterEnums";
import { getAllSubOptions } from "~/components/farms/table/utils/FilterHelpers";
import { Filter } from "./FoodsFilter";
import {
  Box,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const foodOptions = Object.values(MainFilter).flatMap((filter) =>
  getAllSubOptions(filter)
);

const standardOptions = Object.values(StandardsOption);
interface ImprovedSearchBarProps {
  // value: string;
  // onChange: (value: string) => void;
  onApplyFilter: (filterType: "food" | "standard", value: string) => void;
  onClear: () => void;
  onSearchFarmName?: (searchTerm: string) => void;
  appliedFoodFilters?: Array<{
    main: MainFilter;
    sub: string[] | string | null;
  }>;
  appliedStandardFilters?: StandardsOption[];
  foodFilters?: Filter[];
  setIsSearchFilterActive?: (isActive: boolean) => void;
}

const ImprovedSearchBar = ({
  onApplyFilter,
  onSearchFarmName,
  onClear,
  appliedFoodFilters = [],
  appliedStandardFilters = [],
  setIsSearchFilterActive,
}: ImprovedSearchBarProps) => {
  const [suggestions, setSuggestions] = useState<
    Array<{ type: "food" | "standard" | "farmName"; value: string }>
  >([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setSearchValue] = useState("");
  const [mounted, setMounted] = useState(false);

  const listItemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handleClear = () => {
    setIsSearchFilterActive?.(false);
    setSearchValue("");
    onClear();
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  // Move these calculations outside the component or memoize them

  // Memoize the selected food options
  const selectedFoodOptions = useMemo(() => {
    const selectedOptions = new Set<string>();
    appliedFoodFilters.forEach((filter) => {
      if (Array.isArray(filter.sub)) {
        filter.sub.forEach((subOption) => selectedOptions.add(subOption));
      } else if (filter.sub) {
        selectedOptions.add(filter.sub as string);
      }
    });
    return selectedOptions;
  }, [appliedFoodFilters]);

  const selectedStandardOptions = useMemo(() => {
    const selectedOptions = new Set<string>();
    appliedStandardFilters.forEach((filter) => {
      selectedOptions.add(filter);
    });
    return selectedOptions;
  }, [appliedStandardFilters]);

  useEffect(() => {
    // Only log in development

    // const selectedStandardOptions = new Set(appliedStandardFilters);

    if (value.length < 1) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Find matching food options that haven't been selected yet
    const matchingFoods = foodOptions
      .filter(
        (option) =>
          option.toLowerCase().includes(value.toLowerCase()) &&
          !selectedFoodOptions.has(option)
      )
      .map((option) => ({ type: "food" as const, value: option }));

    // Find matching standard options that haven't been selected yet
    const matchingStandards = standardOptions
      .filter(
        (option) =>
          option.toLowerCase().includes(value.toLowerCase()) &&
          !selectedStandardOptions.has(option)
      )
      .map((option) => ({ type: "standard" as const, value: option }));

    // Combine and sort by relevance (exact match first, then startsWith, then includes)
    const combinedSuggestions: Array<{
      type: "food" | "standard" | "farmName";
      value: string;
    }> = [...matchingFoods, ...matchingStandards]
      .sort((a, b) => {
        const aLower = a.value.toLowerCase();
        const bLower = b.value.toLowerCase();
        const searchLower = value.toLowerCase();

        // Exact match first
        if (aLower === searchLower && bLower !== searchLower) return -1;
        if (bLower === searchLower && aLower !== searchLower) return 1;

        // Then startsWith
        if (aLower.startsWith(searchLower) && !bLower.startsWith(searchLower))
          return -1;
        if (bLower.startsWith(searchLower) && !aLower.startsWith(searchLower))
          return 1;

        // Then general includes (already filtered for this)
        return aLower.localeCompare(bLower);
      })
      .slice(0, 7);

    // Add "Search farm by name" option at the end
    combinedSuggestions.push({
      type: "farmName" as const,
      value: "Search farm by name",
    });

    setSuggestions(combinedSuggestions);
    setShowSuggestions(combinedSuggestions.length > 0);
    setSelectedIndex(combinedSuggestions.length > 0 ? 0 : -1);
  }, [
    value,
    selectedFoodOptions,
    appliedStandardFilters,
    selectedStandardOptions,
  ]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Arrow Down
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex =
        selectedIndex < suggestions.length - 1
          ? selectedIndex + 1
          : selectedIndex;
      setSelectedIndex(newIndex);

      if (newIndex >= 0 && listItemRefs.current[newIndex]) {
        listItemRefs.current[newIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
    // Arrow Up
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = selectedIndex > 0 ? selectedIndex - 1 : 0;
      setSelectedIndex(newIndex);

      // Scroll the selected item into view
      if (newIndex >= 0 && listItemRefs.current[newIndex]) {
        listItemRefs.current[newIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
    // Enter
    else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        const selected = suggestions[selectedIndex];
        if (selected.type === "farmName") {
          onSearchFarmName?.(value);
          setSearchValue(""); // Clear the search input after applying filter
          setShowSuggestions(false);
          return;
        }
        onApplyFilter(selected.type, selected.value);
        setShowSuggestions(false);
        setSearchValue("");
      }
      if (!showSuggestions || suggestions.length === 0) {
        // If no suggestions and Enter is pressed, search farm names
        if (e.key === "Enter" && value.length >= 2) {
          e.preventDefault();
          onSearchFarmName?.(value);
          return;
        }
        return;
      }
    }
    // Escape
    else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    listItemRefs.current = suggestions.map(() => null);
  }, [suggestions]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (suggestion: {
    type: "food" | "standard" | "farmName";
    value: string;
  }) => {
    if (suggestion.type === "farmName") {
      onSearchFarmName?.(value);
      setSearchValue(""); // Clear the search input after applying filter
      setShowSuggestions(false);
      return;
    }
    onApplyFilter(suggestion.type, suggestion.value);
    setSearchValue(""); // Clear the search input after applying filter
    setShowSuggestions(false);
  };
  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (value.length === 0) {
      handleClear();
    }
  };

  useEffect(() => {
    if (!mounted) return;
    listItemRefs.current = suggestions.map(() => null);
  }, [suggestions, mounted]);

  // Only add event listeners after mounting
  useEffect(() => {
    if (!mounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mounted]);

  // Simplified rendering for SSR
  if (!mounted) {
    return (
      <Box sx={{ position: "relative", width: 300, maxWidth: "100%" }}>
        <input
          type="text"
          placeholder="Search farms, foods, standards..."
          style={{
            width: "100%",
            padding: "8px 14px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", width: 300, maxWidth: "100%" }}>
      <TextField
        // inputRef={inputRef}
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => value.length >= 2 && setShowSuggestions(true)}
        placeholder="Search farms, foods, standards..."
        variant="outlined"
        size="small"
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <IoSearchCircle />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {value && (
                  <IconButton
                    onClick={() => handleClear()}
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
                )}
              </InputAdornment>
            ),
          },
        }}
      />
      {showSuggestions && (
        <Paper
          ref={suggestionRef}
          elevation={3}
          sx={{
            position: "absolute",
            width: "100%",
            maxHeight: 300,
            overflowY: "auto",
            mt: 0.5,
            zIndex: 1300,
          }}
        >
          <List dense disablePadding>
            {suggestions.map((suggestion, index) => (
              <ListItem
                key={`${suggestion.type}-${suggestion.value}-${index}`}
                ref={(el) => {
                  listItemRefs.current[index] = el;
                  return undefined;
                }}
                onClick={() => handleSuggestionClick(suggestion)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.08)",
                  },
                  ...(selectedIndex === index && {
                    backgroundColor: "rgba(25, 118, 210, 0.12)",
                  }),
                }}
                disablePadding
              >
                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2" component="span">
                        {suggestion.value}
                      </Typography>
                      <Typography
                        variant="caption"
                        component="span"
                        sx={{
                          ml: 1,
                          px: 1,
                          py: 0.3,
                          borderRadius: 1,
                          backgroundColor:
                            suggestion.type === "food"
                              ? "success.light"
                              : suggestion.type === "standard"
                              ? "primary.light"
                              : "info.light",
                          color: "success.contrastText",
                        }}
                      >
                        {suggestion.type === "food"
                          ? "Food"
                          : suggestion.type === "standard"
                          ? "Standard"
                          : "Farm"}
                      </Typography>
                    </Box>
                  }
                  sx={{ px: 2, py: 0.5 }}
                />
              </ListItem>
            ))}
            {suggestions.length === 0 && value.length >= 2 && (
              <ListItem>
                <ListItemText
                  primary="Enter to search for Farms"
                  primaryTypographyProps={{
                    variant: "body2",
                    color: "text.secondary",
                  }}
                  sx={{ px: 2, py: 1 }}
                />
              </ListItem>
            )}
          </List>
        </Paper>
      )}
    </Box>
  );
};

ImprovedSearchBar.displayName = "ImprovedSearchBar";

export default ImprovedSearchBar;
