import React, { useState } from "react";
import Papa from "papaparse";
import {
  Card,
  Button,
  Box,
  Typography,
  Alert,
  LinearProgress,
} from "@mui/material";
import {
  StandardsOption,
  StandardsOptionUpload,
  StateCodeAddition,
  convertMultipleStandardsOptions,
} from "~/components/farms/table/utils/FilterEnums";
import { MainFilter } from "~/components/products/utils/FilterEnums";
import { useFetcher } from "react-router";

interface CSVFarm {
  Address: string;
  Name: string;
  Shipping: string;
  "website-href": string;
  foods: string;
  standards: string;
}

interface ParsedFarm {
  name: string;
  latitude: number | null;
  longitude: number | null;
  shipping: boolean;
  site: string;
  foods: string[];
  standards: StandardsOption[];
  address: string;
  stateCode: string | null;
}

const CSVImport = () => {
  const fetcher = useFetcher();
  const [parsedFarms, setParsedFarms] = useState<ParsedFarm[]>([]);
  const [error, setError] = useState<string | null>(null);

  const convertShippingValue = (shippingText: string): boolean => {
    return shippingText.toLowerCase().includes("shipping");
  };

  const parseStandards = (standardsText: string): StandardsOption[] => {
    const standards = standardsText.split("\n").map((s) => s.trim());

    // Filter for matching StandardsOptionUpload values and convert them
    const matchingUploadStandards = standards.filter(
      (standard): standard is StandardsOptionUpload =>
        Object.values(StandardsOptionUpload).includes(
          standard as StandardsOptionUpload
        )
    );

    return convertMultipleStandardsOptions(matchingUploadStandards);
  };

  const parseFoods = (foodsText: string): string[] => {
    return foodsText
      .split("\n")
      .map((f) => f.replace("Products for sale", "").trim())
      .filter(Boolean)
      .map((food) => {
        const key = food
          .toUpperCase()
          .replace(/\s/g, "_") as keyof typeof MainFilter;
        return MainFilter[key] || food;
      });
  };
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const getCoordinates = async (
    address: string,
    retries = 3
  ): Promise<{ lat: number; lng: number; stateCode: string | null } | null> => {
    for (let i = 0; i < retries; i++) {
      try {
        if (i > 0) await delay(1500);

        const response = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(
            address
          )}&limit=1`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.features && data.features[0]) {
          const [lng, lat] = data.features[0].geometry.coordinates;
          const properties = data.features[0].properties;

          // Extract state from properties
          let stateCode = null;
          console.log("properties", properties);
          if (properties.state) {
            const stateEntry = Object.entries(StateCodeAddition).find(
              ([key]) => properties.state.toLowerCase() === key.toLowerCase()
            );
            stateCode = stateEntry ? stateEntry[1] : null;
            console.log("stateEntry", stateEntry);
          }

          return { lat, lng, stateCode };
        }
        return null;
      } catch (error) {
        if (i === retries - 1) {
          console.error("Error getting coordinates:", error);
          return null;
        }
        // Wait longer between retries
        await delay(2000 * (i + 1));
      }
    }
    return null;
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError(null);
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        try {
          const farms: CSVFarm[] = results.data as CSVFarm[];
          const parsedFarmsPromises = farms.map(async (farm) => {
            const result = await getCoordinates(farm.Address);

            return {
              name: farm.Name,
              latitude: result?.lat || null,
              longitude: result?.lng || null,
              shipping: convertShippingValue(farm.Shipping),
              site: farm["website-href"],
              foods: parseFoods(farm.foods),
              standards: parseStandards(farm.standards),
              address: farm.Address,
              stateCode: result?.stateCode || null,
            };
          });

          const parsed = await Promise.all(parsedFarmsPromises);
          console.log("parsed", parsed);
          setParsedFarms(parsed);
        } catch (error) {
          setError("Error parsing CSV: " + error);
        }
      },
      error: (error) => {
        setError("Error parsing CSV: " + error.message);
      },
    });
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("farms", JSON.stringify(parsedFarms));

    fetcher.submit(formData, { method: "POST", action: "/api/farms/bulk" });

    // Clear farms after submission
    setParsedFarms([]);
  };

  return (
    <Card sx={{ p: 4 }}>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Import Farms from CSV
      </Typography>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        style={{ display: "none" }}
        id="csv-upload"
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="outlined"
          component="label"
          htmlFor="csv-upload"
          disabled={fetcher.state !== "idle"}
        >
          Select CSV File
        </Button>

        {error && <Alert severity="error">{error}</Alert>}
        {fetcher.data?.error && (
          <Alert severity="error">{fetcher.data.error}</Alert>
        )}

        {fetcher.state !== "idle" && <LinearProgress />}

        {parsedFarms.length > 0 && (
          <Box>
            <Typography>
              {parsedFarms.length} farms parsed successfully
            </Typography>
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={fetcher.state !== "idle"}
              sx={{ mt: 2 }}
            >
              Upload {parsedFarms.length} Farms
            </Button>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default CSVImport;
