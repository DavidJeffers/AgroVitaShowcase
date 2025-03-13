import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface RatingFilterProps {
  value: number | null;
  onChange: (rating: number | null) => void;
}

const RatingFilter = ({ value, onChange }: RatingFilterProps) => {
  const [rating, setRating] = useState<number | null>(null);
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

  // **Sync local state when "Clear All" is clicked**
  //   useEffect(() => {
  //     setRating(value);
  //   }, [value]);
  // Sync with parent value
  useEffect(() => {
    setRating(value);
    setIsActive(value !== null); // Set active if a rating is selected
  }, [value]);

  const handleRatingChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: number | null
  ) => {
    setRating(newValue);
    setIsActive(newValue !== null);
    onChange(newValue);
    setShowFilter(false);
  };

  const handleClear = () => {
    setRating(null);
    setIsActive(false);
    onChange(null);
    setShowFilter(false);
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
          <>{`★ ${rating}+`}</>
        ) : (
          <>
            {isMobile ? null : (
              <StarIcon sx={{ fontSize: "0.9rem", mr: 0.5 }} />
            )}
            Rating
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
          `★ ${rating}+`
        ) : (
          <>
            <StarIcon
              sx={{
                fontSize: "0.9rem",
                mr: 0.5,
                display: { xs: "none", md: "inline-flex" },
              }}
            />
            Rating
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
            width: 220,
            zIndex: 1000,
            bgcolor: "background.paper",
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            Select Minimum Rating
          </Typography>

          {/* Toggle button group with yellow stars */}
          <ToggleButtonGroup
            value={rating}
            exclusive
            onChange={handleRatingChange}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              width: "100%",
            }}
          >
            {[4, 3, 2, 1].map((val) => (
              <ToggleButton
                key={val}
                value={val}
                sx={{
                  display: "flex",

                  justifyContent: "left",
                  padding: "8px 16px",
                  textTransform: "none",
                  fontWeight: 500,
                  backgroundColor: "transparent", // Default transparent background
                  border: "none", // No visible border
                  borderBottom: "1px solid rgba(0, 0, 0, 0.1)", // Light bottom border
                  transition: "background-color 0.2s, box-shadow 0.2s", // Smooth transitions
                  borderRadius: "0", // Default reset
                  "&:first-of-type": {
                    borderRadius: "8px 8px 0 0", // Rounded corners for the first item
                    borderTop: "none", // Add top border for the first item
                  },
                  "&:last-child": {
                    borderRadius: "0 0 8px 8px", // Rounded corners for the last item
                    borderBottom: "none", // Remove bottom border for the last item
                  },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.05)", // Subtle hover effect
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#FFF5D7", // Subtle yellow background for selected state
                    fontWeight: "bold", // Emphasize text weight
                    borderTop: "none", // Top border for consistency
                    "&:first-of-type": {
                      borderRadius: "8px 8px 0 0", // Maintain rounded corners for first selected item
                    },
                    "&:last-child": {
                      borderRadius: "0 0 8px 8px", // Maintain rounded corners for last selected item
                    },
                    "&:hover": {
                      backgroundColor: "#FFE8A3", // Slightly darker yellow on hover
                    },
                  },
                }}
              >
                {`${val}+`}
                <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
                  {[...Array(val)].map((_, idx) => (
                    <StarIcon
                      key={idx}
                      sx={{
                        fontSize: "1rem",
                        color: "#FFD700", // Yellow color
                        marginRight: idx < val - 1 ? "2px" : 0,
                      }}
                    />
                  ))}
                </Box>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button size="small" variant="outlined" onClick={handleClear}>
              Clear
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default RatingFilter;
