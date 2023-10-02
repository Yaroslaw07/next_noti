import bcrypt from "bcrypt";

const saltRounds = 10; // Number of salt rounds for hashing

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const verifyPassword = async (
  inputPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  console.log(inputPassword, hashedPassword);
  return await bcrypt.compare(inputPassword, hashedPassword);
};
