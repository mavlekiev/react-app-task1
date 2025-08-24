export const getPasswordStrength = (
  password: string,
): { score: number; label: string } => {
  let score = 0;
  const checks = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[!@#$%^&*]/.test(password),
  ];

  score = checks.filter(Boolean).length;

  let label = "Very Weak";
  if (score === 5) label = "Strong";
  else if (score === 4) label = "Good";
  else if (score === 3) label = "Fair";
  else if (score === 2) label = "Weak";

  return { score, label };
};
