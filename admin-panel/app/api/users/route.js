// /adminpanel/app/api/users/route.js

import { connectToDB } from "@/app/lib/utils";
import { User } from "@/app/lib/models"; 
import { NextResponse } from "next/server";
import { handleCors, corsHeaders } from "@/app/lib/cors"; 

// CORS preflight support
export const OPTIONS = async (req) => handleCors(req);

// Handle GET requests
export const GET = async () => {
  try {
    await connectToDB();
    const users = await User.find();

    return new NextResponse(JSON.stringify(users), {
      status: 200,
      headers: corsHeaders(),
    });
  } catch (error) {
    console.error("GET /api/users error:", error);
    return new NextResponse(JSON.stringify({ message: "Failed to fetch users" }), {
      status: 500,
      headers: corsHeaders(),
    });
  }
};
