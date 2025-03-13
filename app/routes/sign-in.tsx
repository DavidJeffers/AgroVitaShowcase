import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  type MetaFunction,
} from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FcGoogle } from "react-icons/fc";
import { Form, Link, useActionData } from "react-router";
import {
  isUserLoggedIn,
  signInWithPassword,
  signInWithOAuth,
  resetPassword,
} from "~/utils/auth.supabase.server";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";

export enum SignInType {
  PASSWORD = "PASSWORD",
  OAUTH = "OAUTH",
}

export enum OAuthProvider {
  GOOGLE = "google",
  GITHUB = "github",
  FACEBOOK = "facebook",
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const loggedIn = await isUserLoggedIn(request);
  if (loggedIn) {
    return redirect("/");
  }
  return {};
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const signInType = formData.get("signInType") as SignInType;
  const action = formData.get("action");

  if (action === "resetPassword") {
    const email = formData.get("email") as string;
    return await resetPassword(request, email);
  }

  switch (signInType) {
    case SignInType.OAUTH: {
      /* const provider = formData.get("provider") as OAuthProvider; */
      return await signInWithOAuth(request);
    }
    case SignInType.PASSWORD: {
      const password = formData.get("password") as string;
      const email = formData.get("email") as string;
      return await signInWithPassword(password, email, request, "/");
    }
    default: {
      throw new Error(`Invalid sign in type: ${signInType}`);
    }
  }
};

export default function SignIn() {
  const actionResponse = useActionData<typeof action>();
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const actionData = useActionData<typeof action>();
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
      }}
    >
      {/* Left Section - Form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
          padding: "4rem",
          position: "relative",
        }}
      >
        {/* Back Arrow */}
        <Link
          to="/"
          style={{
            position: "absolute",
            left: "2rem",
            top: "2rem",
            display: "flex",
            alignItems: "center",
            color: "#555",
            textDecoration: "none",
            fontSize: "1rem",
          }}
        >
          <ArrowBackIcon sx={{ marginRight: "8px", fontSize: "1.5rem" }} />
          Back
        </Link>
        {/* Logo Section */}
        <img
          src="/AgroVitaLogo.png"
          alt="AgroVita Logo"
          style={{
            width: "180px",
          }}
        />
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "400",
            marginBottom: "1.2rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          Welcome Back
        </h1>
        <Form
          method="post"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          {!actionResponse ? null : (
            <h3 style={{ color: "red", fontSize: "1rem" }}>
              {actionResponse?.error}
            </h3>
          )}
          <input type="hidden" name="signInType" value={SignInType.PASSWORD} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            style={{
              width: "100%",
              padding: "0.9rem",
              fontSize: "1rem",
              border: "1px solid #ddd",
              borderRadius: "12px",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            style={{
              width: "100%",
              padding: "0.9rem",
              fontSize: "1rem",
              border: "1px solid #ddd",
              borderRadius: "12px",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />

          <br />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "1rem",
              fontSize: "1rem",
              color: "white",
              backgroundColor: "#007bff",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#007bff")
            }
          >
            Sign In
          </button>
        </Form>

        <p style={{ margin: "1rem 0", fontSize: "1rem", color: "#777" }}>or</p>

        <Form method="post" style={{ width: "100%", maxWidth: "400px" }}>
          <input type="hidden" name="signInType" value={SignInType.OAUTH} />
          <input type="hidden" name="provider" value={OAuthProvider.GOOGLE} />
          <button
            style={{
              width: "100%",
              padding: "1rem",
              fontSize: "1rem",
              color: "#555",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#f1f1f1")
            }
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
          >
            <FcGoogle style={{ fontSize: "1.5rem" }} />
            Continue with Google
          </button>
        </Form>

        <div style={{ marginTop: "0.5rem", fontSize: "1rem", color: "#555" }}>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "1rem",
              color: "#555",
            }}
          >
            Don&apos;t have an account?{" "}
            <Link
              to="/sign-up"
              style={{
                color: "#007bff",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Sign up
            </Link>
          </p>

          <button
            onClick={() => setOpenResetDialog(true)}
            style={{
              background: "none",
              border: "none",
              color: "#007bff",
              cursor: "pointer",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Forgot your password?
          </button>
        </div>
      </div>

      {/* Right Section - Background Image */}
      <div
        style={{
          flex: 1.3,
          position: "relative",
          background: `url('/sign_in.webp') no-repeat center`,
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "30%",
            color: "white",
            fontSize: "5rem",
            fontWeight: "600",
            textAlign: "center",
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)",
          }}
        >
          Revival
        </div>
      </div>

      <Dialog
        open={openResetDialog}
        onClose={() => setOpenResetDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            padding: "1rem",
          },
        }}
      >
        <DialogTitle>Reset Password</DialogTitle>
        <Form method="post">
          <DialogContent>
            {actionData?.success ? (
              <Typography color="success" sx={{ mt: 2 }}>
                Check your email for the reset link!
              </Typography>
            ) : (
              <>
                <Typography sx={{ mb: 2 }}>
                  Enter your email address and we&apos;ll send you a link to
                  reset your password.
                </Typography>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Email Address"
                  name="email"
                  type="email"
                  fullWidth
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
                <input type="hidden" name="action" value="resetPassword" />
              </>
            )}
            {actionData?.error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {actionData.error}
              </Typography>
            )}
          </DialogContent>
          <DialogActions sx={{ padding: "1rem" }}>
            <Button
              onClick={() => setOpenResetDialog(false)}
              sx={{
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              Cancel
            </Button>
            {!actionData?.success && (
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#007bff",
                  borderRadius: "12px",
                  "&:hover": {
                    bgcolor: "#0056b3",
                  },
                }}
              >
                Send Reset Link
              </Button>
            )}
          </DialogActions>
        </Form>
      </Dialog>
    </div>
  );
}
