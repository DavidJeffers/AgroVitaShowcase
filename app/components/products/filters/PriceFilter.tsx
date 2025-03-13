import { useState, useEffect, useRef } from "react";
import { Box, Typography, Slider, Button, Paper } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface PriceFilterProps {
  value: [number, number];
  onChange: (priceRange: [number, number]) => void;
}

const PriceFilter = ({ value, onChange }: PriceFilterProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [isActive, setIsActive] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setPriceRange(value);
    setIsActive(value[0] !== 0 || value[1] !== 500);
  }, [value]);

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  const handleApply = () => {
    setIsActive(true);
    onChange(priceRange);
    setShowFilter(false);
  };

  const handleClear = () => {
    setPriceRange([0, 500]);
    setIsActive(false);
    setShowFilter(false);
    onChange([0, 500]);
  };

  return (
    <Box sx={{ position: "relative" }} ref={boxRef}>
      {/* <Button
        onClick={() => setShowFilter((prev) => !prev)}
        sx={{
          height: "40px",
          bgcolor: isActive ? "primary.light" : "transparent",
        }}
      >
        {isActive ? (
          <>{`Up to $${priceRange[1]}`}</>
        ) : (
          <>
            {isMobile ? null : (
              <AttachMoneyIcon sx={{ fontSize: "0.9rem", mr: 0.5 }} />
            )}
            Price
            <ArrowDropDownIcon sx={{ fontSize: "1rem", ml: 0.5 }} />{" "}
          </>
        )}
      </Button> */}
      <Button
        onClick={() => setShowFilter((prev) => !prev)}
        sx={{
          height: "40px",
          bgcolor: isActive ? "primary.light" : "transparent",
        }}
      >
        {isActive ? (
          `Up to $${priceRange[1]}`
        ) : (
          <>
            <AttachMoneyIcon
              sx={{
                fontSize: "0.9rem",
                mr: 0.5,
                display: { xs: "none", md: "inline-flex" },
              }}
            />
            Price
            <ArrowDropDownIcon sx={{ fontSize: "1rem", ml: 0.5 }} />
          </>
        )}
      </Button>

      {showFilter && (
        <Paper
          sx={{
            position: "absolute",
            top: "100%",
            mt: 1,
            p: 2,
            width: 300,
            zIndex: 1000,
            bgcolor: "background.paper",
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            Select Price Range
          </Typography>
          {/* Indicator for Selected Range */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
              px: 1,
              color: "text.secondary",
              fontSize: "0.85rem",
            }}
          >
            <Typography variant="body2">{`$${priceRange[0]}`}</Typography>
            <Typography variant="body2">{`$${priceRange[1]}`}</Typography>
          </Box>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            min={0}
            max={500}
            valueLabelDisplay="auto"
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
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

export default PriceFilter;
