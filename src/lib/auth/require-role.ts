import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AppRole = "admin" | "agency" | "operator";

export async function requireRole(allowedRoles: AppRole[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role_id, roles(name)")
    .eq("id", user.id)
    .maybeSingle();

  const role = (profile?.roles as { name?: string } | null)?.name;

  if (!role || !allowedRoles.includes(role as AppRole)) {
    redirect("/");
  }

  return { user, role: role as AppRole };
}
