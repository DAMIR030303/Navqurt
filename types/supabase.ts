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
            employees: {
                Row: {
                    id: number
                    first_name: string
                    last_name: string
                    email: string | null
                    phone: string | null
                    position: string | null
                    department: string | null
                    status: "active" | "vacation" | "inactive" | null
                    avatar_url: string | null
                    performance: number | null
                    is_top_performer: boolean | null
                    location: string | null
                    join_date: string | null
                    created_at: string
                }
                Insert: {
                    id?: number
                    first_name: string
                    last_name: string
                    email?: string | null
                    phone?: string | null
                    position?: string | null
                    department?: string | null
                    status?: "active" | "vacation" | "inactive" | null
                    avatar_url?: string | null
                    performance?: number | null
                    is_top_performer?: boolean | null
                    location?: string | null
                    join_date?: string | null
                    created_at?: string
                }
                Update: {
                    id?: number
                    first_name?: string
                    last_name?: string
                    email?: string | null
                    phone?: string | null
                    position?: string | null
                    department?: string | null
                    status?: "active" | "vacation" | "inactive" | null
                    avatar_url?: string | null
                    performance?: number | null
                    is_top_performer?: boolean | null
                    location?: string | null
                    join_date?: string | null
                    created_at?: string
                }
            }
        }
    }
}
