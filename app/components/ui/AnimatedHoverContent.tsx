import { Box, Typography } from "@mui/material";
import {
  FaUsers,
  FaSearchDollar,
  FaUserFriends,
  FaHandshake,
  FaBookOpen,
} from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { PiBooks } from "react-icons/pi";
import { MdLocalGroceryStore } from "react-icons/md";
import { PiCowBold } from "react-icons/pi";

import { PiFarmFill } from "react-icons/pi";

import { HoverState } from "~/routes/_index";
import { GiPlantRoots } from "react-icons/gi";

const AnimatedHoverContent = ({ isHovering }: { isHovering: HoverState }) => {
  const getHoverContent = () => {
    switch (isHovering) {
      case HoverState.Farmers:
        return {
          title: "Farmers",
          description:
            "Reach customers directly and grow your business, Join the farm-to-table movement",
          icon: (
            <Box sx={{ color: "green" }}>
              <FaSearchDollar className="icon" size={40} />{" "}
            </Box>
          ),
        };
      case HoverState.FindFarms:
        return {
          title: "Find Farms",
          description: "Discover local farms and fresh produce",
          icon: (
            <Box sx={{ color: "#ed6c02" }}>
              <PiFarmFill className="icon" size={40} />{" "}
            </Box>
          ),
        };
      case HoverState.Learn:
        return {
          title: "Learn",
          description: "Learn about sustainable farming and food systems",
          icon: (
            <Box sx={{ color: "teal" }}>
              <PiBooks className="icon" size={40} />{" "}
            </Box>
          ),
        };
      case HoverState.Join:
        return {
          title: "Join",
          description:
            "Reach customers directly and grow your business, Join the farm-to-table movement",
          icon: (
            <Box sx={{ color: "#16A34A" }}>
              <FaSearchDollar className="icon" size={40} />
            </Box>
          ),
        };
      case HoverState.FindProducts:
        return {
          title: "Find Products",
          description: "Discover regenerative agriculture products",
          icon: (
            <Box sx={{ color: "#1565C0" }}>
              <MdLocalGroceryStore className="icon" size={40} />{" "}
            </Box>
          ),
        };
      case HoverState.DirectToConsumer:
        return {
          title: "Direct To Consumer",
          description:
            "Traditional food distribution often involves wholesalers, retailers, and other intermediaries, which can increase costs and reduce farmers' earnings. This app creates a direct connection between farmers and customers, ensuring fair pricing for both parties",
          icon: (
            <Box sx={{ color: "#1565C0" }}>
              <FaUserFriends className="icon" size={40} />
            </Box>
          ),
        };

      case HoverState.FreshHealthy:
        return {
          title: "Fresh + Healthy",
          description:
            "Food travels fewer miles, reaching customers faster and fresher compared to store-bought produce. AgroVita empowers you to seek out the foods that you want, not just what's available at the grocery store",
          icon: (
            <Box sx={{ color: "green" }}>
              <GiPlantRoots className="icon" size={40} />
            </Box>
          ),
        };

      case HoverState.LocalEconomies:
        return {
          title: "Local Economies",
          description:
            "By purchasing directly from nearby farms, customers help sustain local farmers and boost regional economies. Farmers receive a larger share of the profits, allowing them to reinvest in sustainable farming practices",
          icon: (
            <Box sx={{ color: "#ed6c02" }}>
              <FaHandshake className="icon" size={40} />
            </Box>
          ),
        };

      case HoverState.Education:
        return {
          title: "Education",
          description:
            "AgroVita educates customers about farming standards like organic, regenerative, or sustainable practices. Learn about the benefits of supporting local farms and the impact of your food choices",
          icon: (
            <Box sx={{ color: "teal" }}>
              <FaBookOpen className="icon" size={40} />
            </Box>
          ),
        };
      case HoverState.Transparency:
        return {
          title: "Trust & Verification",
          description:
            "Customers know exactly where their food comes from and who grew it. Farmers can share their stories, farming practices, and standards directly with customers, building trust and loyalty",
          icon: (
            <Box sx={{ color: "#16A34A" }}>
              <MdVerifiedUser className="icon" size={40} />
            </Box>
          ),
        };
      case HoverState.Community:
        return {
          title: "Community",
          description:
            "See updates from your favorite farmers, learn about new products, discover new farm and find friends. Foster a deeper connection between people, the food they eat and the farmers who grow it",
          icon: (
            <Box sx={{ color: "#1565C0" }}>
              <FaUsers className="icon" size={40} />
            </Box>
          ),
        };

      case HoverState.None:
        return {
          title: "Welcome to AgroVita",
          description:
            "AgroVita is a platform that connects farmers and consumers. We empower consumers to make informed decisions about their food choices, support local farmers, and build a more sustainable food system",
          icon: (
            <Box sx={{ color: "#ed6c02" }}>
              <PiCowBold className="icon" size={40} />
            </Box>
          ),
        };
      default:
        return null;
    }
  };

  const content = getHoverContent();

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "25vh", sm: "20vh", md: "25vh", lg: "26vh" },

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        marginTop: { xs: "10px", sm: "10px", md: "10px", lg: "20px" },
        marginBottom: { xs: "10px", sm: "10px", md: "10px", lg: "2px" },
      }}
    >
      {content && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            animation: isHovering
              ? "slideIn 0.5s ease-out"
              : "slideOut 0.5s ease-out",
            "@keyframes slideIn": {
              "0%": {
                opacity: 0,
                transform: "translateY(20px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
            "@keyframes slideOut": {
              "0%": {
                opacity: 1,
                transform: "translateY(0)",
              },
              "100%": {
                opacity: 0,
                transform: "translateY(-20px)",
              },
            },
            "@keyframes iconBounce": {
              "0%, 100%": {
                transform: "scale(1)",
              },
              "50%": {
                transform: "scale(1.2)",
              },
            },
            ".icon": {
              animation: "iconBounce 2s ease infinite",
            },
          }}
        >
          {content.icon}

          <Typography
            sx={{
              color: "text.secondary",
              textAlign: "center",
              maxWidth: "600px",
              animation: "fadeIn 0.7s ease-out",
              fontSize: {
                xs: "0.8rem",
                sm: "1.2rem",
                md: "1.5rem",
                lg: "1.2rem",
              },
              fontWeight: "bold",
            }}
          >
            {content.description}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AnimatedHoverContent;
