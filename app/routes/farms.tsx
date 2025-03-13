import { useEffect, useMemo, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Divider,
  Stack,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import {
  AdvancedFilter,
  Filter,
} from "~/components/farms/table/filters/FoodsFilter";
import StandardsFilter from "~/components/farms/table/filters/StandardsFilter";
import { Farm, useTableLogic } from "~/components/farms/table/FarmTable";
import { FarmMap } from "~/components/farms/map/FarmMap";
import DistanceFilter from "~/components/farms/table/filters/DistanceFilter";
import { createSupabaseServerClient } from "~/utils/supabase.server";
import {
  ActionFunctionArgs,
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  data,
  LoaderFunctionArgs,
  useSearchParams,
} from "react-router";
import { useLoaderData } from "react-router";
import { FaShippingFast } from "react-icons/fa";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { GrInfo } from "react-icons/gr";
import { YouTubePlayer } from "~/components/farms/table/youtube";
import { MdOndemandVideo } from "react-icons/md";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { getFarms } from "~/utils/d1.server";
import PriceFilter from "~/components/farms/table/filters/PriceFilter";
import {
  MainFilter,
  StandardsOption,
  SubFilter,
} from "~/components/farms/table/utils/FilterEnums";
import {
  getAllSubOptions,
  isAllOption,
} from "~/components/farms/table/utils/FilterHelpers";
import ImprovedSearchBar from "~/components/farms/table/filters/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const cache = new Map();

function generateCacheKey(request: Request): string {
  return new URL(request.url).pathname;
}

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("farms loader ran");

  const supabase = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabase.client.auth.getUser();

  let farmsd1 = null;
  let farms = null;
  let favoritesResponse = null;
  let farmError = null;

  if (!user) {
    // change back when d1 is normalized
    // farms = await getFarms();
    // return data({ farms, favorites: null, isloggedIn: false });
    const { data: farms, error: farmError } = await supabase.client
      .from("farms")
      .select("*")
      .order("updated_at", { ascending: false })
      .order("id", { ascending: true });
    if (farmError || !farms) {
      console.error(farmError);
      farmsd1 = await getFarms();
      return data({ farms: farmsd1, favorites: null, isloggedIn: false });
    }
    return data({ farms, favorites: null, isloggedIn: false });
  } else if (user) {
    [favoritesResponse, { data: farms, error: farmError }] = await Promise.all([
      supabase.client
        .from("favorites")
        .select("farm_id")
        .eq("user_id", user.id),
      supabase.client
        .from("farms")
        .select("*")
        .order("updated_at", { ascending: false })
        .order("id", { ascending: true }),
    ]);
  }

  if (farmError || !farms) {
    console.error(farmError);
    throw new Error("Failed to fetch data");
  }

  const isloggedIn = user ? true : false;
  return data({
    farms,
    favorites: favoritesResponse?.data,
    isloggedIn,
  });
}

let isInitialRequest = true;

export async function clientLoader({
  request,
  serverLoader,
}: ClientLoaderFunctionArgs) {
  const cacheKey = generateCacheKey(request);

  if (isInitialRequest) {
    isInitialRequest = false;
    const serverData = await serverLoader();
    cache.set(cacheKey, serverData);
    return serverData;
  }

  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  const serverData = await serverLoader();
  cache.set(cacheKey, serverData);
  return serverData;
}

clientLoader.hydrate = false;

export async function action({ request }: ActionFunctionArgs) {
  console.log("fav action ran");
  const supabase = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabase.client.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "Not authenticated",
      status: 401,
    };
  }

  const formData = await request.formData();
  const farmId = formData.get("farmId") as string;
  const action = formData.get("action") as "add" | "remove";

  try {
    if (action === "add") {
      await supabase.client
        .from("favorites")
        .insert({ user_id: user.id, farm_id: farmId });
    } else {
      await supabase.client
        .from("favorites")
        .delete()
        .match({ user_id: user.id, farm_id: farmId });
    }

    return data({
      success: true,
    });
  } catch (error) {
    return {
      success: false,
      error: "Failed to update favorite",
      errorMsg: error,
    };
  }
}

export async function clientAction({
  request,
  serverAction,
}: ClientActionFunctionArgs) {
  const cacheKey = generateCacheKey(request);
  cache.delete(cacheKey);
  isInitialRequest = true;
  const serverData = await serverAction();
  return serverData;
}

export default function Farms() {
  const { farms, favorites, isloggedIn } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMap, setShowMap] = useState(false);
  const [distanceFilter, setDistanceFilter] = useState<number | null>(null);
  const [userLatLong, setUserLatLong] = useState<[number, number] | null>(null);
  const [isShippingFilterActive, setIsShippingFilterActive] = useState(false);
  const [isFavFilterActive, setIsFavFilterActive] = useState(false);
  const [isVerifiedFilterActive, setIsVerifiedFilterActive] = useState(false);
  const [isFoodFilterActive, setIsFoodFilterActive] = useState(false);
  const [isStandardFilterActive, setIsStandardFilterActive] = useState(false);
  const [isDistanceFilterActive, setIsDistanceFilterActive] = useState(false);
  const [isSearchFilterActive, setIsSearchFilterActive] = useState(false);
  const [_isHovering, setIsHovering] = useState(false);
  const [shouldClearFilters, setShouldClearFilters] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [showClearAll, setShowClearAll] = useState(false);
  const [isPriceFilterActive, setIsPriceFilterActive] = useState(false);
  const [sortBy, setSortBy] = useState<string>("none");
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [currentFoodTab, setCurrentFoodTab] = useState(0);
  const [foodFilters, setFoodFilters] = useState<Filter[]>([]);
  const [selectedStandards, setSelectedStandards] = useState<StandardsOption[]>(
    []
  );
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedStandardCount, setSelectedStandardCount] = useState(0);

  const {
    table,
    handleFoodFilterChange,
    handleStandardFilterChange,
    handleFavFilterChange,
    handleShippingFilterChange,
    handlePriceFilterChange,
    refreshTableData,
    handleSortChange,
  } = useTableLogic(
    farms as Farm[],
    userLatLong,
    distanceFilter,
    new Set(favorites?.map((f) => f.farm_id) || []),
    isloggedIn,
    searchParams.get("mode") === "all" ? "all" : "any"
  );

  const memoizedHandleStandardSelect = useCallback(
    (standard: StandardsOption) => {
      setIsStandardFilterActive(true);

      const newStandards = [...selectedStandards];
      if (newStandards.includes(standard)) {
        const index = newStandards.indexOf(standard);
        newStandards.splice(index, 1);
      } else {
        newStandards.push(standard);
      }

      setSelectedStandards(newStandards);
      setSelectedStandardCount(newStandards.length || 0);
      handleStandardFilterChange(newStandards);
    },
    [selectedStandards, handleStandardFilterChange]
  );

  const memoizedHandleSubFilterSelect = useCallback(
    (subFilter: SubFilter) => {
      setIsFoodFilterActive(true);
      const mainFilter = Object.values(MainFilter)[currentFoodTab];
      const existingFilterIndex = foodFilters.findIndex(
        (f) => f.main === mainFilter
      );
      const filterToRemove = foodFilters.find(
        (f) => Array.isArray(f.sub) && f.sub.includes(subFilter)
      );
      if (filterToRemove) {
        const newFilters = foodFilters
          .map((filter) => {
            if (filter === filterToRemove) {
              return {
                ...filter,
                sub: Array.isArray(filter.sub)
                  ? filter.sub.filter((s) => s !== subFilter)
                  : filter.sub,
              };
            }
            return filter;
          })
          .filter((f) =>
            Array.isArray(f.sub) ? f.sub.length > 0 : f.sub !== null
          );
        setFoodFilters(newFilters);
        setSelectedCount(newFilters.length || 0);
        if (newFilters.length === 0) {
          setIsFoodFilterActive(false);
        }
        handleFoodFilterChange(
          newFilters,
          searchParams.get("mode") === "all" ? "all" : "any"
        );
        return;
      }

      const AllOption = isAllOption(subFilter, mainFilter);
      if (existingFilterIndex >= 0) {
        const existingFilter = foodFilters[existingFilterIndex];
        let updatedSub: SubFilter[];
        if (Array.isArray(existingFilter.sub)) {
          const subArray = existingFilter.sub as SubFilter[];
          if (AllOption) {
            if (subArray.includes(subFilter)) {
              updatedSub = subArray.filter((s) => s !== subFilter);
            } else {
              updatedSub = [subFilter];
            }
          } else {
            if (subArray.includes(subFilter)) {
              updatedSub = subArray.filter((s) => s !== subFilter);
            } else {
              updatedSub = [...subArray, subFilter];
            }
          }
        } else {
          updatedSub = [subFilter];
        }

        const newFilters = [...foodFilters];
        if (updatedSub.length === 0) {
          newFilters.splice(existingFilterIndex, 1);
        } else {
          newFilters[existingFilterIndex] = {
            ...existingFilter,
            sub: updatedSub,
          };
        }
        setFoodFilters(newFilters);
        let count = 0;
        newFilters.forEach((filter) =>
          filter.sub ? (count += filter.sub.length) : count++
        );
        setSelectedCount(count);
        handleFoodFilterChange(
          newFilters,
          searchParams.get("mode") === "all" ? "all" : "any"
        );
      } else {
        const newFilter: Filter = {
          main: mainFilter,
          sub: [subFilter],
        };
        const newFilters = [...foodFilters, newFilter];
        setFoodFilters(newFilters);
        let count = 0;
        newFilters.forEach((filter) =>
          filter.sub ? (count += filter.sub.length) : count++
        );
        setSelectedCount(count);
        handleFoodFilterChange(
          newFilters,
          searchParams.get("mode") === "all" ? "all" : "any"
        );
      }
    },
    [foodFilters, currentFoodTab, searchParams, handleFoodFilterChange]
  );

  useEffect(() => {
    const anyFilterActive = [
      isFoodFilterActive,
      isStandardFilterActive,
      isDistanceFilterActive,
      isShippingFilterActive,
      isFavFilterActive,
      isVerifiedFilterActive,
      isPriceFilterActive,
      isSearchFilterActive,
    ].some(Boolean);
    setShowClearAll(anyFilterActive);
  }, [
    isFoodFilterActive,
    isStandardFilterActive,
    isDistanceFilterActive,
    isShippingFilterActive,
    isFavFilterActive,
    isVerifiedFilterActive,
    isPriceFilterActive,
    isSearchFilterActive,
  ]);

  const handleDistanceChange = (
    distance: number | null,
    latLong: [number, number] | null
  ) => {
    setDistanceFilter(distance);
    setUserLatLong(latLong);
  };

  const handleShippingButtonClick = () => {
    setShowClearAll(true);
    handleShippingFilterChange(!isShippingFilterActive);
    setIsShippingFilterActive(!isShippingFilterActive);
  };

  const handleFavButtonClick = () => {
    setShowClearAll(true);
    handleFavFilterChange(!isFavFilterActive);
    setIsFavFilterActive(!isFavFilterActive);
  };

  const handleSearchFilterApply = (
    filterType: "food" | "standard",
    value: string
  ) => {
    if (filterType === "food") {
      const mainFilterCategory = Object.values(MainFilter).find((filter) =>
        getAllSubOptions(filter).includes(value as SubFilter)
      ) as MainFilter;

      if (!mainFilterCategory) {
        console.error("Could not find main filter category for:", value);
        return;
      }

      memoizedHandleSubFilterSelect(value as SubFilter);
      setIsFoodFilterActive(true);
    } else {
      memoizedHandleStandardSelect(value as StandardsOption);
      setIsStandardFilterActive(true);
    }

    setShowClearAll(true);
  };

  const handleClearAll = () => {
    setDistanceFilter(null);
    setUserLatLong(null);
    setFoodFilters([]);
    setSelectedStandards([]);
    setIsShippingFilterActive(false);
    setIsFavFilterActive(false);
    setIsVerifiedFilterActive(false);
    setShouldClearFilters(true);
    setShowClearAll(false);
    handleClearSearch();
    table.resetColumnFilters();
  };

  const handleClearSearch = () => {
    table.setGlobalFilter("");
    setIsSearchFilterActive(false);
  };

  const handleFarmNameSearch = (searchTerm: string) => {
    table.setGlobalFilter(searchTerm);
    setIsSearchFilterActive(true);
  };
  const handleMapToggle = () => {
    setShowMap(!showMap);
    if (showMap) {
      setTimeout(() => {
        refreshTableData();
      }, 0);
    }
  };

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

  const MemoizedMap = useMemo(() => {
    return (
      <FarmMap
        filteredFarms={table
          .getFilteredRowModel()
          .rows.map((row) => row.original)}
        isVisible={true}
      />
    );
  }, [table]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        p: 4,
        pt: 4,
        position: "relative",
      }}
    >
      <Stack spacing={2} sx={{ height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            gap: 2.5,
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography component="h2" variant="h6" sx={{ fontWeight: "medium" }}>
            Farms
          </Typography>
          <ImprovedSearchBar
            onApplyFilter={handleSearchFilterApply}
            onClear={handleClearSearch}
            appliedFoodFilters={foodFilters}
            appliedStandardFilters={selectedStandards}
            onSearchFarmName={handleFarmNameSearch}
            setIsSearchFilterActive={setIsSearchFilterActive}
          />
          <Button
            onClick={handleMapToggle}
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
          </Box>
        </Box>

        <Stack
          spacing={3}
          width="100%"
          sx={{
            flex: 1,
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: { xs: 1, sm: 2 },
              width: "100%",
              alignItems: "center",
              flexWrap: "nowrap",
            }}
          >
            <AdvancedFilter.MainButton
              setFoodFilterActive={setIsFoodFilterActive}
              clearFilter={shouldClearFilters}
              setShouldClearFilters={setShouldClearFilters}
              onFilterChange={handleFoodFilterChange}
              farmAdd={false}
              handleSubFilterSelect={memoizedHandleSubFilterSelect}
              currentTab={currentFoodTab}
              setCurrentTab={setCurrentFoodTab}
              foodFilters={foodFilters}
              setFoodFilters={setFoodFilters}
              selectedCount={selectedCount}
              setSelectedCount={setSelectedCount}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
            <StandardsFilter
              setStandardFilterActive={setIsStandardFilterActive}
              clearFilter={shouldClearFilters}
              setShouldClearFilters={setShouldClearFilters}
              onChange={handleStandardFilterChange}
              handleStandardSelect={memoizedHandleStandardSelect}
              selectedStandards={selectedStandards}
              setSelectedStandards={setSelectedStandards}
              selectedStandardCount={selectedStandardCount}
              setSelectedStandardCount={setSelectedStandardCount}
            />
            <DistanceFilter
              setDistanceFilterActive={setIsDistanceFilterActive}
              clearFilter={shouldClearFilters}
              setShouldClearFilters={setShouldClearFilters}
              onChange={handleDistanceChange}
            />
            <PriceFilter
              clearFilter={shouldClearFilters}
              setShouldClearFilters={setShouldClearFilters}
              setPriceFilterActive={setIsPriceFilterActive}
              onChange={handlePriceFilterChange}
            />
            <Button
              startIcon={
                <Box
                  sx={{
                    "&:hover": {
                      color: "brown",
                    },
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                    mr: { xs: 0.2, sm: 0.5 },
                    mt: 0.5,
                  }}
                >
                  <FaShippingFast size={20} />
                </Box>
              }
              onClick={handleShippingButtonClick}
              sx={{
                height: "40px",
                minWidth: { xs: "42px", sm: "auto" },
                bgcolor: isShippingFilterActive
                  ? "primary.light"
                  : "transparent",
                "& .MuiButton-startIcon": {},
              }}
            >
              {"Shipping"}
            </Button>
            <Button
              startIcon={
                <Box
                  sx={{
                    "&:hover": {
                      color: "#ff4444",
                    },
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                    mr: { xs: 0.2, sm: 0.5 },
                    mt: 0.5,
                  }}
                >
                  {isFavFilterActive ? (
                    <FavoriteIcon fontSize="small" />
                  ) : (
                    <FavoriteBorderIcon fontSize="small" />
                  )}{" "}
                </Box>
              }
              onClick={handleFavButtonClick}
              sx={{
                height: "40px",
                minWidth: { xs: "42px", sm: "auto" },
                bgcolor: isFavFilterActive ? "primary.light" : "transparent",
                "& .MuiButton-startIcon": {},
              }}
            >
              {"Favorites"}
            </Button>
            {/* <Button
              startIcon={
                <Box
                  sx={{
                    "&:hover": {
                      color: "primary.main",
                    },

                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                    mr: { xs: 0.2, sm: 0.5 },
                  }}
                >
                  <VerifiedIcon fontSize="small" />
                </Box>
              }
              onClick={handleVerifiedButtonClick}

                height: "40px",
                minWidth: { xs: "42px", sm: "auto" },
                bgcolor: isVerifiedFilterActive
                  ? "primary.light"
                  : "transparent",
                "& .MuiButton-startIcon": {
                },
              }}
            >
              {"Verified"}
            </Button> */}

            {showClearAll ? (
              <Button
                onClick={handleClearAll}
                startIcon={<ClearAllIcon />}
                variant="outlined"
                sx={{
                  height: "40px",
                  minWidth: { xs: "42px", sm: "auto" },
                  borderColor: "#FFC107",
                  borderRadius: 2,
                }}
              >
                {"Clear All"}
              </Button>
            ) : null}
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
                  onClick={() => handleSortClose("none")}
                  selected={sortBy === "none"}
                >
                  None
                </MenuItem>
                <MenuItem
                  onClick={() => handleSortClose("ground-beef-low")}
                  selected={sortBy === "ground-beef-low"}
                >
                  Ground Beef: Low to High
                </MenuItem>
                <MenuItem
                  onClick={() => handleSortClose("ground-beef-high")}
                  selected={sortBy === "ground-beef-high"}
                >
                  Ground Beef: High to Low
                </MenuItem>
                <MenuItem
                  onClick={() => handleSortClose("eggs-low")}
                  selected={sortBy === "eggs-low"}
                >
                  Eggs: Low to High
                </MenuItem>
                <MenuItem
                  onClick={() => handleSortClose("eggs-high")}
                  selected={sortBy === "eggs-high"}
                >
                  Eggs: High to Low
                </MenuItem>
                <MenuItem
                  onClick={() => handleSortClose("milk-low")}
                  selected={sortBy === "milk-low"}
                >
                  Milk: Low to High
                </MenuItem>
                <MenuItem
                  onClick={() => handleSortClose("milk-high")}
                  selected={sortBy === "milk-high"}
                >
                  Milk: High to Low
                </MenuItem>
                <MenuItem
                  onClick={() => handleSortClose("favs-low")}
                  selected={sortBy === "favs-low"}
                >
                  Favorites: Low to High
                </MenuItem>
                <MenuItem
                  onClick={() => handleSortClose("favs-high")}
                  selected={sortBy === "favs-high"}
                >
                  Favorites: High to Low
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {!showMap ? <Divider /> : null}
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
            {/* <MaterialReactTable table={table} /> */}
            {/* {!showMap ? <MaterialReactTable table={table} /> : null} */}
            {!showMap ? <MaterialReactTable table={table} /> : MemoizedMap}
            {/* {showMap ? (
              <FarmMap
                filteredFarms={table
                  .getFilteredRowModel()
                  .rows.map((row) => row.original)}
                isVisible={showMap}
              />
            ) : null} */}
          </Box>
        </Stack>
      </Stack>
      {/* Icons container */}

      {isVideoOpen && (
        <Box
          className="popup-overlay"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            className="popup-content"
            sx={{
              position: "relative",
              zIndex: 1401,
              backgroundColor: "white",
              padding: 2,
              borderRadius: 2,
            }}
          >
            <YouTubePlayer setIsVideoOpen={setIsVideoOpen} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
