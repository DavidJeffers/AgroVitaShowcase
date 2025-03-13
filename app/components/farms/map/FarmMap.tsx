import { lazy, Suspense, useEffect, useState } from "react";
import { Button, Box, CircularProgress } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import { Farm } from "../table/FarmTable.js";

interface FarmMapProps {
  isVisible?: boolean;
  onToggle?: () => void;
  filteredFarms: Farm[];
  alwaysShow?: boolean;
  showToggle?: boolean;
}

const ClientMap = lazy(() =>
  import("./FarmMapInner.client.js").then((module) => ({
    default: module.FarmMapInner,
  }))
);
const hydrating = true;

export const FarmMap = ({
  isVisible = false,
  onToggle,
  filteredFarms,
  alwaysShow = false,
  showToggle = false,
}: FarmMapProps) => {
  const shouldShowMap = isVisible;
  const [hydrated, setHydrated] = useState(() => !hydrating);

  useEffect(function hydrate() {
    setHydrated(true);
  }, []);

  if (showToggle && !isVisible) {
    return (
      <Box sx={{ mt: 2, display: "flex", justifyContent: "start" }}>
        <Button
          variant="outlined"
          startIcon={<MapIcon />}
          onClick={onToggle}
          sx={{ borderRadius: "20px" }}
        >
          Show Map View
        </Button>
      </Box>
    );
  }

  if (!isVisible) {
    return null;
  }

  return (
    <Suspense
      fallback={
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            // height: "500px",
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      {hydrated ? (
        <ClientMap
          farms={filteredFarms}
          isVisible={shouldShowMap}
          onToggle={onToggle ?? (() => {})}
          alwaysShow={alwaysShow}
          showToggle={showToggle}
        />
      ) : null}
    </Suspense>
  );
};

//     >
//       <CircularProgress />
//     </Box>
//   );

//   const clientMapElement = React.createElement(ClientMap, {
//     farms: filteredFarms,
//     isVisible: shouldShowMap,
//     onToggle: onToggle ?? (() => {}),
//     alwaysShow,
//     showToggle,
//   });

//   return React.createElement(
//     React.Suspense,
//     { fallback: fallbackElement },
//     clientMapElement
//   );
// };
export default FarmMap;
