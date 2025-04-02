import { connectToDB } from "../../../lib/utils";
import { AiContent } from "@/app/lib/models";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  await connectToDB();
  const content = await AiContent.findById(params.id);
  return NextResponse.json(content);
};

export const DELETE = async (req, { params }) => {
  await connectToDB();
  await AiContent.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted successfully" });
};
