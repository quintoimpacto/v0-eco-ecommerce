import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const supabase = await createClient()
  const formData = await request.formData()

  const full_name = formData.get("full_name") as string

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  const { error } = await supabase
    .from("profiles")
    .update({ full_name, updated_at: new Date().toISOString() })
    .eq("id", user.id)

  if (error) {
    console.error("Error updating profile:", error)
    return NextResponse.redirect(new URL("/profile?error=update_failed", request.url))
  }

  return NextResponse.redirect(new URL("/profile?success=updated", request.url))
}
