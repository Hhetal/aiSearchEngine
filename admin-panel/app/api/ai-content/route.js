import { connectToDB } from "../../lib/utils";
import { AiContent } from "@/app/lib/models";
import { NextResponse } from "next/server";
import { handleCors, corsHeaders } from "../../lib/cors";

export const OPTIONS = async (req) => handleCors(req);

export const GET = async () => {
  try {
    await connectToDB();
    const aiContents = await AiContent.find();
    return new NextResponse(JSON.stringify(aiContents), {
      status: 200,
      headers: corsHeaders(),
    });
  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse(JSON.stringify({ message: "Failed to fetch" }), {
      status: 500,
      headers: corsHeaders(),
    });
  }
};