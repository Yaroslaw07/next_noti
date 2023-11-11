export const isStrongPassword = (password: string) => {
  // Implement your password strength criteria (e.g., minimum length, uppercase, lowercase, digits, special characters)
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const isEmailValid = (email: string) => {
  // Basic email validation using regex
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
