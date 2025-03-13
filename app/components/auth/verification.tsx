// import React, { useState, useEffect } from "react";
// import { loadStripe, Stripe } from "@stripe/stripe-js";

// type VerificationStatus = "idle" | "processing";

// const stripePromise = loadStripe("pk_test_YOUR_PUBLISHABLE_KEY");

// export const VerificationComponent: React.FC<{
//   clientSecret: string | null;
// }> = ({ clientSecret }) => {
//   const [verificationStatus, setVerificationStatus] =
//     useState<VerificationStatus>("idle");

//   useEffect(() => {
//     if (!clientSecret) return;

//     const handleVerification = async () => {
//       setVerificationStatus("processing");

//       try {
//         const stripe: Stripe | null = await stripePromise;

//         if (!stripe) {
//           throw new Error("Stripe failed to initialize");
//         }

//         const result = await stripe.verifyIdentity(clientSecret);

//         if (result.error) {
//           throw result.error;
//         }

//         setVerificationStatus("idle");
//       } catch (error) {
//         setVerificationStatus("idle");
//         console.error("Verification error:", error);
//         alert(
//           error instanceof Error
//             ? error.message
//             : "An error occurred. Please try again later."
//         );
//       }
//     };

//     handleVerification();
//   }, [clientSecret]);

//   return (
//     <div>
//       {verificationStatus === "processing" && (
//         <p>Opening verification modal...</p>
//       )}
//     </div>
//   );
// };

// export default VerificationComponent;
