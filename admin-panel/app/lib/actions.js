"use server";

import { revalidatePath } from "next/cache";
import { User, AiContent } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";

export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};


export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/products");
};

export const addAiContent = async (formData) => {
  const { title, description, content, imageUrl, link, type, priceType, rating, review } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const newAiContent = new AiContent({
      title,
      description,
      content,
      imageUrl,
      link,
      type,
      priceType,
      rating,
      review,
    });

    await newAiContent.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create AI content!");
  }

  revalidatePath("/dashboard/aicontent");
  redirect("/dashboard/aicontent");
};

// Update AI Content
export const updateAiContent = async (formData) => {
  const { id, title, description, content, imageUrl, link, type, priceType, rating, review } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      title,
      description,
      content,
      imageUrl,
      link,
      type,
      priceType,
      rating,
      review,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
    );

    await AiContent.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update AI content!");
  }

  revalidatePath("/dashboard/aicontent");
  redirect("/dashboard/aicontent");
};

// Delete AI Content
export const deleteAiContent = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await AiContent.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete AI content!");
  }

  revalidatePath("/dashboard/aicontent");
};

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};


