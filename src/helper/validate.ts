export function validateEmail(email: string): boolean {
  // Regular expression to validate an email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
