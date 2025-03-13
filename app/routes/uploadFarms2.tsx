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
  A2DairySubFilter,
  BeefSubFilter,
  BeveragesSubFilter,
  CamelDairySubFilter,
  CowDairySubFilter,
  EggsSubFilter,
  FruitsSubFilter,
  GrainsSubFilter,
  NutsSeedsSubFilter,
  OtherSubFilter,
  RawBuffaloDairySubFilter,
  RawDonkeyDairySubFilter,
  PoultrySubFilter,
  RawCowDairySubFilter,
  SeafoodSubFilter,
  StandardsOption,
  StandardsOptionUpload,
  StateCodeAddition,
  SubFilter,
  SugarsSubFilter,
  VeggiesSubFilter,
  convertMultipleStandardsOptions,
  BuffaloDairySubFilter,
  DonkeyDairySubFilter,
  RawCamelDairySubFilter,
  RawSheepDairySubFilter,
  SheepDairySubFilter,
  RawGoatDairySubFilter,
  GoatDairySubFilter,
} from "~/components/farms/table/utils/FilterEnums";
import { useFetcher } from "react-router";

interface CSVFarm {
  Foods: string;
  Links: string;
  "Links-href": string;
  Name: string;
  Website1: string;
  Adress: string;
  Features: string;
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
  state: string | null;
}

const FarmCSVImport = () => {
  const fetcher = useFetcher();
  const [parsedFarms, setParsedFarms] = useState<ParsedFarm[]>([]);
  const [error, setError] = useState<string | null>(null);

  const extractURL = (farm: CSVFarm): string => {
    // First try Links-href

    try {
      const websiteJson = JSON.parse(farm.Website1.replace(/'/g, '"'));
      if (websiteJson[0]?.Website1) {
        const links = websiteJson[0].Website1.split(" ");

        // Common domain extensions
        const domainExtensions = [
          ".com",
          ".org",
          ".us",
          ".net",
          ".farm",
          ".ranch",
          ".farms",
        ];

        // First try to find URLs with www
        const wwwUrl = links.find((l: string) =>
          l.toLowerCase().startsWith("www.")
        );
        if (wwwUrl) {
          return wwwUrl.startsWith("http") ? wwwUrl : `https://${wwwUrl}`;
        }

        // Then look for any link with common domain extensions
        const domainUrl = links.find((l: string) =>
          domainExtensions.some((ext) => l.toLowerCase().endsWith(ext))
        );
        if (domainUrl) {
          // Remove any @ symbols if present
          const cleanUrl = domainUrl.replace(/@/g, "");
          return cleanUrl.startsWith("http") ? cleanUrl : `https://${cleanUrl}`;
        }
      }
    } catch (e) {
      console.log("Error parsing Website1:", e);
    }

    return "";
  };

  const checkForShipping = (features: string): boolean => {
    return features.toLowerCase().includes("shipping");
  };

  const extractStandards = (farm: CSVFarm): StandardsOption[] => {
    const standards: Set<string> = new Set();

    // Helper function to check for standard matches
    const checkForStandard = (text: string) => {
      // Convert standardsOptionUpload values to lowercase for comparison
      const standardsMap = Object.entries(StandardsOptionUpload).reduce(
        (acc, [_key, value]) => {
          // Split standard into individual words for matching
          const words = value.toLowerCase().split(/[-\s]+/);
          acc.set(value.toLowerCase(), words);
          return acc;
        },
        new Map<string, string[]>()
      );

      // Convert text to lowercase and split into words
      const words = text.toLowerCase().trim().split(/\s+/);

      // Check each standard
      standardsMap.forEach((standardWords, standardKey) => {
        // Check if all words of the standard appear in sequence
        if (
          words.some((word, index) => {
            return standardWords.every(
              (standardWord, stdIndex) =>
                words[index + stdIndex] === standardWord
            );
          })
        ) {
          // Find the original enum value
          const enumValue = Object.entries(StandardsOptionUpload).find(
            ([_, value]) => value.toLowerCase() === standardKey
          )?.[1];

          if (enumValue) {
            standards.add(enumValue);
          }
        }
      });
    };

    // Process Features column
    if (farm.Features) {
      // Split by multiple spaces to handle variable spacing
      const featureSegments = farm.Features.split(/\s{2,}/).filter(Boolean);
      featureSegments.forEach((segment) => checkForStandard(segment));
    }

    // Convert the found standards to StandardsOption enum values
    return convertMultipleStandardsOptions(
      Array.from(standards) as StandardsOptionUpload[]
    );
  };

  const extractFoods = (foodsText: string): string[] => {
    const foods: Set<string> = new Set();

    const toSingular = (word: string): string => {
      if (word.toLowerCase().endsWith("ies")) {
        return word.slice(0, -3) + "y";
      }
      if (word.toLowerCase().endsWith("s")) {
        return word.slice(0, -1);
      }
      return word;
    };

    // Helper function to check if a string matches any enum value
    const findMatchingSubFilter = (item: string): SubFilter | null => {
      // Check in all food-related enums
      const singularItem = toSingular(item);

      const enumsToCheck = [
        CowDairySubFilter,
        RawCowDairySubFilter,
        A2DairySubFilter,
        GoatDairySubFilter,
        RawGoatDairySubFilter,
        SheepDairySubFilter,
        RawSheepDairySubFilter,
        BuffaloDairySubFilter,
        RawBuffaloDairySubFilter,
        CamelDairySubFilter,
        RawCamelDairySubFilter,
        DonkeyDairySubFilter,
        RawDonkeyDairySubFilter,
        BeefSubFilter,
        PoultrySubFilter,
        SeafoodSubFilter,
        EggsSubFilter,
        FruitsSubFilter,
        VeggiesSubFilter,
        GrainsSubFilter,
        NutsSeedsSubFilter,
        SugarsSubFilter,
        OtherSubFilter,
        BeveragesSubFilter,
      ];

      // Try exact match first
      for (const enumType of enumsToCheck) {
        const enumValues = Object.values(enumType);
        const exactMatch = enumValues.find(
          (val) =>
            val.toLowerCase() === item.toLowerCase() ||
            val.toLowerCase() === singularItem.toLowerCase()
        );
        if (exactMatch) return exactMatch;
      }

      // Try partial matches
      for (const enumType of enumsToCheck) {
        const enumValues = Object.values(enumType);
        const partialMatch = enumValues.find((val) => {
          const enumSingular = toSingular(val);
          return (
            singularItem.toLowerCase().includes(enumSingular.toLowerCase()) ||
            enumSingular.toLowerCase().includes(singularItem.toLowerCase())
          );
        });
        if (partialMatch) return partialMatch;
      }

      // Special case mappings
      const specialCases: Record<string, SubFilter> = {
        milk: CowDairySubFilter.CowMilk,
        "raw milk": RawCowDairySubFilter.RawCowMilk,
        cheese: CowDairySubFilter.CowCheese,
        "raw cheese": RawCowDairySubFilter.RawCowCheese,
        butter: CowDairySubFilter.CowButter,
        "raw butter": RawCowDairySubFilter.RawCowButter,
        yogurt: CowDairySubFilter.CowYogurt,
        "raw yogurt": RawCowDairySubFilter.RawCowYogurt,
        egg: EggsSubFilter.ChickenEgg,
        eggs: EggsSubFilter.ChickenEgg,
        "chicken egg": EggsSubFilter.ChickenEgg,
        "chicken eggs": EggsSubFilter.ChickenEgg,
        "duck egg": EggsSubFilter.DuckEgg,
        "duck eggs": EggsSubFilter.DuckEgg,
      };

      const specialMatch = Object.entries(specialCases).find(([key]) => {
        const keysingular = toSingular(key);
        return (
          item.toLowerCase().includes(key) ||
          item.toLowerCase().includes(keysingular)
        );
      });
      if (specialMatch) return specialMatch[1];

      return null;
    };

    // Split by multiple delimiters and clean up
    const items = foodsText
      .split(/[,\n\\n\s]+/)
      .map((item) => item.trim())
      .filter(
        (item) =>
          item &&
          !item.startsWith("Products") &&
          !item.startsWith("Certification") &&
          !item.startsWith("Breed")
      );

    // Try to find two-word combinations
    for (let i = 0; i < items.length - 1; i++) {
      const twoWordPhrase = `${items[i]} ${items[i + 1]}`.trim();
      const match = findMatchingSubFilter(twoWordPhrase);
      if (match) {
        foods.add(match);
        i++; // Skip next word since it was part of the match
        continue;
      }
    }

    // Process individual words
    for (const item of items) {
      const match = findMatchingSubFilter(item);
      if (match) {
        foods.add(match);
      }
    }

    return Array.from(foods);
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const getCoordinates = async (
    address: string,
    retries = 3
  ): Promise<{ lat: number; lng: number; state: string | null } | null> => {
    for (let i = 0; i < retries; i++) {
      try {
        if (i > 0) await delay(1500);

        const response = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(
            address
          )}&limit=1`,
          {
            headers: { Accept: "application/json" },
          }
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        if (data.features?.[0]) {
          const [lng, lat] = data.features[0].geometry.coordinates;
          const properties = data.features[0].properties;

          let state = null;
          if (properties.state) {
            const stateEntry = Object.entries(StateCodeAddition).find(
              ([key]) => properties.state.toLowerCase() === key.toLowerCase()
            );
            state = stateEntry ? stateEntry[1] : null;
          }

          return { lat, lng, state };
        }
        return null;
      } catch (error) {
        if (i === retries - 1) {
          console.error("Error getting coordinates:", error);
          return null;
        }
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
            const result = await getCoordinates(farm.Adress);

            return {
              name: farm.Name,
              latitude: result?.lat || null,
              longitude: result?.lng || null,
              shipping: checkForShipping(farm.Features),
              site: extractURL(farm),
              foods: extractFoods(farm.Foods),
              standards: extractStandards(farm),
              address: farm.Adress,
              state: result?.state || null,
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

export default FarmCSVImport;
