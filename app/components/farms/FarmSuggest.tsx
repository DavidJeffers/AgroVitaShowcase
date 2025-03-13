// import React, { useState, useEffect } from "react";
// import { Form } from "react-router";
// import {
//   Box,
//   TextField,
//   Switch,
//   FormControlLabel,
//   Button,
//   Paper,
//   Typography,
//   Stack,
//   Alert,
// } from "@mui/material";
// import StandardsFilter from "~/components/farms/table/filters/StandardsFilter";
// import { AdvancedFilter } from "~/components/farms/table/filters/FoodsFilter";
// import type { Filter } from "~/components/farms/table/filters/FoodsFilter";
// import { StandardsOption } from "~/components/farms/table/utils/FilterEnums";

// interface Props {
//   error?: string;
//   success?: boolean;
// }

// const FarmSuggestForm: React.FC<Props> = ({ error, success }) => {
//   const [address, setAddress] = useState("");
//   const [name, setName] = useState("");
//   const [site, setSite] = useState("");
//   const [description, setDescription] = useState("");
//   const [shipping, setShipping] = useState(false);
//   const [selectedStandards, setSelectedStandards] = useState<StandardsOption[]>(
//     []
//   );
//   const [selectedFoods, setSelectedFoods] = useState<Filter[]>([]);
//   const [latLong, setLatLong] = useState<{ lat: number; lng: number } | null>(
//     null
//   );
//   const [addressError, setAddressError] = useState<string | null>(null);
//   const [shouldClearFilters, setShouldClearFilters] = useState(false);
//   const [_isFoodFilterActive, setIsFoodFilterActive] = useState(false);
//   const [_isStandardFilterActive, setIsStandardFilterActive] = useState(false);
//   const [_successMessage, setSuccessMessage] = useState<string | null>(null);

//   useEffect(() => {
//     if (success) {
//       handleClearAll();
//       setSuccessMessage(
//         "Farm suggestion submitted successfully, you can addup to 5 suggestions per day"
//       );
//     }
//   }, [success]);

//   const handleAddressSubmit = async () => {
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//           address
//         )}`
//       );
//       const data = await response.json();
//       if (data && data[0]) {
//         setLatLong({
//           lat: parseFloat(data[0].lat),
//           lng: parseFloat(data[0].lon),
//         });
//         setAddressError(null);
//       } else {
//         setAddressError("Could not find coordinates for this address");
//       }
//     } catch (error) {
//       console.error(error);
//       setAddressError("Error converting address to coordinates");
//     }
//   };

//   const handleFoodFilterChange = (newFilters: Filter[]) => {
//     setSelectedFoods(newFilters);
//     setIsFoodFilterActive(newFilters.length > 0);
//   };

//   const handleStandardChange = (newStandards: StandardsOption[]) => {
//     setSelectedStandards(newStandards);
//     setIsStandardFilterActive(newStandards.length > 0);
//   };

//   const handleClearAll = () => {
//     setSelectedFoods([]);
//     setSelectedStandards([]);
//     setShouldClearFilters(true);
//     setIsFoodFilterActive(false);
//     setIsStandardFilterActive(false);
//     setAddress("");
//     setName("");
//     setSite("");
//     setDescription("");
//     setShipping(false);
//     setLatLong(null);
//     setAddressError(null);
//   };

//   return (
//     <Paper sx={{ p: 4, maxWidth: 800, mx: "auto", mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Suggest a Farm
//       </Typography>
//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//       )}
//       <Form method="post" encType="multipart/form-data">
//         <Stack spacing={3}>
//           {/* Hidden lat/long inputs */}
//           {latLong && (
//             <>
//               <input type="hidden" name="latitude" value={latLong.lat} />
//               <input type="hidden" name="longitude" value={latLong.lng} />
//             </>
//           )}

//           <Box>
//             <Typography variant="h6" gutterBottom>
//               Products
//             </Typography>
//             <AdvancedFilter.MainButton
//               onFilterChange={handleFoodFilterChange}
//               farmAdd={true}
//               clearFilter={shouldClearFilters}
//               setShouldClearFilters={setShouldClearFilters}
//               setFoodFilterActive={setIsFoodFilterActive}
//             />
//             <input
//               type="hidden"
//               name="foods"
//               value={JSON.stringify(
//                 selectedFoods
//                   .flatMap((filter) =>
//                     Array.isArray(filter.sub) ? filter.sub : [filter.sub]
//                   )
//                   .filter(Boolean)
//               )}
//             />
//           </Box>

//           <Box>
//             <Typography variant="h6" gutterBottom>
//               Standards
//             </Typography>
//             <StandardsFilter
//               onChange={handleStandardChange}
//               clearFilter={shouldClearFilters}
//               setShouldClearFilters={setShouldClearFilters}
//               setStandardFilterActive={setIsStandardFilterActive}
//             />
//             <input
//               type="hidden"
//               name="standards"
//               value={JSON.stringify(selectedStandards)}
//             />
//           </Box>

//           <TextField
//             label="Farm Name"
//             required
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             name="name"
//           />

//           <TextField
//             label="Website"
//             value={site}
//             onChange={(e) => setSite(e.target.value)}
//             name="site"
//           />

//           <TextField
//             label="Description"
//             multiline
//             rows={4}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             name="description"
//           />

//           <Box>
//             <TextField
//               label="Address"
//               fullWidth
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               error={!!addressError}
//               helperText={addressError}
//             />
//             <input type="hidden" name="address" value={address} />
//             <Button
//               variant="outlined"
//               onClick={handleAddressSubmit}
//               sx={{ mt: 1 }}
//             >
//               Convert to Coordinates
//             </Button>
//             {latLong && (
//               <Typography variant="body2" sx={{ mt: 1, color: "success.main" }}>
//                 Coordinates found: {latLong.lat}, {latLong.lng}
//               </Typography>
//             )}
//           </Box>

//           <Box>
//             <Stack direction="row" spacing={2}>
//               <input
//                 type="hidden"
//                 name="shipping"
//                 value={shipping ? "true" : "false"}
//               />
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={shipping}
//                     onChange={(e) => setShipping(e.target.checked)}
//                   />
//                 }
//                 label="Shipping Available"
//               />
//             </Stack>
//           </Box>

//           <Box
//             sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}
//           >
//             <Button
//               onClick={handleClearAll}
//               variant="outlined"
//               color="secondary"
//               sx={{ mt: 2 }}
//             >
//               Clear All
//             </Button>
//             <Button
//               type="submit"
//               variant="contained"
//               disabled={!latLong}
//               sx={{ mt: 2 }}
//             >
//               Submit Suggestion
//             </Button>
//           </Box>
//         </Stack>
//       </Form>
//     </Paper>
//   );
// };

// export default FarmSuggestForm;
