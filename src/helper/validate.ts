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
export function isValidURL(url: string): boolean {
  try {
    // Attempt to create a new URL object
    const parsedUrl = new URL(url);

    // Validate protocol
    const validProtocols = ["http:", "https:"];
    if (!validProtocols.includes(parsedUrl.protocol)) {
      return false;
    }

    // Additional validation can be added here if needed (e.g., domain checks)
    return true;
  } catch (err) {
    // If an error occurs while creating a URL object, the URL is invalid
    return false;
  }
}
