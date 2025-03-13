import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  type MetaFunction,
} from "react-router";
import { Form, Link, useActionData, useNavigation } from "react-router";
import {
  isUserLoggedIn,
  signInWithOAuth,
  signUpWithPassword,
} from "~/utils/auth.supabase.server";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";

export enum SignUpType {
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
    { title: "Sign Up for AgroVita" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// add the loader
export async function loader({ request }: LoaderFunctionArgs) {
  const loggedIn = await isUserLoggedIn(request);
  if (loggedIn) {
    return redirect("/");
  }

  return {};
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const signUpType = formData.get("signUpType") as SignUpType;
  console.log("signUpType", signUpType);
  switch (signUpType) {
    case SignUpType.PASSWORD: {
      const password = formData.get("password") as string;
      const email = formData.get("email") as string;
      const error = await signUpWithPassword(
        password,
        email,
        request,
        "/confirm-email"
      );
      return error;
    }
    case SignUpType.OAUTH: {
      const provider = formData.get("provider") as OAuthProvider;
      console.log("provider", provider);

      return await signInWithOAuth(request);
    }
    default: {
      throw new Error(`Invalid sign up type: ${signUpType}`);
    }
  }
};

export default function Index() {
  const actionResponse = useActionData<typeof action>();
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeoutSeconds, setTimeoutSeconds] = useState(0);

  // Handle submission state based on navigation state
  useEffect(() => {
    if (navigation.state === "submitting") {
      setIsSubmitting(true);
      setTimeoutSeconds(10); // 10 second timeout
    } else if (navigation.state === "idle" && isSubmitting) {
      // Start countdown timer when submission completes
      const timer = setInterval(() => {
        setTimeoutSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsSubmitting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [navigation.state, isSubmitting]);

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
          to="/"
        >
          <ArrowBackIcon sx={{ marginRight: "8px", fontSize: "1.5rem" }} />
          Back
        </Link>
        {/* Logo Section */}
        <img
          alt="AgroVita Logo"
          src="/AgroVitaLogo.png" // Replace with the actual path to your logo
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
          Create Account
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
          <input name="signUpType" type="hidden" value={SignUpType.PASSWORD} />
          <input
            name="email"
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
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
            type="email"
          />
          <input
            name="password"
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
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
            type="password"
          />
          <br />
          <button
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = isSubmitting
                ? "#cccccc"
                : "#007bff")
            }
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = isSubmitting
                ? "#cccccc"
                : "#0056b3")
            }
            style={{
              width: "100%",
              padding: "1rem",
              fontSize: "1rem",
              color: "white",
              backgroundColor: isSubmitting ? "#cccccc" : "#007bff",
              border: "none",
              borderRadius: "12px",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "all 0.3s",
            }}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? `Please wait (${timeoutSeconds}s)` : "Sign Up"}
          </button>
        </Form>

        <p style={{ margin: "1rem 0", fontSize: "1rem", color: "#777" }}>or</p>

        <Form method="post" style={{ width: "100%", maxWidth: "400px" }}>
          <input name="signUpType" type="hidden" value={SignUpType.OAUTH} />
          <input name="provider" type="hidden" value={OAuthProvider.GOOGLE} />
          <button
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#f1f1f1")
            }
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
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "all 0.3s",
              opacity: isSubmitting ? 0.7 : 1,
            }}
            disabled={isSubmitting}
          >
            <FcGoogle style={{ fontSize: "1.5rem" }} />
            Continue with Google
          </button>
        </Form>

        <p
          style={{
            marginTop: "2rem",
            fontSize: "1rem",
            color: "#555",
          }}
        >
          Already have an account?{" "}
          <Link
            style={{
              color: "#007bff",
              textDecoration: "none",
              fontWeight: "500",
            }}
            to="/sign-in"
          >
            Sign In
          </Link>
        </p>
      </div>
      {/* Right Section - Background Image */}
      <div
        style={{
          flex: 1.3,
          position: "relative",
          background: `url('/sign_up.webp') no-repeat center`,
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
            fontSize: "2.2rem",
            fontWeight: "600",
            textAlign: "center",
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)",
          }}
        >
          Vita: Latin, literally &quot;life&quot;
        </div>
      </div>
    </div>
  );
}
