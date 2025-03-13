import { useState, useRef, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  MenuItem,
  Typography,
  Tabs,
  Tab,
  Chip,
  Stack,
} from "@mui/material";
import { MdOutlineFoodBank } from "react-icons/md";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  GiCow,
  GiChicken,
  GiFishCooked,
  GiRawEgg,
  GiShinyApple,
  GiCarrot,
  GiWheat,
  GiPeanut,
  GiHoneyJar,
} from "react-icons/gi";
import { MdLocalDrink } from "react-icons/md";

import { ImSpoonKnife } from "react-icons/im";
import { getAllSubOptions } from "../utils/FilterHelpers";
import { MainFilter, SubFilter, DairySubFilter } from "../utils/FilterEnums";
import DairyFilterContent from "./DairyFilter";
import { IOSSwitch } from "~/components/ui/buttons/AnyAll";
import { SetURLSearchParams } from "react-router";
export interface Filter {
  main: MainFilter;
  sub: SubFilter | SubFilter[] | null;
}

interface AdvancedFilterProps {
  currentTab: number;
  setCurrentTab: (tab: number) => void;
  onFilterChange: (newFilters: Filter[], mode: "any" | "all") => void;
  farmAdd: boolean;
  clearFilter: boolean;
  setShouldClearFilters: (shouldClear: boolean) => void;
  setFoodFilterActive: (active: boolean) => void;
  initialFilters?: Filter[];
  searchParams: URLSearchParams;
  handleSubFilterSelect: (subFilter: SubFilter) => void;
  setSearchParams: SetURLSearchParams;
  foodFilters: Filter[];
  setFoodFilters: (filters: Filter[]) => void;
  selectedCount: number;
  setSelectedCount: (count: number) => void;
}

const animalIcons = {
  [MainFilter.Dairy]: GiCow,
  [MainFilter.RawDairy]: GiCow,
  [MainFilter.Beef]: GiCow,
  [MainFilter.Poultry]: GiChicken,
  [MainFilter.Seafood]: GiFishCooked,
  [MainFilter.Eggs]: GiRawEgg,
  [MainFilter.Fruits]: GiShinyApple,
  [MainFilter.Veggies]: GiCarrot,
  [MainFilter.Grains]: GiWheat,
  [MainFilter.Nuts]: GiPeanut,
  [MainFilter.Sugars]: GiHoneyJar,
  [MainFilter.Other]: ImSpoonKnife,
  [MainFilter.Beverages]: MdLocalDrink,
};

const MainButton = ({
  onFilterChange,
  farmAdd,
  clearFilter,
  setShouldClearFilters,
  setFoodFilterActive,
  currentTab,
  setCurrentTab,
  handleSubFilterSelect,
  searchParams,
  setSearchParams,
  setFoodFilters,
  foodFilters,
  selectedCount,
  setSelectedCount,
}: AdvancedFilterProps) => {
  const [showMainMenu, setShowMainMenu] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isMenuClick = (event.target as Element)?.closest(".MuiMenu-root");

      if (
        boxRef.current &&
        !boxRef.current.contains(event.target as Node) &&
        !isMenuClick
      ) {
        setShowMainMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showMainMenu) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [showMainMenu]);

  const isDairyTab = (index: number) => {
    const filter = Object.values(MainFilter)[index];
    return filter === MainFilter.Dairy || filter === MainFilter.RawDairy;
  };

  const handleDairyFilterChange = (selectedOptions: DairySubFilter[]) => {
    const mainFilter = Object.values(MainFilter)[currentTab];
    const newFilter: Filter = {
      main: mainFilter,
      sub: selectedOptions,
    };

    const newFilters = foodFilters.filter((f) => f.main !== mainFilter);
    newFilters.push(newFilter);
    setFoodFilters(newFilters);
    let count = 0;
    newFilters.forEach((filter) =>
      filter.sub ? (count += filter.sub.length) : count++
    );
    setSelectedCount(count);
    onFilterChange(
      newFilters,
      searchParams.get("mode") === "all" ? "all" : "any"
    );
  };

  const isSelected = (subFilter: SubFilter): boolean => {
    const mainFilter = Object.values(MainFilter)[currentTab];
    const existingFilter = foodFilters.find((f) => f.main === mainFilter);
    if (!existingFilter) return false;

    if (Array.isArray(existingFilter.sub)) {
      return existingFilter.sub.includes(subFilter);
    }
    return existingFilter.sub === subFilter;
  };

  const handleClear = useCallback(() => {
    setFoodFilters([]);
    setSelectedCount(0);
    onFilterChange([], searchParams.get("mode") === "all" ? "all" : "any");
    setFoodFilterActive(false);
  }, [
    onFilterChange,
    setFoodFilterActive,
    searchParams,
    setFoodFilters,
    setSelectedCount,
  ]);

  useEffect(() => {
    if (clearFilter) {
      handleClear();
      setShouldClearFilters(false);
    }
  }, [clearFilter, handleClear, setShouldClearFilters]);

  const renderCurrentFilterIcon = () => {
    const currentFilter = Object.values(MainFilter)[currentTab] as MainFilter;
    const IconComponent = animalIcons[currentFilter];
    return <IconComponent size={24} />;
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
                color: "green",
              },
              fontSize: "0.9rem",
              mr: 0.5,
              mt: 0.5,
            }}
          >
            <MdOutlineFoodBank size={21} />
          </Box>
        }
        onClick={() => setShowMainMenu(true)}
        sx={{
          height: "40px",
          bgcolor: selectedCount > 0 ? "primary.light" : "transparent",
        }}
      >
        {selectedCount > 0 ? `Foods: ${selectedCount} selected` : "Find Foods"}
        <ArrowDropDownIcon sx={{ fontSize: "1rem", ml: 0.5 }} />
      </Button>

      {showMainMenu && (
        <Box
          ref={boxRef}
          sx={{
            position: "absolute",
            zIndex: 1001,
            width: {
              xs: "80vw",
              sm: "90vw",
              md: "90vw",
              lg: "900px",
            },
            maxWidth: {
              xs: "100%",
              sm: "550px",
              md: "500px",
              lg: "520px",
            },
            minWidth: "300px",
            maxHeight: "550px",
            height: "52vh",
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            border: 0.5,
            borderColor: "divider",
            mt: 1,
            left: 0,
            top: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: {
                xs: "100%",
                sm: "auto",
                md: "auto",
                lg: "auto",
              },
              flex: 1,
              overflowY: "hidden",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                overflowY: "hidden",
                height: "100%",
              }}
            >
              <Tabs
                value={currentTab}
                onChange={(_, newValue) => setCurrentTab(newValue)}
                orientation="vertical"
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  position: "relative",
                  overflowY: "hidden",
                  maxHeight: "100%",
                  height: "100%",
                  borderRight: 1,
                  borderColor: "divider",
                  width: "110px",
                  justifyContent: "space-between",
                  "& .MuiSvgIcon-root": {
                    mb: 1,
                  },
                  "& .MuiTabScrollButton-root": {
                    height: "1px",
                  },
                  "& .MuiTabs-scroller": {
                    overflowY: "auto",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  },
                  "& .MuiTabs-flexContainer": {
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  },
                  "& .MuiTab-root": {
                    minHeight: "40px",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    px: { xs: 1.5, sm: 2, md: 2, lg: 2 },
                    mb: 0.1,
                    py: 1.2,
                    textTransform: "none",
                    fontSize: {
                      xs: "0.875rem",
                      sm: "0.95rem",
                      md: "0.95rem",
                      lg: "0.95rem",
                    },
                    minWidth: "unset",
                    width: "100%",
                    flex: "1 0 auto",
                  },
                  "& .MuiTabs-indicator": {
                    left: 0,
                    right: "auto",
                  },
                }}
              >
                {Object.values(MainFilter).map((filter, index) => (
                  <Tab
                    key={filter}
                    label={
                      <Box
                        sx={{
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        <Typography variant="body2">{filter}</Typography>
                      </Box>
                    }
                    value={index}
                  />
                ))}
              </Tabs>
            </Box>

            {/* Main content area */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                overflow: {
                  xs: "hidden",
                  sm: undefined,
                  md: undefined,
                  lg: undefined,
                },
              }}
            >
              {/* Options and Selected Items container */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                    md: "row",
                    lg: "row",
                  },
                  height: {
                    xs: "100%",
                    sm: undefined,
                    md: undefined,
                    lg: undefined,
                  },
                  flex: { xs: "auto", sm: 1, md: 1, lg: 1 },
                }}
              >
                {/* Options area */}
                <Box
                  sx={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "52vh",
                    pr: 0,
                    py: isDairyTab(currentTab) ? 0.5 : 2,
                    overflowX: "hidden",
                    overflowY: "clip",
                  }}
                >
                  {isDairyTab(currentTab) ? (
                    <DairyFilterContent
                      setFoodFilterActive={setFoodFilterActive}
                      mainType={
                        Object.values(MainFilter)[currentTab] as
                          | MainFilter.Dairy
                          | MainFilter.RawDairy
                      }
                      selectedOptions={
                        (foodFilters.find(
                          (f) =>
                            f.main === Object.values(MainFilter)[currentTab]
                        )?.sub as DairySubFilter[]) || []
                      }
                      onChange={handleDairyFilterChange}
                      onClose={() => setShowMainMenu(false)}
                      farmAdd={farmAdd}
                    />
                  ) : (
                    <>
                      {" "}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: { xs: 4, sm: 1, md: 1, lg: 1 },
                          pb: { xs: 3, sm: 1, md: 1, lg: 1 },
                          ml: { xs: 0, sm: 2, md: 2, lg: 2 },
                          borderBottom: 1,
                          borderColor: "divider",
                          width: "100%",
                        }}
                      >
                        <Typography variant={"h6"}>
                          {Object.values(MainFilter)[currentTab]}
                        </Typography>
                        {renderCurrentFilterIcon()}
                      </Box>
                      <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        scrollButtons="auto"
                        value={false}
                        sx={{
                          position: "relative",
                          overflowY: "hidden",
                          maxHeight: "100%",
                          height: "94%",

                          width: "255px",

                          "& .MuiTab-root": {
                            backgroundColor: "transparent",
                            border: "none",

                            width: {
                              xs: "80vw",
                              sm: "50vw",
                              md: "50vw",
                              lg: "300px",
                            },
                            maxWidth: {
                              sm: "450px",
                              md: "460px",
                              lg: "100%",
                            },

                            py: 0,
                            px: 1,
                            pr: 2,
                          },
                          "& .MuiSvgIcon-root": {
                            mb: 3,
                          },
                          "& .MuiTabScrollButton-root": {
                            height: "1px",
                          },

                          "& .MuiTabs-scroller": {
                            overflowY: "auto",
                            height: "95%",
                          },
                          "& .MuiTabs-indicator": {
                            left: 0,
                            right: "auto",
                          },
                        }}
                      >
                        {getAllSubOptions(
                          Object.values(MainFilter)[currentTab]
                        ).map((subFilter: SubFilter) => (
                          <Tab
                            key={subFilter}
                            label={
                              <MenuItem
                                key={subFilter}
                                onClick={() => handleSubFilterSelect(subFilter)}
                                sx={{
                                  borderRadius: 1,
                                  p: 1.5,
                                  pt: { xs: "auto", sm: 1.2, md: 1.2, lg: 1.2 },
                                  width: {
                                    xs: "auto",
                                    sm: "100%",
                                    md: "100%",
                                    lg: "100%",
                                  },
                                  backgroundColor: isSelected(subFilter)
                                    ? "primary.light"
                                    : "transparent",
                                  border: "1px solid transparent",
                                  borderColor: "transparent",
                                  "&:hover": {
                                    border: "1px solid",
                                    borderColor: "gray",
                                    backgroundColor: "primary.light",
                                  },
                                }}
                              >
                                <Typography variant="body2">
                                  {subFilter}
                                </Typography>
                              </MenuItem>
                            }
                            value={subFilter}
                          />
                        ))}
                      </Tabs>
                    </>
                  )}
                </Box>

                {/* Selected items */}
                <Box
                  sx={{
                    position: "absolute",
                    height: "100%",
                    maxHeight: "52vh",
                    overflowY: "clip",
                    width: { xs: "80%", sm: "28vw", md: "28vw", lg: "28vw" },

                    borderLeft: 1,
                    borderColor: "divider",

                    top: { xs: "500px", sm: 0, md: 0, lg: 0 },

                    right: { xs: "inherit", sm: 0, md: 0, lg: 0 },
                    maxWidth: {
                      xs: "inherit",
                      sm: "161px",
                      md: "161px",
                      lg: "161px",
                    },
                    minWidth: {
                      xs: "inherit",
                      sm: "100px",
                      md: "100px",
                      lg: "100px",
                    },
                    padding: { xs: "inherit", sm: "5px", md: "5px", lg: "5px" },
                    pt: { xs: "inherit", sm: 1, md: 1, lg: 1 },
                    backgroundColor: "background.paper",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      alignItems: "center",

                      p: 1,
                      borderRadius: 1,
                      mb: { xs: 4, sm: 0.5 },
                      ml: { xs: 0, sm: 2 },
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight:
                          searchParams.get("mode") === "any" ? 600 : 400,
                        color:
                          searchParams.get("mode") === "any"
                            ? "primary.main"
                            : "text.secondary",
                      }}
                    >
                      Any
                    </Typography>
                    <IOSSwitch
                      sx={{ m: 0 }}
                      checked={searchParams.get("mode") === "all"}
                      onChange={() => {
                        const newMode =
                          searchParams.get("mode") === "any" ? "all" : "any";
                        setSearchParams({ mode: newMode });
                        if (foodFilters.length > 0) {
                          onFilterChange(foodFilters, newMode);
                        }
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight:
                          searchParams.get("mode") === "all" ? 600 : 400,
                        color:
                          searchParams.get("mode") === "all"
                            ? "primary.main"
                            : "text.secondary",
                      }}
                    >
                      All
                    </Typography>
                  </Stack>

                  {/* <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setShowMainMenu(false)}
                      sx={{
                        display: { xs: "block", sm: "none" },
                      }}
                    >
                      Done
                    </Button> */}
                  {selectedCount > 0 ? (
                    <Chip
                      label={"Clear All"}
                      onClick={handleClear}
                      size="small"
                      sx={{
                        cursor: "pointer",
                        flex: 1,
                        borderColor: "#FFC107",
                        overflowY: "auto",
                        maxHeight: "80%",
                        width: "100%",
                        mb: 1,
                        "& .MuiChip-root": {
                          width: "100%",
                          height: "auto",
                          opacity: "1",
                          "& .MuiChip-label": {
                            whiteSpace: "normal",
                            display: "block",
                            width: "100%",
                            padding: "8px 0",
                          },
                        },
                      }}
                    />
                  ) : null}
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    scrollButtons="auto"
                    value={false}
                    sx={{
                      position: "relative",
                      overflowY: "hidden",
                      height: "82%",
                      maxHeight: "100%",
                      "& .MuiTab-root": {
                        backgroundColor: "transparent",
                        opacity: "1",
                        border: "none",
                        padding: 0,
                        width: "100%",
                        overflowY: "visible",
                        height: "auto",
                        minHeight: "auto",
                      },
                      "& .MuiChip-root": {
                        width: "100%",
                        height: "auto",
                        maxHeight: "32px",
                        "& .MuiChip-label": {
                          whiteSpace: "normal",
                          lineHeight: "1.2",
                          width: "100%",
                          padding: "2px 0.5px",
                        },
                      },
                      "& .css-1ud1u39-MuiSvgIcon-root": {
                        mb: 3,
                      },
                      "& .MuiTabScrollButton-root": {
                        height: "1px",
                      },

                      "& .MuiTabs-scroller": {
                        overflowY: "auto",
                        height: "75%",
                      },
                      "& .MuiTabs-indicator": {
                        left: 0,
                        right: "auto",
                      },
                    }}
                  >
                    {foodFilters.flatMap((filter, index) => {
                      const items = [];

                      if (Array.isArray(filter.sub)) {
                        filter.sub.forEach((sub, subIndex) => {
                          items.push(
                            <Tab
                              key={`${index}-${subIndex}`}
                              label={
                                <Chip
                                  key={`${index}-${subIndex}`}
                                  label={`${sub}`}
                                  onDelete={() => handleSubFilterSelect(sub)}
                                  size="small"
                                />
                              }
                              value={sub}
                            />
                          );
                        });
                      } else if (filter.sub) {
                        items.push(
                          <Tab
                            key={filter.sub}
                            label={
                              <Chip
                                label={`${filter.main}: ${filter.sub}`}
                                onDelete={() =>
                                  handleSubFilterSelect(filter.sub as SubFilter)
                                }
                                size="small"
                              />
                            }
                            value={filter.sub}
                          />
                        );
                      }

                      return items;
                    })}
                    {/* {foodFilters.flatMap((filter, index) => (
                        {Array.isArray(filter.sub)
                          ? filter.sub.map((sub, subIndex) => (
                              <Tab
                                key={`${index}-${subIndex}`}
                                label={
                                  <Chip
                                    key={`${index}-${subIndex}`}
                                    label={`${sub}`}
                                    onDelete={() => handleSubFilterSelect(sub)}
                                    size="small"
                                  />
                                }
                                value={sub}
                              />
                            ))
                          : filter.sub && (
                              <Tab
                                key={filter.sub}
                                label={
                                  <Chip
                                    label={`${filter.main}: ${filter.sub}`}
                                    onDelete={() =>
                                      handleSubFilterSelect(
                                        filter.sub as SubFilter
                                      )
                                    }
                                    size="small"
                                  />
                                }
                                value={filter.sub}
                              />
                            )}
                    ))} */}
                  </Tabs>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export const AdvancedFilter = {
  MainButton,
};
