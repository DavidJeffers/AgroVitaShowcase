// // import Stripe from "stripe";

// // // Use enum for subscription tiers
// // export enum SubscriptionTier {
// //   FREE = "FREE",
// //   STANDARD = "STANDARD",
// //   PRO = "PRO",
// // }

// // // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
// // //   apiVersion: "2025-01-27.acacia",
// // // });
// // const stripe = new Stripe("sk_test_...R4F8:", {
// //   apiVersion: "2025-01-27.acacia",
// // });

// // interface CreateSessionParams {
// //   tier: SubscriptionTier;
// //   userId: string;
// //   successUrl: string;
// //   cancelUrl: string;
// // }

// // export async function createStripeSession({
// //   tier,
// //   userId,
// //   successUrl,
// //   cancelUrl,
// // }: CreateSessionParams) {
// //   const prices = {
// //     [SubscriptionTier.FREE]: { verification: 500 }, // $5.00
// //     [SubscriptionTier.STANDARD]: { subscription: 500 }, // $5.00/month
// //     [SubscriptionTier.PRO]: { subscription: 1700 }, // $17.00/month
// //   };

// //   console.log("prices", prices);

// //   const session = await stripe.checkout.sessions.create({
// //     mode: tier === SubscriptionTier.FREE ? "payment" : "subscription",
// //     payment_method_types: ["card"],
// //     line_items: [
// //       {
// //         price_data: {
// //           currency: "usd",
// //           product_data: {
// //             name: `Farm Verification - ${tier} Plan`,
// //           },
// //           unit_amount:
// //             tier === SubscriptionTier.FREE
// //               ? prices[tier].verification
// //               : prices[tier].subscription,
// //           recurring:
// //             tier === SubscriptionTier.FREE ? undefined : { interval: "month" },
// //         },
// //         quantity: 1,
// //       },
// //     ],
// //     success_url: successUrl,
// //     cancel_url: cancelUrl,
// //     client_reference_id: userId,
// //   });

// //   console.log("session", session);

// //   return session;
// // }

// import Stripe from "stripe";

// // Use enum for subscription tiers
// export enum SubscriptionTier {
//   FREE = "FREE",
//   STANDARD = "STANDARD",
//   PRO = "PRO",
// }

// const stripe = new Stripe(
//   "sk_test_51QoCdmHU6MKHDq6QQesjgGvo2EtxqXd8aQo673StLK9sOPdkoknNEQTUWwtuRhYdBS9bMesoTIzlcBAIStEJ8AFK00hQciR4F8",
//   {
//     apiVersion: "2025-01-27.acacia",
//   }
// );

// export async function createStripeSessionVerification(userId: string) {
//   try {
//     const session = await stripe.identity.verificationSessions.create({
//       client_reference_id: userId,
//       verification_flow: "vf_1QtS96HU6MKHDq6QsLKneX1Q",
//     });
//     console.log("session", session);
//     return session;
//   } catch (error) {
//     console.error("Stripe session creation error:", error);
//     throw error;
//   }
// }

// export async function createStripeSessionVerificationPayment(userId: string) {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       mode: "payment",
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price: "price_1QtLSVHU6MKHDq6QnzWCCHbL", // Your test price ID
//           quantity: 1,
//         },
//       ],
//       success_url: "http://localhost:3000/farm-sign-up?step=VERIFICATION",
//       cancel_url: "http://localhost:3000/farm-sign-up",
//       client_reference_id: userId,
//     });

//     return session;
//   } catch (error) {
//     console.error("Stripe session creation error:", error);
//     throw error;
//   }
// }

// export async function createStripeSessionStandardSubscription(userId: string) {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       mode: "subscription",
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price: "price_1QtLShHU6MKHDq6Qry2QkJYw",
//           quantity: 1,
//         },
//       ],
//       subscription_data: {
//         trial_period_days: 30,
//       },
//       success_url: "http://localhost:3000/farm-sign-up?step=VERIFICATION",
//       cancel_url: "http://localhost:3000/farm-sign-up",
//       client_reference_id: userId,
//     });

//     return session;
//   } catch (error) {
//     console.error("Stripe session creation error:", error);
//     throw error;
//   }
// }

// export async function createStripeSessionProSubscription(userId: string) {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       mode: "subscription",
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price: "price_1QtLSsHU6MKHDq6Q0ZQiTvcH",
//           quantity: 1,
//         },
//       ],
//       success_url: "http://localhost:3000/farm-sign-up?step=VERIFICATION",
//       cancel_url: "http://localhost:3000/farm-sign-up",
//       client_reference_id: userId,
//     });

//     return session;
//   } catch (error) {
//     console.error("Stripe session creation error:", error);
//     throw error;
//   }
// }
