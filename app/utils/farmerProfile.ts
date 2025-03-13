export enum SubscriptionStatus {
  ACTIVE = "active",
  CANCELED = "canceled",
  PAST_DUE = "past_due",
  UNPAID = "unpaid",
}

export enum VerificationStatus {
  PENDING = "pending",
  VERIFIED = "verified",
  REJECTED = "rejected",
}

export enum SubscriptionTier {
  FREE = "free",
  STANDARD = "standard",
  PRO = "pro",
}

// Types for the farmer_profile table
export interface FarmerProfile {
  id: string; // UUID, references profiles.id
  subscription_tier: SubscriptionTier;
  subscription_id: string | null; // Stripe subscription ID
  subscription_status: SubscriptionStatus;
  verification_status: VerificationStatus;
  verification_files: string[]; // Array of file URLs
  verification_notes: string | null; // Admin notes on verification
  verification_submitted_at: string; // Timestamp
  verification_reviewed_at: string | null; // Timestamp
  farm_id: string | null; // References farms.id if they claim existing farm
  created_at: string; // Timestamp
  updated_at: string; // Timestamp
}
