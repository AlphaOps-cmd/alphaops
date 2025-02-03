export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type WorkoutType = 'CrossFit' | 'Special Forces' | 'Hyrox' | 'Home Workout'
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type WorkoutDuration = '30 min' | '45 min' | '60 min'
export type WorkoutFormat = 'AMRAP' | 'EMOM' | 'For Time' | 'Rounds'

export interface Database {
  public: {
    Tables: {
      cached_workouts: {
        Row: {
          id: number
          date: string
          workout_type: WorkoutType
          difficulty: DifficultyLevel
          duration: WorkoutDuration
          workout_data: Json
          created_at: string | null
        }
        Insert: {
          id: number
          date: string
          workout_type: WorkoutType
          difficulty: DifficultyLevel
          duration: WorkoutDuration
          workout_data: Json
          created_at?: string | null
        }
        Update: {
          id?: number
          date?: string
          workout_type?: WorkoutType
          difficulty?: DifficultyLevel
          duration?: WorkoutDuration
          workout_data?: Json
          created_at?: string | null
        }
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
          difficulty: DifficultyLevel
          id: string
          preferred_workout_type: WorkoutType
          training_days: Json
          user_id: string
          workout_duration: WorkoutDuration
        }
        Insert: {
          created_at?: string | null
          difficulty?: DifficultyLevel
          id?: string
          preferred_workout_type?: WorkoutType
          training_days?: Json
          user_id: string
          workout_duration?: WorkoutDuration
        }
        Update: {
          created_at?: string | null
          difficulty?: DifficultyLevel
          id?: string
          preferred_workout_type?: WorkoutType
          training_days?: Json
          user_id?: string
          workout_duration?: WorkoutDuration
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
          format: WorkoutFormat | null
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
          format?: WorkoutFormat | null
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
          format?: WorkoutFormat | null
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
          difficulty: DifficultyLevel
          duration: unknown
          id: string
          title: string | null
          updated_at: string
          workout_type: WorkoutType
        }
        Insert: {
          created_at?: string
          date: string
          description: string
          difficulty?: DifficultyLevel
          duration?: unknown
          id: string
          title?: string | null
          updated_at?: string
          workout_type?: WorkoutType
        }
        Update: {
          created_at?: string
          date?: string
          description?: string
          difficulty?: DifficultyLevel
          duration?: unknown
          id?: string
          title?: string | null
          updated_at?: string
          workout_type?: WorkoutType
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
      difficulty_level: DifficultyLevel
      workout_duration: WorkoutDuration
      workout_format: WorkoutFormat
      workout_type: WorkoutType
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
      Database['public']['Views'])
  ? (Database['public']['Tables'] &
      Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
  ? Database['public']['Enums'][PublicEnumNameOrOptions]
  : never
