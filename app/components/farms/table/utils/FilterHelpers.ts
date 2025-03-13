import {
  MainFilter,
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
  SubFilter,
  StandardsOption,
  StandardsCategory,
  CowDairySubFilter,
  A2DairySubFilter,
  GoatDairySubFilter,
  SheepDairySubFilter,
  BuffaloDairySubFilter,
  CamelDairySubFilter,
  DonkeyDairySubFilter,
  RawCowDairySubFilter,
  RawA2DairySubFilter,
  RawBuffaloDairySubFilter,
  RawCamelDairySubFilter,
  RawDonkeyDairySubFilter,
  RawGoatDairySubFilter,
  RawSheepDairySubFilter,
  ButterDairySubFilter,
  DairySubFilter,
  RawButterDairySubFilter,
  RawCheeseDairySubFilter,
  CheeseDairySubFilter,
  ColostrumDairySubFilter,
  KefirDairySubFilter,
  MilkDairySubFilter,
  YogurtDairySubFilter,
  RawColostrumDairySubFilter,
  RawKefirDairySubFilter,
  RawMilkDairySubFilter,
  RawYogurtDairySubFilter,
  AllOption,
  AllOptionRawDairy,
  AllOptionRaw,
  AllOptionDairy,
  BeveragesSubFilter,
} from "./FilterEnums";

export const getAllButterProducts = (): ButterDairySubFilter[] => [
  CowDairySubFilter.CowButter,
  A2DairySubFilter.A2Butter,
  GoatDairySubFilter.GoatButter,
  SheepDairySubFilter.SheepButter,
  BuffaloDairySubFilter.BuffaloButter,
  CamelDairySubFilter.CamelButter,
  DonkeyDairySubFilter.DonkeyButter,
];

export const getAllRawButterProducts = (): RawButterDairySubFilter[] => [
  RawCowDairySubFilter.RawCowButter,
  RawA2DairySubFilter.RawA2Butter,
  RawGoatDairySubFilter.RawGoatButter,
  RawSheepDairySubFilter.RawSheepButter,
  RawBuffaloDairySubFilter.RawBuffaloButter,
  RawCamelDairySubFilter.RawCamelButter,
  RawDonkeyDairySubFilter.RawDonkeyButter,
];

export const getAllCheeseProducts = (): CheeseDairySubFilter[] => [
  CowDairySubFilter.CowCheese,
  A2DairySubFilter.A2Cheese,
  GoatDairySubFilter.GoatCheese,
  SheepDairySubFilter.SheepCheese,
  BuffaloDairySubFilter.BuffaloCheese,
  CamelDairySubFilter.CamelCheese,
  DonkeyDairySubFilter.DonkeyCheese,
];

export const getAllRawCheeseProducts = (): RawCheeseDairySubFilter[] => [
  RawCowDairySubFilter.RawCowCheese,
  RawA2DairySubFilter.RawA2Cheese,
  RawGoatDairySubFilter.RawGoatCheese,
  RawSheepDairySubFilter.RawSheepCheese,
  RawBuffaloDairySubFilter.RawBuffaloCheese,
  RawCamelDairySubFilter.RawCamelCheese,
  RawDonkeyDairySubFilter.RawDonkeyCheese,
];

export const getAllMilkProducts = (): MilkDairySubFilter[] => [
  CowDairySubFilter.CowMilk,
  A2DairySubFilter.A2Milk,
  GoatDairySubFilter.GoatMilk,
  SheepDairySubFilter.SheepMilk,
  BuffaloDairySubFilter.BuffaloMilk,
  CamelDairySubFilter.CamelMilk,
  DonkeyDairySubFilter.DonkeyMilk,
];

export const getAllRawMilkProducts = (): RawMilkDairySubFilter[] => [
  RawCowDairySubFilter.RawCowMilk,
  RawA2DairySubFilter.RawA2Milk,
  RawGoatDairySubFilter.RawGoatMilk,
  RawSheepDairySubFilter.RawSheepMilk,
  RawBuffaloDairySubFilter.RawBuffaloMilk,
  RawCamelDairySubFilter.RawCamelMilk,
  RawDonkeyDairySubFilter.RawDonkeyMilk,
];

export const getAllYogurtProducts = (): YogurtDairySubFilter[] => [
  CowDairySubFilter.CowYogurt,
  A2DairySubFilter.A2Yogurt,
  GoatDairySubFilter.GoatYogurt,
  SheepDairySubFilter.SheepYogurt,
  BuffaloDairySubFilter.BuffaloYogurt,
  CamelDairySubFilter.CamelYogurt,
  DonkeyDairySubFilter.DonkeyYogurt,
];

export const getAllRawYogurtProducts = (): RawYogurtDairySubFilter[] => [
  RawCowDairySubFilter.RawCowYogurt,
  RawA2DairySubFilter.RawA2Yogurt,
  RawGoatDairySubFilter.RawGoatYogurt,
  RawSheepDairySubFilter.RawSheepYogurt,
  RawBuffaloDairySubFilter.RawBuffaloYogurt,
  RawCamelDairySubFilter.RawCamelYogurt,
  RawDonkeyDairySubFilter.RawDonkeyYogurt,
];

export const getAllKefirProducts = (): KefirDairySubFilter[] => [
  CowDairySubFilter.CowKefir,
  A2DairySubFilter.A2Kefir,
  GoatDairySubFilter.GoatKefir,
  SheepDairySubFilter.SheepKefir,
  BuffaloDairySubFilter.BuffaloKefir,
  CamelDairySubFilter.CamelKefir,
  DonkeyDairySubFilter.DonkeyKefir,
];

export const getAllRawKefirProducts = (): RawKefirDairySubFilter[] => [
  RawCowDairySubFilter.RawCowKefir,
  RawA2DairySubFilter.RawA2Kefir,
  RawGoatDairySubFilter.RawGoatKefir,
  RawSheepDairySubFilter.RawSheepKefir,
  RawBuffaloDairySubFilter.RawBuffaloKefir,
  RawCamelDairySubFilter.RawCamelKefir,
  RawDonkeyDairySubFilter.RawDonkeyKefir,
];

export const getAllColostrumProducts = (): ColostrumDairySubFilter[] => [
  CowDairySubFilter.CowColostrum,
  A2DairySubFilter.A2Colostrum,
  GoatDairySubFilter.GoatColostrum,
  SheepDairySubFilter.SheepColostrum,
  BuffaloDairySubFilter.BuffaloColostrum,
  CamelDairySubFilter.CamelColostrum,
  DonkeyDairySubFilter.DonkeyColostrum,
];

export const getAllRawColostrumProducts = (): RawColostrumDairySubFilter[] => [
  RawCowDairySubFilter.RawCowColostrum,
  RawA2DairySubFilter.RawA2Colostrum,
  RawGoatDairySubFilter.RawGoatColostrum,
  RawSheepDairySubFilter.RawSheepColostrum,
  RawBuffaloDairySubFilter.RawBuffaloColostrum,
  RawCamelDairySubFilter.RawCamelColostrum,
  RawDonkeyDairySubFilter.RawDonkeyColostrum,
];

// Dairy Products Helpers
export const getAllRegularDairyProducts = (): DairySubFilter[] => [
  ...Object.values(CowDairySubFilter),
  ...Object.values(A2DairySubFilter),
  ...Object.values(GoatDairySubFilter),
  ...Object.values(SheepDairySubFilter),
  ...Object.values(BuffaloDairySubFilter),
  ...Object.values(CamelDairySubFilter),
  ...Object.values(DonkeyDairySubFilter),
];

export const getAllRawDairyProducts = (): DairySubFilter[] => [
  ...Object.values(RawCowDairySubFilter),
  ...Object.values(RawA2DairySubFilter),
  ...Object.values(RawGoatDairySubFilter),
  ...Object.values(RawSheepDairySubFilter),
  ...Object.values(RawBuffaloDairySubFilter),
  ...Object.values(RawCamelDairySubFilter),
  ...Object.values(RawDonkeyDairySubFilter),
];

export const getAllProductTypeOptions = (
  value: DairySubFilter
): DairySubFilter[] => {
  switch (value) {
    case AllOption.AllButter:
      return getAllButterProducts();
    case AllOption.AllCheese:
      return getAllCheeseProducts();
    case AllOption.AllMilk:
      return getAllMilkProducts();
    case AllOption.AllYogurt:
      return getAllYogurtProducts();
    case AllOption.AllKefir:
      return getAllKefirProducts();
    case AllOption.AllColostrum:
      return getAllColostrumProducts();
    case AllOptionRaw.AllRawButter:
      return getAllRawButterProducts();
    case AllOptionRaw.AllRawCheese:
      return getAllRawCheeseProducts();
    case AllOptionRaw.AllRawMilk:
      return getAllRawMilkProducts();
    case AllOptionRaw.AllRawYogurt:
      return getAllRawYogurtProducts();
    case AllOptionRaw.AllRawKefir:
      return getAllRawKefirProducts();
    case AllOptionRaw.AllRawColostrum:
      return getAllRawColostrumProducts();

    default:
      return [];
  }
};

export const getAnimalFromAllProducts = (
  value: DairySubFilter
): DairySubFilter[] => {
  switch (value) {
    case AllOptionDairy.AllDairy:
      return [
        AllOption.AllButter,
        AllOption.AllCheese,
        AllOption.AllMilk,
        AllOption.AllYogurt,
        AllOption.AllKefir,
        AllOption.AllColostrum,
        AllOptionDairy.AllDairy,
      ];
    case AllOptionRawDairy.AllRawDairy:
      return [
        AllOptionRaw.AllRawButter,
        AllOptionRaw.AllRawCheese,
        AllOptionRaw.AllRawMilk,
        AllOptionRaw.AllRawYogurt,
        AllOptionRaw.AllRawKefir,
        AllOptionRaw.AllRawColostrum,
        AllOptionRawDairy.AllRawDairy,
      ];
    case AllOptionDairy.AllCowDairy:
      return [
        CowDairySubFilter.CowButter,
        CowDairySubFilter.CowCheese,
        CowDairySubFilter.CowMilk,
        CowDairySubFilter.CowYogurt,
        CowDairySubFilter.CowKefir,
        CowDairySubFilter.CowColostrum,
        CowDairySubFilter.Ghee,
      ];
    case AllOptionDairy.AllA2Dairy:
      return [
        A2DairySubFilter.A2Butter,
        A2DairySubFilter.A2Cheese,
        A2DairySubFilter.A2Milk,
        A2DairySubFilter.A2Yogurt,
        A2DairySubFilter.A2Kefir,
        A2DairySubFilter.A2Colostrum,
        A2DairySubFilter.A2Ghee,
      ];
    case AllOptionDairy.AllGoatDairy:
      return [
        GoatDairySubFilter.GoatButter,
        GoatDairySubFilter.GoatCheese,
        GoatDairySubFilter.GoatMilk,
        GoatDairySubFilter.GoatYogurt,
        GoatDairySubFilter.GoatKefir,
        GoatDairySubFilter.GoatColostrum,
      ];
    case AllOptionDairy.AllSheepDairy:
      return [
        SheepDairySubFilter.SheepButter,
        SheepDairySubFilter.SheepCheese,
        SheepDairySubFilter.SheepMilk,
        SheepDairySubFilter.SheepYogurt,
        SheepDairySubFilter.SheepKefir,
        SheepDairySubFilter.SheepColostrum,
      ];
    case AllOptionDairy.AllBuffaloDairy:
      return [
        BuffaloDairySubFilter.BuffaloButter,
        BuffaloDairySubFilter.BuffaloCheese,
        BuffaloDairySubFilter.BuffaloMilk,
        BuffaloDairySubFilter.BuffaloYogurt,
        BuffaloDairySubFilter.BuffaloKefir,
        BuffaloDairySubFilter.BuffaloColostrum,
      ];
    case AllOptionDairy.AllCamelDairy:
      return [
        CamelDairySubFilter.CamelButter,
        CamelDairySubFilter.CamelCheese,
        CamelDairySubFilter.CamelMilk,
        CamelDairySubFilter.CamelYogurt,
        CamelDairySubFilter.CamelKefir,
        CamelDairySubFilter.CamelColostrum,
      ];
    case AllOptionDairy.AllDonkeyDairy:
      return [
        DonkeyDairySubFilter.DonkeyButter,
        DonkeyDairySubFilter.DonkeyCheese,
        DonkeyDairySubFilter.DonkeyMilk,
        DonkeyDairySubFilter.DonkeyYogurt,
        DonkeyDairySubFilter.DonkeyKefir,
        DonkeyDairySubFilter.DonkeyColostrum,
      ];
    case AllOptionRawDairy.AllRawCowDairy:
      return [
        RawCowDairySubFilter.RawCowButter,
        RawCowDairySubFilter.RawCowCheese,
        RawCowDairySubFilter.RawCowMilk,
        RawCowDairySubFilter.RawCowYogurt,
        RawCowDairySubFilter.RawCowKefir,
        RawCowDairySubFilter.RawCowColostrum,
        RawCowDairySubFilter.RawCowGhee,
      ];
    case AllOptionRawDairy.AllRawA2Dairy:
      return [
        RawA2DairySubFilter.RawA2Butter,
        RawA2DairySubFilter.RawA2Cheese,
        RawA2DairySubFilter.RawA2Milk,
        RawA2DairySubFilter.RawA2Yogurt,
        RawA2DairySubFilter.RawA2Kefir,
        RawA2DairySubFilter.RawA2Colostrum,
        RawA2DairySubFilter.RawA2Ghee,
      ];
    case AllOptionRawDairy.AllRawGoatDairy:
      return [
        RawGoatDairySubFilter.RawGoatButter,
        RawGoatDairySubFilter.RawGoatCheese,
        RawGoatDairySubFilter.RawGoatMilk,
        RawGoatDairySubFilter.RawGoatYogurt,
        RawGoatDairySubFilter.RawGoatKefir,
        RawGoatDairySubFilter.RawGoatColostrum,
      ];
    case AllOptionRawDairy.AllRawSheepDairy:
      return [
        RawSheepDairySubFilter.RawSheepButter,
        RawSheepDairySubFilter.RawSheepCheese,
        RawSheepDairySubFilter.RawSheepMilk,
        RawSheepDairySubFilter.RawSheepYogurt,
        RawSheepDairySubFilter.RawSheepKefir,
        RawSheepDairySubFilter.RawSheepColostrum,
      ];
    case AllOptionRawDairy.AllRawBuffaloDairy:
      return [
        RawBuffaloDairySubFilter.RawBuffaloButter,
        RawBuffaloDairySubFilter.RawBuffaloCheese,
        RawBuffaloDairySubFilter.RawBuffaloMilk,
        RawBuffaloDairySubFilter.RawBuffaloYogurt,
        RawBuffaloDairySubFilter.RawBuffaloKefir,
        RawBuffaloDairySubFilter.RawBuffaloColostrum,
      ];
    case AllOptionRawDairy.AllRawCamelDairy:
      return [
        RawCamelDairySubFilter.RawCamelButter,
        RawCamelDairySubFilter.RawCamelCheese,
        RawCamelDairySubFilter.RawCamelMilk,
        RawCamelDairySubFilter.RawCamelYogurt,
        RawCamelDairySubFilter.RawCamelKefir,
        RawCamelDairySubFilter.RawCamelColostrum,
      ];
    case AllOptionRawDairy.AllRawDonkeyDairy:
      return [
        RawDonkeyDairySubFilter.RawDonkeyButter,
        RawDonkeyDairySubFilter.RawDonkeyCheese,
        RawDonkeyDairySubFilter.RawDonkeyMilk,
        RawDonkeyDairySubFilter.RawDonkeyYogurt,
        RawDonkeyDairySubFilter.RawDonkeyKefir,
        RawDonkeyDairySubFilter.RawDonkeyColostrum,
      ];
    default:
      return [];
  }
};

// General Helper Functions
export const isAllProductsEnum = (value: SubFilter): boolean => {
  switch (value) {
    case AllOptionDairy.AllDairy:
    case AllOptionRawDairy.AllRawDairy:
    case AllOption.AllButter:
    case AllOption.AllCheese:
    case AllOption.AllMilk:
    case AllOption.AllYogurt:
    case AllOption.AllKefir:
    case AllOption.AllColostrum:
    case AllOptionRaw.AllRawButter:
    case AllOptionRaw.AllRawCheese:
    case AllOptionRaw.AllRawMilk:
    case AllOptionRaw.AllRawYogurt:
    case AllOptionRaw.AllRawKefir:
    case AllOptionRaw.AllRawColostrum:
      return true;
    default:
      return false;
  }
};

export const getAllProductsForMainFilter = (
  mainFilter: MainFilter
): SubFilter[] => {
  switch (mainFilter) {
    case MainFilter.Dairy:
      return getAllRegularDairyProducts();
    case MainFilter.RawDairy:
      return getAllRawDairyProducts();
    case MainFilter.Beef:
      return getAllSubOptions(MainFilter.Beef);
    case MainFilter.Poultry:
      return getAllSubOptions(MainFilter.Poultry);
    case MainFilter.Seafood:
      return getAllSubOptions(MainFilter.Seafood);
    case MainFilter.Eggs:
      return getAllSubOptions(MainFilter.Eggs);
    case MainFilter.Fruits:
      return getAllSubOptions(MainFilter.Fruits);
    case MainFilter.Veggies:
      return getAllSubOptions(MainFilter.Veggies);
    case MainFilter.Grains:
      return getAllSubOptions(MainFilter.Grains);
    case MainFilter.Nuts:
      return getAllSubOptions(MainFilter.Nuts);
    case MainFilter.Sugars:
      return getAllSubOptions(MainFilter.Sugars);
    case MainFilter.Beverages:
      return getAllSubOptions(MainFilter.Beverages);
    default:
      return [];
  }
};

export const isAllOption = (
  value: SubFilter,
  mainFilter: MainFilter
): boolean => {
  switch (mainFilter) {
    case MainFilter.Dairy:
    case MainFilter.RawDairy:
      return (
        value === AllOptionDairy.AllDairy ||
        value === AllOptionRawDairy.AllRawDairy
      );
    default:
      return false;
  }
};

export const getStandardsByCategory = (
  category: StandardsCategory
): StandardsOption[] => {
  const standardMap: Record<StandardsCategory, StandardsOption[]> = {
    [StandardsCategory.Organic]: [
      StandardsOption.Organic,
      StandardsOption.NGMO,
      StandardsOption.CCOF,
      StandardsOption.USDAO,
      StandardsOption.OTCO,
      StandardsOption.AGC,
      StandardsOption.EOV,
      StandardsOption.CNG,
      StandardsOption.CNR,
      StandardsOption.RealOrganic,
    ],
    [StandardsCategory.Regenerative]: [
      StandardsOption.Regenerative,
      StandardsOption.RotationalGrazing,
      StandardsOption.NoTill,
      StandardsOption.DBC,
      StandardsOption.ROC,
      StandardsOption.SIEOV,
      StandardsOption.CRAGW,
    ],
    [StandardsCategory.ChemicalFree]: [
      StandardsOption.ChemicalFree,
      StandardsOption.NoPesticide,
      StandardsOption.NoFungicides,
      StandardsOption.NoHerbicides,
      StandardsOption.CPF,
      StandardsOption.PRF,
    ],
    [StandardsCategory.AnimalWelfare]: [
      StandardsOption.GrassFed,
      StandardsOption.PastureRaised,
      StandardsOption.GRFC,
      StandardsOption.HFree,
      StandardsOption.AntibioticFree,
      StandardsOption.CertifiedHumane,
      StandardsOption.GAP,
      StandardsOption.NoMRNAVAX,
      StandardsOption.NoVax,
      StandardsOption.AWA,
      StandardsOption.SteroidFree,
    ],
    [StandardsCategory.Sustainability]: [
      StandardsOption.Rainforest,
      StandardsOption.FairTrade,
      StandardsOption.FoodAlliance,
      StandardsOption.CarbonNegative,
    ],
    [StandardsCategory.Religious]: [
      StandardsOption.Kosher,
      StandardsOption.Halal,
    ],
  };
  return standardMap[category];
};

// Helper functions for working with standards enums for display
export const getStandardDisplayName = (stan: StandardsOption): string => {
  const displayNames: Record<StandardsOption, string> = {
    [StandardsOption.CCOF]: "California Certified Organic Farmers",
    [StandardsOption.USDAO]: "USDA Organic",
    [StandardsOption.OTCO]: "Oregon Tilth Certified Organic",
    [StandardsOption.DBC]: "Demeter Biodynamic Certification",
    [StandardsOption.NGMO]: "Non-GMO",
    [StandardsOption.Organic]: "Organic",
    [StandardsOption.RealOrganic]: "Real Organic",
    [StandardsOption.Regenerative]: "Regenerative",
    [StandardsOption.RotationalGrazing]: "Rotational Grazing",
    [StandardsOption.NoTill]: "No Till",
    [StandardsOption.NoFungicides]: "Fungicides Free",
    [StandardsOption.AWA]: "Animal Welfare Approved",
    [StandardsOption.NGMOProject]: "Non-GMO Project",
    [StandardsOption.AGC]: "American Grassfed Certification",
    [StandardsOption.EOV]: "Ecological Outcome Verification",
    [StandardsOption.CNG]: "Certified Naturally Grown",
    [StandardsOption.CNR]: "Certified Natural Ruminant",
    [StandardsOption.ROC]: "Regenerative Organic Certified",
    [StandardsOption.SIEOV]: "Savory Institute Ecological Outcome Ver",
    [StandardsOption.CRAGW]: "Carbon Reduction Agriculture Green World",
    [StandardsOption.ChemicalFree]: "Chemical Free",
    [StandardsOption.GRFC]: "Grass Fed Certification",
    [StandardsOption.HFree]: "Hormone Free",
    [StandardsOption.CPF]: "Chemical Pesticide Free",
    [StandardsOption.PRF]: "Pesticide Residue Free",
    [StandardsOption.NoHerbicides]: "Herbicides Free",
    [StandardsOption.AntibioticFree]: "Antibiotic Free",
    [StandardsOption.NoPesticide]: "Pesticide Free",
    [StandardsOption.NoMRNAVAX]: "MRNA/Vax Free",
    [StandardsOption.NoVax]: "Vax Free",
    [StandardsOption.SteroidFree]: "Steroid Free",
    [StandardsOption.PastureRaised]: "Pasture Raised",
    [StandardsOption.GrassFed]: "Grass Fed",
    [StandardsOption.CertifiedHumane]: "Certified Humane",
    [StandardsOption.GAP]: "Global Animal Partnership",
    [StandardsOption.Rainforest]: "Rainforest Alliance",
    [StandardsOption.FairTrade]: "Fair Trade",
    [StandardsOption.FoodAlliance]: "Food Alliance",
    [StandardsOption.CarbonNegative]: "Carbon Negative",
    [StandardsOption.Kosher]: "Kosher",
    [StandardsOption.Halal]: "Halal",
  };
  return displayNames[stan];
};
// export const parentChildMapStandards = new Map<
//   StandardsOption,
//   StandardsOption[]
// >([
//   [
//     StandardsOption.AllOrganic,
//     [
//       StandardsOption.CCOF,
//       StandardsOption.USDAO,
//       StandardsOption.OTCO,
//       StandardsOption.NGMO,
//       StandardsOption.NGMOProject,
//       StandardsOption.AGC,
//       StandardsOption.EOV,
//       StandardsOption.CNG,
//       StandardsOption.CNR,
//     ],
//   ],
//   [
//     StandardsOption.AllRegenerative,
//     [
//       StandardsOption.RotationalGrazing,
//       StandardsOption.NoTill,
//       StandardsOption.Regenerative,
//       StandardsOption.DBC,
//       StandardsOption.ROC,
//       StandardsOption.SIEOV,
//       StandardsOption.CRAGW,
//     ],
//   ],
//   [
//     StandardsOption.AllChemicalFree,
//     [
//       StandardsOption.ChemicalFree,
//       StandardsOption.GRFC,
//       StandardsOption.HFree,
//       StandardsOption.CPF,
//       StandardsOption.PRF,
//     ],
//   ],
//   [
//     StandardsOption.AllAnimalWelfare,
//     [
//       StandardsOption.CertifiedHumane,
//       StandardsOption.PastureRaised,
//       StandardsOption.GrassFed,
//       StandardsOption.GAP,
//     ],
//   ],
//   [
//     StandardsOption.AllSustainability,
//     [
//       StandardsOption.Rainforest,
//       StandardsOption.FairTrade,
//       StandardsOption.FoodAlliance,
//     ],
//   ],
// ]);

// export const parentStandardsOptionsSet = new Set([
//   StandardsOption.AllOrganic,
//   StandardsOption.AllRegenerative,
//   StandardsOption.AllChemicalFree,
//   StandardsOption.AllAnimalWelfare,
//   StandardsOption.AllSustainability,
// ]);

export const getAllStanSubOptions = (
  cert: StandardsOption
): StandardsOption[] => {
  // If it's not a parent option, return just that option
  return [cert];
};

export const getAllSubOptions = (main: MainFilter): SubFilter[] => {
  switch (main) {
    case MainFilter.Dairy:
      return [
        CowDairySubFilter.CowButter,
        CowDairySubFilter.CowCheese,
        CowDairySubFilter.CowMilk,
        CowDairySubFilter.CowYogurt,
        CowDairySubFilter.CowKefir,
        CowDairySubFilter.CowColostrum,
        A2DairySubFilter.A2Butter,
        A2DairySubFilter.A2Cheese,
        A2DairySubFilter.A2Milk,
        A2DairySubFilter.A2Yogurt,
        A2DairySubFilter.A2Kefir,
        A2DairySubFilter.A2Colostrum,
        GoatDairySubFilter.GoatButter,
        GoatDairySubFilter.GoatCheese,
        GoatDairySubFilter.GoatMilk,
        GoatDairySubFilter.GoatYogurt,
        GoatDairySubFilter.GoatKefir,
        GoatDairySubFilter.GoatColostrum,
        SheepDairySubFilter.SheepButter,
        SheepDairySubFilter.SheepCheese,
        SheepDairySubFilter.SheepMilk,
        SheepDairySubFilter.SheepYogurt,
        SheepDairySubFilter.SheepKefir,
        SheepDairySubFilter.SheepColostrum,
        BuffaloDairySubFilter.BuffaloButter,
        BuffaloDairySubFilter.BuffaloCheese,
        BuffaloDairySubFilter.BuffaloMilk,
        BuffaloDairySubFilter.BuffaloYogurt,
        BuffaloDairySubFilter.BuffaloKefir,
        BuffaloDairySubFilter.BuffaloColostrum,
        CamelDairySubFilter.CamelButter,
        CamelDairySubFilter.CamelCheese,
        CamelDairySubFilter.CamelMilk,
        CamelDairySubFilter.CamelYogurt,
        CamelDairySubFilter.CamelKefir,
        CamelDairySubFilter.CamelColostrum,
        DonkeyDairySubFilter.DonkeyButter,
        DonkeyDairySubFilter.DonkeyCheese,
        DonkeyDairySubFilter.DonkeyMilk,
        DonkeyDairySubFilter.DonkeyYogurt,
        DonkeyDairySubFilter.DonkeyKefir,
        DonkeyDairySubFilter.DonkeyColostrum,
        A2DairySubFilter.A2Ghee,
        CowDairySubFilter.Ghee,
      ];

    case MainFilter.RawDairy:
      return getAllRawDairyProducts();

    case MainFilter.Beef:
      return Object.values(BeefSubFilter);

    case MainFilter.Poultry:
      return Object.values(PoultrySubFilter);

    case MainFilter.Seafood:
      return Object.values(SeafoodSubFilter);

    case MainFilter.Eggs:
      return Object.values(EggsSubFilter);

    case MainFilter.Fruits:
      return Object.values(FruitsSubFilter);

    case MainFilter.Veggies:
      return Object.values(VeggiesSubFilter);

    case MainFilter.Grains:
      return Object.values(GrainsSubFilter);

    case MainFilter.Nuts:
      return Object.values(NutsSeedsSubFilter);

    case MainFilter.Sugars:
      return Object.values(SugarsSubFilter);

    case MainFilter.Beverages:
      return Object.values(BeveragesSubFilter);

    case MainFilter.Other:
      return Object.values(OtherSubFilter);
    default:
      return [];
  }
};

export function doesFoodMatchFilter(
  food: SubFilter,
  filter: { main: MainFilter; subOptions: string[] }
): boolean {
  // Direct match for specific products
  return filter.subOptions.some((option) => food === option);
}

export function getApplicableOptions(
  selectedOptions: DairySubFilter[]
): string[] {
  return selectedOptions.flatMap((option: DairySubFilter) => {
    switch (option) {
      case AllOptionDairy.AllDairy:
        return getAllRegularDairyProducts();
      case AllOptionDairy.AllCowDairy:
      case AllOptionDairy.AllA2Dairy:
      case AllOptionDairy.AllGoatDairy:
      case AllOptionDairy.AllSheepDairy:
      case AllOptionDairy.AllBuffaloDairy:
      case AllOptionDairy.AllCamelDairy:
      case AllOptionDairy.AllDonkeyDairy:
      default: {
        const allProductTypeOptions = getAllProductTypeOptions(option);
        if (allProductTypeOptions.length > 0) {
          return allProductTypeOptions;
        }
        if (isAllProductsEnum(option)) {
          return getAnimalFromAllProducts(option);
        }
        return [option];
      }
    }
  });
}

export function getApplicableRawOptions(
  selectedRawOptions: DairySubFilter[]
): string[] {
  return selectedRawOptions.flatMap((option: DairySubFilter) => {
    switch (option) {
      case AllOptionRawDairy.AllRawDairy:
        return getAllRawDairyProducts();
      case AllOptionRawDairy.AllRawCowDairy:
      case AllOptionRawDairy.AllRawA2Dairy:
      case AllOptionRawDairy.AllRawGoatDairy:
      case AllOptionRawDairy.AllRawSheepDairy:
      case AllOptionRawDairy.AllRawBuffaloDairy:
      case AllOptionRawDairy.AllRawCamelDairy:
      case AllOptionRawDairy.AllRawDonkeyDairy:
        return getAnimalFromAllProducts(option);
      default: {
        const allProductTypeOptions = getAllProductTypeOptions(option);
        if (allProductTypeOptions.length > 0) {
          return allProductTypeOptions;
        }
        if (isAllProductsEnum(option)) {
          return getAnimalFromAllProducts(option);
        }
        return [option];
      }
    }
  });
}
