import { User } from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";

const JWT_SECRET = process.env.JWT_SECRET;
const passwordRegex =
  /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const register = async (
  full_name: string,
  email: string,
  password: string,
) => {
  if (!full_name || !email || !password)
    throw new ApiError("All fields are required", 400);

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new ApiError("Email already in use", 409);

  // password validation
  if (!passwordRegex.test(password))
    throw new ApiError(
      "Password must be at least 8 characters long and contain at least one lowercase letter, one number, and one special character",
      400,
    );

  const hashed = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    full_name,
    email,
    password: hashed,
  });

  const { password: _, ...userWithoutPassword } = newUser.toJSON();
  return userWithoutPassword;
};

export const login = async (email: string, password: string) => {
  if (!email || !password) throw new ApiError("All fields are required", 400);

  const user = await User.scope("withPassword").findOne({ where: { email } });
  if (!user) throw new ApiError("User not found", 404);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError("Invalid password", 401);

  const token = jwt.sign({ id: user.id }, JWT_SECRET!, { expiresIn: "1h" });
  const { password: _, ...userWithoutPassword } = user.toJSON();

  return { user: userWithoutPassword, token };
};
