import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { FaYahoo } from "react-icons/fa";
import { Link } from "react-router";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CiMail } from "react-icons/ci";

export default function ConfirmEmail() {
  const [timer, setTimer] = React.useState(30);
  const [canResend, setCanResend] = React.useState(false);

  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResendEmail = () => {
    setCanResend(false);
    setTimer(30);
    alert("Resend email logic triggered!");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        px: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src="/AgroVitaLogo.png"
        alt="Your Logo"
        sx={{ width: 400, height: "auto", mb: 4 }}
      />

      {/* Title */}
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Confirm Your Email
      </Typography>

      {/* Subtitle */}
      <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
        We&apos;ve sent a confirmation email to your inbox. Please check your
        email or spam box and click the confirmation link to finish signing up.
      </Typography>

      {/* Resend Email Button */}
      <Button
        variant="outlined"
        size="large"
        disabled={!canResend}
        onClick={handleResendEmail}
        sx={{
          borderColor: canResend ? "#1976D2" : "#ccc",
          color: canResend ? "#1976D2" : "#ccc",
          px: 5,
          py: 1.2,
          borderRadius: "30px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "none",
          "&:hover": {
            backgroundColor: canResend ? "#E3F2FD" : "transparent",
            borderColor: canResend ? "#1565C0" : "#ccc",
            color: canResend ? "#1565C0" : "#ccc",
          },
        }}
      >
        {canResend ? "Resend Email" : `Resend in ${timer}s`}
      </Button>

      {/* Email Provider Links */}
      <Typography variant="body2" sx={{ mt: 3, color: "text.secondary" }}>
        Open your email with one of these providers:
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", gap: "1rem", mt: 2 }}
      >
        <Button
          size="small"
          href="https://mail.google.com"
          target="_blank"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            px: 2,
            py: 1,
            border: "1px solid #ddd",
            borderRadius: "20px",
            backgroundColor: "#fff",
            transition: "all 0.3s",
            "&:hover": { backgroundColor: "#f1f1f1" },
          }}
        >
          <FcGoogle style={{ fontSize: "1.5rem" }} />
          Google
        </Button>
        <Button
          size="small"
          href="https://outlook.live.com"
          target="_blank"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            px: 2,
            py: 1,
            border: "1px solid #ddd",
            borderRadius: "20px",
            backgroundColor: "#fff",
            transition: "all 0.3s",
            "&:hover": { backgroundColor: "#f1f1f1" },
          }}
        >
          <CiMail style={{ fontSize: "1.5rem", color: "#0078D4" }} />
          Outlook
        </Button>
        <Button
          size="small"
          href="https://mail.yahoo.com"
          target="_blank"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            px: 2,
            py: 1,
            border: "1px solid #ddd",
            borderRadius: "20px",
            backgroundColor: "#fff",
            transition: "all 0.3s",
            "&:hover": { backgroundColor: "#f1f1f1" },
          }}
        >
          <FaYahoo style={{ fontSize: "1.5rem", color: "#6001D2" }} />
          Yahoo
        </Button>
      </Box>
      {/* Forward Arrow */}
      <Link
        to="/"
        style={{
          position: "absolute",
          right: "2rem",
          top: "2rem",
          display: "flex",
          alignItems: "center",
          color: "#555",
          textDecoration: "none",
          fontSize: "1rem",
        }}
      >
        Go to HomePage
        <ArrowForwardIcon sx={{ marginLeft: "8px", fontSize: "1.5rem" }} />
      </Link>
    </Box>
  );
}
