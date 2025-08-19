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
      teams: {
        Row: {
          id: string
          league: string
          name: string
          abbr: string
          provider_ids: Json
          created_at: string
        }
        Insert: {
          id?: string
          league: string
          name: string
          abbr: string
          provider_ids: Json
          created_at?: string
        }
        Update: {
          id?: string
          league?: string
          name?: string
          abbr?: string
          provider_ids?: Json
          created_at?: string
        }
        Relationships: []
      }
      standings: {
        Row: {
          id: string
          team_id: string
          wins: number
          losses: number
          ties_or_ots: number | null
          record_as_of: string
          streak: string
          last_five: string
          sources: string[]
          notes: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          team_id: string
          wins: number
          losses: number
          ties_or_ots?: number | null
          record_as_of: string
          streak: string
          last_five: string
          sources: string[]
          notes?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          team_id?: string
          wins?: number
          losses?: number
          ties_or_ots?: number | null
          record_as_of?: string
          streak?: string
          last_five?: string
          sources?: string[]
          notes?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "standings_team_id_fkey"
            columns: ["team_id"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          }
        ]
      }
      players: {
        Row: {
          id: string
          league: string
          team_id: string
          name: string
          provider_ids: Json
          created_at: string
        }
        Insert: {
          id?: string
          league: string
          team_id: string
          name: string
          provider_ids: Json
          created_at?: string
        }
        Update: {
          id?: string
          league?: string
          team_id?: string
          name?: string
          provider_ids?: Json
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "players_team_id_fkey"
            columns: ["team_id"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          }
        ]
      }
      player_game_logs: {
        Row: {
          id: string
          player_id: string
          game_date: string
          opponent_abbr: string
          home_away: string
          stats: Json
          sources: string[]
          created_at: string
        }
        Insert: {
          id?: string
          player_id: string
          game_date: string
          opponent_abbr: string
          home_away: string
          stats: Json
          sources: string[]
          created_at?: string
        }
        Update: {
          id?: string
          player_id?: string
          game_date?: string
          opponent_abbr?: string
          home_away?: string
          stats?: Json
          sources?: string[]
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_game_logs_player_id_fkey"
            columns: ["player_id"]
            referencedRelation: "players"
            referencedColumns: ["id"]
          }
        ]
      }
      odds_games: {
        Row: {
          id: string
          league: string
          away_team_id: string
          home_team_id: string
          game_datetime: string
          market_total: number
          odds_total: string
          sources: string[]
          created_at: string
        }
        Insert: {
          id?: string
          league: string
          away_team_id: string
          home_team_id: string
          game_datetime: string
          market_total: number
          odds_total: string
          sources: string[]
          created_at?: string
        }
        Update: {
          id?: string
          league?: string
          away_team_id?: string
          home_team_id?: string
          game_datetime?: string
          market_total?: number
          odds_total?: string
          sources?: string[]
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "odds_games_away_team_id_fkey"
            columns: ["away_team_id"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "odds_games_home_team_id_fkey"
            columns: ["home_team_id"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}

