export enum StateCodeAddition {
  Alabama = "AL",
  Alaska = "AK",
  Arizona = "AZ",
  Arkansas = "AR",
  California = "CA",
  Colorado = "CO",
  Connecticut = "CT",
  Delaware = "DE",
  Florida = "FL",
  Georgia = "GA",
  Hawaii = "HI",
  Idaho = "ID",
  Illinois = "IL",
  Indiana = "IN",
  Iowa = "IA",
  Kansas = "KS",
  Kentucky = "KY",
  Louisiana = "LA",
  Maine = "ME",
  Maryland = "MD",
  Massachusetts = "MA",
  Michigan = "MI",
  Minnesota = "MN",
  Mississippi = "MS",
  Missouri = "MO",
  Montana = "MT",
  Nebraska = "NE",
  Nevada = "NV",
  NewHampshire = "NH",
  NewJersey = "NJ",
  NewMexico = "NM",
  NewYork = "NY",
  NorthCarolina = "NC",
  NorthDakota = "ND",
  Ohio = "OH",
  Oklahoma = "OK",
  Oregon = "OR",
  Pennsylvania = "PA",
  RhodeIsland = "RI",
  SouthCarolina = "SC",
  SouthDakota = "SD",
  Tennessee = "TN",
  Texas = "TX",
  Utah = "UT",
  Vermont = "VT",
  Virginia = "VA",
  Washington = "WA",
  WestVirginia = "WV",
  Wisconsin = "WI",
  Wyoming = "WY",
  DistrictOfColumbia = "DC",
}
export enum StateCode {
  AL = "AL",
  AK = "AK",
  AZ = "AZ",
  AR = "AR",
  CA = "CA",
  CO = "CO",
  CT = "CT",
  DE = "DE",
  FL = "FL",
  GA = "GA",
  HI = "HI",
  ID = "ID",
  IL = "IL",
  IN = "IN",
  IA = "IA",
  KS = "KS",
  KY = "KY",
  LA = "LA",
  ME = "ME",
  MD = "MD",
  MA = "MA",
  MI = "MI",
  MN = "MN",
  MS = "MS",
  MO = "MO",
  MT = "MT",
  NE = "NE",
  NV = "NV",
  NH = "NH",
  NJ = "NJ",
  NM = "NM",
  NY = "NY",
  NC = "NC",
  ND = "ND",
  OH = "OH",
  OK = "OK",
  OR = "OR",
  PA = "PA",
  RI = "RI",
  SC = "SC",
  SD = "SD",
  TN = "TN",
  TX = "TX",
  UT = "UT",
  VT = "VT",
  VA = "VA",
  WA = "WA",
  WV = "WV",
  WI = "WI",
  WY = "WY",
  DC = "DC",
}
/* Main category enums */
export enum MainFilter {
  Dairy = "Dairy",
  RawDairy = "Raw Dairy",
  Beef = "Red Meat",
  Poultry = "Poultry",
  Seafood = "Seafood",
  Eggs = "Eggs",
  Fruits = "Fruits",
  Veggies = "Veggies",
  Grains = "Grains",
  Nuts = "Nuts/Seeds",
  Sugars = "Sugars",
  Beverages = "Beverages",
  Other = "Other",
}

export enum CowDairySubFilter {
  /* Cow Dairy Products */
  DairyOptionAllCow = "All Cow Dairy",
  CowButter = "Butter",
  CowCheese = "Cheese",
  CowMilk = "Milk",
  CowYogurt = "Yogurt",
  CowKefir = "Kefir",
  CowColostrum = "Colostrum",
  Ghee = "Ghee",
}

export enum A2DairySubFilter {
  /* A2 Dairy Products */
  A2DairyOptionAll = "All A2 Dairy",
  A2Butter = "A2 Butter",
  A2Cheese = "A2 Cheese",
  A2Milk = "A2 Milk",
  A2Yogurt = "A2 Yogurt",
  A2Kefir = "A2 Kefir",
  A2Colostrum = "A2 Colostrum",
  A2Ghee = "A2 Ghee",
}

export enum GoatDairySubFilter {
  /* Goat Dairy Products */
  GoatDairyOptionAll = "All Goat Dairy",
  GoatButter = "Goat Butter",
  GoatCheese = "Goat Cheese",
  GoatMilk = "Goat Milk",
  GoatYogurt = "Goat Yogurt",
  GoatKefir = "Goat Kefir",
  GoatColostrum = "Goat Colostrum",
}

export enum SheepDairySubFilter {
  /* Sheep Dairy Products */
  SheepDairyOptionAll = "All Sheep Dairy",
  SheepButter = "Sheep Butter",
  SheepCheese = "Sheep Cheese",
  SheepMilk = "Sheep Milk",
  SheepYogurt = "Sheep Yogurt",
  SheepKefir = "Sheep Kefir",
  SheepColostrum = "Sheep Colostrum",
}

export enum BuffaloDairySubFilter {
  /* Buffalo Dairy Products */
  BuffaloDairyOptionAll = "All Buffalo Dairy",
  BuffaloButter = "Buffalo Butter",
  BuffaloCheese = "Buffalo Cheese",
  BuffaloMilk = "Buffalo Milk",
  BuffaloYogurt = "Buffalo Yogurt",
  BuffaloKefir = "Buffalo Kefir",
  BuffaloColostrum = "Buffalo Colostrum",
}

export enum CamelDairySubFilter {
  /* Camel Dairy Products */
  CamelDairyOptionAll = "All Camel Dairy",
  CamelButter = "Camel Butter",
  CamelCheese = "Camel Cheese",
  CamelMilk = "Camel Milk",
  CamelYogurt = "Camel Yogurt",
  CamelKefir = "Camel Kefir",
  CamelColostrum = "Camel Colostrum",
}

export enum DonkeyDairySubFilter {
  /* Donkey Dairy Products */
  DonkeyDairyOptionAll = "All Donkey Dairy",
  DonkeyButter = "Donkey Butter",
  DonkeyCheese = "Donkey Cheese",
  DonkeyMilk = "Donkey Milk",
  DonkeyYogurt = "Donkey Yogurt",
  DonkeyKefir = "Donkey Kefir",
  DonkeyColostrum = "Donkey Colostrum",
}

export enum RawCowDairySubFilter {
  /* Raw Cow Dairy Products */
  RawDairyOptionAllCow = "All Raw Cow Dairy",
  RawCowButter = "Raw Butter",
  RawCowCheese = "Raw Cheese",
  RawCowMilk = "Raw Milk",
  RawCowYogurt = "Raw Yogurt",
  RawCowKefir = "Raw Kefir",
  RawCowColostrum = "Raw Colostrum",
  RawCowGhee = "Raw Ghee",
}

export enum RawA2DairySubFilter {
  /* Raw A2 Dairy Products */
  RawA2DairyOptionAll = "All Raw A2 Dairy",
  RawA2Butter = "Raw A2 Butter",
  RawA2Cheese = "Raw A2 Cheese",
  RawA2Milk = "Raw A2 Milk",
  RawA2Yogurt = "Raw A2 Yogurt",
  RawA2Kefir = "Raw A2 Kefir",
  RawA2Colostrum = "Raw A2 Colostrum",
  RawA2Ghee = "Raw A2 Ghee",
}

export enum RawGoatDairySubFilter {
  /* Raw Goat Dairy Products */
  RawGoatDairyOptionAll = "All Raw Goat Dairy",
  RawGoatButter = "Raw Goat Butter",
  RawGoatCheese = "Raw Goat Cheese",
  RawGoatMilk = "Raw Goat Milk",
  RawGoatYogurt = "Raw Goat Yogurt",
  RawGoatKefir = "Raw Goat Kefir",
  RawGoatColostrum = "Raw Goat Colostrum",
}

export enum RawSheepDairySubFilter {
  /* Raw Sheep Dairy Products */
  RawSheepDairyOptionAll = "All Raw Sheep Dairy",
  RawSheepButter = "Raw Sheep Butter",
  RawSheepCheese = "Raw Sheep Cheese",
  RawSheepMilk = "Raw Sheep Milk",
  RawSheepYogurt = "Raw Sheep Yogurt",
  RawSheepKefir = "Raw Sheep Kefir",
  RawSheepColostrum = "Raw Sheep Colostrum",
}

export enum RawBuffaloDairySubFilter {
  /* Raw Buffalo Dairy Products */
  RawBuffaloDairyOptionAll = "All Raw Buffalo Dairy",
  RawBuffaloButter = "Raw Buffalo Butter",
  RawBuffaloCheese = "Raw Buffalo Cheese",
  RawBuffaloMilk = "Raw Buffalo Milk",
  RawBuffaloYogurt = "Raw Buffalo Yogurt",
  RawBuffaloKefir = "Raw Buffalo Kefir",
  RawBuffaloColostrum = "Raw Buffalo Colostrum",
}

export enum RawCamelDairySubFilter {
  /* Raw Camel Dairy Products */
  RawCamelDairyOptionAll = "All Raw Camel Dairy",
  RawCamelButter = "Raw Camel Butter",
  RawCamelCheese = "Raw Camel Cheese",
  RawCamelMilk = "Raw Camel Milk",
  RawCamelYogurt = "Raw Camel Yogurt",
  RawCamelKefir = "Raw Camel Kefir",
  RawCamelColostrum = "Raw Camel Colostrum",
}

export enum RawDonkeyDairySubFilter {
  /* Raw Donkey Dairy Products */
  RawDonkeyDairyOptionAll = "All Raw Donkey Dairy",
  RawDonkeyButter = "Raw Donkey Butter",
  RawDonkeyCheese = "Raw Donkey Cheese",
  RawDonkeyMilk = "Raw Donkey Milk",
  RawDonkeyYogurt = "Raw Donkey Yogurt",
  RawDonkeyKefir = "Raw Donkey Kefir",
  RawDonkeyColostrum = "Raw Donkey Colostrum",
}

export enum BeefSubFilter {
  Antelope = "Antelope",
  Beef = "Beef",
  BeefJerky = "Beef Jerky",
  Bison = "Bison",
  BoneBroth = "Bone Broth",
  Buffalo = "Buffalo",
  Deer = "Deer",
  Elk = "Elk",
  FullHalfCow = "Full Half Cow",
  Gelatin = "Gelatin",
  Goat = "Goat",
  Lamb = "Lamb",
  Moose = "Moose",
  OrganMeats = "Organ Meats",
  Pork = "Pork",
  Sheep = "Sheep",
  Tallow = "Tallow",
  Venison = "Venison",
  Veal = "Veal",
  WagyuBeef = "Wagyu Beef",
}

export enum PoultrySubFilter {
  Chicken = "Chicken",
  Duck = "Duck",
  Goose = "Goose",
  PasturedChicken = "Pastured Chicken",
  Turkey = "Turkey",
  Rabbit = "Rabbit",
  Emu = "Emu",
  Quail = "Quail",
  GuineaFowl = "Guinea Fowl",
}

export enum SeafoodSubFilter {
  Bass = "Bass",
  Catfish = "Catfish",
  Oysters = "Oysters",
  Salmon = "Salmon",
  Tilapia = "Tilapia",
  Trout = "Trout",
  Tuna = "Tuna",
  Cod = "Cod",
  Halibut = "Halibut",
  Mackerel = "Mackerel",
  Sardine = "Sardine",
  Shrimp = "Shrimp",
  Flounder = "Flounder",
  Clams = "Clams",
  Mussels = "Mussels",
  Scallops = "Scallops",
  Crab = "Crab",
  Lobster = "Lobster",
  Squid = "Squid",
  Roe = "Roe",
}

export enum EggsSubFilter {
  ChickenEgg = "Chicken Egg",
  DuckEgg = "Duck Egg",
  GooseEgg = "Goose Egg",
  QuailEgg = "Quail Egg",
  TurkeyEgg = "Turkey Egg",
  EmuEgg = "Emu Egg",
  OstrichEgg = "Ostrich Egg",
}

export enum FruitsSubFilter {
  Apple = "Apple",
  Apricot = "Apricot",
  Avocado = "Avocado",
  Banana = "Banana",
  Blackberrie = "Blackberries",
  Blueberrie = "Blueberries",
  Cantaloupe = "Cantaloupe",
  Cherrie = "Cherries",
  Date = "Date",
  DriedFruits = "Dried Fruit",
  Fig = "Fig",
  Grape = "Grape",
  Grapefruit = "Grapefruit",
  Guava = "Guava",
  Honeydew = "Honeydew",
  Jam = "Jam",
  Kiwi = "Kiwi",
  Lemon = "Lemon",
  Lime = "Lime",
  Mangoe = "Mango",
  Melon = "Melon",
  Olive = "Olive",
  Orange = "Orange",
  Papaya = "Papaya",
  Peache = "Peach",
  Pear = "Pear",
  Persimmon = "Persimmon",
  Pineapple = "Pineapple",
  Plum = "Plum",
  Pomegranate = "Pomegranate",
  Quince = "Quince",
  Raspberrie = "Raspberries",
  Strawberrie = "Strawberries",
  Watermelon = "Watermelon",
  Pawpaw = "Pawpaw",
  Elderberry = "Elderberry",
  Currant = "Currant",
  Gooseberry = "Gooseberry",
  Mulberry = "Mulberry",
  Boysenberry = "Boysenberry",
  Marionberry = "Marionberry",
  Muscadine = "Muscadine",
  Scuppernong = "Scuppernong",
}

export enum BeveragesSubFilter {
  Wine = "Wine",
  Beer = "Beer",
  Cider = "Cider",
  Coffee = "Coffee",
  Tea = "Tea",
}

export enum VeggiesSubFilter {
  Arugula = "Arugula",
  Basil = "Basil",
  Beet = "Beet",
  BellPepper = "Bell Pepper",
  BokChoy = "Bok Choy",
  Broccoli = "Broccoli",
  Broccolini = "Broccolini",
  Cabbage = "Cabbage",
  Carrot = "Carrot",
  Cauliflower = "Cauliflower",
  Celery = "Celery",
  Chard = "Chard",
  Collard = "Collard",
  Cucumber = "Cucumber",
  Daikon = "Daikon",
  Eggplant = "Eggplant",
  Garlic = "Garlic",
  Ginger = "Ginger",
  Gourd = "Gourd",
  MustardGreens = "Mustard Greens",
  Okra = "Okra",
  HotPepper = "Hot Pepper",
  SweetPepper = "Sweet Pepper",
  SweetPotato = "Sweet Potato",
  SummerSquash = "Summer Squash",
  WinterSquash = "Winter Squash",
  Fresh = "Fresh Herbs",
  Dried = "Dried Herbs",
  Endive = "Endive",
  Escarole = "Escarole",
  GreenBean = "Green Bean",
  Kale = "Kale",
  Leek = "Leek",
  Lettuce = "Lettuce",
  Onion = "Onion",
  Parsnip = "Parsnip",
  Peas = "Peas",
  Pepper = "Pepper",
  Potato = "Potato",
  Radish = "Radish",
  Spinach = "Spinach",
  Squash = "Squash",
  Tomato = "Tomato",
  Turnip = "Turnip",
  Zucchini = "Zucchini",
  Asparagus = "Asparagus",
  Aubergine = "Aubergine",
  Beetroot = "Beetroot",
  Sunchoke = "Sunchoke",
  Kohlrabi = "Kohlrabi",
  Ramp = "Ramp",
  Tomatillo = "Tomatillo",
  Microgreen = "Microgreen",
  EdibleFlower = "Edible Flower",
  BrusselsSprout = "Brussels Sprouts",
  Shallot = "Shallot",
  Artichoke = "Artichoke",
  Rhubarb = "Rhubarb",
}

export enum GrainsSubFilter {
  Amaranth = "Amaranth",
  Barley = "Barley",
  Buckwheat = "Buckwheat",
  Corn = "Corn",
  Einkorn = "Einkorn",
  Emmer = "Emmer",
  Farro = "Farro",
  Kamut = "Kamut",
  Khorasan = "Khorasan",
  Millet = "Millet",
  Oats = "Oat",
  Quinoa = "Quinoa",
  Rice = "Rice",
  Rye = "Rye",
  Sorghum = "Sorghum",
  Spelt = "Spelt",
  Teff = "Teff",
  Triicale = "Triticale",
  Wheat = "Wheat",
  WildRice = "Wild Rice",
}

export enum NutsSeedsSubFilter {
  Almond = "Almond",
  Bean = "Bean",
  BrazilNut = "Brazil Nut",
  Cashew = "Cashew",
  ChiaSeed = "Chia Seed",
  FlaxSeed = "Flax Seed",
  Hazelnut = "Hazelnut",
  HempSeed = "Hemp Seed",
  Lentil = "Lentil",
  MacadamiaNut = "Macadamia Nut",
  NutButter = "Nut Butter",
  Pea = "Peanut",
  Pecan = "Pecan",
  Pistachio = "Pistachio",
  PumpkinSeed = "Pumpkin Seed",
  SeedButter = "Seed Butter",
  SesameSeed = "Sesame Seed",
  SunflowerSeed = "Sunflower Seed",
  Walnut = "Walnut",
}

export enum SugarsSubFilter {
  Agave = "Agave",
  CaneSugar = "Cane Sugar",
  CocunutSugar = "Coconut Sugar",
  Honey = "Honey",
  MapleSyrup = "Maple Syrup",
  RawHoney = "Raw Honey",
  Stevia = "Stevia",
  BrownSugar = "Brown Sugar",
}

export enum OtherSubFilter {
  Books = "Books",
  CleaningSupplies = "Cleaning Supplies",
  Furniture = "Furniture",
  Gifts = "Gifts",
  HomeGoods = "Home Goods",
  Kitchenware = "Kitchenware",
  PersonalCare = "Personal Care",
  PetFood = "Pet Food",
  Soap = "Soap",
  Molasses = "Molasses",
  Preserves = "Preserves",
  Flour = "Flour",
  Wool = "Wool",
  Mohair = "Mohair",
  LlamaFiber = "Llama Fiber",
  AngoraRabbit = "Angora Rabbit Fiber",
  Sheepskins = "Sheepskins",
  ChristmasTrees = "Christmas Trees",
  Compost = "Compost/Manure",
  Earthworms = "Earthworms",
  Firewood = "Firewood",
  HayStraw = "Hay/Straw",
  Lumber = "Lumber",
  Luffa = "Luffa",
  NurseryStock = "Nursery Stock",
  Wreaths = "Wreaths",
  Mushrooms = "Mushrooms",
  ShiitakeMushroom = "Shiitake Mushroom",
  OysterMushroom = "Oyster Mushroom",
  Vinegar = "Vinegar",
}

export enum AllOption {
  AllButter = "All Butter",
  AllCheese = "All Cheese",
  AllMilk = "All Milk",
  AllYogurt = "All Yogurt",
  AllKefir = "All Kefir",
  AllColostrum = "All Colostrum",
}

export enum AllOptionRaw {
  AllRawButter = "All Raw Butter",
  AllRawCheese = "All Raw Cheese",
  AllRawMilk = "All Raw Milk",
  AllRawYogurt = "All Raw Yogurt",
  AllRawKefir = "All Raw Kefir",
  AllRawColostrum = "All Raw Colostrum",
}

export enum AllOptionRawDairy {
  AllRawDairy = "All Raw Dairy",
  AllRawCowDairy = "All Raw Cow Dairy",
  AllRawA2Dairy = "All Raw A2 Dairy",
  AllRawGoatDairy = "All Raw Goat Dairy",
  AllRawSheepDairy = "All Raw Sheep Dairy",
  AllRawBuffaloDairy = "All Raw Buffalo Dairy",
  AllRawCamelDairy = "All Raw Camel Dairy",
  AllRawDonkeyDairy = "All Raw Donkey Dairy",
}

export enum AllOptionDairy {
  AllDairy = "All Dairy",
  AllCowDairy = "All Cow Dairy",
  AllA2Dairy = "All A2 Dairy",
  AllGoatDairy = "All Goat Dairy",
  AllSheepDairy = "All Sheep Dairy",
  AllBuffaloDairy = "All Buffalo Dairy",
  AllCamelDairy = "All Camel Dairy",
  AllDonkeyDairy = "All Donkey Dairy",
}

export type DairySubFilter =
  | CowDairySubFilter
  | A2DairySubFilter
  | GoatDairySubFilter
  | SheepDairySubFilter
  | BuffaloDairySubFilter
  | CamelDairySubFilter
  | DonkeyDairySubFilter
  | RawCowDairySubFilter
  | RawA2DairySubFilter
  | RawGoatDairySubFilter
  | RawSheepDairySubFilter
  | RawBuffaloDairySubFilter
  | RawCamelDairySubFilter
  | RawDonkeyDairySubFilter
  | AllOptionRawDairy
  | AllOptionDairy
  | AllOption
  | AllOptionRaw;

export type RawDairySubFilter =
  | RawCowDairySubFilter
  | RawA2DairySubFilter
  | RawGoatDairySubFilter
  | RawSheepDairySubFilter
  | RawBuffaloDairySubFilter
  | RawCamelDairySubFilter
  | RawDonkeyDairySubFilter;

export type ButterDairySubFilter =
  | CowDairySubFilter.CowButter
  | A2DairySubFilter.A2Butter
  | GoatDairySubFilter.GoatButter
  | SheepDairySubFilter.SheepButter
  | BuffaloDairySubFilter.BuffaloButter
  | CamelDairySubFilter.CamelButter
  | DonkeyDairySubFilter.DonkeyButter;

export type RawButterDairySubFilter =
  | RawCowDairySubFilter.RawCowButter
  | RawA2DairySubFilter.RawA2Butter
  | RawGoatDairySubFilter.RawGoatButter
  | RawSheepDairySubFilter.RawSheepButter
  | RawBuffaloDairySubFilter.RawBuffaloButter
  | RawCamelDairySubFilter.RawCamelButter
  | RawDonkeyDairySubFilter.RawDonkeyButter;

/* Cheese Types */
export type CheeseDairySubFilter =
  | CowDairySubFilter.CowCheese
  | A2DairySubFilter.A2Cheese
  | GoatDairySubFilter.GoatCheese
  | SheepDairySubFilter.SheepCheese
  | BuffaloDairySubFilter.BuffaloCheese
  | CamelDairySubFilter.CamelCheese
  | DonkeyDairySubFilter.DonkeyCheese;

export type RawCheeseDairySubFilter =
  | RawCowDairySubFilter.RawCowCheese
  | RawA2DairySubFilter.RawA2Cheese
  | RawGoatDairySubFilter.RawGoatCheese
  | RawSheepDairySubFilter.RawSheepCheese
  | RawBuffaloDairySubFilter.RawBuffaloCheese
  | RawCamelDairySubFilter.RawCamelCheese
  | RawDonkeyDairySubFilter.RawDonkeyCheese;

/* Milk Types */
export type MilkDairySubFilter =
  | CowDairySubFilter.CowMilk
  | A2DairySubFilter.A2Milk
  | GoatDairySubFilter.GoatMilk
  | SheepDairySubFilter.SheepMilk
  | BuffaloDairySubFilter.BuffaloMilk
  | CamelDairySubFilter.CamelMilk
  | DonkeyDairySubFilter.DonkeyMilk;

export type RawMilkDairySubFilter =
  | RawCowDairySubFilter.RawCowMilk
  | RawA2DairySubFilter.RawA2Milk
  | RawGoatDairySubFilter.RawGoatMilk
  | RawSheepDairySubFilter.RawSheepMilk
  | RawBuffaloDairySubFilter.RawBuffaloMilk
  | RawCamelDairySubFilter.RawCamelMilk
  | RawDonkeyDairySubFilter.RawDonkeyMilk;

/* Yogurt Types */
export type YogurtDairySubFilter =
  | CowDairySubFilter.CowYogurt
  | A2DairySubFilter.A2Yogurt
  | GoatDairySubFilter.GoatYogurt
  | SheepDairySubFilter.SheepYogurt
  | BuffaloDairySubFilter.BuffaloYogurt
  | CamelDairySubFilter.CamelYogurt
  | DonkeyDairySubFilter.DonkeyYogurt;

export type RawYogurtDairySubFilter =
  | RawCowDairySubFilter.RawCowYogurt
  | RawA2DairySubFilter.RawA2Yogurt
  | RawGoatDairySubFilter.RawGoatYogurt
  | RawSheepDairySubFilter.RawSheepYogurt
  | RawBuffaloDairySubFilter.RawBuffaloYogurt
  | RawCamelDairySubFilter.RawCamelYogurt
  | RawDonkeyDairySubFilter.RawDonkeyYogurt;

/* Kefir Types */
export type KefirDairySubFilter =
  | CowDairySubFilter.CowKefir
  | A2DairySubFilter.A2Kefir
  | GoatDairySubFilter.GoatKefir
  | SheepDairySubFilter.SheepKefir
  | BuffaloDairySubFilter.BuffaloKefir
  | CamelDairySubFilter.CamelKefir
  | DonkeyDairySubFilter.DonkeyKefir;

export type RawKefirDairySubFilter =
  | RawCowDairySubFilter.RawCowKefir
  | RawA2DairySubFilter.RawA2Kefir
  | RawGoatDairySubFilter.RawGoatKefir
  | RawSheepDairySubFilter.RawSheepKefir
  | RawBuffaloDairySubFilter.RawBuffaloKefir
  | RawCamelDairySubFilter.RawCamelKefir
  | RawDonkeyDairySubFilter.RawDonkeyKefir;

/* Colostrum Types */
export type ColostrumDairySubFilter =
  | CowDairySubFilter.CowColostrum
  | A2DairySubFilter.A2Colostrum
  | GoatDairySubFilter.GoatColostrum
  | SheepDairySubFilter.SheepColostrum
  | BuffaloDairySubFilter.BuffaloColostrum
  | CamelDairySubFilter.CamelColostrum
  | DonkeyDairySubFilter.DonkeyColostrum;

export type RawColostrumDairySubFilter =
  | RawCowDairySubFilter.RawCowColostrum
  | RawA2DairySubFilter.RawA2Colostrum
  | RawGoatDairySubFilter.RawGoatColostrum
  | RawSheepDairySubFilter.RawSheepColostrum
  | RawBuffaloDairySubFilter.RawBuffaloColostrum
  | RawCamelDairySubFilter.RawCamelColostrum
  | RawDonkeyDairySubFilter.RawDonkeyColostrum;

/* Then update the SubFilter type to use these enums */
export type SubFilter =
  | CowDairySubFilter
  | A2DairySubFilter
  | GoatDairySubFilter
  | SheepDairySubFilter
  | BuffaloDairySubFilter
  | CamelDairySubFilter
  | DonkeyDairySubFilter
  | RawCowDairySubFilter
  | RawA2DairySubFilter
  | RawGoatDairySubFilter
  | RawSheepDairySubFilter
  | RawBuffaloDairySubFilter
  | RawCamelDairySubFilter
  | RawDonkeyDairySubFilter
  | AllOptionRawDairy
  | AllOptionDairy
  | AllOption
  | AllOptionRaw
  | BeefSubFilter
  | PoultrySubFilter
  | SeafoodSubFilter
  | EggsSubFilter
  | FruitsSubFilter
  | VeggiesSubFilter
  | GrainsSubFilter
  | NutsSeedsSubFilter
  | SugarsSubFilter
  | OtherSubFilter
  | BeveragesSubFilter;

export enum StandardsCategory {
  Organic = "Organic",
  Regenerative = "Regenerative",
  ChemicalFree = "Chemical",
  AnimalWelfare = "Animal",
  Sustainability = "Sustainability",
  Religious = "Religious",
}

export enum StandardsOptionUpload {
  PASTURE_RAISED = "Pasture-Raised",
  GRASS_FED = "Grass Fed",
  GRASS_FINISHED = "Grass Finished",
  USDA_ORGANIC = "USDA Organic",
  NON_GMO = "Non-GMO",
  HORMONE_FREE = "Hormone-Free",
  ANTIBIOTIC_FREE = "Antibiotic-Free",
  NO_PESTICIDES = "No-Pesticides",
  NO_HERBICIDES = "No-Herbicides",
  NO_CHEMICAL_FERTILIZER = "No-Chemical Fertilizer",
  ORGANIC_PRINCIPLES = "Organic Principles",
  NO_FUNGICIDES = "No-Fungicides",
  HUMANE_ANIMAL_TREATMENT = "Humane Animal Treatment",
  NO_TILL = "No Till",
  ROTATIONAL_GRAZING = "Rotational Grazing",
}

export function convertToStandardsOption(
  uploadOption: StandardsOptionUpload
): StandardsOption {
  switch (uploadOption) {
    case StandardsOptionUpload.PASTURE_RAISED:
      return StandardsOption.PastureRaised;
    case StandardsOptionUpload.GRASS_FED:
      return StandardsOption.GrassFed;
    case StandardsOptionUpload.GRASS_FINISHED:
      return StandardsOption.GrassFed;
    case StandardsOptionUpload.USDA_ORGANIC:
      return StandardsOption.USDAO;
    case StandardsOptionUpload.NON_GMO:
      return StandardsOption.NGMO;
    case StandardsOptionUpload.HORMONE_FREE:
      return StandardsOption.HFree;
    case StandardsOptionUpload.ANTIBIOTIC_FREE:
      return StandardsOption.ChemicalFree;
    case StandardsOptionUpload.NO_PESTICIDES:
      return StandardsOption.CPF;
    case StandardsOptionUpload.NO_HERBICIDES:
      return StandardsOption.ChemicalFree;
    case StandardsOptionUpload.NO_CHEMICAL_FERTILIZER:
      return StandardsOption.ChemicalFree;
    case StandardsOptionUpload.ORGANIC_PRINCIPLES:
      return StandardsOption.Organic;
    case StandardsOptionUpload.NO_FUNGICIDES:
      return StandardsOption.NoFungicides;
    case StandardsOptionUpload.HUMANE_ANIMAL_TREATMENT:
      return StandardsOption.AWA;
    case StandardsOptionUpload.NO_TILL:
      return StandardsOption.NoTill;
    case StandardsOptionUpload.ROTATIONAL_GRAZING:
      return StandardsOption.RotationalGrazing;
    default:
      throw new Error(`Unsupported standards option: ${uploadOption}`);
  }
}

/* Helper function to convert multiple options at once */
export function convertMultipleStandardsOptions(
  uploadOptions: StandardsOptionUpload[]
): StandardsOption[] {
  return uploadOptions.map((option) => convertToStandardsOption(option));
}

/* convert the standardsOptionUpload to the standardsOption */

export enum StandardsOption {
  /* Organic Standards */
  CCOF = "California Certified Organic Farmers",
  USDAO = "USDA Organic",
  OTCO = "Oregon Tilth Certified Organic",
  NGMO = "Non-GMO",
  NGMOProject = "Non-GMO Project",
  AGC = "American Grassfed Certification",
  EOV = "Ecological Outcome Verification",
  CNG = "Certified Naturally Grown",
  CNR = "Certified Natural Ruminant",
  Organic = "Organic",
  RealOrganic = "Real Organic",

  /* Regenerative Standards */
  Regenerative = "Regenerative",
  DBC = "Demeter Biodynamic Certification",
  ROC = "Regenerative Organic Certified",
  SIEOV = "Savory Institute EOV",
  CRAGW = "Carbon Reduction Agriculture Green World",
  RotationalGrazing = "Rotational Grazing",
  NoTill = "No Till",

  /* Chemical Free Standards */
  ChemicalFree = "Chemical Free",
  CPF = "Chemical Pesticide Free",
  PRF = "Pesticide Residue Free",
  NoFungicides = "Fungicides Free",
  NoHerbicides = "Herbicides Free",
  NoPesticide = "Pesticide Free",

  /* Animal Welfare Standards */
  PastureRaised = "Pasture Raised",
  GRFC = "Grass Fed Certification",
  GrassFed = "Grass Fed",
  CertifiedHumane = "Certified Humane",
  GAP = "Global Animal Partnership",
  AWA = "Animal Welfare Approved",
  NoMRNAVAX = "MRNA/Vax Free",
  NoVax = "Vax Free",
  HFree = "Hormone Free",
  AntibioticFree = "Antibiotic Free",
  SteroidFree = "Steroid Free",

  /* Sustainability Standards */
  Rainforest = "Rainforest",
  FairTrade = "Fair Trade",
  FoodAlliance = "Food Alliance",
  CarbonNegative = "Carbon Negative",

  /* Religious Standards */
  Kosher = "Kosher",
  Halal = "Halal",
}

/* Descriptions for each standard */
export const StandardDescription: Record<StandardsOption, string> = {
  /* Organic Standards */
  [StandardsOption.CCOF]:
    "California Certified Organic Farmers - CCOF is a nonprofit organization that advances organic agriculture for a healthy world through organic certification, education, advocacy, and promotion.",
  [StandardsOption.USDAO]:
    "USDA Organic - Products meeting the United States Department of Agriculture's organic standards",
  [StandardsOption.OTCO]:
    "Oregon Tilth Certified Organic - Rigorous organic certification program including strict production standards, on-site inspections, and legally binding contracts",
  [StandardsOption.NGMO]:
    "Non-GMO - Products claimed to be free from genetically modified organisms",
  [StandardsOption.AGC]:
    "American Grassfed Certification - Animals fed only grass and forage from weaning to harvest",
  [StandardsOption.EOV]:
    "Ecological Outcome Verification - Measures improvement in ecosystem health",
  [StandardsOption.CNG]:
    "Certified Naturally Grown - Peer-review certification for small-scale farmers",
  [StandardsOption.CNR]:
    "Certified Natural Ruminant - Ensures animals are raised on pasture without hormones or antibiotics",
  [StandardsOption.NGMOProject]:
    "Non-GMO Project - Global standards for non-GMO products",
  [StandardsOption.Organic]:
    "Organic Principles - Products claiming Organic Principles",
  [StandardsOption.RealOrganic]:
    "Real Organic - Real Organic Project certification",

  /* Regenerative Standards */
  [StandardsOption.Regenerative]:
    "Farming practices that enhance soil health, biodiversity, and ecosystem services",
  [StandardsOption.DBC]:
    "Demeter Biodynamic Certification - Holistic agricultural approach that treats farms as unified organisms",
  [StandardsOption.ROC]:
    "Regenerative Organic Certified - Holistic agriculture approach focusing on soil health and animal welfare",
  [StandardsOption.SIEOV]:
    "Savory Institute EOV - Measures outcomes of regenerative land management",
  [StandardsOption.CRAGW]:
    "Carbon Reduction Agriculture Green World - Focuses on reducing carbon footprint in farming",
  [StandardsOption.RotationalGrazing]:
    "Rotates livestock through pastures to maintain soil health and biodiversity",
  [StandardsOption.NoTill]:
    "Avoids tilling the soil, which helps maintain soil health and reduces erosion",

  /* Chemical Free Standards */
  [StandardsOption.ChemicalFree]:
    "Production methods avoiding synthetic chemicals and pesticides",
  [StandardsOption.HFree]:
    "Products from animals raised without added hormones (not a specific certification)",
  [StandardsOption.GRFC]: "Animals fed exclusively grass and forage",
  [StandardsOption.CPF]: "Crops grown without synthetic pesticides",
  [StandardsOption.PRF]: "Products tested to be free of pesticide residues",
  [StandardsOption.NoFungicides]: "Crops grown without synthetic fungicides",
  [StandardsOption.NoHerbicides]: "Crops grown without synthetic herbicides",
  [StandardsOption.AntibioticFree]: "Animals raised without added antibiotics",
  [StandardsOption.NoPesticide]: "Crops grown without synthetic pesticides",

  /* Animal Welfare Standards */
  [StandardsOption.PastureRaised]: "Animals raised on pasture",
  [StandardsOption.GrassFed]: "Animals fed only grass and forage",
  [StandardsOption.CertifiedHumane]:
    "Meets comprehensive animal welfare standards from birth through slaughter",
  [StandardsOption.GAP]: "5-step animal welfare rating program",
  [StandardsOption.AWA]:
    "Ensures humane treatment and well-being of farm animals",
  [StandardsOption.NoMRNAVAX]:
    "Products from animals raised without MRNA/Vaccines",
  [StandardsOption.NoVax]: "Products from animals raised without vaccinations",
  [StandardsOption.SteroidFree]:
    "Products from animals raised without steroids",

  /* Sustainability Standards */
  [StandardsOption.Rainforest]:
    "Promotes biodiversity and sustainable livelihoods",
  [StandardsOption.FairTrade]:
    "Ensures fair compensation and working conditions for farmers",
  [StandardsOption.FoodAlliance]:
    "Certification for sustainable agriculture and safe working conditions",
  [StandardsOption.CarbonNegative]:
    "Farms that remove more carbon from the atmosphere than they emit",

  /* Religious Standards */
  [StandardsOption.Kosher]:
    "Meets Jewish dietary laws and food preparation requirements",
  [StandardsOption.Halal]:
    "Complies with Islamic dietary laws and food preparation requirements",
};
