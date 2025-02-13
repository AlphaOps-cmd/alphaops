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
      cached_workouts: {
        Row: {
          created_at: string | null
          date: string
          id: number
          workout_data: Json
          workout_type: Database["public"]["Enums"]["workout_type"]
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: never
          workout_data: Json
          workout_type?: Database["public"]["Enums"]["workout_type"]
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: never
          workout_data?: Json
          workout_type?: Database["public"]["Enums"]["workout_type"]
        }
        Relationships: []
      }
      personal_records: {
        Row: {
          created_at: string
          date: string
          exercise_category: string
          exercise_id: string
          exercise_name: string
          id: string
          notes: string | null
          updated_at: string
          user_id: string | null
          weight: number
        }
        Insert: {
          created_at?: string
          date?: string
          exercise_category: string
          exercise_id: string
          exercise_name: string
          id?: string
          notes?: string | null
          updated_at?: string
          user_id?: string | null
          weight: number
        }
        Update: {
          created_at?: string
          date?: string
          exercise_category?: string
          exercise_id?: string
          exercise_name?: string
          id?: string
          notes?: string | null
          updated_at?: string
          user_id?: string | null
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "personal_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          body_weight: number | null
          completed_workouts: number | null
          consistency: number | null
          created_at: string
          email: string
          id: string
          membership: string
          monthly_goal: number | null
          name: string | null
          profile_image_url: string | null
          streak: number | null
          updated_at: string
        }
        Insert: {
          body_weight?: number | null
          completed_workouts?: number | null
          consistency?: number | null
          created_at?: string
          email: string
          id: string
          membership?: string
          monthly_goal?: number | null
          name?: string | null
          profile_image_url?: string | null
          streak?: number | null
          updated_at?: string
        }
        Update: {
          body_weight?: number | null
          completed_workouts?: number | null
          consistency?: number | null
          created_at?: string
          email?: string
          id?: string
          membership?: string
          monthly_goal?: number | null
          name?: string | null
          profile_image_url?: string | null
          streak?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      training_preferences: {
        Row: {
          created_at: string
          dark_mode: boolean | null
          haptic_feedback: boolean | null
          id: string
          language: string | null
          monthly_progress: boolean | null
          training_days: string[]
          training_reminders: boolean | null
          unit_system: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          dark_mode?: boolean | null
          haptic_feedback?: boolean | null
          id: string
          language?: string | null
          monthly_progress?: boolean | null
          training_days?: string[]
          training_reminders?: boolean | null
          unit_system?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          dark_mode?: boolean | null
          haptic_feedback?: boolean | null
          id?: string
          language?: string | null
          monthly_progress?: boolean | null
          training_days?: string[]
          training_reminders?: boolean | null
          unit_system?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_preferences_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      workouts: {
        Row: {
          completed_exercises: string[] | null
          created_at: string
          date: string
          duration: number
          id: string
          intensity: number
          notes: string | null
          perceived_difficulty: number | null
          sections: Json
          type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          completed_exercises?: string[] | null
          created_at?: string
          date?: string
          duration?: number
          id?: string
          intensity: number
          notes?: string | null
          perceived_difficulty?: number | null
          sections: Json
          type: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          completed_exercises?: string[] | null
          created_at?: string
          date?: string
          duration?: number
          id?: string
          intensity?: number
          notes?: string | null
          perceived_difficulty?: number | null
          sections?: Json
          type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workouts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id?: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      difficulty_level: "Beginner" | "Intermediate" | "Advanced"
      workout_type: "Hybrid Functional"
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
