import React, { useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Stack,
  Tabs,
  Tab,
  Button,
  Menu,
} from "@mui/material";
import {
  GiGoat,
  GiCow,
  GiDonkey,
  GiCamel,
  GiSheep,
  GiBuffaloHead,
} from "react-icons/gi";
import { Fa2, FaA, FaAsterisk } from "react-icons/fa6";
import {
  MainFilter,
  DairySubFilter,
  AllOptionDairy,
  AllOptionRawDairy,
  AllOption,
  AllOptionRaw,
} from "../utils/FilterEnums";
import {
  getAnimalFromAllProducts,
  getAllProductTypeOptions,
  getAllRegularDairyProducts,
  getAllRawDairyProducts,
  isAllProductsEnum,
} from "../utils/FilterHelpers";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
interface DairyFilterContentProps {
  mainType: MainFilter.Dairy | MainFilter.RawDairy;
  selectedOptions: DairySubFilter[];
  onChange: (newValue: DairySubFilter[]) => void;
  onClose: () => void;
  farmAdd: boolean;
  setFoodFilterActive: (active: boolean) => void;
}

export enum DairyAnimal {
  Cow = "Cow",
  AllDairy = "All Dairy",
  A2Dairy = "A2 Dairy",
  Goat = "Goat",
  Sheep = "Sheep",
  Buffalo = "Buffalo",
  Camel = "Camel",
  Donkey = "Donkey",
}

const DAIRY_ANIMALS = [
  DairyAnimal.Cow,
  DairyAnimal.AllDairy,
  DairyAnimal.A2Dairy,
  DairyAnimal.Goat,
  DairyAnimal.Sheep,
  DairyAnimal.Buffalo,
  DairyAnimal.Camel,
  DairyAnimal.Donkey,
];

const A2Icons = () => (
  <Stack direction="row" spacing={0.0} alignItems="center">
    <FaA size={8} />
    <Fa2 size={8} />
  </Stack>
);

const A2IconsLarge = () => (
  <Stack direction="row" spacing={0.0} alignItems="center">
    <FaA size={12} />
    <Fa2 size={12} />
  </Stack>
);

const animalIcons: Record<DairyAnimal, React.ElementType> = {
  [DairyAnimal.Cow]: GiCow,
  [DairyAnimal.Goat]: GiGoat,
  [DairyAnimal.Sheep]: GiSheep,
  [DairyAnimal.Buffalo]: GiBuffaloHead,
  [DairyAnimal.Camel]: GiCamel,
  [DairyAnimal.Donkey]: GiDonkey,
  [DairyAnimal.A2Dairy]: A2Icons,
  [DairyAnimal.AllDairy]: FaAsterisk,
};

const isSelectAllOption = (option: DairySubFilter): boolean => {
  return (
    option === AllOptionDairy.AllDairy ||
    option === AllOptionRawDairy.AllRawDairy ||
    option === AllOption.AllButter ||
    option === AllOption.AllCheese ||
    option === AllOption.AllMilk ||
    option === AllOption.AllYogurt ||
    option === AllOption.AllKefir ||
    option === AllOption.AllColostrum ||
    option === AllOptionRaw.AllRawButter ||
    option === AllOptionRaw.AllRawCheese ||
    option === AllOptionRaw.AllRawMilk ||
    option === AllOptionRaw.AllRawYogurt ||
    option === AllOptionRaw.AllRawKefir ||
    option === AllOptionRaw.AllRawColostrum
  );
};

const isRawDairyOption = (option: DairySubFilter): boolean => {
  const rawDairyProducts = getAllRawDairyProducts();
  return rawDairyProducts.includes(option);
};

const getRelatedOptions = (option: DairySubFilter): DairySubFilter[] => {
  if (option === AllOptionDairy.AllDairy) {
    return getAllRegularDairyProducts();
  }
  if (option === AllOptionRawDairy.AllRawDairy) {
    return getAllRawDairyProducts();
  }
  return getAllProductTypeOptions(option);
};

const isSecondarySelected = (
  option: DairySubFilter,
  selectedOptions: DairySubFilter[]
): boolean => {
  const isRawOption = isRawDairyOption(option);

  if (selectedOptions.includes(AllOptionDairy.AllDairy) && !isRawOption) {
    return true;
  }
  if (
    selectedOptions.includes(AllOptionRawDairy.AllRawDairy) &&
    (isRawOption || isSelectAllOption(option))
  ) {
    return true;
  }

  for (const selected of selectedOptions) {
    if (!isSelectAllOption(selected)) continue;

    const relatedOptions = getRelatedOptions(selected);
    if (relatedOptions.includes(option)) {
      return true;
    }
  }

  return false;
};

export default function DairyFilterContent({
  mainType,
  selectedOptions,
  onChange,
  farmAdd,
  setFoodFilterActive,
}: DairyFilterContentProps) {
  const [currentAnimal, setCurrentAnimal] = useState(
    farmAdd ? DAIRY_ANIMALS[1] : DAIRY_ANIMALS[0]
  );
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = (value?: string) => {
    setSortAnchorEl(null);
    if (value) setCurrentAnimal(value as DairyAnimal);
  };

  const handleProductSelect = (option: DairySubFilter) => {
    setFoodFilterActive(true);
    let newSelected = [...selectedOptions];

    if (isSelectAllOption(option)) {
      if (
        option === AllOptionDairy.AllDairy ||
        option === AllOptionRawDairy.AllRawDairy
      ) {
        newSelected = [option];
      } else {
        const isAlreadySelected = newSelected.includes(option);
        if (isAlreadySelected) {
          const relatedOptions = getRelatedOptions(option);
          newSelected = newSelected.filter(
            (opt) => !relatedOptions.includes(opt) && opt !== option
          );
        } else {
          newSelected = newSelected.filter(
            (opt) => !getAllProductTypeOptions(option).includes(opt)
          );

          newSelected = newSelected.filter(
            (opt) =>
              !isAllProductsEnum(opt) ||
              !getAllProductTypeOptions(opt).some((o) =>
                getAllProductTypeOptions(option).includes(o)
              )
          );

          newSelected.push(option);

          newSelected = newSelected.filter(
            (opt) =>
              opt !== AllOptionDairy.AllDairy &&
              opt !== AllOptionRawDairy.AllRawDairy
          );
        }
      }
    } else {
      const isAlreadySelected = newSelected.includes(option);

      newSelected = newSelected.filter(
        (opt) =>
          opt !== AllOptionDairy.AllDairy &&
          opt !== AllOptionRawDairy.AllRawDairy
      );

      if (isAlreadySelected) {
        newSelected = newSelected.filter((opt) => opt !== option);
      } else {
        newSelected = newSelected.filter((opt) => {
          if (isAllProductsEnum(opt)) {
            return !getAllProductTypeOptions(opt).includes(option);
          }
          return true;
        });
        newSelected.push(option);
      }
    }

    onChange(newSelected);
  };

  const getOptionsForCurrentTab = (): DairySubFilter[] => {
    switch (currentAnimal) {
      case DairyAnimal.A2Dairy:
        return mainType === MainFilter.Dairy
          ? getAnimalFromAllProducts(AllOptionDairy.AllA2Dairy)
          : getAnimalFromAllProducts(AllOptionRawDairy.AllRawA2Dairy);
      case DairyAnimal.Cow:
        return mainType === MainFilter.Dairy
          ? getAnimalFromAllProducts(AllOptionDairy.AllCowDairy)
          : getAnimalFromAllProducts(AllOptionRawDairy.AllRawCowDairy);
      case DairyAnimal.Goat:
        return mainType === MainFilter.Dairy
          ? getAnimalFromAllProducts(AllOptionDairy.AllGoatDairy)
          : getAnimalFromAllProducts(AllOptionRawDairy.AllRawGoatDairy);
      case DairyAnimal.Sheep:
        return mainType === MainFilter.Dairy
          ? getAnimalFromAllProducts(AllOptionDairy.AllSheepDairy)
          : getAnimalFromAllProducts(AllOptionRawDairy.AllRawSheepDairy);
      case DairyAnimal.Buffalo:
        return mainType === MainFilter.Dairy
          ? getAnimalFromAllProducts(AllOptionDairy.AllBuffaloDairy)
          : getAnimalFromAllProducts(AllOptionRawDairy.AllRawBuffaloDairy);
      case DairyAnimal.Camel:
        return mainType === MainFilter.Dairy
          ? getAnimalFromAllProducts(AllOptionDairy.AllCamelDairy)
          : getAnimalFromAllProducts(AllOptionRawDairy.AllRawCamelDairy);
      case DairyAnimal.Donkey:
        return mainType === MainFilter.Dairy
          ? getAnimalFromAllProducts(AllOptionDairy.AllDonkeyDairy)
          : getAnimalFromAllProducts(AllOptionRawDairy.AllRawDonkeyDairy);
      case DairyAnimal.AllDairy:
        return !farmAdd
          ? mainType === MainFilter.Dairy
            ? getAnimalFromAllProducts(AllOptionDairy.AllDairy)
            : getAnimalFromAllProducts(AllOptionRawDairy.AllRawDairy)
          : [];
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          ml: { xs: 0, md: 1 },
          mb: { xs: 3, md: 1 },
          pb: { xs: 3, md: 1 },
          borderBottom: 1,
          borderColor: "divider",
          pl: { xs: 2, sm: "inherit", md: "inherit", lg: "inherit" },
          pt: { xs: 2, sm: "inherit", md: "inherit", lg: "inherit" },
          width: "100%",
        }}
      >
        <Button
          endIcon={<ArrowDropDownIcon />}
          onClick={handleSortClick}
          sx={{
            bgcolor: "background.paper",
            textTransform: "none",
            width: "fit-content",
          }}
        >
          {currentAnimal}
        </Button>
        {React.createElement(
          currentAnimal === DairyAnimal.A2Dairy
            ? A2IconsLarge
            : (animalIcons[
                currentAnimal as DairyAnimal
              ] as React.ComponentType<{
                size: number;
              }>),
          { size: 24 }
        )}
        <Menu
          anchorEl={sortAnchorEl}
          open={Boolean(sortAnchorEl)}
          onClose={() => handleSortClose()}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: "8px",
              bgcolor: "background.paper",
              cursor: "pointer",
            },
          }}
        >
          {DAIRY_ANIMALS.map((animal) => {
            if (farmAdd && animal === DairyAnimal.AllDairy) return null;
            const IconComponent = animalIcons[animal as DairyAnimal];
            return (
              <MenuItem
                key={animal}
                selected={currentAnimal === animal}
                onClick={() => handleSortClose(animal)}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  {React.createElement(
                    IconComponent as React.ComponentType<{ size: number }>,
                    { size: 16 }
                  )}
                  <Typography>{animal}</Typography>
                </Stack>
              </MenuItem>
            );
          })}
        </Menu>
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
        {getOptionsForCurrentTab().map((option) => (
          <Tab
            key={option}
            label={
              <MenuItem
                key={option}
                onClick={() => handleProductSelect(option)}
                sx={{
                  borderRadius: 1,
                  p: 1.5,
                  pt: { xs: "inherit", sm: 1.2, md: 1.2, lg: 1.2 },
                  width: { xs: "inherit", sm: "100%", md: "100%", lg: "100%" },

                  backgroundColor: selectedOptions.includes(option)
                    ? "primary.light"
                    : "transparent",
                  border: isSecondarySelected(option, selectedOptions)
                    ? "1px solid"
                    : "1px solid transparent",
                  borderColor: isSecondarySelected(option, selectedOptions)
                    ? "primary.light"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: "primary.light",
                    border: "1px solid",
                    borderColor: "gray",
                  },
                }}
              >
                <Typography variant="body2">{option}</Typography>
              </MenuItem>
            }
            value={option}
          />
        ))}
        {currentAnimal === DairyAnimal.AllDairy && (
          <Typography
            variant="caption"
            sx={{
              textAlign: "center",
              fontStyle: "italic",
              color: "text.secondary",
              fontSize: "0.6rem",
            }}
          >
            Selections on the All Dairy tab apply to all animals
          </Typography>
        )}
      </Tabs>
    </>
  );
}
