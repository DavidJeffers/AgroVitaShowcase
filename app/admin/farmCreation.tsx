import React, { useState, useCallback } from "react";
import { Form, useSearchParams } from "react-router";
import {
  Box,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Paper,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import StandardsFilter from "~/components/farms/table/filters/StandardsFilter";
import { AdvancedFilter } from "~/components/farms/table/filters/FoodsFilter";
import type { Filter } from "~/components/farms/table/filters/FoodsFilter";
import {
  MainFilter,
  StandardsOption,
  StateCodeAddition,
  SubFilter,
} from "~/components/farms/table/utils/FilterEnums";

interface Props {
  error?: string;
}

interface NominatimResponse {
  lat: string;
  lon: string;
  address: {
    state?: string;
    country_code?: string;
  };
}

const FarmCreateForm: React.FC<Props> = ({ error }) => {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [site, setSite] = useState("");
  const [_verified, setVerified] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [selectedStandards, setSelectedStandards] = useState<StandardsOption[]>(
    []
  );
  const [selectedFoods, setSelectedFoods] = useState<Filter[]>([]);
  const [latLong, setLatLong] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [addressError, setAddressError] = useState<string | null>(null);
  const [shouldClearFilters, setShouldClearFilters] = useState(false);
  const [_isFoodFilterActive, setIsFoodFilterActive] = useState(false);
  const [_isStandardFilterActive, setIsStandardFilterActive] = useState(false);
  const [stateCode, setStateCode] = useState<string | null>(null);
  const [currentFoodTab, setCurrentFoodTab] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedStandardCount, setSelectedStandardCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

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
    console.log("stateEntry", stateEntry);
    return stateEntry ? stateEntry[1] : null;
  };

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

        setLatLong({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        });
        setStateCode(foundStateCode);
        setAddressError(null);
      } else {
        setAddressError("Could not find coordinates for this address");
      }
    } catch (error) {
      console.log("error", error);
      setAddressError("Error converting address to coordinates");
    }
  };

  const handleFoodFilterChange = (newFilters: Filter[]) => {
    setSelectedFoods(newFilters);
    setIsFoodFilterActive(newFilters.length > 0);
  };

  const handleStandardChange = (newStandards: StandardsOption[]) => {
    setSelectedStandards(newStandards);
    setIsStandardFilterActive(newStandards.length > 0);
    setSelectedStandardCount(newStandards.length || 0);
  };

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
      handleStandardChange(newStandards);
    },
    [selectedStandards]
  );

  const memoizedHandleSubFilterSelect = useCallback(
    (subFilter: SubFilter) => {
      setIsFoodFilterActive(true);
      const mainFilter = Object.values(MainFilter)[currentFoodTab];
      const existingFilterIndex = selectedFoods.findIndex(
        (f) => f.main === mainFilter
      );

      // Create a new filter or update existing one
      let newFilters: Filter[];
      if (existingFilterIndex >= 0) {
        const existingFilter = selectedFoods[existingFilterIndex];
        let updatedSub: SubFilter[];

        if (Array.isArray(existingFilter.sub)) {
          const subArray = existingFilter.sub as SubFilter[];
          if (subArray.includes(subFilter)) {
            updatedSub = subArray.filter((s) => s !== subFilter);
          } else {
            updatedSub = [...subArray, subFilter];
          }
        } else {
          updatedSub = [subFilter];
        }

        newFilters = [...selectedFoods];
        if (updatedSub.length === 0) {
          newFilters.splice(existingFilterIndex, 1);
        } else {
          newFilters[existingFilterIndex] = {
            ...existingFilter,
            sub: updatedSub,
          };
        }
      } else {
        const newFilter: Filter = {
          main: mainFilter,
          sub: [subFilter],
        };
        newFilters = [...selectedFoods, newFilter];
      }

      setSelectedFoods(newFilters);
      let count = 0;
      newFilters.forEach((filter) =>
        filter.sub
          ? (count += Array.isArray(filter.sub) ? filter.sub.length : 1)
          : count++
      );
      setSelectedCount(count);
    },
    [selectedFoods, currentFoodTab]
  );

  const handleClearAll = () => {
    setSelectedFoods([]);
    setSelectedStandards([]);
    setShouldClearFilters(true);
    setIsFoodFilterActive(false);
    setIsStandardFilterActive(false);
    setAddress("");
    setName("");
    setSite("");
    setVerified(false);
    setShipping(false);
    setLatLong(null);
    setAddressError(null);
    setSelectedCount(0);
    setSelectedStandardCount(0);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create New Farm
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Form method="post">
        <Stack spacing={3}>
          {/* Hidden lat/long/state inputs */}
          {latLong && stateCode && (
            <>
              <input type="hidden" name="latitude" value={latLong.lat} />
              <input type="hidden" name="longitude" value={latLong.lng} />
              <input type="hidden" name="stateCode" value={stateCode} />
            </>
          )}

          <Box>
            <Typography variant="h6" gutterBottom>
              Products
            </Typography>
            <AdvancedFilter.MainButton
              onFilterChange={handleFoodFilterChange}
              farmAdd={true}
              clearFilter={shouldClearFilters}
              setShouldClearFilters={setShouldClearFilters}
              setFoodFilterActive={setIsFoodFilterActive}
              handleSubFilterSelect={memoizedHandleSubFilterSelect}
              currentTab={currentFoodTab}
              setCurrentTab={setCurrentFoodTab}
              foodFilters={selectedFoods}
              setFoodFilters={setSelectedFoods}
              selectedCount={selectedCount}
              setSelectedCount={setSelectedCount}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
            <input
              type="hidden"
              name="foods"
              value={JSON.stringify(
                selectedFoods
                  .flatMap((filter) =>
                    Array.isArray(filter.sub) ? filter.sub : [filter.sub]
                  )
                  .filter(Boolean)
              )}
            />
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Standards
            </Typography>
            <StandardsFilter
              onChange={handleStandardChange}
              clearFilter={shouldClearFilters}
              setShouldClearFilters={setShouldClearFilters}
              setStandardFilterActive={setIsStandardFilterActive}
              handleStandardSelect={memoizedHandleStandardSelect}
              selectedStandards={selectedStandards}
              setSelectedStandards={setSelectedStandards}
              selectedStandardCount={selectedStandardCount}
              setSelectedStandardCount={setSelectedStandardCount}
            />
            <input
              type="hidden"
              name="standards"
              value={JSON.stringify(selectedStandards)}
            />
          </Box>

          <TextField
            label="Farm Name"
            required
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            name="name"
          />

          <TextField
            label="Website"
            value={site}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSite(e.target.value)
            }
            name="site"
          />

          <Box>
            <TextField
              label="Address"
              fullWidth
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress(e.target.value)
              }
              error={!!addressError}
              helperText={addressError}
            />
            <Button
              variant="outlined"
              onClick={handleAddressSubmit}
              sx={{ mt: 1 }}
            >
              Convert to Coordinates
            </Button>
            {latLong && stateCode && (
              <Typography variant="body2" sx={{ mt: 1, color: "success.main" }}>
                Coordinates found: {latLong.lat}, {latLong.lng}
                <br />
                State: {stateCode}
              </Typography>
            )}
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Additional Options
            </Typography>
            <Stack direction="row" spacing={2}>
              <input
                type="hidden"
                name="shipping"
                value={shipping ? "true" : "false"}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={shipping}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setShipping(e.target.checked)
                    }
                    name="shipping"
                  />
                }
                label="Shipping Available"
              />
            </Stack>
          </Box>

          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}
          >
            <Button
              onClick={handleClearAll}
              variant="outlined"
              color="secondary"
              sx={{ mt: 2 }}
            >
              Clear All
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!latLong}
              sx={{ mt: 2 }}
            >
              Create Farm
            </Button>
          </Box>
        </Stack>
      </Form>
    </Paper>
  );
};

export default FarmCreateForm;
