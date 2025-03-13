import { useState, useEffect } from "react";
import { Box, Paper, Typography, CircularProgress, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  AttributionControl,
} from "react-leaflet";
import { Farm } from "../table/FarmTable.js";
import * as L from "leaflet";

// Fix for default Leaflet icon issue in webpack environments
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Set up default icon
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    ' <a href="https://leafletjs.com/">Leaflet</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',
});

interface FarmMapProps {
  farms: Farm[];
  isVisible: boolean;
  onToggle: () => void;
  alwaysShow?: boolean;
  showToggle?: boolean;
}

// Component for updating map view when farms change
const FarmMapUpdater = ({ farms }: { farms: Farm[] }) => {
  const map = useMap();

  useEffect(() => {
    if (farms.length === 0) {
      map.setView([39.8283, -98.5795], 4);
      return;
    }

    // Create bounds to fit all markers
    if (farms.length > 0) {
      const validFarms = farms.filter(
        (farm) => farm.latitude && farm.longitude
      );
      if (validFarms.length > 0) {
        const points = validFarms.map(
          (farm) =>
            [farm.latitude || 0, farm.longitude || 0] as [number, number]
        );
        const bounds = L.latLngBounds(points);
        map.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 10,
        });
      }
    }
  }, [farms, map]);

  return null;
};

export const FarmMapInner = ({
  farms,
  onToggle,
  alwaysShow,
  showToggle,
}: FarmMapProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleMapReady = () => {
    setIsLoading(false);
  };

  return (
    <Paper
      sx={{
        mt: 0,
        p: 0,
        backgroundColor: "transparent",
        borderTop: "none",
        borderColor: "transparent",
        borderRadius: 0,
        height: alwaysShow ? "500px" : "95%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 0,
          backgroundColor: "transparent",
        }}
      >
        <>
          {showToggle ? (
            <Button
              variant="outlined"
              startIcon={<CloseIcon />}
              onClick={onToggle}
              size="small"
            >
              Close Map
            </Button>
          ) : null}
          {!alwaysShow ? (
            <Typography variant="h6">
              Farm Locations ({farms.length} visible)
            </Typography>
          ) : null}
        </>
      </Box>

      <Box sx={{ width: "100%", height: "calc(100% - 40px)" }}>
        {farms.length === 0 && (
          <Alert
            severity="info"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              maxWidth: "80%",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
          >
            No farms match the current filters. Adjust your filters to see farms
            on the map.
          </Alert>
        )}

        <div
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "4px",
            overflow: "hidden",
            opacity: isLoading ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <MapContainer
            center={[39.8283, -98.5795]}
            zoom={4}
            style={{ height: "100%", width: "100%" }}
            whenReady={handleMapReady}
            attributionControl={false}
          >
            {/* Leaflet.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
              attribution:
                ' <a href="https://leafletjs.com/">Leaflet</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',
            }
          ) */}
            <AttributionControl prefix=" <a href='https://leafletjs.com/'>Leaflet</a> | &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> " />

            <TileLayer
              // attribution=' <a href="https://leafletjs.com/">Leaflet</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> '
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FarmMapUpdater farms={farms} />

            {farms.map((farm) => {
              const lng = farm.longitude || 0;
              const lat = farm.latitude || 0;

              // Skip invalid coordinates
              if (!lat || !lng) return null;

              return (
                <Marker key={farm.id} position={[lat, lng]}>
                  <Popup maxWidth={300} className="custom-popup">
                    <div className="custom-popup-content">
                      <h4 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>
                        {alwaysShow && farm.site ? (
                          <a
                            href={farm.site}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              color: "#1976d2",
                              textDecoration: "none",
                              fontWeight: 500,
                              cursor: "pointer",
                            }}
                          >
                            {farm.name}
                          </a>
                        ) : (
                          <a
                            href="#"
                            className="farm-link"
                            style={{
                              color: "#1976d2",
                              textDecoration: "none",
                              fontWeight: 500,
                              cursor: "pointer",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(`/farm/${farm.id}`);
                            }}
                          >
                            {farm.name}
                          </a>
                        )}
                      </h4>
                      {farm.show_google_map && (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${farm.name},${farm.state}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: "#1976d2",
                            textDecoration: "none",
                            fontSize: "12px",
                            display: "block",
                            marginBottom: "8px",
                          }}
                        >
                          View on Google Maps
                        </a>
                      )}
                      {(!alwaysShow || (alwaysShow && !farm.site)) && (
                        <>
                          <p
                            className="map-foods"
                            style={{ margin: "0", fontSize: "14px" }}
                          >
                            {farm.price_snap?.ground_beef}
                          </p>
                          <p
                            className="map-foods"
                            style={{ margin: "0", fontSize: "14px" }}
                          >
                            {farm.foods?.join(", ")}
                          </p>
                        </>
                      )}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default FarmMapInner;
