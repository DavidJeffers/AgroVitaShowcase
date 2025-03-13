import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  Box,
  Tabs,
  Tab,
  MenuItem,
  Grid,
  Typography,
  Chip,
  Button,
  Tooltip,
  Paper,
} from "@mui/material";
import { PiCertificateBold } from "react-icons/pi";
import ForestIcon from "@mui/icons-material/Forest";
import SpaIcon from "@mui/icons-material/Spa";
import ChurchIcon from "@mui/icons-material/Church";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import RecyclingIcon from "@mui/icons-material/Recycling";
import ScienceIcon from "@mui/icons-material/Science";

import {
  StandardsCategory,
  StandardsOption,
  StandardDescription,
} from "../utils/FilterEnums";
import {
  getStandardDisplayName,
  getStandardsByCategory,
} from "../utils/FilterHelpers";

const getCategoryIcon = (category: StandardsCategory) => {
  const icons: Record<StandardsCategory, React.ReactNode> = {
    [StandardsCategory.Organic]: <WaterDropIcon />,
    [StandardsCategory.Regenerative]: <RecyclingIcon />,
    [StandardsCategory.ChemicalFree]: <ScienceIcon />,
    [StandardsCategory.AnimalWelfare]: <SpaIcon />,
    [StandardsCategory.Sustainability]: <ForestIcon />,
    [StandardsCategory.Religious]: <ChurchIcon />,
  };
  return icons[category];
};

interface StandardFilterProps {
  onChange: (filters: StandardsOption[]) => void;
  clearFilter: boolean;
  setShouldClearFilters: (shouldClear: boolean) => void;
  setStandardFilterActive: (active: boolean) => void;
  initialStandards?: StandardsOption[];
  handleStandardSelect: (standard: StandardsOption) => void;
  selectedStandardCount: number;
  setSelectedStandardCount: (count: number) => void;
  selectedStandards: StandardsOption[];
  setSelectedStandards: (stans: StandardsOption[]) => void;
}

interface StandardFilterContentProps {
  onChange: (filters: StandardsOption[]) => void;
  onClose: () => void;
  selectedStandards: StandardsOption[];
  handleClear: () => void;
  setSelectedStandards: (stans: StandardsOption[]) => void;
  selectedCount: number;
  handleStandardSelect: (standard: StandardsOption) => void;
  selectedStandardCount: number;
  setSelectedStandardCount: (count: number) => void;
}

const StandardsFilter = ({
  onChange,
  clearFilter,
  setShouldClearFilters,
  setStandardFilterActive,
  handleStandardSelect,
  selectedStandardCount,
  setSelectedStandardCount,
  setSelectedStandards,
  selectedStandards,
}: StandardFilterProps) => {
  const [showFilter, setShowFilter] = useState(false);

  const handleClear = useCallback(() => {
    setSelectedStandards([]);
    setSelectedStandardCount(0);
    onChange([]);
    setStandardFilterActive(false);
  }, [
    onChange,
    setSelectedStandardCount,
    setSelectedStandards,
    setStandardFilterActive,
  ]);

  useEffect(() => {
    if (clearFilter) {
      handleClear();
      setShouldClearFilters(false);
    }
  }, [
    clearFilter,
    handleClear,
    setShouldClearFilters,
    setStandardFilterActive,
  ]);

  const handleFilterChange = (filters: StandardsOption[]) => {
    setStandardFilterActive(true);
    onChange(filters);
    setSelectedStandardCount(filters.length || 0);
  };

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
                color: "#ed6c02",
              },
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              mr: { xs: 0.2, sm: 0.5 },
              display: { xs: "none", sm: "block" },
              mt: 0.5,
            }}
          >
            <PiCertificateBold size={21} />
          </Box>
        }
        onClick={() => setShowFilter((prev) => !prev)}
        sx={{
          height: "40px",
          backgroundColor:
            selectedStandardCount > 0 ? "primary.light" : "transparent",
        }}
      >
        {selectedStandardCount > 0
          ? `Standards: ${selectedStandardCount} selected`
          : "Find Standards"}
        <ArrowDropDownIcon
          sx={{
            fontSize: "1rem",
            ml: 0.5,
            display: { xs: "none", sm: "block" },
          }}
        />
      </Button>

      {showFilter && (
        <StandardFilterContent
          onChange={handleFilterChange}
          onClose={() => setShowFilter(false)}
          selectedStandards={selectedStandards}
          handleClear={handleClear}
          setSelectedStandards={setSelectedStandards}
          selectedCount={selectedStandardCount}
          handleStandardSelect={handleStandardSelect}
          selectedStandardCount={selectedStandardCount}
          setSelectedStandardCount={setSelectedStandardCount}
        />
      )}
    </Box>
  );
};

const StandardFilterContent = ({
  onClose,
  selectedStandards,
  handleClear,
  selectedCount,
  handleStandardSelect,
}: StandardFilterContentProps) => {
  const [currentTab, setCurrentTab] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(
    () => [
      StandardsCategory.Organic,
      StandardsCategory.Regenerative,
      StandardsCategory.ChemicalFree,
      StandardsCategory.AnimalWelfare,
      StandardsCategory.Sustainability,
      StandardsCategory.Religious,
    ],
    []
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <Paper
      ref={boxRef}
      sx={{
        position: "absolute",
        zIndex: 1000,
        width: 600,
        maxHeight: 700,
        bgcolor: "background.paper",
        borderRadius: 1,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        borderColor: "divider",
        mt: 1,
      }}
    >
      <Tabs
        value={currentTab}
        onChange={(_, newValue) => setCurrentTab(newValue)}
        variant="fullWidth"
        sx={{
          width: "100%",
          "& .MuiTabs-flexContainer": {
            width: "100%",
          },
          "& .MuiTab-root": {
            minWidth: 0,
            flex: 1,
          },
        }}
      >
        {categories.map((category, index) => (
          <Tab
            key={category}
            label={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {getCategoryIcon(category)}
                <Typography variant="body2">{category}</Typography>
              </Box>
            }
            value={index}
          />
        ))}
      </Tabs>

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {getStandardsByCategory(categories[currentTab]).map((option) => (
            <Grid item xs={6} key={option}>
              <Tooltip
                title={StandardDescription[option]}
                placement="right"
                arrow
                disableInteractive
              >
                <MenuItem
                  onClick={() => handleStandardSelect(option)}
                  sx={{
                    borderRadius: 1,
                    p: 1,
                    width: "100%",
                    border: 1,
                    borderColor: "transparent",
                    ...(selectedStandards.includes(option) && {
                      bgcolor: "primary.light",
                    }),
                    "&:hover": {
                      backgroundColor: "primary.light",
                      border: "1px solid",
                      borderColor: "black",
                    },
                  }}
                >
                  {getStandardDisplayName(option)}
                </MenuItem>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Selected Standards:
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {selectedStandards.map((stan) => (
            <Chip
              key={stan}
              label={getStandardDisplayName(stan)}
              onDelete={() => handleStandardSelect(stan)}
              size="small"
            />
          ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          {selectedCount > 0 ? (
            <Button
              variant="outlined"
              size="small"
              onClick={handleClear}
              sx={{
                borderColor: "#FFC107",
                borderRadius: 2,
              }}
            >
              Clear All
            </Button>
          ) : null}
        </Box>
      </Box>
    </Paper>
  );
};

export default StandardsFilter;
