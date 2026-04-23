export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string;
          display_name?: string | null;
          updated_at?: string;
        };
      };
      workout_logs: {
        Row: {
          id: string;
          user_id: string;
          exercise: string;
          reps: number;
          weight: number;
          unit: "kg" | "lb";
          volume: number;
          source: "typed" | "voice";
          notes: string | null;
          performed_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          exercise: string;
          reps: number;
          weight: number;
          unit: "kg" | "lb";
          volume: number;
          source?: "typed" | "voice";
          notes?: string | null;
          performed_at?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["workout_logs"]["Insert"]>;
      };
      friendships: {
        Row: {
          id: string;
          requester_id: string;
          addressee_id: string;
          status: "pending" | "accepted" | "rejected" | "blocked";
          can_compare_progress: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          requester_id: string;
          addressee_id: string;
          status?: "pending" | "accepted" | "rejected" | "blocked";
          can_compare_progress?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["friendships"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type WorkoutLog = Database["public"]["Tables"]["workout_logs"]["Row"];
export type AppUser = Database["public"]["Tables"]["users"]["Row"];
