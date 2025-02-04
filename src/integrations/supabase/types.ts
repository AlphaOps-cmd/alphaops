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
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          duration: Database["public"]["Enums"]["workout_duration"]
          id: number
          workout_data: Json
          workout_type: Database["public"]["Enums"]["workout_type"]
        }
        Insert: {
          created_at?: string | null
          date: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          duration: Database["public"]["Enums"]["workout_duration"]
          id: number
          workout_data: Json
          workout_type: Database["public"]["Enums"]["workout_type"]
        }
        Update: {
          created_at?: string | null
          date?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          duration?: Database["public"]["Enums"]["workout_duration"]
          id?: number
          workout_data?: Json
          workout_type?: Database["public"]["Enums"]["workout_type"]
        }
        Relationships: []
      }
      exercises: {
        Row: {
          created_at: string
          id: string
          name: string
          notes: string | null
          order_in_workout: number
          reps: string
          sets: number | null
          updated_at: string
          weight: string | null
          workout_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          order_in_workout: number
          reps: string
          sets?: number | null
          updated_at?: string
          weight?: string | null
          workout_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          order_in_workout?: number
          reps?: string
          sets?: number | null
          updated_at?: string
          weight?: string | null
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercises_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id: string
          preferred_workout_type: Database["public"]["Enums"]["workout_type"]
          training_days: Json
          user_id: string
          workout_duration: Database["public"]["Enums"]["workout_duration"]
        }
        Insert: {
          created_at?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          preferred_workout_type?: Database["public"]["Enums"]["workout_type"]
          training_days?: Json
          user_id: string
          workout_duration?: Database["public"]["Enums"]["workout_duration"]
        }
        Update: {
          created_at?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          preferred_workout_type?: Database["public"]["Enums"]["workout_type"]
          training_days?: Json
          user_id?: string
          workout_duration?: Database["public"]["Enums"]["workout_duration"]
        }
        Relationships: []
      }
      user_strength_records: {
        Row: {
          created_at: string | null
          exercise: string
          id: string
          user_id: string
          weight: number
        }
        Insert: {
          created_at?: string | null
          exercise: string
          id?: string
          user_id: string
          weight: number
        }
        Update: {
          created_at?: string | null
          exercise?: string
          id?: string
          user_id?: string
          weight?: number
        }
        Relationships: []
      }
      workout_sections: {
        Row: {
          created_at: string
          format: Database["public"]["Enums"]["workout_format"] | null
          id: string
          notes: string | null
          rounds: number | null
          section_type: string
          time_cap: unknown | null
          updated_at: string
          workout_id: string
        }
        Insert: {
          created_at?: string
          format?: Database["public"]["Enums"]["workout_format"] | null
          id?: string
          notes?: string | null
          rounds?: number | null
          section_type: string
          time_cap?: unknown | null
          updated_at?: string
          workout_id: string
        }
        Update: {
          created_at?: string
          format?: Database["public"]["Enums"]["workout_format"] | null
          id?: string
          notes?: string | null
          rounds?: number | null
          section_type?: string
          time_cap?: unknown | null
          updated_at?: string
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_sections_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts: {
        Row: {
          created_at: string
          date: string
          description: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          duration: unknown
          id: string
          title: string | null
          updated_at: string
          workout_type: Database["public"]["Enums"]["workout_type"]
        }
        Insert: {
          created_at?: string
          date: string
          description: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          duration?: unknown
          id?: string
          title?: string | null
          updated_at?: string
          workout_type?: Database["public"]["Enums"]["workout_type"]
        }
        Update: {
          created_at?: string
          date?: string
          description?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          duration?: unknown
          id?: string
          title?: string | null
          updated_at?: string
          workout_type?: Database["public"]["Enums"]["workout_type"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      difficulty_level: "Beginner" | "Intermediate" | "Advanced"
      workout_duration: "30 min" | "45 min" | "60 min"
      workout_format: "AMRAP" | "EMOM" | "For Time" | "Rounds"
      workout_section_type: "warmup" | "strength" | "wod" | "recovery"
      workout_type: "CrossFit" | "Special Forces" | "Hyrox" | "Home Workout"
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
