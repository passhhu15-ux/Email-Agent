import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
export async function GET(request:NextRequest){const email=request.nextUrl.searchParams.get("email");if(!email)return new NextResponse("Invalid unsubscribe link.",{status:400});await getSupabase().from("email_queue").update({status:"unsubscribed"}).eq("recipient_email",email).neq("status","sent");return new NextResponse("You have been unsubscribed.",{headers:{"content-type":"text/plain"}});}
