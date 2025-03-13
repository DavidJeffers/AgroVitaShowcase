import { LoaderFunctionArgs, useSearchParams } from "react-router";
import { useLoaderData, Form, useActionData } from "react-router";
import { createSupabaseServerClient } from "~/utils/supabase.server";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  FormControlLabel,
  Switch,
  Chip,
  Tabs,
  Tab,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
  Modal,
  Divider,
} from "@mui/material";
import { GiExpandedRays } from "react-icons/gi";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { RiProfileLine } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import { TbHexagonNumber1Filled } from "react-icons/tb";
import { TbHexagonNumber2Filled } from "react-icons/tb";
import { TbHexagonNumber3Filled } from "react-icons/tb";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useState, useRef, useCallback } from "react";
// import { UserRole } from "~/components/auth/userRoles";
import {
  MainFilter,
  StandardsOption,
  SubFilter,
} from "~/components/farms/table/utils/FilterEnums";
import type { Filter } from "~/components/farms/table/filters/FoodsFilter";
// import uploadVerification from "~/utils/uploadVerification";
import { AdvancedFilter } from "~/components/farms/table/filters/FoodsFilter";
import StandardsFilter from "~/components/farms/table/filters/StandardsFilter";
import { GrInfo } from "react-icons/gr";
// import {
//   createStripeSessionStandardSubscription,
//   createStripeSessionVerificationPayment,
//   createStripeSessionVerification,
//   createStripeSessionProSubscription,
// } from "~/utils/stripe.server";
import { CheckCircleOutline } from "@mui/icons-material";
import { SubscriptionStatus, VerificationStatus } from "~/utils/farmerProfile";
// import { VerificationComponent } from "~/components/auth/verification";
import CowLicense from "~/components/auth/svgs/cowId";

// function levenshteinDistance(a: string, b: string): number {
//   const matrix = Array(b.length + 1)
//     .fill(null)
//     .map(() => Array(a.length + 1).fill(null));

//   for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
//   for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

//   for (let j = 1; j <= b.length; j++) {
//     for (let i = 1; i <= a.length; i++) {
//       const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
//       matrix[j][i] = Math.min(
//         matrix[j][i - 1] + 1,
//         matrix[j - 1][i] + 1,
//         matrix[j - 1][i - 1] + substitutionCost
//       );
//     }
//   }

//   return matrix[b.length][a.length];
// }

enum SubscriptionTier {
  FREE = "FREE",
  STANDARD = "STANDARD",
  PRO = "PRO",
}

enum SignUpStep {
  PAYMENT = 0,
  VERIFICATION = 1,
  FARM_DETAILS = 2,
}

interface SubscriptionPlan {
  tier: SubscriptionTier;
  price: number;
  verificationFee: number;
  name: string;
  features: string[];
}

const perks = [
  {
    title: "Expand Your Reach",
    icon: <GiExpandedRays />,
    color: "blue",
    description:
      "Connect with thousands of buyers eager to support local farmers and purchase fresh, high-quality products",
  },
  {
    title: "Analytics & Insights",
    icon: <TbDeviceDesktopAnalytics />,
    color: "purple",
    description:
      "Gain valuable insights into your farm's performance with detailed analytics on visits, interactions, and customer preferences",
  },
  {
    title: "Customizable Profiles",
    icon: <RiProfileLine />,
    color: "orange",
    description:
      "Create a standout profile for your farm with descriptions, images, and updates that showcase your unique story",
  },
  {
    title: "Boost Your Revenue",
    icon: <GiTakeMyMoney />,
    color: "green",
    description:
      "Sell directly to customers without intermediaries and maximize your profits while building lasting relationships",
  },
  {
    title: "Build Customer Trust",
    icon: <VscWorkspaceTrusted />,
    color: "hsla(209, 100.00%, 50.00%, 0.50)",
    description:
      "Highlight your sustainable practices and standards to attract conscious consumers and foster loyalty",
  },
];

const subscriptionPlans: SubscriptionPlan[] = [
  {
    tier: SubscriptionTier.FREE,
    price: 0,
    verificationFee: 5,
    name: "Basic",
    features: ["Basic farm listing", "Standard verification"],
  },
  {
    tier: SubscriptionTier.STANDARD,
    price: 5,
    verificationFee: 0,
    name: "Standard",
    features: [
      "Enhanced farm listing",
      "Standard verification",
      "Basic analytics",
    ],
  },
  {
    tier: SubscriptionTier.PRO,
    price: 17,
    verificationFee: 0,
    name: "Pro",
    features: [
      "Premium farm listing",
      "Priority verification",
      "Advanced analytics",
      "Priority support",
    ],
  },
];

enum HoverState {
  NONE = "NONE",
  FREE = "FREE",
  STANDARD = "STANDARD",
  PRO = "PRO",
}

export async function loader({ request }: LoaderFunctionArgs) {
  const supabase = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabase.client.auth.getUser();

  if (!user) {
    return {
      user,
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
      // profile: profileResult.data,
      activeTab: 0,
    };
  }

  const [profileResult, farmerProfileResult] = await Promise.all([
    supabase.client.from("profiles").select("role").eq("id", user.id).single(),
    supabase.client
      .from("farmer_profiles")
      .select("*")
      .eq("id", user.id)
      .single(),
  ]);

  let activeTab = 0;
  if (
    (farmerProfileResult.data?.verification_status ===
      VerificationStatus.PENDING ||
      farmerProfileResult.data?.verification_status ===
        VerificationStatus.REJECTED) &&
    farmerProfileResult.data?.subscription_status === SubscriptionStatus.ACTIVE
  ) {
    activeTab = 1;
  } else if (
    farmerProfileResult.data?.verification_status ===
      VerificationStatus.VERIFIED &&
    farmerProfileResult.data?.subscription_status === SubscriptionStatus.ACTIVE
  ) {
    activeTab = 2;
  }

  return {
    user,
    stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
    profile: profileResult.data,
    activeTab,
  };
}

enum ActionType {
  SEARCH = "SEARCH",
  SUBMIT = "SUBMIT",
  CREATE_PAYMENT = "CREATE_PAYMENT",
  VERIFY_IDENTITY = "VERIFY_IDENTITY",
}

// export async function action({ request }: ActionFunctionArgs) {
//   const supabase = createSupabaseServerClient(request);
//   const formData = await request.formData();
//   console.log("formData", formData);
//   const actionType = formData.get("_action") as ActionType;

//   if (actionType === ActionType.CREATE_PAYMENT) {
//     const tier = formData.get("tier") as SubscriptionTier;
//     const userId = (await supabase.client.auth.getUser()).data.user?.id;

//     if (!userId) return { error: "Not authenticated" };

//     try {
//       let session;
//       switch (tier) {
//         case SubscriptionTier.FREE:
//           session = await createStripeSessionVerificationPayment(userId);
//           break;
//         case SubscriptionTier.STANDARD:
//           session = await createStripeSessionStandardSubscription(userId);
//           break;
//         case SubscriptionTier.PRO:
//           session = await createStripeSessionProSubscription(userId);
//           break;
//         default:
//           throw new Error("Invalid subscription tier");
//       }

//       return redirect(session.url!);
//     } catch (error) {
//       return {
//         error: "Failed to create payment session",
//         errorMsg: error,
//       };
//     }
//   }

//   if (actionType === ActionType.VERIFY_IDENTITY) {
//     const userId = (await supabase.client.auth.getUser()).data.user?.id;
//     if (!userId) return { error: "Not authenticated" };

//     try {
//       const session = await createStripeSessionVerification(userId);
//       return { client_secret: session.client_secret };
//     } catch (error) {
//       return {
//         error: "Failed to create verification session",
//         errorMsg: error,
//       };
//     }
//   }

//   if (actionType === ActionType.SEARCH) {
//     const searchTerm = formData.get("searchTerm") as string;

//     if (!searchTerm) {
//       return { farms: [] };
//     }

//     const { data: farms } = await supabase.client
//       .from("farms")
//       .select("*")
//       .or(`name.ilike.%${searchTerm}%,site.ilike.%${searchTerm}%`);

//     if (!farms) return { farms: [] };

//     const sortedFarms = farms
//       .map((farm) => ({
//         ...farm,
//         distance: Math.min(
//           levenshteinDistance(
//             farm.name?.toLowerCase() || "",
//             searchTerm.toLowerCase()
//           ),
//           levenshteinDistance(
//             farm.site?.toLowerCase() || "",
//             searchTerm.toLowerCase()
//           )
//         ),
//       }))
//       .sort((a, b) => a.distance - b.distance)
//       .slice(0, 5);

//     return { farms: sortedFarms };
//   } else if (actionType === ActionType.SUBMIT) {
//     const userId = (await supabase.client.auth.getUser()).data.user?.id;
//     if (!userId) {
//       return { error: "Not authenticated" };
//     }

//     try {
//       const verificationFiles = formData.getAll("verification") as File[];
//       const fileUrls = await Promise.all(
//         verificationFiles.map(async (file) => {
//           const fileName = `${userId}/${Date.now()}-${file.name}`;
//           const buffer = await file.arrayBuffer();
//           const result = await uploadVerification(fileName, buffer);

//           if (result instanceof Error) {
//             throw result;
//           }
//           return fileName;
//         })
//       );

//       const farmData = {
//         user_id: userId,
//         farm_id: (formData.get("farmId") as string) || null,
//         verification_files: fileUrls,
//         name: (formData.get("name") as string) || null,
//         site: (formData.get("site") as string) || null,
//         latitude: formData.get("latitude")
//           ? parseFloat(formData.get("latitude") as string)
//           : null,
//         longitude: formData.get("longitude")
//           ? parseFloat(formData.get("longitude") as string)
//           : null,
//         foods: formData.get("foods")
//           ? JSON.parse(formData.get("foods") as string)
//           : null,
//         standards: formData.get("standards")
//           ? JSON.parse(formData.get("standards") as string)
//           : null,
//         shipping: formData.get("shipping") === "true",
//         description: (formData.get("description") as string) || null,
//         address: (formData.get("address") as string) || null,
//       };

//       console.log("farmData", farmData);

//       const { error: potentialFarmerError } = await supabase.client
//         .from("potential_farmers")
//         .insert(farmData);

//       if (potentialFarmerError) throw potentialFarmerError;

//       const { error: profileError } = await supabase.client
//         .from("profiles")
//         .update({ role: UserRole.PENDING_FARMER })
//         .eq("id", userId);

//       if (profileError) throw profileError;

//       return redirect("/farm-submitted");
//     } catch (error) {
//       return {
//         error: "Failed to submit farmer application",
//         errorMsg: error,
//       };
//     }
//   }
// }

export default function FarmerSignUp() {
  const { activeTab } = useLoaderData<typeof loader>();
  const actionData = useActionData();
  // const [selectedFarm, setSelectedFarm] = useState<string | null>(null);
  const [selectedFoods, setSelectedFoods] = useState<Filter[]>([]);
  const [selectedStandards, setSelectedStandards] = useState<StandardsOption[]>(
    []
  );
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  /* const uploadFetcher = useFetcher(); */
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [site, setSite] = useState("");
  const [description, setDescription] = useState("");
  const [shipping, setShipping] = useState(false);
  const [latLong, setLatLong] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [addressError, setAddressError] = useState<string | null>(null);
  const [shouldClearFilters, setShouldClearFilters] = useState(false);
  const [_isFoodFilterActive, setIsFoodFilterActive] = useState(false);
  const [_isStandardFilterActive, setIsStandardFilterActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hoveredTier, setHoveredTier] = useState<HoverState>(HoverState.NONE);
  const [isWhyJoinOpen, setIsWhyJoinOpen] = useState(true);
  const [currentFoodTab, setCurrentFoodTab] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedStandardCount, setSelectedStandardCount] = useState(0);

  const handleAddressSubmit = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();
      if (data && data[0]) {
        setLatLong({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        });
        setAddressError(null);
      } else {
        setAddressError("Could not find coordinates for this address");
      }
    } catch (error) {
      console.log("error", error);
      setAddressError("Error converting address to coordinates");
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleClearFiles = () => {
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => {
      const newFiles = prev.filter((_, i) => i !== index);

      if (fileInputRef.current) {
        const dt = new DataTransfer();
        newFiles.forEach((file) => dt.items.add(file));
        fileInputRef.current.files = dt.files;
      }

      return newFiles;
    });
  };

  const renderPaymentStep = () => (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 4 }}>
      {hoveredTier === HoverState.NONE ? (
        <Typography
          variant="h4"
          gutterBottom
          sx={{ mb: 6, textAlign: "center" }}
        >
          {"Coming Soon!"}
        </Typography>
      ) : (
        <Typography
          variant="h4"
          gutterBottom
          sx={{ mb: 6, textAlign: "center" }}
        >
          {hoveredTier}
        </Typography>
      )}
      <Grid container spacing={6} justifyContent="center">
        {subscriptionPlans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.tier}>
            <Form method="post">
              <input
                type="hidden"
                name="_action"
                value={ActionType.CREATE_PAYMENT}
              />
              <input type="hidden" name="tier" value={plan.tier} />

              <Paper
                onMouseEnter={() => setHoveredTier(HoverState[plan.tier])}
                onMouseLeave={() => setHoveredTier(HoverState.NONE)}
                sx={{
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "all 0.3s ease",
                  backgroundColor: "background.default",
                  cursor: "pointer",
                  transform:
                    hoveredTier === HoverState.NONE
                      ? "scale(1)"
                      : hoveredTier === HoverState[plan.tier]
                      ? "scale(1.1)"
                      : "scale(0.95)",
                  opacity:
                    hoveredTier === HoverState.NONE
                      ? 1
                      : hoveredTier === HoverState[plan.tier]
                      ? 1
                      : 0.7,
                }}
              >
                <Box
                  component="img"
                  src={`${plan.tier.toLowerCase()}.png`}
                  alt={`${plan.name} plan`}
                  sx={{
                    width: 420,
                    height: 400,
                    mb: 4,
                    filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))",
                    transition: "transform 0.3s ease",
                    cursor: "pointer",
                  }}
                />
                <Box
                  className="plan-content"
                  sx={{
                    flex: 1,
                    width: "100%",
                    textAlign: "center",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <Typography variant="h2" sx={{ mb: 0, fontWeight: 600 }}>
                    {plan.name}
                  </Typography>
                  <Typography variant="h4" sx={{ mb: 4, fontWeight: 500 }}>
                    {/* ${plan.price}/month */}
                    {/* {plan.verificationFee > 0 ? (
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{ mt: 1, color: "text.secondary" }}
                      >
                        + ${plan.verificationFee} verification fee
                      </Typography>
                    ) : (
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{ mt: 1, color: "text.secondary" }}
                      >
                        No verification fee
                      </Typography>
                    )} */}
                  </Typography>
                  <List sx={{ width: "100%", pt: 0 }}>
                    {plan.features.map((feature, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleOutline color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          sx={{ fontWeight: 500, fontSize: "3.2rem" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Paper>
            </Form>
          </Grid>
        ))}
        <Modal
          open={isWhyJoinOpen}
          onClose={() => setIsWhyJoinOpen(false)}
          aria-labelledby="why-join-modal"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            sx={{
              maxWidth: 800,
              maxHeight: "90vh",
              overflow: "auto",
              p: 2,
              m: 2,
              outline: "none",
            }}
          >
            <Typography
              variant="h4"
              id="why-join-modal"
              sx={{ textAlign: "center", mb: 0 }}
            >
              Why Join Our AgroVita?
            </Typography>

            <List>
              {perks.map((perk) => (
                <ListItem key={perk.title}>
                  <ListItemIcon
                    sx={{
                      fontSize: "2.5rem",
                      pr: 2,
                      "&:hover": {
                        color: perk.color,
                        cursor: "pointer",
                      },
                    }}
                  >
                    {perk.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={perk.title}
                    secondary={perk.description}
                    sx={{
                      ".MuiListItemText-primary": {
                        fontSize: "1.05rem",
                        fontWeight: "bold",
                      },
                      ".MuiListItemText-secondary": {
                        fontSize: "0.90rem",
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              <ListItem>
                <ListItemIcon
                  sx={{
                    fontSize: "2.5rem",
                    pr: 2,
                    "&:hover": {
                      color: "red",
                      cursor: "pointer",
                    },
                  }}
                >
                  <TbHexagonNumber1Filled />
                </ListItemIcon>
                <ListItemText
                  primary={"Choose a plan"}
                  secondary={
                    "Pick a plan that best suits your needs and budget"
                  }
                  sx={{
                    ".MuiListItemText-primary": {
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                    },
                    ".MuiListItemText-secondary": {
                      fontSize: "1rem",
                    },
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon
                  sx={{
                    fontSize: "2.5rem",
                    pr: 2,
                    "&:hover": {
                      color: "orange",
                      cursor: "pointer",
                    },
                  }}
                >
                  <TbHexagonNumber2Filled />
                </ListItemIcon>
                <ListItemText
                  primary={"Verify your identity"}
                  secondary={"Verify your identity with Stripe"}
                  sx={{
                    ".MuiListItemText-primary": {
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                    },
                    ".MuiListItemText-secondary": {
                      fontSize: "1rem",
                    },
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon
                  sx={{
                    fontSize: "2.5rem",
                    pr: 2,
                    "&:hover": {
                      color: "green",
                      cursor: "pointer",
                    },
                  }}
                >
                  <TbHexagonNumber3Filled />
                </ListItemIcon>
                <ListItemText
                  primary={"Verify your farm"}
                  secondary={
                    "Verify your farm with documents proving ownership"
                  }
                  sx={{
                    ".MuiListItemText-primary": {
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                    },
                    ".MuiListItemText-secondary": {
                      fontSize: "1rem",
                    },
                  }}
                />
              </ListItem>
            </List>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                size="large"
                onClick={() => {
                  setIsWhyJoinOpen(false);
                }}
                sx={{ minWidth: 200, backgroundColor: "primary.light" }}
              >
                Choose Plan
              </Button>
            </Box>
          </Paper>
        </Modal>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setIsWhyJoinOpen(true)}
            sx={{ fontSize: "1.1rem" }}
          >
            Why Join?
          </Button>
        </Box>
      </Grid>
    </Box>
  );

  const renderVerificationStep = () => (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
      <Paper
        elevation={3}
        sx={{ p: 4, borderRadius: 2, backgroundColor: "background.default" }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 500 }}>
            Identity Verification Required
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            To ensure the security of our platform, we need to verify your
            identity.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            mb: 4,
            p: 3,
            bgcolor: "background.default",
            justifyContent: "center",

            borderRadius: 1,
          }}
        >
          <CowLicense />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            What you&apos;ll need:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Government-issued photo ID"
                secondary="Driver's license, passport, or national ID card"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Good lighting"
                secondary="To ensure clear, readable images"
              />
            </ListItem>
          </List>
        </Box>

        <Form method="post">
          <input
            type="hidden"
            name="_action"
            value={ActionType.VERIFY_IDENTITY}
          />
          {actionData?.client_secret ? null : (
            // <VerificationComponent clientSecret={actionData.client_secret} />
            <Box sx={{ textAlign: "center" }}>
              <Button
                type="submit"
                size="large"
                startIcon={<VscWorkspaceTrusted />}
                sx={{
                  height: "40px",
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  textTransform: "none",
                  color: "text.primary",
                  "&:hover": {
                    bgcolor: "background.paper",
                    borderColor: "primary.main",
                    color: "primary.main",
                  },
                }}
              >
                Begin Verification
              </Button>
              <Typography
                variant="caption"
                display="block"
                sx={{ mt: 2, color: "text.secondary" }}
              >
                Powered by Stripe Identity Verification
              </Typography>
            </Box>
          )}
        </Form>
      </Paper>
    </Box>
  );

  return (
    <Box>
      <Stepper activeStep={activeTab} sx={{ mb: 4, mt: 1.5 }}>
        <Step>
          <StepLabel>Choose Plan</StepLabel>
        </Step>
        <Step>
          <StepLabel>Verify Identity</StepLabel>
        </Step>
        <Step>
          <StepLabel>Verify Farm</StepLabel>
        </Step>
      </Stepper>

      {activeTab === SignUpStep.PAYMENT && renderPaymentStep()}
      {activeTab === SignUpStep.VERIFICATION && renderVerificationStep()}
      {activeTab === SignUpStep.FARM_DETAILS && (
        <Box sx={{ maxWidth: 1200, mx: "auto", p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Farmer Sign Up
          </Typography>

          <Paper sx={{ mb: 4 }}>
            <Tabs
              value={activeTab}
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab label="Find Existing Farm" />
              <Tab label="Add New Farm" />
            </Tabs>

            <Box sx={{ p: 4 }}>
              {activeTab === 2 && (
                <>
                  <Typography variant="body1" paragraph>
                    If your farm is already in our database, search for it here:
                  </Typography>

                  <Form method="post">
                    <input
                      type="hidden"
                      name="_action"
                      value={ActionType.SEARCH}
                    />
                    <TextField
                      fullWidth
                      label="Search for your farm"
                      name="searchTerm"
                      sx={{ mb: 4 }}
                    />
                  </Form>

                  {actionData?.farms && (
                    <Grid container spacing={3}>
                      {/* {actionData.farms.map((farm) => (
                        <Grid item xs={12} key={farm.id}>
                          <Paper
                            sx={{
                              p: 3,
                              cursor: "pointer",
                              border:
                                selectedFarm === farm.id
                                  ? "2px solid #4CAF50"
                                  : "1px solid #e0e0e0",
                            }}
                            onClick={() => setSelectedFarm(farm.id)}
                          >
                            <Typography variant="h6">{farm.name}</Typography>
                            <Typography variant="body2">
                              Location: {farm.latitude}, {farm.longitude}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))} */}
                    </Grid>
                  )}
                </>
              )}
              <Form method="post" encType="multipart/form-data">
                <input type="hidden" name="_action" value={ActionType.SUBMIT} />
                {activeTab === 2 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Farm Name"
                        name="name"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setName(e.target.value)
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Website"
                        name="site"
                        value={site}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setSite(e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
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
                                Array.isArray(filter.sub)
                                  ? filter.sub
                                  : [filter.sub]
                              )
                              .filter(Boolean)
                          )}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
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
                    </Grid>

                    <Grid item xs={12}>
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
                      <input type="hidden" name="address" value={address} />

                      <Button
                        variant="outlined"
                        onClick={handleAddressSubmit}
                        sx={{ mt: 1 }}
                      >
                        Check Address
                      </Button>
                      {latLong && (
                        <>
                          <Typography
                            variant="body2"
                            sx={{ mt: 1, color: "success.main" }}
                          >
                            Address found
                          </Typography>
                          <input
                            type="hidden"
                            name="latitude"
                            value={latLong.lat}
                          />
                          <input
                            type="hidden"
                            name="longitude"
                            value={latLong.lng}
                          />
                        </>
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        multiline
                        minRows={1}
                        maxRows={8}
                        variant="filled"
                        sx={{
                          "& .MuiFilledInput-root": {
                            backgroundColor: "background.default",
                            borderRadius: 2,
                            border: "2px solid #f0f0f0",
                          },
                          "& .MuiFilledInput-root::before": {
                            borderBottom: "none",
                          },
                          "& .MuiFilledInput-root::after": {
                            borderBottom: "none",
                          },
                          "& .MuiFilledInput-root:hover::before": {
                            content: "none",
                          },
                        }}
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setDescription(e.target.value)
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={shipping}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setShipping(e.target.checked)}
                          />
                        }
                        label="Shipping Available"
                      />
                    </Grid>
                    <input
                      type="hidden"
                      name="shipping"
                      value={shipping ? "true" : "false"}
                    />
                  </Grid>
                )}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Verification Documents
                  </Typography>
                  <Tooltip
                    title="Acceptable verification documents include: Business license, Certifications, Food safety certificates, Government-issued agricultural documents, Matching your name on the documents to your name on the application"
                    placement="right"
                  >
                    <Box
                      sx={{
                        zIndex: 6,
                        pb: 1,
                        color: "orange",
                        fontSize: "1.5rem",
                        display: "inline",
                      }}
                    >
                      <GrInfo />
                    </Box>
                  </Tooltip>
                </Box>

                <Box
                  sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}
                >
                  <Button variant="contained" component="label">
                    Upload Documents
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      hidden
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      name="verification"
                    />
                  </Button>

                  {selectedFiles.length > 0 && (
                    <Button
                      variant="outlined"
                      onClick={handleClearFiles}
                      sx={{
                        bgcolor: "#e3bd5f",
                        color: "text.primary",
                      }}
                    >
                      Clear All Files
                    </Button>
                  )}
                </Box>

                {selectedFiles.length > 0 && (
                  <Box sx={{ mt: 2, mb: 4 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Selected Files:
                    </Typography>
                    {selectedFiles.map((file, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Chip
                          label={file.name}
                          onDelete={() => handleRemoveFile(index)}
                          sx={{ maxWidth: "400px" }}
                        />
                      </Box>
                    ))}
                  </Box>
                )}
                {selectedFiles.length > 0 && (
                  <Button type="submit" variant="contained" color="primary">
                    Submit Verification
                  </Button>
                )}
              </Form>
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
}
