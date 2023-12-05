export const validateUsername = (username: string) => {
  if (username.length < 3) {
    return "Username must be at least 3 characters long";
  }

  return "";
};

export const validateEmail = (email: string): string => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    return "Provide correct email address";
  }

  return "";
};

export const validatePassword = (password: string) => {
  const minLength = 6;

  if (password.length < minLength) {
    return "Password must be at least 6 characters long";
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[@$!%*?&]/.test(password);

  if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
    return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
  }

  return "";
};
