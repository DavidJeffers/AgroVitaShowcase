/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState, useMemo, memo } from "react";
import {
  MRT_ColumnDef,
  MRT_RowVirtualizer,
  MRT_ExpandedState,
  useMaterialReactTable,
} from "material-react-table";
import { FaEgg, FaShippingFast } from "react-icons/fa";
import { Box, Switch, Typography } from "@mui/material";
import { VscBlank } from "react-icons/vsc";
import { LinkPreview } from "../LinkPreview";
import {
  MainFilter,
  DairySubFilter,
  StandardsOption,
  SubFilter,
} from "./utils/FilterEnums";
import {
  getAllStanSubOptions,
  doesFoodMatchFilter,
  getApplicableOptions,
  getApplicableRawOptions,
} from "./utils/FilterHelpers";
import { FavoritesCell } from "../../ui/buttons/Favorites";
import { haversineDistance } from "./utils/TableHelpers";
import { Filter } from "./filters/FoodsFilter";
import { FaCow } from "react-icons/fa6";
import {
  GiGarlic,
  GiHoneyJar,
  GiMilkCarton,
  GiPotato,
  GiTomato,
} from "react-icons/gi";

const normalizeString = (str: string) =>
  str.toLowerCase().trim().replace(/'/g, "");

const matchesSearchTerm = (
  searchValue: string,
  target: string | null | undefined
): boolean => {
  if (!target) return false;
  const normalizedTarget = normalizeString(target);
  const normalizedSearch = normalizeString(searchValue);
  return (
    normalizedTarget.includes(normalizedSearch) ||
    (normalizedSearch.length > 3 &&
      (normalizedTarget.startsWith(normalizedSearch) ||
        normalizedTarget.endsWith(normalizedSearch)))
  );
};

export interface PriceSnap {
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
  name: string | null;
  latitude: number | null;
  longitude: number | null;
  state: string | null;
  foods: string[] | null;
  standards: string[] | null;
  shipping: boolean | null;
  favs: number;
  verified: boolean | null;
  show_google_map: boolean | null;
  site: string | null;
  price_snap: PriceSnap | null;
  updated_at: string | null;
}

interface Row {
  getValue: <T>(key: string) => T;
  original: Farm;
  index: number;
}

export interface FavActionData {
  error?: string;
  success: boolean;
  favorites?: Set<string> | null;
  status?: number;
}

interface FilterValueWithMode {
  filters: Filter[];
  mode: "any" | "all";
}

const isWithinPriceRange = (
  price: number | null,
  range: PriceRange | undefined
): boolean => {
  if (!range || price === null) return true;
  const { min, max } = range;
  if (min !== null && price < min) return false;
  if (max !== null && price > max) return false;
  return true;
};

interface PriceRange {
  min: number | null;
  max: number | null;
}

interface PriceFilters {
  ground_beef?: PriceRange;
  eggs?: PriceRange;
  milk?: PriceRange;
  tomato?: PriceRange;
  onion?: PriceRange;
  potato?: PriceRange;
}

const NameCell = memo(({ row }: { row: Row }) => {
  const name = row.original.name;
  const site = row.original.site;
  const id = row.original.id;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        width: "100%",
      }}
    >
      {site ? (
        <LinkPreview
          url={site.startsWith("http") ? site : `https://${site}`}
          name={name ? name : "Farm Site"}
          symbol={true}
        />
      ) : (
        <VscBlank />
      )}
      <a
        href={`/farm/${id}`}
        style={{
          color: "inherit",
          textDecoration: "none",
          fontWeight: "500",
        }}
      >
        {name}
      </a>
    </Box>
  );
});

NameCell.displayName = "NameCell";

const FoodsCell = memo(({ foods }: { foods: string[] }) => {
  const renderedCellValue = useMemo(() => {
    return Array.isArray(foods) ? foods.join(", ") : foods;
  }, [foods]);

  return (
    <Box
      sx={{
        height: "80px",
        lineHeight: "20px",
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        cursor: "default",
        fontWeight: "400",
      }}
    >
      {renderedCellValue ?? ""}
    </Box>
  );
});

FoodsCell.displayName = "FoodsCell";

const StandardsCell = memo(({ certs }: { certs: string[] }) => {
  const renderedCellValue = useMemo(() => {
    return Array.isArray(certs) ? certs.join(", ") : certs;
  }, [certs]);

  return (
    <Box
      sx={{
        height: "80px",
        lineHeight: "20px",
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        cursor: "default",
        fontWeight: "400",
      }}
    >
      {renderedCellValue ?? "-"}
    </Box>
  );
});

StandardsCell.displayName = "StandardsCell";

const PriceCell = memo(({ price_snap }: { price_snap: PriceSnap }) => {
  return (
    <Box
      sx={{
        // cursor: "default",
        // height: "70px",
        // overflow: "hidden",
        // mb: -2,
        // mt: -4,
        height: "80px",
        lineHeight: "20px",
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        cursor: "default",
        fontWeight: "400",
      }}
    >
      {price_snap?.ground_beef ? (
        <Box display="flex" alignItems="center">
          <FaCow
            style={{
              fontSize: "1.4em",
              marginRight: "0.25em",
            }}
          />{" "}
          Beef: ${price_snap?.ground_beef}
        </Box>
      ) : null}
      {price_snap?.eggs ? (
        <Box display="flex" alignItems="center">
          <FaEgg
            style={{
              fontSize: "1.2em",
              marginRight: "0.25em",
            }}
          />{" "}
          Eggs: ${price_snap?.eggs}
        </Box>
      ) : null}
      {price_snap?.milk ? (
        <Box display="flex" alignItems="center">
          <GiMilkCarton
            style={{
              fontSize: "1.2em",
              marginRight: "0.25em",
            }}
          />{" "}
          Milk: ${price_snap?.milk}
        </Box>
      ) : null}
      {price_snap?.tomato ? (
        <Box display="flex" alignItems="center">
          <GiTomato
            style={{
              fontSize: "1.2em",
              marginRight: "0.25em",
            }}
          />{" "}
          Tomato: ${price_snap?.tomato}
        </Box>
      ) : null}
      {price_snap?.onion ? (
        <Box display="flex" alignItems="center">
          <GiGarlic
            style={{
              fontSize: "1.2em",
              marginRight: "0.25em",
            }}
          />{" "}
          Onion: ${price_snap?.onion}
        </Box>
      ) : null}
      {price_snap?.potato ? (
        <Box display="flex" alignItems="center">
          <GiPotato
            style={{
              fontSize: "1.2em",
              marginRight: "0.25em",
            }}
          />{" "}
          Potato: ${price_snap?.potato}
        </Box>
      ) : null}
      {price_snap?.honey ? (
        <Box display="flex" alignItems="center">
          <GiHoneyJar
            style={{
              fontSize: "1.2em",
              marginRight: "0.25em",
            }}
          />{" "}
          Honey: ${price_snap?.honey}
        </Box>
      ) : null}
    </Box>
  );
});

PriceCell.displayName = "PriceCell";

const StateCell = memo(({ state }: { state: string }) => {
  return (
    <Box
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        fontWeight: "401",
      }}
    >
      {state ?? "-"}
    </Box>
  );
});

StateCell.displayName = "StateCell";
const ShippingCell = memo(({ shipping }: { shipping: boolean }) => {
  return shipping ? (
    <Box pl={1}>
      <FaShippingFast fontSize="medium" />
    </Box>
  ) : null;
});

ShippingCell.displayName = "ShippingCell";

const FavsRowCell = memo(({ favs }: { favs: number }) => {
  return <Box pl={3}>{favs}</Box>;
});

FavsRowCell.displayName = "FavsRowCell";

export const useTableLogic = (
  farms: Farm[],
  userLatLong: [number, number] | null,
  distanceFilter: number | null | undefined,
  favorites: Set<string> | null,
  isLoggedIn: boolean,
  foodFilterMode: "any" | "all"
) => {
  const rowVirtualizerInstanceRef = React.useRef<MRT_RowVirtualizer>(null);
  const [desc, setDesc] = useState(false);
  const [expandedRows, setExpandedRows] = useState<MRT_ExpandedState>({});
  useEffect(() => {
    // if (typeof window !== "undefined") {
    //   setIsLoading(false);
    // }
  }, []);

  const columns = useMemo<MRT_ColumnDef<Farm>[]>(() => {
    const baseColumns: MRT_ColumnDef<Farm>[] = [
      {
        accessorKey: "name",
        header: "Farm",
        size: 130,
        maxSize: 130,
        enableColumnFilter: false,
        enableSorting: false,
        enableFilterMatchHighlighting: true,
        Cell: ({ row }) => <NameCell row={row} />,
      },
      {
        accessorKey: "foods",
        header: "Foods",
        enableSorting: false,
        size: 150,
        enableGlobalFilter: true,
        Cell: ({ cell }) => <FoodsCell foods={cell.getValue() as string[]} />,
        enableColumnFilter: false,
        filterFn: (row: Row, id: string, filterValue: FilterValueWithMode) => {
          const rowFoods: string[] = row.getValue(id);
          const { filters, mode } = filterValue;
          if (filters.length === 0) return true;

          if (mode === "all") {
            return filters.every((filter) => {
              switch (filter.main) {
                case MainFilter.Dairy: {
                  const selectedOptions = Array.isArray(filter.sub)
                    ? (filter.sub as DairySubFilter[])
                    : [filter.sub as DairySubFilter];
                  return selectedOptions.every((option) => {
                    const specificOptions = getApplicableOptions([option]);
                    return rowFoods.some((food) =>
                      specificOptions.some(
                        (specificOption) => food === specificOption
                      )
                    );
                  });
                }
                case MainFilter.RawDairy: {
                  const selectedRawOptions = Array.isArray(filter.sub)
                    ? (filter.sub as DairySubFilter[])
                    : [filter.sub as DairySubFilter];
                  return selectedRawOptions.every((option) => {
                    const specificOptions = getApplicableRawOptions([option]);
                    return rowFoods.some((food) =>
                      specificOptions.some(
                        (specificOption) => food === specificOption
                      )
                    );
                  });
                }
                default: {
                  if (!filter.sub) return false;
                  const subOptions = Array.isArray(filter.sub)
                    ? filter.sub
                    : [filter.sub];
                  return subOptions.every((subOption) => {
                    return rowFoods.some((food) =>
                      doesFoodMatchFilter(food as SubFilter, {
                        main: filter.main,
                        subOptions: [subOption],
                      })
                    );
                  });
                }
              }
            });
          } else {
            return filters.some((filter) => {
              let applicableOptions: string[] = [];
              switch (filter.main) {
                case MainFilter.Dairy: {
                  const selectedOptions = Array.isArray(filter.sub)
                    ? (filter.sub as DairySubFilter[])
                    : [filter.sub as DairySubFilter];
                  applicableOptions = getApplicableOptions(selectedOptions);
                  return rowFoods.some((food) =>
                    applicableOptions.some((option) => food === option)
                  );
                }
                case MainFilter.RawDairy: {
                  const selectedRawOptions = Array.isArray(filter.sub)
                    ? (filter.sub as DairySubFilter[])
                    : [filter.sub as DairySubFilter];
                  applicableOptions =
                    getApplicableRawOptions(selectedRawOptions);
                  return rowFoods.some((food) =>
                    applicableOptions.some((option) => food === option)
                  );
                }
                default: {
                  if (!filter.sub) return false;
                  const subOptions = Array.isArray(filter.sub)
                    ? filter.sub
                    : [filter.sub];
                  return rowFoods.some((food) =>
                    doesFoodMatchFilter(food as SubFilter, {
                      main: filter.main,
                      subOptions,
                    })
                  );
                }
              }
            });
          }
        },
      },
      {
        accessorKey: "standards",
        header: "Standards",
        enableSorting: false,
        size: 130,
        Cell: ({ cell }) => (
          <StandardsCell certs={cell.getValue() as StandardsOption[]} />
        ),
        enableColumnFilter: false,
        filterFn: (row: Row, id: string, filterValue: StandardsOption[]) => {
          const rowCerts = row.getValue<StandardsOption[]>(id);
          if (!rowCerts) return false;
          return filterValue.some((filter) => {
            const applicableCerts = getAllStanSubOptions(filter);
            return rowCerts.some((cert) => applicableCerts.includes(cert));
          });
        },
      },
      {
        accessorKey: "price_snap",
        header: "Prices",
        size: 65,
        enableSorting: true,
        Cell: ({ cell }) => (
          <PriceCell price_snap={cell.getValue() as PriceSnap} />
        ),

        enableColumnFilter: true,
        filterFn: (row: Row, _columnId: string, filterValue: PriceFilters) => {
          const priceSnap = row.original.price_snap;
          if (!priceSnap) return false;
          return (
            isWithinPriceRange(
              priceSnap.ground_beef,
              filterValue.ground_beef
            ) &&
            isWithinPriceRange(priceSnap.eggs, filterValue.eggs) &&
            isWithinPriceRange(priceSnap.milk, filterValue.milk) &&
            isWithinPriceRange(priceSnap.tomato, filterValue.tomato) &&
            isWithinPriceRange(priceSnap.onion, filterValue.onion) &&
            isWithinPriceRange(priceSnap.potato, filterValue.potato)
          );
        },
      },
      {
        accessorKey: "state",
        header: "Location",
        size: 75,
        enableColumnFilter: false,
        enableSorting: true,
        Cell: ({ cell }) => <StateCell state={cell.getValue() as string} />,
      },
      {
        accessorKey: "shipping",
        header: "Shipping",
        size: 25,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        Cell: ({ cell }) => (
          <ShippingCell shipping={cell.getValue() as boolean} />
        ),
        filterFn: (row, _columnId, filterValue) => {
          if (filterValue === undefined || filterValue === null) {
            return true;
          }
          return filterValue === true
            ? row.getValue("shipping") === true
            : true;
        },
        Filter: ({ column }) => (
          <Box display="flex" alignItems="center">
            <Switch
              checked={!!column.getFilterValue()}
              onChange={(e) => {
                column.setFilterValue(e.target.checked ? true : undefined);
              }}
            />
          </Box>
        ),
      },
      {
        accessorKey: "favs",
        header: "Favorites",
        enableColumnFilter: false,
        enableGlobalFilter: false,
        sortingFn: (a, b) => {
          const aFavs = a.getValue("favs") as number;
          const bFavs = b.getValue("favs") as number;
          return aFavs - bFavs;
        },
        size: 55,
        Cell: ({ row }) => {
          return <FavsRowCell favs={row.original.favs} />;
        },
        filterFn: (row, _columnId, filterValue) => {
          const id = row.original.id;
          const isFavorite = favorites ? favorites.has(id) : false;
          if (filterValue === undefined || filterValue === null) {
            return true;
          }
          return filterValue === true ? isFavorite === true : true;
        },
        Filter: ({ column }) => (
          <Box display="flex" alignItems="center">
            <Switch
              checked={!!column.getFilterValue()}
              onChange={(e) => {
                column.setFilterValue(e.target.checked ? true : undefined);
              }}
            />
          </Box>
        ),
      },
      {
        accessorFn: (row) => row.price_snap?.ground_beef ?? null,
        id: "ground_beef_price",
        enableHiding: true,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableSorting: true,
        header: "Ground Beef Price",
        sortingFn: desc ? "priceSortDesc" : "priceSort",
      },
      {
        accessorFn: (row) => row.price_snap?.eggs ?? null,
        id: "eggs_price",
        enableHiding: true,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableSorting: true,
        header: "Eggs Price",
        sortingFn: desc ? "priceSortDesc" : "priceSort",
      },
      {
        accessorFn: (row) => row.price_snap?.milk ?? null,
        id: "milk_price",
        enableHiding: true,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableSorting: true,
        header: "Milk Price",
        sortingFn: desc ? "priceSortDesc" : "priceSort",
      },
      {
        accessorFn: (row) => row.price_snap?.tomato ?? null,
        id: "tomato_price",
        enableHiding: true,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableSorting: true,
        header: "Tomato Price",
        sortingFn: desc ? "priceSortDesc" : "priceSort",
      },
      {
        accessorFn: (row) => row.price_snap?.onion ?? null,
        id: "onion_price",
        enableHiding: true,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableSorting: true,
        header: "Onion Price",
        sortingFn: desc ? "priceSortDesc" : "priceSort",
      },
      {
        accessorFn: (row) => row.price_snap?.potato ?? null,
        id: "potato_price",
        enableHiding: true,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableSorting: true,
        header: "Potato Price",
        sortingFn: desc ? "priceSortDesc" : "priceSort",
      },
      {
        accessorFn: (row) => row.price_snap?.honey ?? null,
        id: "honey_price",
        enableHiding: true,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableSorting: true,
        header: "Honey Price",
        sortingFn: desc ? "priceSortDesc" : "priceSort",
      },
    ];

    if (userLatLong) {
      return [
        ...baseColumns,
        {
          accessorKey: "location",
          header: "Distance (Miles)",
          size: 100,
          Cell: ({ row }) => {
            if (!userLatLong) return "N/A";
            const farmLatitude = row.original.latitude;
            const farmLongitude = row.original.longitude;
            const [userLat, userLong] = userLatLong;
            if (!farmLatitude || !farmLongitude) return "N/A";
            const distance = haversineDistance(
              [userLat, userLong],
              [farmLatitude, farmLongitude]
            );
            return `${distance.toFixed(2)} miles`;
          },
          Filter: () => null,
          enableColumnFilter: true,
        },
      ];
    }

    return baseColumns;
  }, [userLatLong, favorites, desc]);

  const table = useMaterialReactTable({
    columns,
    data: farms,
    enableKeyboardShortcuts: false,
    enablePagination: false,
    enableColumnPinning: false,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableGlobalFilter: true,
    globalFilterFn: "myCustomFilterFn",
    enableStickyHeader: true,
    enableRowVirtualization: true,
    autoResetPageIndex: false,
    autoResetExpanded: false,
    enableExpandAll: false,

    enableExpanding: true,
    getRowId: (row) => row.id,
    state: {
      expanded: expandedRows,
      columnVisibility: {
        ground_beef_price: false,
        eggs_price: false,
        milk_price: false,
        tomato_price: false,
        onion_price: false,
        potato_price: false,
        honey_price: false,
        "mrt-row-expand": false,
      },
    },
    onExpandedChange: (updater) => {
      setExpandedRows(updater);
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {
        if (
          event.target instanceof HTMLElement &&
          (event.target.closest("a") ||
            event.target.closest(".LinkPreview") ||
            event.target.closest(".FavoritesCell"))
        ) {
          event.stopPropagation();
          return;
        }
        row.toggleExpanded();
      },
    }),

    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          p: 3,
          borderRadius: "8px",
          boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.05)",
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box alignItems="center">
            <Typography variant="h6" fontWeight="600">
              <a
                href={`/farm/${row.original.id}`}
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {row.original.name}
              </a>
            </Typography>
            <Typography
              variant="body2"
              fontWeight="400"
              sx={{ color: "text.secondary" }}
            >
              {row.original.state}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            {row.original.updated_at && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontStyle: "italic" }}
              >
                Last updated on{" "}
                {new Date(row.original.updated_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
            )}
            <Box className="favorites-cell">
              <FavoritesCell
                row={row}
                favs={favorites}
                isloggedIn={isLoggedIn}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          <Box sx={{ flex: "1 1 300px", minWidth: "300px" }}>
            {row.original.site && (
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="500"
                >
                  Website
                </Typography>
                <Typography variant="body1">
                  <a
                    href={
                      row.original.site.startsWith("http")
                        ? row.original.site
                        : `https://${row.original.site}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#1976d2" }}
                  >
                    {row.original.site}
                  </a>
                </Typography>
              </Box>
            )}

            {row.original.foods && row.original.foods.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="500"
                >
                  Foods
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {row.original.foods.join(", ")}
                </Typography>
              </Box>
            )}

            {row.original.standards && row.original.standards.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="500"
                >
                  Standards
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {row.original.standards.join(", ")}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Right column - Prices */}
          {row.original.price_snap &&
            Object.entries(row.original.price_snap).some(
              ([key, value]) => value !== null && key !== "date"
            ) && (
              <Box sx={{ flex: "1 1 300px", minWidth: "300px" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="500"
                  sx={{ mb: 1 }}
                >
                  Prices
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: 2,
                  }}
                >
                  {row.original.price_snap.ground_beef && (
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{
                        p: 1,
                        borderRadius: "4px",
                      }}
                    >
                      <FaCow
                        style={{
                          fontSize: "1.4em",
                          marginRight: "0.5em",
                          color: "#8B4513",
                        }}
                      />
                      <Typography variant="body2">
                        Ground Beef:{" "}
                        <strong>${row.original.price_snap.ground_beef}</strong>
                      </Typography>
                    </Box>
                  )}
                  {row.original.price_snap.eggs && (
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{
                        p: 1,
                        borderRadius: "4px",
                      }}
                    >
                      <FaEgg
                        style={{
                          fontSize: "1.2em",
                          marginRight: "0.5em",
                          color: "hsl(42, 31.20%, 69.20%)",
                        }}
                      />
                      <Typography variant="body2">
                        Eggs: <strong>${row.original.price_snap.eggs}</strong>
                      </Typography>
                    </Box>
                  )}
                  {row.original.price_snap.milk && (
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{
                        p: 1,
                        borderRadius: "4px",
                      }}
                    >
                      <GiMilkCarton
                        style={{
                          fontSize: "1.2em",
                          marginRight: "0.5em",
                        }}
                      />
                      <Typography variant="body2">
                        Milk: <strong>${row.original.price_snap.milk}</strong>
                      </Typography>
                    </Box>
                  )}
                  {row.original.price_snap.tomato && (
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{
                        p: 1,
                        borderRadius: "4px",
                      }}
                    >
                      <GiTomato
                        style={{
                          fontSize: "1.2em",
                          marginRight: "0.5em",
                          color: "#FF6347",
                        }}
                      />
                      <Typography variant="body2">
                        Tomato:{" "}
                        <strong>${row.original.price_snap.tomato}</strong>
                      </Typography>
                    </Box>
                  )}
                  {row.original.price_snap.onion && (
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{
                        p: 1,
                        borderRadius: "4px",
                      }}
                    >
                      <GiGarlic
                        style={{
                          fontSize: "1.2em",
                          marginRight: "0.5em",
                          color: "hsl(42, 95.30%, 66.70%)",
                        }}
                      />
                      <Typography variant="body2">
                        Onion: <strong>${row.original.price_snap.onion}</strong>
                        /lb
                      </Typography>
                    </Box>
                  )}
                  {row.original.price_snap.potato && (
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{
                        p: 1,
                        borderRadius: "4px",
                      }}
                    >
                      <GiPotato
                        style={{
                          fontSize: "1.2em",
                          marginRight: "0.5em",
                          color: "#CD853F",
                        }}
                      />
                      <Typography variant="body2">
                        Potato:{" "}
                        <strong>${row.original.price_snap.potato}</strong>/lb
                      </Typography>
                    </Box>
                  )}
                  {row.original.price_snap.honey && (
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{
                        p: 1,
                        borderRadius: "4px",
                      }}
                    >
                      <GiHoneyJar
                        style={{
                          fontSize: "1.2em",
                          marginRight: "0.5em",
                          color: "orange",
                        }}
                      />
                      <Typography variant="body2">
                        Honey: <strong>${row.original.price_snap.honey}</strong>
                        /lb
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            )}
        </Box>

        {row.original.shipping && (
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <FaShippingFast
              style={{ marginRight: "0.5em", color: "#1976d2" }}
            />
            <Typography variant="body2" color="text.secondary">
              This farm offers shipping
            </Typography>
          </Box>
        )}
      </Box>
    ),

    positionExpandColumn: "last",
    sortingFns: {
      priceSort: (rowA, rowB, columnId) => {
        const a = rowA.getValue(columnId);
        const b = rowB.getValue(columnId);
        if (a === null && b === null) return 0;
        if (a === null) return 1;
        if (b === null) return -1;
        return Number(a) - Number(b);
      },
      priceSortDesc: (rowA, rowB, columnId) => {
        const a = rowA.getValue(columnId);
        const b = rowB.getValue(columnId);
        if (a === null) return -1;
        if (b === null) return 1;
        return Number(a) - Number(b);
      },
    },
    filterFns: {
      myCustomFilterFn: (row: Row, id: string, filterValue: string) => {
        const searchTerms = filterValue.toLowerCase().trim().split(/\s+/);
        const farm = row.original;
        if (!searchTerms.length) return true;
        return searchTerms.every((term) => {
          return matchesSearchTerm(term, farm.name);
        });
      },
    },

    layoutMode: "grid",
    muiTableBodyProps: {
      sx: {},
    },

    muiTableBodyCellProps: {
      sx: {
        borderBottom: "2px solid rgba(57, 55, 55, 0.05)",
      },
    },
    muiTableContainerProps: {
      sx: {
        height: "95%",
        willChange: "transform",
        scrollSnapType: { xs: "x mandatory", md: "none" },
        maxWidth: "100%",
        overflowX: "auto",
        position: "relative",
        "& th, & td": {
          scrollSnapAlign: "start",
        },
      },
    },
    enableTopToolbar: false,

    muiTableProps: {
      sx: {
        width: "100%",
        tableLayout: "fixed",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        fontWeight: "900",
        ".MuiTableSortLabel-icon": {
          display: "none",
        },
        ".MuiTableSortLabel-root.Mui-active": {
          color: "inherit",
        },
        ".MuiBadge-badge": {
          display: "none",
        },
        ".MuiBadge-root": {
          display: "none",
        },
      },
    },
    rowVirtualizerInstanceRef,
    rowVirtualizerOptions: {
      overscan: 30,
      estimateSize: () => {
        return 114;
      },
      getScrollElement: () => document.querySelector(".MuiTableContainer-root"),
    },
  });

  const handleSearchChange = useCallback(
    (value: string) => {
      table.setGlobalFilter(value.toLowerCase());
    },
    [table]
  );

  const handleFoodFilterChange = useCallback(
    (newFilters: Filter[], mode?: "any" | "all") => {
      table.setColumnFilters((prev) => {
        const otherFilters = prev.filter((filter) => filter.id !== "foods");
        if (newFilters.length === 0) {
          return otherFilters;
        }
        return [
          ...otherFilters,
          {
            id: "foods",
            value: {
              filters: newFilters,
              mode: mode || foodFilterMode,
            },
          },
        ];
      });
    },
    [table, foodFilterMode]
  );

  const handleStandardFilterChange = useCallback(
    (newFilters: StandardsOption[]) => {
      table.setColumnFilters((prev) => {
        const otherFilters = prev.filter((filter) => filter.id !== "standards");
        if (newFilters.length === 0) {
          return otherFilters;
        }
        return [
          ...otherFilters,
          {
            id: "standards",
            value: newFilters,
          },
        ];
      });
    },
    [table]
  );

  const handleFavFilterChange = useCallback(
    (newFilters: boolean) => {
      table.setColumnFilters((prev) => {
        const otherFilters = prev.filter((filter) => filter.id !== "favs");
        if (newFilters === undefined) {
          return otherFilters;
        }
        return [
          ...otherFilters,
          {
            id: "favs",
            value: newFilters,
          },
        ];
      });
    },
    [table]
  );

  const handlePriceFilterChange = useCallback(
    (newFilters: PriceFilters) => {
      table.setColumnFilters((prev) => {
        const otherFilters = prev.filter(
          (filter) => filter.id !== "price_snap"
        );
        const hasActiveFilters = Object.values(newFilters).some(
          (range) =>
            (range?.min !== null && range?.min !== undefined) ||
            (range?.max !== null && range?.max !== undefined)
        );

        if (!hasActiveFilters) {
          return otherFilters;
        }
        return [...otherFilters, { id: "price_snap", value: newFilters }];
      });
    },
    [table]
  );

  const handleShippingFilterChange = useCallback(
    (newFilters: boolean) => {
      table.setColumnFilters((prev) => {
        const otherFilters = prev.filter((filter) => filter.id !== "shipping");
        if (newFilters === undefined) {
          return otherFilters;
        }
        return [
          ...otherFilters,
          {
            id: "shipping",
            value: newFilters,
          },
        ];
      });
    },
    [table]
  );

  const handleVerifiedFilterChange = useCallback(
    (newFilters: boolean) => {
      table.setColumnFilters((prev) => {
        const otherFilters = prev.filter((filter) => filter.id !== "verified");
        if (newFilters === undefined) {
          return otherFilters;
        }
        return [
          ...otherFilters,
          {
            id: "verified",
            value: newFilters,
          },
        ];
      });
    },
    [table]
  );

  const handleSortChange = useCallback(
    (sortBy: string) => {
      switch (sortBy) {
        case "ground-beef-low":
          setDesc(false);
          table.setSorting([{ id: "ground_beef_price", desc: false }]);
          break;
        case "ground-beef-high":
          setDesc(true);
          table.setSorting([{ id: "ground_beef_price", desc: true }]);
          break;
        case "eggs-low":
          setDesc(false);
          table.setSorting([{ id: "eggs_price", desc: false }]);
          break;
        case "eggs-high":
          setDesc(true);
          table.setSorting([{ id: "eggs_price", desc: true }]);
          break;
        case "milk-low":
          setDesc(false);
          table.setSorting([{ id: "milk_price", desc: false }]);
          break;
        case "milk-high":
          setDesc(true);
          table.setSorting([{ id: "milk_price", desc: true }]);
          break;
        case "favs-low":
          setDesc(false);
          table.setSorting([{ id: "favs", desc: false }]);
          break;
        case "favs-high":
          setDesc(true);
          table.setSorting([{ id: "favs", desc: true }]);
          break;
        default:
          table.resetSorting();
      }
    },
    [table]
  );

  const clearAllFilters = useCallback(() => {
    table.resetColumnFilters();
    table.setGlobalFilter("");
  }, [table]);

  const refreshTableData = useCallback(() => {
    table.setColumnFilters([...table.getState().columnFilters]);
  }, [table]);

  return {
    table,
    handleSortChange,
    handleFoodFilterChange,
    handleStandardFilterChange,
    handleFavFilterChange,
    handleShippingFilterChange,
    handleVerifiedFilterChange,
    handlePriceFilterChange,
    handleSearchChange,
    clearAllFilters,
    refreshTableData,
  };
};
