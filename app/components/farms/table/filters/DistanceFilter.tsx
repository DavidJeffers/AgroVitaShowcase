import { useState, useRef, useEffect, useCallback } from "react";
import zipcodes from "zipcodes";
import {
  Box,
  Button,
  Paper,
  Typography,
  Slider,
  TextField,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface DistanceFilterProps {
  onChange: (distance: number | null, latLong: [number, number] | null) => void;
  clearFilter: boolean;
  setShouldClearFilters: (shouldClear: boolean) => void;
  setDistanceFilterActive: (active: boolean) => void;
}

const DistanceFilter = ({
  onChange,
  clearFilter,
  setShouldClearFilters,
  setDistanceFilterActive,
}: DistanceFilterProps) => {
  const [showFilter, setShowFilter] = useState(false);
  const [distance, setDistance] = useState<number>(0);
  const [zipCode, setZipCode] = useState<string>("");
  const [showSlider, setShowSlider] = useState(false);
  const [isActive, setIsActive] = useState(false);
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

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 5);
    setZipCode(value);

    if (value.length === 5 && zipcodes.lookup(value)) {
      setShowSlider(true);
    } else if (value.length === 0) {
      handleZipDelete();
    } else {
      setShowSlider(false);
    }
  };

  const handleApply = () => {
    const location = zipcodes.lookup(zipCode);
    if (location) {
      const latLong: [number, number] = [location.latitude, location.longitude];
      setIsActive(true);
      onChange(distance, latLong);
      setShowFilter(false);
      setDistanceFilterActive(true);
    }
  };

  const handleZipDelete = () => {
    setDistance(0);
    setZipCode("");
    setShowSlider(false);
    setIsActive(false);
    setShowSlider(false);
    onChange(null, null);
  };

  const handleClear = useCallback(() => {
    setDistance(0);
    setZipCode("");
    setShowSlider(false);
    setIsActive(false);
    onChange(null, null);
    setShowFilter(false);
  }, [onChange]);

  useEffect(() => {
    if (clearFilter) {
      handleClear();
      setShouldClearFilters(false);
      setDistanceFilterActive(false);
    }
  }, [
    clearFilter,
    handleClear,
    setShouldClearFilters,
    setDistanceFilterActive,
  ]);

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Button
        startIcon={
          <Box
            sx={{
              "&:hover": {
                color: "blue",
              },
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              mr: { xs: 0.2, sm: 0.5 },
              mt: 0.5,
            }}
          >
            <PlaceIcon fontSize="small" />
          </Box>
        }
        onClick={() => setShowFilter(true)}
        sx={{
          height: "40px",
          bgcolor: isActive ? "primary.light" : "transparent",
        }}
      >
        {isActive ? `Within ${distance} miles` : "Distance"}
        <ArrowDropDownIcon sx={{ fontSize: "1rem", ml: 0.5 }} />
      </Button>

      {showFilter && (
        <Paper
          ref={boxRef}
          sx={{
            position: "absolute",
            top: "100%",
            mt: 1,
            p: 2,
            width: 300,
            zIndex: 1000,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            Enter Zip Code
          </Typography>
          <TextField
            size="small"
            value={zipCode}
            onChange={handleZipCodeChange}
            error={zipCode.length > 0 && zipCode.length !== 5}
            helperText={
              zipCode.length > 0 && zipCode.length !== 5
                ? "Enter a valid 5-digit zip code"
                : ""
            }
            fullWidth
            margin="normal"
            placeholder="Enter zip code"
          />

          {showSlider && (
            <Box sx={{ mt: 2, animation: "fadeIn 0.3s ease-in" }}>
              <Typography variant="subtitle2" gutterBottom>
                Select Distance (miles)
              </Typography>
              <Slider
                value={distance}
                onChange={(_, newValue) => setDistance(newValue as number)}
                min={1}
                max={500}
                valueLabelDisplay="auto"
              />
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            {showSlider && (
              <>
                <Button size="small" variant="outlined" onClick={handleClear}>
                  Clear
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleApply}
                  disabled={!showSlider}
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
              </>
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default DistanceFilter;
