import { useState, useRef, useEffect, useCallback } from "react";
import { Box, Button, Paper, Typography, Slider, Divider } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface PriceRange {
  min: number | null;
  max: number | null;
}

interface PriceFilters {
  ground_beef?: PriceRange;
  eggs?: PriceRange;
  milk?: PriceRange;
  tomato?: PriceRange;
  onion?: PriceRange;
  potato?: PriceRange;
  honey?: PriceRange;
}

interface PriceFilterProps {
  onChange: (filters: PriceFilters) => void;
  clearFilter: boolean;
  setShouldClearFilters: (shouldClear: boolean) => void;
  setPriceFilterActive: (active: boolean) => void;
}

const PRICE_CATEGORIES = {
  ground_beef: "Ground Beef ($/lb)",
  eggs: "Eggs ($/dozen)",
  milk: "Milk ($/gallon)",
  tomato: "Tomato ($/lb)",
  onion: "Onion ($/lb)",
  potato: "Potato ($/lb)",
  honey: "Honey ($/lb)",
} as const;

const PriceFilter = ({
  onChange,
  clearFilter,
  setShouldClearFilters,
  setPriceFilterActive,
}: PriceFilterProps) => {
  const [showFilter, setShowFilter] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const [priceRanges, setPriceRanges] = useState<PriceFilters>({
    ground_beef: { min: null, max: null },
    eggs: { min: null, max: null },
    milk: { min: null, max: null },
    tomato: { min: null, max: null },
    onion: { min: null, max: null },
    potato: { min: null, max: null },
    honey: { min: null, max: null },
  });

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

  const handleRangeChange = (
    category: keyof typeof PRICE_CATEGORIES,
    value: number[]
  ) => {
    setPriceRanges((prev) => ({
      ...prev,
      [category]: {
        min: value[0] === 0 ? null : value[0],
        max: value[1] === 15 ? null : value[1],
      },
    }));
  };

  const handleApply = () => {
    const hasActiveFilters = Object.values(priceRanges).some(
      (range) => range.min !== null || range.max !== null
    );
    setIsActive(hasActiveFilters);
    setPriceFilterActive(hasActiveFilters);
    onChange(priceRanges);
    setShowFilter(false);
  };

  const handleClear = useCallback(() => {
    const clearedRanges = Object.keys(priceRanges).reduce(
      (acc, key) => ({
        ...acc,
        [key]: { min: null, max: null },
      }),
      {} as PriceFilters
    );
    setPriceRanges(clearedRanges);
    setIsActive(false);
    onChange(clearedRanges);
    setPriceFilterActive(false);
  }, [onChange, setPriceFilterActive, priceRanges]);

  useEffect(() => {
    if (clearFilter) {
      handleClear();
      setShouldClearFilters(false);
    }
  }, [clearFilter, handleClear, setShouldClearFilters]);

  const getActiveFiltersCount = () => {
    return Object.values(priceRanges).filter(
      (range) => range.min !== null || range.max !== null
    ).length;
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Button
        startIcon={
          <Box
            sx={{
              "&:hover": { color: "green" },
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              mr: { xs: 0.2, sm: 0.5 },
              display: { xs: "none", sm: "block" },
              mt: 0.5,
            }}
          >
            <AttachMoneyIcon fontSize="small" />
          </Box>
        }
        onClick={() => setShowFilter(true)}
        sx={{
          height: "40px",
          bgcolor: isActive ? "primary.light" : "transparent",
        }}
      >
        {isActive ? `Price (${getActiveFiltersCount()} active)` : "Price"}
        <ArrowDropDownIcon
          sx={{
            fontSize: "1rem",
            ml: 0.5,
            display: { xs: "none", sm: "block" },
          }}
        />
      </Button>

      {showFilter && (
        <Paper
          ref={boxRef}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            mt: 1,
            p: 1,
            px: 3,
            width: 320,
            zIndex: 1000,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {Object.entries(PRICE_CATEGORIES).map(([key, label]) => (
            <Box key={key} sx={{ mb: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                {label}
              </Typography>
              <Slider
                value={[
                  priceRanges[key as keyof PriceFilters]?.min ?? 0,
                  priceRanges[key as keyof PriceFilters]?.max ?? 15,
                ]}
                onChange={(_, newValue) =>
                  handleRangeChange(
                    key as keyof typeof PRICE_CATEGORIES,
                    newValue as number[]
                  )
                }
                size="small"
                valueLabelDisplay="auto"
                min={0}
                max={15}
                step={0.25}
                valueLabelFormat={(value) => {
                  return `$${value}`;
                }}
                marks={[
                  { value: 0, label: "$0" },
                  { value: 5, label: "$5" },
                  { value: 10, label: "$10" },
                  { value: 15, label: "$15+" },
                ]}
                sx={{
                  "& .MuiSlider-thumb": {
                    height: 27,
                    width: 27,
                    backgroundColor: "#fff",
                    "&:hover": {
                      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
                    },
                    "& .airbnb-bar": {
                      height: 9,
                      width: 1,
                      marginLeft: 1,
                      marginRight: 1,
                    },
                  },
                  "& .MuiSlider-track": {
                    height: 3,
                    color: "hsl(139, 76.30%, 36.50%)",
                  },
                  "& .MuiSlider-rail": {
                    color: "hsla(229, 77.40%, 77.50%, 0.57)",
                    opacity: 1,
                    height: 3,
                  },
                }}
              />
              <Divider sx={{ my: 1, opacity: 0.5 }} />
            </Box>
          ))}

          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            <Button size="small" variant="outlined" onClick={handleClear}>
              Clear
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleApply}
              sx={{
                borderColor: "#1976D2",
                color: "#1976D2",
                px: 1,
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

export default PriceFilter;
