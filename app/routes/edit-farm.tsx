/* eslint-disable react/prop-types */
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useSearchParams,
} from "react-router";
import { useLoaderData } from "react-router";
import { createSupabaseServerClient } from "~/utils/supabase.server";
import { getUser } from "~/utils/auth.supabase.server";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Switch,
  DialogActions,
  Button,
  Stack,
  Grid,
  Link,
} from "@mui/material";
import { IoSearchCircle } from "react-icons/io5";
import ClearIcon from "@mui/icons-material/Clear";
import {
  MaterialReactTable,
  MRT_RowVirtualizer,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import StandardsFilter from "~/components/farms/table/filters/StandardsFilter";
import { AdvancedFilter } from "~/components/farms/table/filters/FoodsFilter";
import type { Filter } from "~/components/farms/table/filters/FoodsFilter";
import {
  MainFilter,
  StandardsOption,
  StateCodeAddition,
  SubFilter,
} from "~/components/farms/table/utils/FilterEnums";
import { Form } from "react-router";
import { useFetcher } from "react-router";
import { getAllSubOptions } from "~/components/farms/table/utils/FilterHelpers";
import ImprovedSearchBar from "~/components/farms/table/filters/Search";
import { UserRole } from "~/components/auth/userRoles";

interface PriceSnap {
  ground_beef: number | null;
  eggs: number | null;
  milk: number | null;
  tomato: number | null;
  onion: number | null;
  potato: number | null;
  honey: number | null;
  date: string | null;
}

export interface Farm {
  id: string;
  name: string;
  site: string;
  updated_at: string;
  latitude: number;
  longitude: number;
  foods: string[];
  standards: string[];
  shipping: boolean;
  verified: boolean;
  state: string;
  show_google_map: boolean | null;
  price_snap: PriceSnap | null;
  farm_details: {
    description?: string | null;
  } | null;
}

interface NominatimResponse {
  lat: string;
  lon: string;
  address: {
    state?: string;
    country_code?: string;
    city?: string;
    town?: string;
    village?: string;
    hamlet?: string;
    municipality?: string;
  };
}

export async function loader({ request }: LoaderFunctionArgs) {
  const supabase = createSupabaseServerClient(request);
  const user = await getUser(request);

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: profile } = await supabase.client
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profile?.role !== UserRole.ADMIN) {
    return redirect("/");
  }

  /* 2025-02-19 17:51:17.743214 */
  /* const targetDate = new Date("2025-02-19T17:52:00Z"); */
  const { data: farms, error } = await supabase.client
    .from("farms")
    .select(
      `
      *,
      farm_details (
        description
      )
    `
    )
    /* .lte("updated_at", targetDate.toISOString()) */
    .order("updated_at", { ascending: true });
  console.log("farms", error);
  return JSON.stringify({ farms });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const supabase = createSupabaseServerClient(request);

  const farmId = formData.get("farmId") as string;
  const name = formData.get("name") as string;
  const site = formData.get("site");
  const shipping = formData.get("shipping") === "true";
  const verified = formData.get("verified") === "true";
  const foods = JSON.parse(formData.get("foods") as string);
  const standards = JSON.parse(formData.get("standards") as string);
  const priceSnap = JSON.parse(formData.get("priceSnap") as string);
  const st = formData.get("st");
  const latitude = formData.get("lat")
    ? parseFloat(formData.get("lat") as string)
    : parseFloat(formData.get("latitude") as string);
  const longitude = formData.get("long")
    ? parseFloat(formData.get("long") as string)
    : parseFloat(formData.get("longitude") as string);
  const state = st ? (st as string) : (formData.get("state") as string);
  const show_google_map = formData.get("show_google_map") === "true";
  const description = (formData.get("description") as string) || null;

  // Update farm data
  const { error: farmError } = await supabase.client
    .from("farms")
    .update({
      name,
      site: site ? site.toString() : null,
      shipping,
      verified,
      foods,
      standards,
      latitude,
      longitude,
      state,
      show_google_map,
      price_snap: priceSnap,
      updated_at: new Date().toISOString(),
    })
    .eq("id", farmId);

  if (farmError) {
    return { error: farmError.message };
  }
  // Upsert farm_details
  const { error: detailsError } = await supabase.client
    .from("farm_details")
    .upsert(
      {
        id: farmId,
        description,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "id",
      }
    );

  if (detailsError) {
    return { error: detailsError.message };
  }

  return { success: true };
}

export default function EditFarm() {
  const loaderData = useLoaderData<typeof loader>();
  const farms = JSON.parse(loaderData as string).farms ?? [];
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, _setSelectedDate] = useState<string>("");
  const [filteredFarms, _setFilteredFarms] = useState<Farm[]>(farms);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStandards, setSelectedStandards] = useState<StandardsOption[]>(
    []
  );
  const [selectedFoods, setSelectedFoods] = useState<Filter[]>([]);
  const [shouldClearFilters, setShouldClearFilters] = useState(false);
  const [_isFoodFilterActive, setIsFoodFilterActive] = useState(false);
  const [_isStandardFilterActive, setIsStandardFilterActive] = useState(false);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState<string | null>(null);
  const [_latLong, setLatLong] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [_stateCode, setStateCode] = useState<string | null>(null);
  const [isModalMounted, setIsModalMounted] = useState(false);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const deleteFetcher = useFetcher();
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);
  const [currentFoodTab, setCurrentFoodTab] = useState(0);
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(farms.length);
  const columns = [
    {
      accessorKey: "name",
      header: "Farm Name",
      size: 180,
      Cell: ({ row }) => (
        <Typography
          sx={{
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
              color: "primary.main",
            },
          }}
          onClick={() => handleFarmClick(row.original)}
        >
          {row.original.name}
        </Typography>
      ),
    },
    {
      accessorKey: "site",
      header: "Website",
      size: 220,
      Cell: ({ row }) => (
        <Box display="flex" flexDirection="column">
          <a href={row.original.site} target="_blank" rel="noopener noreferrer">
            {row.original.site}
          </a>
          <Typography variant="body2">{row.original.site}</Typography>
        </Box>
      ),
    },
    {
      accessorKey: "price_snap",
      header: "price_snap",
      size: 200,
      Cell: ({ row }) => (
        <Typography>
          {row.original.price_snap?.ground_beef
            ? `Ground Beef: $${row.original.price_snap?.ground_beef}, `
            : ""}
          {row.original.price_snap?.eggs
            ? `Eggs: $${row.original.price_snap?.eggs}, `
            : ""}
          {row.original.price_snap?.milk
            ? `Milk: $${row.original.price_snap?.milk}, `
            : ""}
          {row.original.price_snap?.potato
            ? `Potato: $${row.original.price_snap?.potato}, `
            : ""}
          {row.original.price_snap?.tomato
            ? `Tomato: $${row.original.price_snap?.tomato}, `
            : ""}
          {row.original.price_snap?.onion
            ? `Onion: $${row.original.price_snap?.onion}, `
            : ""}
          {row.original.price_snap?.date
            ? `${row.original.price_snap?.date}`
            : ""}
        </Typography>
      ),
    },
    {
      accessorKey: "foods",
      header: "Foods",
      size: 200,
      Cell: ({ row }) => (
        <Typography>{row.original.foods.join(", ")}</Typography>
      ),
    },
    {
      accessorKey: "standards",
      header: "Standards",
      size: 200,
      Cell: ({ row }) => (
        <Typography>{row.original.standards.join(", ")}</Typography>
      ),
    },
    {
      accessorKey: "lat-long",
      header: "Latitude/Longitude",
      size: 160,
      Cell: ({ row }) => (
        <Typography>{`${row.original.latitude}, ${row.original.longitude}`}</Typography>
      ),
    },
    {
      accessorKey: "state",
      header: "State",
      size: 20,
      Cell: ({ row }) => <Typography>{row.original.state}</Typography>,
    },
    {
      accessorKey: "updated_at",
      header: "Last Updated",
      size: 200,
      Cell: ({ row }) => {
        const date = new Date(row.original.updated_at);
        return date.toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",

          hour12: false,
        });
      },
    },
  ] as MRT_ColumnDef<Farm>[];

  /*  const date = event.target.value;
    setSelectedDate(date);

    Filter farms before the selected date (in UTC)
    const selectedDateTime = new Date(date).getTime();
    const filtered = farms.filter((farm: Farm) => {
      const farmDateTime = new Date(farm.updated_at).getTime();
      return farmDateTime <= selectedDateTime;
    });
    setFilteredFarms(filtered);
  }; */

  const table = useMaterialReactTable({
    columns,
    enableColumnActions: false,
    data: farms,
    enableKeyboardShortcuts: false,
    enableRowSelection: true,
    enablePagination: false,
    enableColumnPinning: false,
    enableRowVirtualization: true,
    enableDensityToggle: false,
    enableGlobalFilter: true,
    /* initialState: {
       sorting: [{ id: "name", desc: true }],
    }, */
    state: {
      rowSelection,
    },
    rowVirtualizerInstanceRef,
    rowVirtualizerOptions: { overscan: 10 },
    onRowSelectionChange: setRowSelection,
    layoutMode: "semantic",
    enableTopToolbar: true,
    renderTopToolbarCustomActions: ({ table }) => {
      const selectedRows = table.getSelectedRowModel().rows;

      return (
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {selectedRows.length > 0 && (
            <>
              <Typography variant="body2">
                {selectedRows.length} row(s) selected
              </Typography>
              <deleteFetcher.Form
                method="DELETE"
                action="/api/farms/bulk-delete"
                onSubmit={(e) => {
                  if (
                    !window.confirm(
                      `Are you sure you want to delete ${selectedRows.length} farms?`
                    )
                  ) {
                    e.preventDefault();
                  }
                }}
              >
                <input
                  type="hidden"
                  name="farmIds"
                  value={JSON.stringify(
                    selectedRows.map((row) => row.original.id)
                  )}
                />
                <Button
                  type="submit"
                  color="error"
                  variant="contained"
                  disabled={deleteFetcher.state !== "idle"}
                >
                  {deleteFetcher.state !== "idle"
                    ? "Deleting..."
                    : "Delete Selected"}
                </Button>
              </deleteFetcher.Form>
            </>
          )}
        </Box>
      );
    },
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
        maxHeight: "800px",
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
      },
    },
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    table.setGlobalFilter(value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    table.setGlobalFilter("");
  };

  const [foodFilters, setFoodFilters] = useState<Filter[]>([]);
  const [foodFilterMode, setFoodFilterMode] = useState<"any" | "all">("any");
  const [selectedFoodCount, setSelectedFoodCount] = useState(0);

  const [standardsOptions, setStandardsOptions] = useState<StandardsOption[]>(
    []
  );
  const [selectedStandardCount, setSelectedStandardCount] = useState(0);

  const handleFoodFilterChange = (
    newFilters: Filter[],
    mode: "any" | "all" = "any"
  ) => {
    setFoodFilters(newFilters);
    setFoodFilterMode(mode);
    setSelectedFoods(newFilters);
    setIsFoodFilterActive(newFilters.length > 0);

    let count = 0;
    newFilters.forEach((filter) =>
      filter.sub
        ? (count += Array.isArray(filter.sub) ? filter.sub.length : 1)
        : count++
    );
    setSelectedFoodCount(count);
  };

  const handleStandardChange = (newStandards: StandardsOption[]) => {
    setStandardsOptions(newStandards);
    setSelectedStandards(newStandards);
    setIsStandardFilterActive(newStandards.length > 0);
    setSelectedStandardCount(newStandards.length);
  };

  const handleStandardSelect = (standard: StandardsOption) => {
    const isSelected = standardsOptions.includes(standard);
    let newStandards: StandardsOption[];

    if (isSelected) {
      newStandards = standardsOptions.filter((s) => s !== standard);
    } else {
      newStandards = [...standardsOptions, standard];
    }

    handleStandardChange(newStandards);
  };

  const handleSubFilterSelect = (subFilter: SubFilter) => {
    let mainFilterForSub: MainFilter | undefined;

    for (const mainFilter of Object.values(MainFilter)) {
      if (getAllSubOptions(mainFilter).includes(subFilter)) {
        mainFilterForSub = mainFilter;
        break;
      }
    }

    if (!mainFilterForSub) return;

    const existingFilterIndex = foodFilters.findIndex(
      (filter) =>
        filter.main === mainFilterForSub &&
        (filter.sub === subFilter ||
          (Array.isArray(filter.sub) && filter.sub.includes(subFilter)))
    );

    let newFilters: Filter[];

    if (existingFilterIndex >= 0) {
      const existingFilter = foodFilters[existingFilterIndex];
      if (Array.isArray(existingFilter.sub)) {
        const newSubs = existingFilter.sub.filter((sub) => sub !== subFilter);
        if (newSubs.length === 0) {
          newFilters = foodFilters.filter((_, i) => i !== existingFilterIndex);
        } else {
          newFilters = [...foodFilters];
          newFilters[existingFilterIndex] = {
            ...existingFilter,
            sub: newSubs,
          };
        }
      } else {
        newFilters = foodFilters.filter((_, i) => i !== existingFilterIndex);
      }
    } else {
      const existingMainFilter = foodFilters.find(
        (f) => f.main === mainFilterForSub
      );

      if (existingMainFilter) {
        newFilters = foodFilters.map((filter) => {
          if (filter.main === mainFilterForSub) {
            const newSubs = Array.isArray(filter.sub)
              ? [...filter.sub, subFilter]
              : filter.sub
              ? [filter.sub as SubFilter, subFilter]
              : [subFilter];
            return { ...filter, sub: newSubs };
          }
          return filter;
        });
      } else {
        newFilters = [
          ...foodFilters,
          { main: mainFilterForSub, sub: subFilter },
        ];
      }
    }

    handleFoodFilterChange(newFilters, foodFilterMode);
  };

  const handleSearchFilterApply = (
    filterType: "food" | "standard",
    value: string
  ) => {
    if (filterType === "food") {
      const mainFilter = Object.values(MainFilter).find((filter) =>
        getAllSubOptions(filter).includes(value as SubFilter)
      );

      if (mainFilter) {
        handleSubFilterSelect(value as SubFilter);
      }
    } else if (filterType === "standard") {
      handleStandardSelect(value as StandardsOption);
    }
  };

  const handleFarmClick = (farm: Farm) => {
    console.log("Farm clicked:", farm);
    console.log("Farm foods:", farm.foods);
    setSelectedFarm(farm);

    const foodFilters: Filter[] = [];
    const foodsByCategory = new Map<MainFilter, SubFilter[]>();

    farm.foods.forEach((food: string) => {
      console.log("Processing food:", food);
      let foundCategory = false;

      for (const mainFilter of Object.values(MainFilter)) {
        const subOptions = getAllSubOptions(mainFilter);

        if (subOptions.includes(food as SubFilter)) {
          foundCategory = true;

          if (!foodsByCategory.has(mainFilter)) {
            foodsByCategory.set(mainFilter, []);
          }
          foodsByCategory.get(mainFilter)?.push(food as SubFilter);
          break;
        }
      }

      if (!foundCategory) {
        console.warn(`No category found for food: ${food}`);
      }
    });

    console.log("Foods by category:", Object.fromEntries(foodsByCategory));

    foodsByCategory.forEach((subFilters, mainFilter) => {
      foodFilters.push({
        main: mainFilter,
        sub: subFilters,
      });
    });

    console.log("Final food filters:", foodFilters);

    setFoodFilters(foodFilters);
    setSelectedFoods(foodFilters);
    setIsFoodFilterActive(true);

    let foodCount = 0;
    foodFilters.forEach((filter) =>
      filter.sub
        ? (foodCount += Array.isArray(filter.sub) ? filter.sub.length : 1)
        : foodCount++
    );
    setSelectedFoodCount(foodCount);

    const formattedStandards = convertToStandardsOptions(farm.standards);
    setStandardsOptions(formattedStandards);
    setSelectedStandards(formattedStandards);
    setIsStandardFilterActive(formattedStandards.length > 0);
    setSelectedStandardCount(formattedStandards.length);

    setShouldClearFilters(false);
    setIsModalOpen(true);
    setIsModalMounted(false);
  };

  const handleCloseModal = () => {
    setSelectedFarm(null);
    setIsModalOpen(false);
    setAddress("");
    setAddressError(null);
    setStateCode(null);
    setLatLong(null);
    setLat(null);
    setLong(null);
    setState(null);
  };

  /* const handleSaveFarm = () => {
    if (!selectedFarm) return;

    setIsModalOpen(false);
  }; */

  const handleAddressSubmit = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}&addressdetails=1`
      );
      const data: NominatimResponse[] = await response.json();
      console.log("data", data);
      if (data && data[0]) {
        const foundStateCode = getStateCodeFromAddress(data[0]);

        if (!foundStateCode) {
          setAddressError("Please enter a valid US address");
          return;
        }

        const newLat = parseFloat(data[0].lat);
        const newLng = parseFloat(data[0].lon);

        // Get town information
        const townName =
          data[0].address?.city ||
          data[0].address?.town ||
          data[0].address?.village ||
          data[0].address?.hamlet ||
          data[0].address?.municipality ||
          "Unknown";

        setLatLong({
          lat: newLat,
          lng: newLng,
        });
        setStateCode(foundStateCode);

        // Format as "Town, State"
        const locationString = `${townName}, ${foundStateCode}`;
        setState(locationString);

        setSelectedFarm((prev) =>
          prev
            ? {
                ...prev,
                latitude: newLat,
                longitude: newLng,
                state: locationString,
              }
            : null
        );

        setAddressError(null);
      } else {
        setAddressError("Could not find coordinates for this address");
      }
    } catch (error) {
      console.log("error", error);
      setAddressError("Error converting address to coordinates");
    }
  };

  const getStateCodeFromAddress = (addressData: NominatimResponse) => {
    if (addressData.address?.country_code?.toLowerCase() !== "us") {
      return null;
    }
    console.log("addressData", addressData);
    const state = addressData.address?.state;
    if (!state) return null;

    const stateEntry = Object.entries(StateCodeAddition).find(
      ([key, _value]) => state.toLowerCase() === key.toLowerCase()
    );

    return stateEntry ? stateEntry[1] : null;
  };
  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setIsModalMounted(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (deleteFetcher.state === "idle" && deleteFetcher.data?.success) {
      console.log("deleting farms");
      setRowSelection({});
      window.location.reload();
    } else if (deleteFetcher.data?.error) {
      alert("Error deleting farms: " + deleteFetcher.data.error);
    }
  }, [deleteFetcher.state, deleteFetcher.data]);

  const convertToStandardsOptions = (
    standards: string[] | undefined
  ): StandardsOption[] => {
    if (!standards) return [];
    return standards.filter((standard): standard is StandardsOption =>
      Object.values(StandardsOption).includes(standard as StandardsOption)
    );
  };

  return (
    <Box
      sx={{ width: "100%", height: "100vh", p: 4, pt: 4, position: "relative" }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2.5,
          alignItems: "center",
          width: "100%",
          mb: 3,
        }}
      >
        <Typography component="h2" variant="h6" sx={{ fontWeight: "medium" }}>
          Edit Farm
        </Typography>
        {/* Date Picker */}
        {/* <TextField
          type="datetime-local"
          value={selectedDate}
          onChange={handleDateChange}
          label="Select Date & Time (UTC)"
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{ width: 250 }}
        /> */}
        <TextField
          value={searchValue}
          onChange={handleSearch}
          placeholder="Search farms..."
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IoSearchCircle />
              </InputAdornment>
            ),
            endAdornment: searchValue ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClearSearch}
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
              </InputAdornment>
            ) : null,
          }}
          sx={{
            width: 300,
            mb: 0,
          }}
        />
      </Box>

      {/* Debug information */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Selected Date: {selectedDate}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Total Farms: {farms.length}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Filtered Farms: {filteredFarms.length}
        </Typography>
      </Box>

      <Box sx={{ flex: 1, width: "100%", overflow: "hidden" }}>
        {table.getRowModel().rows.length ? (
          <MaterialReactTable table={table} />
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
            No farms found for selected date
          </Typography>
        )}
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          find if they have any of these: AllOrganic = &quot;AllOrganic&quot;,
          CCOF = &quot;California Certified Organic Farmers&quot;, USDAO =
          &quot;USDA Organic&quot;, OTCO = &quot;Oregon Tilth Certified
          Organic&quot;, NGMO = &quot;Non-GMO&quot;, NGMOProject = &quot;Non-GMO
          Project&quot;, AGC = &quot;American Grassfed Certification&quot;, EOV
          = &quot;Ecological Outcome Verification&quot;, CNG = &quot;Certified
          Naturally Grown&quot;, CNR = &quot;Certified Natural Ruminant&quot;,
          Organic = &quot;Organic&quot;, RealOrganic = &quot;Real Organic&quot;,
          AllRegenerative = &quot;AllRegenerative&quot;, Regenerative =
          &quot;Regenerative&quot;, DBC = &quot;Demeter Biodynamic
          Certification&quot;, ROC = &quot;Regenerative Organic Certified&quot;,
          SIEOV = &quot;Savory Institute EOV&quot;, CRAGW = &quot;Carbon
          Reduction Agriculture Green World&quot;, RotationalGrazing =
          &quot;Rotational Grazing&quot;, NoTill = &quot;No Till&quot;,
          AllChemicalFree = &quot;AllChemicalFree&quot;, ChemicalFree =
          &quot;Chemical Free&quot;, CPF = &quot;Chemical Pesticide Free&quot;,
          PRF = &quot;Pesticide Residue Free&quot;, NoFungicides =
          &quot;Fungicides Free&quot;, NoHerbicides = &quot;Herbicides
          Free&quot;, NoPesticide = &quot;Pesticide Free&quot;, AllAnimalWelfare
          = &quot;AllAnimalWelfare&quot;, PastureRaised = &quot;Pasture
          Raised&quot;, GRFC = &quot;Grass Fed Certification&quot;, GrassFed =
          &quot;Grass Fed&quot;, CertifiedHumane = &quot;Certified Humane&quot;,
          GAP = &quot;Global Animal Partnership&quot;, AWA = &quot;Animal
          Welfare Approved&quot;, NoMRNAVAX = &quot;MRNA/Vax Free&quot;, NoVax =
          &quot;Vax Free&quot;, HFree = &quot;Hormone Free&quot;, AntibioticFree
          = &quot;Antibiotic Free&quot;, AllSustainability =
          &quot;AllSustainability&quot;, Rainforest = &quot;Rainforest&quot;,
          FairTrade = &quot;Fair Trade&quot;, FoodAlliance = &quot;Food
          Alliance&quot;, CarbonNegative = &quot;Carbon Negative&quot;, Kosher =
          &quot;Kosher&quot;, Halal = &quot;Halal&quot;,
        </Typography>
      </Box>

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        key={selectedFarm?.id}
      >
        <DialogTitle>Edit Farm: {selectedFarm?.name}</DialogTitle>
        <Typography variant="body2" color="textSecondary" sx={{ ml: 4 }}>
          foods: {selectedFoods.flatMap((filter) => filter.sub).join(", ")}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ ml: 4 }}>
          standards: {selectedStandards.join(", ")}
        </Typography>
        <Form method="post">
          <DialogContent>
            <input type="hidden" name="farmId" value={selectedFarm?.id} />
            <input
              type="hidden"
              name="foods"
              value={JSON.stringify(
                selectedFoods.flatMap((filter) => filter.sub)
              )}
            />
            <input
              type="hidden"
              name="standards"
              value={JSON.stringify(selectedStandards)}
            />
            <input
              type="hidden"
              name="latitude"
              value={selectedFarm?.latitude || undefined}
            />
            <input
              type="hidden"
              name="longitude"
              value={selectedFarm?.longitude || undefined}
            />
            <input
              type="hidden"
              name="state"
              value={selectedFarm?.state || undefined}
            />
            <input
              type="hidden"
              name="priceSnap"
              value={JSON.stringify(selectedFarm?.price_snap || null)}
            />
            <input type="hidden" name="lat" value={lat || ""} />
            <input type="hidden" name="long" value={long || ""} />
            <input type="hidden" name="st" value={state || ""} />
            <input
              type="hidden"
              name="show_google_map"
              value={selectedFarm?.show_google_map?.toString() || "false"}
            />
            <input
              type="hidden"
              name="description"
              value={selectedFarm?.farm_details?.description || ""}
            />
            <ImprovedSearchBar
              onApplyFilter={handleSearchFilterApply}
              appliedFoodFilters={foodFilters}
              appliedStandardFilters={standardsOptions}
              foodFilters={foodFilters}
              onClear={handleClearSearch}
            />
            <Stack spacing={2} sx={{ pt: 1 }}>
              {/* put these side by side*/}
              <Box sx={{ display: "flex", gap: 2 }}>
                {/* <Typography variant="h6" gutterBottom>
                  Products
                </Typography> */}
                {isModalMounted && (
                  <AdvancedFilter.MainButton
                    onFilterChange={handleFoodFilterChange}
                    farmAdd={true}
                    clearFilter={shouldClearFilters}
                    setShouldClearFilters={setShouldClearFilters}
                    setFoodFilterActive={setIsFoodFilterActive}
                    currentTab={currentFoodTab}
                    setCurrentTab={setCurrentFoodTab}
                    initialFilters={foodFilters}
                    handleSubFilterSelect={handleSubFilterSelect}
                    foodFilters={foodFilters}
                    setFoodFilters={setFoodFilters}
                    selectedCount={selectedFoodCount}
                    setSelectedCount={setSelectedFoodCount}
                    key={`foods-${selectedFarm?.id}}`}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                  />
                )}

                {/* <Typography variant="h6" gutterBottom>
                  Standards
                </Typography> */}
                {isModalMounted && (
                  <StandardsFilter
                    onChange={handleStandardChange}
                    clearFilter={shouldClearFilters}
                    setShouldClearFilters={setShouldClearFilters}
                    setStandardFilterActive={setIsStandardFilterActive}
                    initialStandards={standardsOptions}
                    handleStandardSelect={handleStandardSelect}
                    selectedStandardCount={selectedStandardCount}
                    setSelectedStandardCount={setSelectedStandardCount}
                    selectedStandards={standardsOptions}
                    setSelectedStandards={setStandardsOptions}
                    key={`standards-${selectedFarm?.id}}`}
                  />
                )}
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  name="name"
                  label="Farm Name"
                  required
                  fullWidth
                  value={selectedFarm?.name || undefined}
                  onChange={(e) =>
                    setSelectedFarm((prev) =>
                      prev ? { ...prev, name: e.target.value } : null
                    )
                  }
                />

                <TextField
                  name="site"
                  label="Website"
                  fullWidth
                  value={selectedFarm?.site || undefined}
                  onChange={(e) =>
                    setSelectedFarm((prev) =>
                      prev ? { ...prev, site: e.target.value } : null
                    )
                  }
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  multiline
                  variant="filled"
                  label="Description"
                  minRows={1}
                  maxRows={8}
                  sx={{
                    "& .MuiFilledInput-root": {
                      backgroundColor: "background.default",
                      borderRadius: 2,
                      border: "2px solid #f0f0f0",
                    },
                    "& .MuiFilledInput-root::before": {
                      borderBottom: "none",
                    },
                    "& .MuiFilledInput-root::after": {
                      borderBottom: "none",
                    },
                    "& .MuiFilledInput-root:hover::before": {
                      content: "none",
                    },
                  }}
                  value={selectedFarm?.farm_details?.description || ""}
                  onChange={(e) =>
                    setSelectedFarm((prev) =>
                      prev
                        ? {
                            ...prev,
                            farm_details: {
                              ...prev.farm_details,
                              description: e.target.value,
                            },
                          }
                        : null
                    )
                  }
                />
              </Box>

              <Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    label="Address"
                    fullWidth
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    error={!!addressError}
                    helperText={addressError}
                  />
                  <Button
                    variant="outlined"
                    onClick={handleAddressSubmit}
                    sx={{ width: "220px" }}
                  >
                    Convert to LAT/LONG
                  </Button>
                </Box>
                {selectedFarm && (
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, color: "success.main" }}
                  >
                    Current Coordinates: {selectedFarm.latitude},{" "}
                    {selectedFarm.longitude}
                    <br />
                    Location: {selectedFarm?.state}
                  </Typography>
                )}
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    label="latitude"
                    fullWidth
                    type="number"
                    value={lat}
                    onChange={(e) => setLat(parseFloat(e.target.value))}
                    error={!!addressError}
                    helperText={addressError}
                  />
                  <TextField
                    label="longitude"
                    fullWidth
                    type="number"
                    value={long}
                    onChange={(e) => setLong(parseFloat(e.target.value))}
                  />
                  <TextField
                    label="location (Town, State)"
                    fullWidth
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="e.g. Springfield, CA"
                    helperText="Format as: Town, State"
                  />
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Additional Options
                </Typography>
                <Stack direction="row" spacing={2}>
                  <input
                    type="hidden"
                    name="shipping"
                    value={selectedFarm?.shipping?.toString() || "false"}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={selectedFarm?.shipping || false}
                        onChange={(e) =>
                          setSelectedFarm((prev) =>
                            prev
                              ? { ...prev, shipping: e.target.checked }
                              : null
                          )
                        }
                      />
                    }
                    label="Shipping Available"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={selectedFarm?.verified || false}
                        onChange={(e) =>
                          setSelectedFarm((prev) =>
                            prev
                              ? { ...prev, verified: e.target.checked }
                              : null
                          )
                        }
                      />
                    }
                    label="Verified"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={selectedFarm?.show_google_map || false}
                        onChange={(e) =>
                          setSelectedFarm((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  show_google_map: e.target.checked,
                                }
                              : null
                          )
                        }
                      />
                    }
                    label="Show Google Map"
                  />
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${selectedFarm?.name},${selectedFarm?.state}`}
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                      color: "#1976d2",
                      textDecoration: "none",
                      fontSize: "12px",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    View on Google Maps
                  </Link>
                </Stack>
              </Box>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Product Prices
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Ground Beef ($/lb)"
                      type="number"
                      value={selectedFarm?.price_snap?.ground_beef || ""}
                      onChange={(e) =>
                        setSelectedFarm((prev) =>
                          prev
                            ? {
                                ...prev,
                                price_snap: {
                                  ...prev.price_snap,
                                  ground_beef:
                                    parseFloat(e.target.value) || null,
                                  eggs: prev.price_snap?.eggs || null,
                                  milk: prev.price_snap?.milk || null,
                                  tomato: prev.price_snap?.tomato || null,
                                  onion: prev.price_snap?.onion || null,
                                  potato: prev.price_snap?.potato || null,
                                  honey: prev.price_snap?.honey || null,
                                  date: new Date().toDateString(),
                                },
                              }
                            : null
                        )
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Eggs ($/dozen)"
                      type="number"
                      value={selectedFarm?.price_snap?.eggs || ""}
                      onChange={(e) =>
                        setSelectedFarm((prev) =>
                          prev
                            ? {
                                ...prev,
                                price_snap: {
                                  ...prev.price_snap,
                                  eggs: parseFloat(e.target.value) || null,
                                  ground_beef:
                                    prev.price_snap?.ground_beef || null,
                                  milk: prev.price_snap?.milk || null,
                                  tomato: prev.price_snap?.tomato || null,
                                  onion: prev.price_snap?.onion || null,
                                  potato: prev.price_snap?.potato || null,
                                  honey: prev.price_snap?.honey || null,
                                  date: new Date().toDateString(),
                                },
                              }
                            : null
                        )
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Milk ($/gallon)"
                      type="number"
                      value={selectedFarm?.price_snap?.milk || ""}
                      onChange={(e) =>
                        setSelectedFarm((prev) =>
                          prev
                            ? {
                                ...prev,
                                price_snap: {
                                  ...prev.price_snap,
                                  milk: parseFloat(e.target.value) || null,
                                  ground_beef:
                                    prev.price_snap?.ground_beef || null,
                                  eggs: prev.price_snap?.eggs || null,
                                  tomato: prev.price_snap?.tomato || null,
                                  onion: prev.price_snap?.onion || null,
                                  potato: prev.price_snap?.potato || null,
                                  honey: prev.price_snap?.honey || null,
                                  date: new Date().toDateString(),
                                },
                              }
                            : null
                        )
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Potato ($/lb)"
                      type="number"
                      value={selectedFarm?.price_snap?.potato || ""}
                      onChange={(e) =>
                        setSelectedFarm((prev) =>
                          prev
                            ? {
                                ...prev,
                                price_snap: {
                                  ...prev.price_snap,
                                  potato: parseFloat(e.target.value) || null,
                                  ground_beef:
                                    prev.price_snap?.ground_beef || null,
                                  eggs: prev.price_snap?.eggs || null,
                                  milk: prev.price_snap?.milk || null,
                                  tomato: prev.price_snap?.tomato || null,
                                  onion: prev.price_snap?.onion || null,
                                  honey: prev.price_snap?.honey || null,
                                  date: new Date().toDateString(),
                                },
                              }
                            : null
                        )
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Tomato ($/lb)"
                      type="number"
                      value={selectedFarm?.price_snap?.tomato || ""}
                      onChange={(e) =>
                        setSelectedFarm((prev) =>
                          prev
                            ? {
                                ...prev,
                                price_snap: {
                                  ...prev.price_snap,
                                  tomato: parseFloat(e.target.value) || null,
                                  ground_beef:
                                    prev.price_snap?.ground_beef || null,
                                  eggs: prev.price_snap?.eggs || null,
                                  milk: prev.price_snap?.milk || null,
                                  onion: prev.price_snap?.onion || null,
                                  potato: prev.price_snap?.potato || null,
                                  honey: prev.price_snap?.honey || null,
                                  date: new Date().toDateString(),
                                },
                              }
                            : null
                        )
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Onion ($/lb)"
                      type="number"
                      value={selectedFarm?.price_snap?.onion || ""}
                      onChange={(e) =>
                        setSelectedFarm((prev) =>
                          prev
                            ? {
                                ...prev,
                                price_snap: {
                                  ...prev.price_snap,
                                  onion: parseFloat(e.target.value) || null,
                                  ground_beef:
                                    prev.price_snap?.ground_beef || null,
                                  eggs: prev.price_snap?.eggs || null,
                                  milk: prev.price_snap?.milk || null,
                                  tomato: prev.price_snap?.tomato || null,
                                  potato: prev.price_snap?.potato || null,
                                  honey: prev.price_snap?.honey || null,
                                  date: new Date().toDateString(),
                                },
                              }
                            : null
                        )
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Honey ($/lb)"
                      type="number"
                      value={selectedFarm?.price_snap?.honey || ""}
                      onChange={(e) =>
                        setSelectedFarm((prev) =>
                          prev
                            ? {
                                ...prev,
                                price_snap: {
                                  ...prev.price_snap,
                                  honey: parseFloat(e.target.value) || null,
                                  ground_beef:
                                    prev.price_snap?.ground_beef || null,
                                  eggs: prev.price_snap?.eggs || null,
                                  milk: prev.price_snap?.milk || null,
                                  tomato: prev.price_snap?.tomato || null,
                                  onion: prev.price_snap?.onion || null,
                                  potato: prev.price_snap?.potato || null,
                                  date: new Date().toDateString(),
                                },
                              }
                            : null
                        )
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </Box>
  );
}
