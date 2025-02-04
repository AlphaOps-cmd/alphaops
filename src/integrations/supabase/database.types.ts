export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cached_workouts: {
        Row: {
          created_at: string | null
          date: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id: number
          workout_data: Json
          workout_type: Database["public"]["Enums"]["workout_type"]
        }
        Insert: {
          created_at?: string | null
          date: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id?: number
          workout_data: Json
          workout_type: Database["public"]["Enums"]["workout_type"]
        }
        Update: {
          created_at?: string | null
          date?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: number
          workout_data?: Json
          workout_type?: Database["public"]["Enums"]["workout_type"]
        }
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
      workout_type: "CrossFit" | "Special Forces" | "Hyrox" | "Home Workout"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}