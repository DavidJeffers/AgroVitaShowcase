import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Typography,
  Button,
  Box,
  Container,
  LinearProgress,
  Stack,
  Modal,
  Tab,
  Tabs,
  Grid,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { SmallFarmsContent } from "~/components/learn/SmallFarms";
import { HumanHealthContent } from "~/components/learn/HumanHealth";
import { FaCircle } from "react-icons/fa";
import { GrInfo } from "react-icons/gr";
import { Principles } from "~/components/learn/Principles";
import BenefitsSlides from "~/components/learn/Benifits";
/* import AgricultureIcon from "@mui/icons-material/Agriculture";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";*/

export const birdCursorForward = `url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%20viewBox%3D%220%200%2048%2048%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%3Cstyle%3E%0A%20%20%40keyframes%20flapWings%20%7B%0A%20%20%20%20%20%200%25%20%7B%20transform%3A%20rotate(0deg)%3B%20%7D%0A%20%20%20%20%20%2050%25%20%7B%20transform%3A%20rotate(10deg)%3B%20%7D%0A%20%20%20%20%20%20100%25%20%7B%20transform%3A%20rotate(0deg)%3B%20%7D%0A%20%20%7D%0A%20%20%3C%2Fstyle%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%20transform%3D%22%20translate(6%2C%2012)%22%3E%0A%20%20%3C!--%20Body%20--%3E%0A%20%20%3Cpath%20d%3D%22M12%208c2%200%204%201.5%204.5%203s0.5%203%200%203.5-2%201.5-4.5%201.5-4-0.5-4.5-1.5%200.5-2%200-3.5%202.5-3%204.5-3z%22%20fill%3D%22%234299E1%22%2F%3E%0A%20%20%3C!--%20Head%20--%3E%0A%20%20%3Ccircle%20cx%3D%2218%22%20cy%3D%229%22%20r%3D%222.5%22%20fill%3D%22%234299E1%22%2F%3E%0A%20%20%3C!--%20Beak%20--%3E%0A%20%20%3Cpath%20d%3D%22M20%208.5l2%200.5-2%200.5z%22%20fill%3D%22%23ECC94B%22%2F%3E%0A%20%20%3C!--%20Eye%20--%3E%0A%20%20%3Ccircle%20cx%3D%2218.5%22%20cy%3D%228.5%22%20r%3D%220.5%22%20fill%3D%22black%22%2F%3E%0A%0A%20%20%3C!--%20Tail%20feathers%20--%3E%0A%20%20%3Cpath%20d%3D%22M8%2011l-2%202%202%202z%22%20fill%3D%22%234299E1%22%2F%3E%0A%20%20%3C!--%20Additional%20feather%20details%20--%3E%0A%20%20%3Cpath%20d%3D%22M13%2012c1%200%202%200.5%202%201s-1%201-2%201-2-0.5-2-1%201-1%202-1z%22%20fill%3D%22%2363B3ED%22%2F%3E%0A%20%20%20%20%3C!--%20Wings%20--%3E%0A%20%20%3Cpath%20d%3D%22M10%208c2-2%204-2%205-1s1%202%200%203-3%201-4%200-2-1-1-2z%22%20fill%3D%22%2363B3ED%22%20style%3D%22animation%3A%20flapWings%200.5s%20infinite%22%3E%0A%20%20%20%20%20%20%3CanimateTransform%20attributeName%3D%22transform%22%20type%3D%22rotate%22%20from%3D%220%2012%2010%22%20to%3D%2220%2012%2010%22%20dur%3D%220.5s%22%20repeatCount%3D%22indefinite%22%20additive%3D%22sum%22%20%2F%3E%0A%20%20%3C%2Fpath%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3C%2Fsvg%3E") 48 48, auto`;

export const birdCursorBackward = `url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%20viewBox%3D%220%200%2048%2048%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%3Cstyle%3E%0A%20%20%40keyframes%20flapWings%20%7B%0A%20%20%20%20%20%200%25%20%7B%20transform%3A%20rotate(0deg)%3B%20%7D%0A%20%20%20%20%20%2050%25%20%7B%20transform%3A%20rotate(10deg)%3B%20%7D%0A%20%20%20%20%20%20100%25%20%7B%20transform%3A%20rotate(0deg)%3B%20%7D%0A%20%20%7D%0A%20%20%3C%2Fstyle%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%20transform%3D%22scale(-1%2C1)%20translate(-32%2C%2012)%22%3E%0A%20%20%3C!--%20Body%20--%3E%0A%20%20%3Cpath%20d%3D%22M12%208c2%200%204%201.5%204.5%203s0.5%203%200%203.5-2%201.5-4.5%201.5-4-0.5-4.5-1.5%200.5-2%200-3.5%202.5-3%204.5-3z%22%20fill%3D%22%234299E1%22%2F%3E%0A%20%20%3C!--%20Head%20--%3E%0A%20%20%3Ccircle%20cx%3D%2218%22%20cy%3D%229%22%20r%3D%222.5%22%20fill%3D%22%234299E1%22%2F%3E%0A%20%20%3C!--%20Beak%20--%3E%0A%20%20%3Cpath%20d%3D%22M20%208.5l2%200.5-2%200.5z%22%20fill%3D%22%23ECC94B%22%2F%3E%0A%20%20%3C!--%20Eye%20--%3E%0A%20%20%3Ccircle%20cx%3D%2218.5%22%20cy%3D%228.5%22%20r%3D%220.5%22%20fill%3D%22black%22%2F%3E%0A%0A%20%20%3C!--%20Tail%20feathers%20--%3E%0A%20%20%3Cpath%20d%3D%22M8%2011l-2%202%202%202z%22%20fill%3D%22%234299E1%22%2F%3E%0A%20%20%3C!--%20Additional%20feather%20details%20--%3E%0A%20%20%3Cpath%20d%3D%22M13%2012c1%200%202%200.5%202%201s-1%201-2%201-2-0.5-2-1%201-1%202-1z%22%20fill%3D%22%2363B3ED%22%2F%3E%0A%20%20%20%20%3C!--%20Wings%20--%3E%0A%20%20%3Cpath%20d%3D%22M10%208c2-2%204-2%205-1s1%202%200%203-3%201-4%200-2-1-1-2z%22%20fill%3D%22%2363B3ED%22%20style%3D%22animation%3A%20flapWings%200.5s%20infinite%22%3E%0A%20%20%20%20%20%20%3CanimateTransform%20attributeName%3D%22transform%22%20type%3D%22rotate%22%20from%3D%220%2012%2010%22%20to%3D%2220%2012%2010%22%20dur%3D%220.5s%22%20repeatCount%3D%22indefinite%22%20additive%3D%22sum%22%20%2F%3E%0A%20%20%3C%2Fpath%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3C%2Fsvg%3E") 48 48, auto`;

const funFacts = [
  "Regenerative agriculture can increase soil carbon by up to 2 tons per acre per year.",
  "Cover crops can reduce water runoff by 30%!",
  "Healthy soil can store more water than a 10-inch-deep swimming pool.",
];

const successStories = [
  {
    id: 1,
    title: "Midwest Farming",
    description: "Restored soil fertility with no-till farming.",
  },
  {
    id: 2,
    title: "Small Farms in India",
    description: "Improved income using intercropping methods.",
  },
  {
    id: 3,
    title: "Australia's Pastures",
    description: "Boosted soil health using holistic grazing.",
  },
];

const videoGuideLinks = [
  {
    id: 1,
    title: "Introduction to Regenerative Agriculture",
    url: "https://www.youtube.com/embed/fSEtiixgRJI",
  },
  {
    id: 2,
    title: "Cover Cropping Techniques",
    url: "https://www.youtube.com/embed/mnQtilmvuOg",
  },
  {
    id: 3,
    title: "5 Principles of Regenerative Farming",
    url: "https://www.youtube.com/embed/wznuF80k6l4",
  },
];

/* const exploreMoreLinks = [
  {
    id: 1,
    title: "Learn More about Soil Health",
    url: "https://www.example.com/soil-health",
  },
  {
    id: 2,
    title: "Regenerative Agriculture Case Studies",
    url: "https://www.example.com/case-studies",
  },
]; */

const questions = [
  {
    question: "What is the foundation of regenerative agriculture?",
    options: ["Healthy Soil", "Water Retention", "Biodiversity"],
    correctAnswer: "Healthy Soil",
  },
  {
    question: "What method reduces soil disturbance?",
    options: ["Crop Rotation", "No-Till Farming", "Cover Cropping"],
    correctAnswer: "No-Till Farming",
  },
  {
    question: "What is one benefit of regenerative agriculture?",
    options: ["Carbon Sequestration", "Water Pollution", "Soil Compaction"],
    correctAnswer: "Carbon Sequestration",
  },
];

export default function Learn() {
  const [currentTabLevel, setCurrentTabLevel] = useState(0);
  const [currentSubTab, setCurrentSubTab] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [principlesColor, setPrinciplesColor] = useState("bg-transparent");
  const [benifitsColor, setBenifitsColor] = useState("bg-transparent");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const forwardContainerRef = useRef<HTMLDivElement>(null);
  const backContainerRef = useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    if (currentTabLevel === 0) {
      if (currentSubTab === 0) {
        // Handle Principles slides
        if (currentStep < 9) {
          setCurrentStep(currentStep + 1);
        } else {
          setCurrentSubTab(1);
          setCurrentStep(0);
        }
      } else if (currentSubTab === 1) {
        // Handle Benefits slides
        if (currentStep < 4) {
          setCurrentStep(currentStep + 1);
        } else {
          setCurrentSubTab(2);
          setCurrentStep(0);
        }
      } else if (currentSubTab < 4) {
        setCurrentSubTab(currentSubTab + 1);
      } else {
        setCurrentTabLevel(1);
        setCurrentSubTab(0);
        setCurrentStep(0);
      }
    } else if (currentTabLevel < 2) {
      setCurrentTabLevel(currentTabLevel + 1);
    } else {
      setCurrentTabLevel(0);
    }
  }, [currentTabLevel, currentSubTab, currentStep]);

  const handlePrevious = useCallback(() => {
    if (currentTabLevel === 0) {
      if (currentSubTab === 0) {
        // Handle Principles slides
        if (currentStep > 0) {
          setCurrentStep(currentStep - 1);
        } else {
          setCurrentTabLevel(1);
        }
      } else if (currentSubTab === 1) {
        // Handle Benefits slides
        if (currentStep > 0) {
          setCurrentStep(currentStep - 1);
        } else {
          setCurrentSubTab(0);
          setCurrentStep(9); // Set to last principle step
        }
      } else if (currentSubTab === 2) {
        setCurrentSubTab(1);
        setCurrentStep(4); // Set to last benefits step
      } else if (currentSubTab > 0) {
        setCurrentSubTab(currentSubTab - 1);
      } else {
        setCurrentTabLevel(2);
      }
    } else if (currentTabLevel > 0) {
      if (currentTabLevel === 1) {
        setCurrentSubTab(4);
      }
      setCurrentTabLevel(currentTabLevel - 1);
    }
  }, [currentTabLevel, currentSubTab, currentStep]);

  useEffect(() => {
    setPrinciplesColor((prevPrinciplesColor) => {
      if (currentSubTab === 0) {
        switch (currentStep) {
          case 0:
            return "bg-transparent"; // Or #F0FFF4 if you want a very light green background
          case 1:
            return "linear-gradient(to right, #4CAF50, #4CAF50 11%, transparent 13%)";
          case 2:
            return "linear-gradient(to right, #4CAF50, #4CAF50 22%, transparent 22%)";
          case 3:
            return "linear-gradient(to right, #4CAF50, #4CAF50 33%, transparent 33%)";
          case 4:
            return "linear-gradient(to right, #4CAF50, #4CAF50 44%, transparent 44%)";
          case 5:
            return "linear-gradient(to right, #4CAF50, #4CAF50 55%, transparent 55%)";
          case 6:
            return "linear-gradient(to right, #4CAF50, #4CAF50 66%, transparent 66%)";
          case 7:
            return "linear-gradient(to right, #4CAF50, #4CAF50 77%, transparent 77%)";
          case 8:
            return "linear-gradient(to right, #4CAF50, #4CAF50 88%, transparent 88%)";
          case 9:
            return "linear-gradient(to right, #4CAF50, #4CAF50 100%)";
          default:
            return prevPrinciplesColor; // Or "bg-transparent" if you want a default
        }
      } else {
        return "bg-transparent";
      }
    });
  }, [currentStep, currentSubTab]);

  useEffect(() => {
    setBenifitsColor((prevBenifitsColor) => {
      if (currentSubTab === 1) {
        switch (currentStep) {
          case 0:
            return "bg-transparent";
          case 1:
            return "linear-gradient(to right, #4CAF50, #4CAF50 25%, transparent 25%)";
          case 2:
            return "linear-gradient(to right, #4CAF50, #4CAF50 50%, transparent 50%)";
          case 3:
            return "linear-gradient(to right, #4CAF50, #4CAF50 75%, transparent 75%)";
          case 4:
            return "linear-gradient(to right, #4CAF50, #4CAF50 100%)";
          default:
            return prevBenifitsColor;
        }
      } else {
        return "bg-transparent";
      }
    });
  }, [currentStep, currentSubTab]);

  useEffect(() => {
    const container = forwardContainerRef.current;

    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      // Don't trigger if clicking on navigation controls
      const navControls = container.querySelector("[data-nav-controls]");
      if (navControls?.contains(e.target as Node)) return;

      // Don't trigger if clicking on tabs
      const tabs = container.querySelector('[role="tablist"]');
      if (tabs?.contains(e.target as Node)) return;

      handleNext();
    };

    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, [currentTabLevel, currentSubTab, currentStep, handleNext]);

  useEffect(() => {
    const container = backContainerRef.current;

    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      // Don't trigger if clicking on navigation controls
      const navControls = container.querySelector("[data-nav-controls]");
      if (navControls?.contains(e.target as Node)) return;

      // Don't trigger if clicking on tabs
      const tabs = container.querySelector('[role="tablist"]');
      if (tabs?.contains(e.target as Node)) return;

      handlePrevious();
    };

    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, [currentTabLevel, currentSubTab, currentStep, handlePrevious]);

  const handleTabLevelChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setCurrentTabLevel(newValue);
    setCurrentSubTab(0);
    if (newValue !== 2) {
      setCurrentStep(0);
    }
  };

  const handleTabChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setCurrentSubTab(newValue);
    setCurrentStep(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (
      isPlaying &&
      currentTabLevel === 2 &&
      currentSubTab === 0 &&
      currentStep === 1
    ) {
      timer = setInterval(handleNext, 2500);
    } else if (isPlaying) {
      timer = setInterval(handleNext, 7000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentTabLevel, currentSubTab, currentStep, handleNext]);

  // Quiz handlers
  const handleNextQuestion = () => {
    if (selectedAnswer) {
      setSelectedAnswers([...selectedAnswers, selectedAnswer]);
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setQuizComplete(true);
      }
    }
  };

  const handleOpenQuiz = () => {
    setQuizOpen(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setScore(0);
    setQuizComplete(false);
  };

  const handleCloseQuiz = () => setQuizOpen(false);

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Container
      maxWidth="lg"
      sx={{
        px: { xs: 3, sm: 4 },
        py: { xs: 1, sm: 2 },
        height: "fit-content",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          zIndex: 5,
          pointerEvents: "auto",
        }}
      >
        <Box
          ref={backContainerRef}
          sx={{
            width: "51%",
            height: "100%",
            cursor: birdCursorBackward,
          }}
        />
        <Box
          ref={forwardContainerRef}
          sx={{
            width: "49%",
            height: "100%",
            cursor: birdCursorForward,
          }}
        />
      </Box>

      <Tooltip
        title={
          <Box sx={{ p: 1, pr: 0 }}>
            <List dense sx={{ p: 0, m: 0 }}>
              {/*birdCursorForward */}
              <ListItem disablePadding sx={{ p: 0, m: 0, mb: 1 }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: "initial",
                    right: 4,
                  }}
                >
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NiIgaGVpZ2h0PSI5NiIgdmlld0JveD0iMCAwIDQ4IDQ4Ij4KICA8ZGVmcz4KICA8c3R5bGU+CiAgQGtleWZyYW1lcyBmbGFwV2luZ3MgewogICAgICAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9CiAgICAgIDUwJSB7IHRyYW5zZm9ybTogcm90YXRlKDEwZGVnKTsgfQogICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH0KICB9CiAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPGcgdHJhbnNmb3JtPSJzY2FsZSgtMSwxKSB0cmFuc2xhdGUoLTM4LCAxMikiPgogIDwhLS0gQm9keSAtLT4KICA8cGF0aCBkPSJNMTIgOGMyIDAgNCAxLjUgNC41IDNzMC41IDMgMCAzLjUtMiAxLjUtNC41IDEuNS00LTAuNS00LjUtMS41IDAuNS0yIDAtMy41IDIuNS0zIDQuNS0zeiIgZmlsbD0iIzQyOTlFMSIvPgogIDwhLS0gSGVhZCAtLT4KICA8Y2lyY2xlIGN4PSIxOCIgY3k9IjkiIHI9IjIuNSIgZmlsbD0iIzQyOTlFMSIvPgogIDwhLS0gQmVhayAtLT4KICA8cGF0aCBkPSJNMjAgOC41bDIgMC41LTIgMC41eiIgZmlsbD0iI0VDQzk0QiIvPgogIDwhLS0gRXllIC0tPgogIDxjaXJjbGUgY3g9IjE4LjUiIGN5PSI4LjUiIHI9IjAuNSIgZmlsbD0iYmxhY2siLz4KCiAgPCEtLSBUYWlsIGZlYXRoZXJzIC0tPgogIDxwYXRoIGQ9Ik04IDExbC0yIDIgMiAyeiIgZmlsbD0iIzQyOTlFMSIvPgogIDwhLS0gQWRkaXRpb25hbCBmZWF0aGVyIGRldGFpbHMgLS0+CiAgPHBhdGggZD0iTTEzIDEyYzEgMCAyIDAuNSAyIDFzLTEgMS0yIDEtMi0wLjUtMi0xIDEtMSAyLTF6IiBmaWxsPSIjNjNCM0VEIi8+CiAgICA8IS0tIFdpbmdzIC0tPgogIDxwYXRoIGQ9Ik0xMCA4YzItMiA0LTIgNS0xczEgMiAwIDMtMyAxLTQgMC0yLTEtMS0yeiIgZmlsbD0iIzYzQjNFRCIgc3R5bGU9ImFuaW1hdGlvbjogZmxhcFdpbmdzIDAuNXMgaW5maW5pdGUiPgogICAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgZnJvbT0iMCAxMiAxMCIgdG89IjIwIDEyIDEwIiBkdXI9IjAuNXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBhZGRpdGl2ZT0ic3VtIiAvPgogIDwvcGF0aD4KICA8L2c+CiAgPC9zdmc+"
                    alt="birdCursorBackward"
                    style={{
                      width: 15,
                      height: 15,
                      transform: "scale(5)",
                      marginRight: 3,
                    }}
                  />
                  <Typography
                    sx={{
                      color: "text.primary",
                      fontSize: "0.95rem",
                      lineHeight: 1.5,
                    }}
                  >
                    Click on the left side of screen to navigate to the previous
                    content
                  </Typography>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ p: 0, m: 0, mb: 1 }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: "initial",
                    // right: 4,
                  }}
                >
                  <img
                    src={
                      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NiIgaGVpZ2h0PSI5NiIgdmlld0JveD0iMCAwIDQ4IDQ4Ij4KICAgICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgQGtleWZyYW1lcyBmbGFwV2luZ3MgewogICAgICAgICAgICAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9CiAgICAgICAgICAgIDUwJSB7IHRyYW5zZm9ybTogcm90YXRlKDE1ZGVnKTsgfQogICAgICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH0KICAgICAgICAgIH0KICAgICAgICA8L3N0eWxlPgogICAgICA8L2RlZnM+CiAgICAgIAogIDwhLS0gQm9keSAobWFkZSBzbWFsbGVyKSAtLT4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLCAxMikiPgogIDxwYXRoIGQ9Ik0xMiA4YzIgMCA0IDEuNSA0LjUgM3MwLjUgMyAwIDMuNS0yIDEuNS00LjUgMS41LTQtMC41LTQuNS0xLjUgMC41LTIgMC0zLjUgMi41LTMgNC41LTN6IiBmaWxsPSIjNDI5OUUxIi8+CiAgICAgPCEtLSBIZWFkIC0tPgogICAgIDxjaXJjbGUgY3g9IjE4IiBjeT0iOSIgcj0iMi41IiBmaWxsPSIjNDI5OUUxIi8+CiAgICAgPCEtLSBCZWFrIC0tPgogICAgIDxwYXRoIGQ9Ik0yMCA4LjVsMiAwLjUtMiAwLjV6IiBmaWxsPSIjRUNDOTRCIi8+CiAgICAgPCEtLSBFeWUgLS0+CiAgICAgPGNpcmNsZSBjeD0iMTguNSIgY3k9IjguNSIgcj0iMC41IiBmaWxsPSJibGFjayIvPgogICAgIDwhLS0gV2luZ3MgLS0+CiAgICAgPGc+CiAgICAgPC9nPgogICAgIDwhLS0gVGFpbCBmZWF0aGVycyAtLT4KICAgICA8cGF0aCBkPSJNOCAxMGwtMiAyIDIgMnoiIGZpbGw9IiM0Mjk5RTEiLz4KICAgICA8IS0tIEFkZGl0aW9uYWwgZmVhdGhlciBkZXRhaWxzIC0tPgogICAgIDxwYXRoIGQ9Ik0xMyAxMmMxIDAgMiAwLjUgMiAxcy0xIDEtMiAxLTItMC41LTItMSAxLTEgMi0xeiIgZmlsbD0iIzYzQjNFRCIvPgogICAgIDxwYXRoIGQ9Ik0xMCA4YzItMiA0LTIgNS0xczEgMiAwIDMtMyAxLTQgMC0yLTEtMS0yeiIgZmlsbD0iIzYzQjNFRCIgc3R5bGU9ImFuaW1hdGlvbjogZmxhcFdpbmdzIDAuNXMgaW5maW5pdGUiPgogICAgICAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgZnJvbT0iMCAxMiAxMCIgdG89IjIwIDEyIDEwIiBkdXI9IjAuNXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBhZGRpdGl2ZT0ic3VtIiAvPgogICAgIDwvcGF0aD4KICAgICA8L2c+CiAgICA8L3N2Zz4="
                    }
                    alt="birdCursorForward"
                    style={{
                      width: 16,
                      height: 16,
                      transform: "scale(5)",
                      marginRight: 3,
                    }}
                  />
                  <Typography
                    sx={{
                      color: "text.primary",
                      fontSize: "0.95rem",
                      lineHeight: 1.5,
                    }}
                  >
                    Click on the right side of screen to navigate to the next
                    content
                  </Typography>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ p: 0, m: 0, mb: 1 }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: "initial",
                    // right: 4,
                  }}
                >
                  <ListItemIcon>
                    <FaCircle />
                  </ListItemIcon>
                  <Typography
                    sx={{
                      color: "text.primary",
                      fontSize: "0.95rem",
                      lineHeight: 1.5,
                      ml: 1,
                    }}
                  >
                    Use the controls left and right to help navigate through the
                    content
                  </Typography>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: "initial",
                    // right: 4,
                  }}
                >
                  <ListItemIcon>
                    <FaCircle />
                  </ListItemIcon>
                  <Typography
                    sx={{
                      color: "text.primary",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      ml: 1,
                    }}
                  >
                    Press the play button to automatically navigate through the
                    content
                  </Typography>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        }
        arrow
        placement="left-start"
        slotProps={{
          tooltip: {
            sx: {
              p: 0,
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: 350,
              "& .MuiTooltip-arrow": {
                color: "#fff",
                "&::before": {
                  backgroundColor: "#fff",
                  border: "1px solid",
                  borderColor: "divider",
                },
              },
            },
          },
          arrow: {
            sx: {
              "&::before": {
                backgroundColor: "#fff",
                border: "1px solid",
                borderColor: "divider",
              },
            },
          },
        }}
      >
        <Box
          sx={{
            right: 103,
            bottom: 70,
            position: "fixed",
            zIndex: 6,
            color: "orange",
            py: 1,
            fontSize: "1.5rem",
            display: "inline",
            "&:hover": {
              transform: " scale(1.2)",
              cursor: "pointer",
            },
          }}
        >
          <GrInfo />
        </Box>
      </Tooltip>
      {/* Navigation Controls */}
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 2,
          display: "flex",
          gap: 1,
          zIndex: 1000,
          bgcolor: "rgba(255,255,255,0.8)",
          padding: 1,
          borderRadius: 2,
          // display: "none",
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.8)",
          },
        }}
      >
        <Button
          onClick={handlePrevious}
          sx={{
            backgroundColor: "inherit",
            "&:hover": {
              backgroundColor: "hsl(220, 35%, 3%)",
              color: "#fff",
            },
          }}
        >
          <NavigateBeforeIcon />
        </Button>
        <Button
          // variant="contained"
          onClick={togglePlayPause}
          sx={{
            backgroundColor: "inherit",

            "&:hover": {
              backgroundColor: "hsl(220, 35%, 3%)",
              color: "#fff",
            },
          }}
        >
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </Button>
        <Button
          // variant="contained"
          onClick={handleNext}
          sx={{
            backgroundColor: "inherit",

            // color: "red",
            "&:hover": {
              backgroundColor: "hsl(220, 35%, 3%)",
              color: "#fff",
            },
          }}
        >
          <NavigateNextIcon />
        </Button>
      </Box>

      {/* Main Tabs */}
      <Tabs
        value={currentTabLevel}
        onChange={handleTabLevelChange}
        variant="fullWidth"
        sx={{
          mb: 1,
          "& .MuiTabs-flexContainer": {
            justifyContent: "space-around",
            gap: { xs: 1, sm: 1 },
          },
          "& .MuiTab-root": {
            fontSize: { xs: "0.8rem", sm: "1rem" },
            textTransform: "none",
            minWidth: { xs: "80px", sm: "120px" },
            px: { xs: 1, sm: 2 },
            borderRadius: "10px",
            zIndex: 1000,
            cursor: "pointer",
          },
          "& .Mui-selected": {
            backgroundColor: "#e8f5e9",
            color: "#2e7d32",
          },
        }}
      >
        <Tab label="Regenerative Agriculture" />
        <Tab label="Human Health & Food" />
        <Tab label="Big Business vs. Small Farms" />
      </Tabs>

      {/* Content */}
      {currentTabLevel === 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {currentSubTab === 0 && <Principles currentStep={currentStep} />}
            {currentSubTab === 1 && (
              <BenefitsSlides currentStep={currentStep} />
            )}
            {currentSubTab === 2 && <FunFacts facts={funFacts} />}
            {currentSubTab === 3 && <SuccessStories stories={successStories} />}
            {currentSubTab === 4 && <VideoGuide videos={videoGuideLinks} />}

            {/* Sub Tabs */}
            <Tabs
              value={currentSubTab}
              onChange={handleTabChange}
              variant="scrollable"
              allowScrollButtonsMobile
              sx={{
                mb: 1,
                position: "absolute",
                bottom: 0,
                zIndex: 100,
                "& .MuiTabs-flexContainer": {
                  justifyContent: "space-around",
                  gap: { xs: 1, sm: 1 },
                },
                "& .MuiTab-root": {
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                  textTransform: "none",
                  minWidth: { xs: "80px", sm: "120px" },
                  px: { xs: 2, sm: 2 },
                  borderRadius: "10px",
                },
                "& .Mui-selected": {
                  color: "#2e7d32",
                },
              }}
            >
              <Tab
                label="Principles"
                sx={{
                  backgroundImage: principlesColor,
                  backgroundRepeat: "no-repeat",
                }}
              />
              <Tab
                label="Benefits"
                sx={{
                  backgroundImage: benifitsColor,

                  backgroundRepeat: "no-repeat",
                }}
              />
              <Tab label="Fun Facts" />
              <Tab label="Success Stories" />
              <Tab label="Videos" />
            </Tabs>
          </Box>

          {/* Quiz Button */}
          {currentSubTab === 5 && (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                Ready to test your knowledge?
              </Typography>
              <Button
                variant="outlined"
                onClick={handleOpenQuiz}
                sx={{
                  px: 3,
                  py: 2,
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#4caf50",
                    transform: "scale(1.05)",
                  },
                  transition: "transform 0.3s ease",
                }}
              >
                Start Quiz
              </Button>
            </Box>
          )}
        </>
      )}
      {currentTabLevel === 1 && <SmallFarmsContent />}
      {currentTabLevel === 2 && <HumanHealthContent />}

      {/* Quiz Modal */}
      <Modal
        open={quizOpen}
        onClose={handleCloseQuiz}
        aria-labelledby="quiz-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 600,
            bgcolor: "background.paper",
            borderRadius: 0.5,
            boxShadow: 40,
            p: 5,
          }}
        >
          {/* ... (keep existing quiz modal content) ... */}{" "}
          {!quizComplete ? (
            <>
              <LinearProgress
                variant="determinate"
                value={progressPercentage}
                sx={{
                  height: 10,
                  borderRadius: "8px",
                  mb: 3,
                  "& .MuiLinearProgress-bar": { backgroundColor: "#4caf50" },
                }}
              />
              <Typography variant="h6" gutterBottom>
                Question {currentQuestion + 1} of {questions.length}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {questions[currentQuestion].question}
              </Typography>
              <Stack spacing={2}>
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => setSelectedAnswer(option)}
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      fontWeight: "bold",
                      textAlign: "left",
                      justifyContent: "flex-start",
                      backgroundColor:
                        selectedAnswer === option ? "#4caf50" : "#fff",
                      color: selectedAnswer === option ? "#fff" : "#000",

                      "&:hover": {
                        backgroundColor:
                          selectedAnswer === option ? "#45a045" : "#f1f1f1",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </Stack>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 1,
                  backgroundColor: "primary.color",
                  "&:hover": { backgroundColor: "primary.light" },
                }}
              >
                {currentQuestion === questions.length - 1
                  ? "Submit Quiz"
                  : "Next Question"}
              </Button>
            </>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" gutterBottom>
                Quiz Complete!
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Your Score: {score}/{questions.length}
              </Typography>
              <Box sx={{ textAlign: "left", mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Review Your Answers:
                </Typography>
                {questions.map((question, index) => (
                  <Box
                    key={index}
                    sx={{
                      mb: 3,
                      p: 2,
                      borderRadius: 0.5,
                      border: "1px solid",
                      borderColor:
                        question.correctAnswer === selectedAnswers[index]
                          ? "success.main"
                          : "error.main",
                    }}
                  >
                    <Typography variant="body1" fontWeight="bold">
                      Q{index + 1}: {question.question}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Your Answer:</strong>{" "}
                      {selectedAnswers[index] || "No Answer"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mt: 1, color: "text.secondary" }}
                    >
                      <strong>Correct Answer:</strong> {question.correctAnswer}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Button
                variant="outlined"
                onClick={handleCloseQuiz}
                sx={{
                  mt: 3,
                  px: 4,
                  py: 1.5,
                  borderRadius: 4,
                  backgroundColor: "primary.color",
                  "&:hover": { backgroundColor: "primary.light" },
                }}
              >
                Close
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </Container>
  );
}

/* interface Milestone {
  year: string;
  description: string;
  icon: JSX.Element;
}

function Milestones({ milestones }: { milestones: Milestone[] }) {
  return (
    <Box
      sx={{
        px: { xs: 7, sm: 10 },
        py: { xs: 1, sm: 4 },
        minHeight: "400px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: "#16A34A",
          textAlign: "center",
        }}
      >
        🌾 Evolution of Agriculture
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: "1rem",
          color: "#444",
          mb: 5,
          lineHeight: 1.8,
          textAlign: "center",
        }}
      >
        Explore the key milestones that have shaped the journey of agriculture
        from its early days to the present.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 4, sm: 2 },
        }}
      >
        {milestones.map((milestone, index) => (
          <React.Fragment key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  mb: 1,
                  p: 1,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {milestone.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {milestone.year}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", maxWidth: "200px" }}
              >
                {milestone.description}
              </Typography>
            </Box>

            {index < milestones.length - 1 && (
              <ArrowForwardIcon
                sx={{
                  fontSize: { xs: 30, sm: 30 },
                  color: "#bbb",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
} */

/* interface Benefit {
  id: number;
  title: string;
  description: string;
  backgroundColor: string;
  color: string;
}

 function Benefits({ benefits }: { benefits: Benefit[] }) {
  return (
    <Box
      sx={{
        px: { xs: 7, sm: 10 },
        py: { xs: 1, sm: 4 },
        // top: 0,
        // minHeight: "400px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 2,
          color: "#16A34A",
          textAlign: "center",
        }}
      >
        🌟 Benefits of Regenerative Agriculture
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: "1rem",
          color: "#444",
          mb: 4,
          lineHeight: 1.8,
          textAlign: "center",
        }}
      >
        Adopting regenerative practices unlocks multiple benefits, enhancing
        both the environment and economic stability.
      </Typography>

      <Grid container spacing={4}>
        {benefits.map((benefit) => (
          <Grid item xs={12} sm={6} md={4} key={benefit.id}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: "#f9f9f9",
                borderRadius: 1,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                p: { xs: 2, sm: 3 },
                height: "100%",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: benefit.backgroundColor,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: benefit.color,
                  }}
                >
                  {benefit.id}
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  mb: 1,
                }}
              >
                {benefit.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#555",
                  lineHeight: 1.6,
                }}
              >
                {benefit.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
*/

function FunFacts({ facts }: { facts: string[] }) {
  return (
    <Box
      sx={{ px: { xs: 7, sm: 10 }, py: { xs: 1, sm: 4 }, minHeight: "400px" }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 2,
          color: "#16A34A",
          textAlign: "center",
        }}
      >
        🌟 Fun Facts About Regenerative Agriculture
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: "1rem",
          color: "#444",
          mb: 4,
          lineHeight: 1.8,
          textAlign: "center",
        }}
      >
        Dive into some amazing facts about how regenerative practices benefit
        our planet and future generations!
      </Typography>

      <Grid container spacing={4}>
        {facts.map((fact, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: "#f9f9f9",
                borderRadius: 1,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                p: 3,
                height: "100%",
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: "#E8F5E9",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#16A34A",
                  }}
                >
                  {index + 1}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "#444",
                }}
              >
                {fact}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

interface SuccessStory {
  id: number;
  title: string;
  description: string;
}

function SuccessStories({ stories }: { stories: SuccessStory[] }) {
  return (
    <Box
      sx={{ px: { xs: 7, sm: 10 }, py: { xs: 1, sm: 4 }, minHeight: "400px" }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 2,
          color: "#16A34A",
          textAlign: "center",
        }}
      >
        🌟 Inspiring Success Stories
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: "1rem",
          color: "#444",
          mb: 4,
          lineHeight: 1.8,
          textAlign: "center",
        }}
      >
        Discover real-world examples of how regenerative agriculture has made a
        lasting impact on farms and communities worldwide.
      </Typography>

      <Grid container spacing={4}>
        {stories.map((story) => (
          <Grid item xs={12} sm={6} md={4} key={story.id}>
            <Box
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: 1,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                height: "100%",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: "#E8F5E9",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#16A34A",
                  }}
                >
                  {story.id}
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  mb: 1,
                }}
              >
                {story.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#555",
                  lineHeight: 1.6,
                }}
              >
                {story.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

interface Video {
  id: number;
  title: string;
  url: string;
}

function VideoGuide({ videos }: { videos: Video[] }) {
  return (
    <Box
      sx={{
        px: { xs: 7, sm: 10 },
        py: { xs: 1, sm: 4 },
        minHeight: "400px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 1,
          color: "#16A34A",
          textAlign: "center",
        }}
      >
        🎥 Quick Video Guide
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: "1rem",
          color: "#444",
          mb: 2,
          lineHeight: 1.8,
          textAlign: "center",
        }}
      >
        Dive into these videos to learn more about regenerative agriculture and
        its core practices.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id} sx={{ zIndex: 1000 }}>
            <iframe
              width="100%"
              height="100%"
              src={video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            ></iframe>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
