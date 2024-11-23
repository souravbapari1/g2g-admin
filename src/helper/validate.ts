export function validateEmail(email: string): boolean {
  // Regular expression to validate an email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidNumber(number: any): boolean {
  // Regular expression to validate a number
  try {
    const value = parseFloat(number);
    return !isNaN(value);
  } catch (error) {
    return false;
  }
}
