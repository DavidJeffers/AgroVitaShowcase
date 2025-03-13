// import { LoaderFunctionArgs } from "react-router";
// import { createSupabaseServerClient } from "~/utils/supabase.server";
// import Stripe from "stripe";
// import { SubscriptionStatus, VerificationStatus } from "~/utils/farmerProfile";
// import { SubscriptionTier } from "~/utils/farmerProfile";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-01-27.acacia",
// });

// // const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
// const endpointSecret =
//   "whsec_43ae19bb224878b24e52247daa320af087f6c7d8ad60dcd9cae50248695a7941";

// export async function action({ request }: LoaderFunctionArgs) {
//   const sig = request.headers.get("stripe-signature");
//   const payload = await request.text();

//   if (!sig) {
//     return new Response("No signature", { status: 400 });
//   }

//   try {
//     const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
//     console.log("event", event);
//     switch (event.type) {
//       case "checkout.session.completed": {
//         const session = event.data.object as Stripe.Checkout.Session;
//         const userId = session.client_reference_id;
//         const tier = session.metadata?.tier as SubscriptionTier;
//         const subscriptionId = session.subscription as string;

//         if (!userId) {
//           throw new Error("No user ID found in session");
//         }

//         console.log("userId", userId);
//         console.log("tier", tier);
//         console.log("subscriptionId", subscriptionId);

//         const supabase = createSupabaseServerClient(request);

//         // Create or update farmer profile
//         const { error } = await supabase.client.from("farmer_profiles").upsert(
//           {
//             id: userId,
//             subscription_tier: tier,
//             subscription_id: subscriptionId,
//             subscription_status: SubscriptionStatus.ACTIVE,
//             verification_status: VerificationStatus.PENDING,
//             verification_submitted_at: new Date().toISOString(),
//           },
//           {
//             onConflict: "id",
//           }
//         );

//         if (error) {
//           throw error;
//         }

//         return new Response(JSON.stringify({ received: true }), {
//           status: 200,
//         });
//       }

//       case "customer.subscription.deleted": {
//         const subscription = event.data.object as Stripe.Subscription;
//         const userId = subscription.metadata.userId;

//         if (userId) {
//           const supabase = createSupabaseServerClient(request);
//           await supabase.client
//             .from("farmer_profiles")
//             .update({
//               subscription_status: SubscriptionStatus.CANCELED,
//               subscription_id: null,
//             })
//             .eq("id", userId);
//         }

//         return new Response(JSON.stringify({ received: true }), {
//           status: 200,
//         });
//       }

//       default:
//         return new Response(`Unhandled event type: ${event.type}`, {
//           status: 400,
//         });
//     }
//   } catch (err) {
//     console.error("Webhook error:", err);
//     return new Response(
//       `Webhook Error: ${err instanceof Error ? err.message : "Unknown error"}`,
//       { status: 400 }
//     );
//   }
// }
// // Block GET requests
// export const loader = () => {
//   throw new Response("Method not allowed", { status: 405 });
// };
