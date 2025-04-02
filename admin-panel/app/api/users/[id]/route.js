import { connectToDB } from "../../../lib/utils";
import { User } from "@/app/lib/models";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  await connectToDB();
  const user = await User.findById(params.id);
  return NextResponse.json(user);
};
