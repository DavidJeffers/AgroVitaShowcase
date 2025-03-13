export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      farm_details: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          product_images: string[] | null
          profile_image_url: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id: string
          product_images?: string[] | null
          profile_image_url?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          product_images?: string[] | null
          profile_image_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "farm_details_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      farmer_profiles: {
        Row: {
          created_at: string
          farm_id: string | null
          id: string
          subscription_id: string | null
          subscription_status: Database["public"]["Enums"]["subscription_status"]
          subscription_tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at: string
          verification_files: string[] | null
          verification_notes: string | null
          verification_reviewed_at: string | null
          verification_status: Database["public"]["Enums"]["verification_status"]
          verification_submitted_at: string
        }
        Insert: {
          created_at?: string
          farm_id?: string | null
          id: string
          subscription_id?: string | null
          subscription_status?: Database["public"]["Enums"]["subscription_status"]
          subscription_tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
          verification_files?: string[] | null
          verification_notes?: string | null
          verification_reviewed_at?: string | null
          verification_status?: Database["public"]["Enums"]["verification_status"]
          verification_submitted_at?: string
        }
        Update: {
          created_at?: string
          farm_id?: string | null
          id?: string
          subscription_id?: string | null
          subscription_status?: Database["public"]["Enums"]["subscription_status"]
          subscription_tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
          verification_files?: string[] | null
          verification_notes?: string | null
          verification_reviewed_at?: string | null
          verification_status?: Database["public"]["Enums"]["verification_status"]
          verification_submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "farmer_profiles_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "farmer_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      farms: {
        Row: {
          created_at: string
          favs: number
          foods: string[] | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string | null
          price_snap: Json | null
          shipping: boolean | null
          show_google_map: boolean | null
          site: string | null
          standards: string[] | null
          state: string | null
          updated_at: string
          verified: boolean | null
        }
        Insert: {
          created_at?: string
          favs?: number
          foods?: string[] | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          price_snap?: Json | null
          shipping?: boolean | null
          show_google_map?: boolean | null
          site?: string | null
          standards?: string[] | null
          state?: string | null
          updated_at?: string
          verified?: boolean | null
        }
        Update: {
          created_at?: string
          favs?: number
          foods?: string[] | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          price_snap?: Json | null
          shipping?: boolean | null
          show_google_map?: boolean | null
          site?: string | null
          standards?: string[] | null
          state?: string | null
          updated_at?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          farm_id: string
          favorited_at: string | null
          id: number
          user_id: string
        }
        Insert: {
          farm_id: string
          favorited_at?: string | null
          id?: number
          user_id: string
        }
        Update: {
          farm_id?: string
          favorited_at?: string | null
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string
          created_at: string
          farm_mention: string | null
          id: string
          image_urls: string[] | null
          updated_at: string
          user_id: string
          user_mention: string | null
        }
        Insert: {
          content: string
          created_at?: string
          farm_mention?: string | null
          id?: string
          image_urls?: string[] | null
          updated_at?: string
          user_id: string
          user_mention?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          farm_mention?: string | null
          id?: string
          image_urls?: string[] | null
          updated_at?: string
          user_id?: string
          user_mention?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_farm_mention_fkey"
            columns: ["farm_mention"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_user_mention_fkey"
            columns: ["user_mention"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      potential_farmers: {
        Row: {
          address: string | null
          created_at: string | null
          description: string | null
          farm_id: string | null
          foods: string[] | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string | null
          shipping: boolean | null
          site: string | null
          standards: string[] | null
          updated_at: string | null
          user_id: string | null
          verification_files: string[] | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          farm_id?: string | null
          foods?: string[] | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          shipping?: boolean | null
          site?: string | null
          standards?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          verification_files?: string[] | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          farm_id?: string | null
          foods?: string[] | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          shipping?: boolean | null
          site?: string | null
          standards?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          verification_files?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "potential_farmers_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          categories: string[] | null
          created_at: string | null
          favs: number
          id: string
          image_url: string
          isFeatured: boolean
          isMultipleSizes: boolean | null
          name: string
          price: number
          product_detail_id: number | null
          updated_at: string | null
          website_url: string
        }
        Insert: {
          categories?: string[] | null
          created_at?: string | null
          favs?: number
          id?: string
          image_url: string
          isFeatured?: boolean
          isMultipleSizes?: boolean | null
          name: string
          price: number
          product_detail_id?: number | null
          updated_at?: string | null
          website_url: string
        }
        Update: {
          categories?: string[] | null
          created_at?: string | null
          favs?: number
          id?: string
          image_url?: string
          isFeatured?: boolean
          isMultipleSizes?: boolean | null
          name?: string
          price?: number
          product_detail_id?: number | null
          updated_at?: string | null
          website_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_product_detail_id_fkey"
            columns: ["product_detail_id"]
            isOneToOne: false
            referencedRelation: "products_details"
            referencedColumns: ["id"]
          },
        ]
      }
      products_details: {
        Row: {
          created_at: string
          description: string | null
          id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      products_favorites: {
        Row: {
          favorited_at: string
          id: number
          product_id: string
          user_id: string | null
        }
        Insert: {
          favorited_at?: string
          id?: number
          product_id: string
          user_id?: string | null
        }
        Update: {
          favorited_at?: string
          id?: number
          product_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_favorites_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          description: string | null
          full_name: string | null
          id: string
          profile_pic_url: string | null
          role: number
          username: string
        }
        Insert: {
          description?: string | null
          full_name?: string | null
          id: string
          profile_pic_url?: string | null
          role?: number
          username: string
        }
        Update: {
          description?: string | null
          full_name?: string | null
          id?: string
          profile_pic_url?: string | null
          role?: number
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_follows_count: {
        Args: {
          user_id: string
        }
        Returns: {
          followers_count: number
          following_count: number
        }[]
      }
    }
    Enums: {
      subscription_status: "active" | "canceled" | "past_due" | "unpaid"
      subscription_tier: "free" | "standard" | "pro"
      verification_status: "pending" | "verified" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
