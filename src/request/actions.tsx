import { NextClient } from "./request";

export const client = new NextClient(
  "https://m0d62zwl-6410.inc1.devtunnels.ms"
);

export function AdminAuthToken() {
  return { Authorization: "Bearer " + localStorage.getItem("token") || "" };
}

export const genPbFiles = (record: any, name: string) => {
  return `${client.baseUrl}/api/files/${record.collectionId}/${record.id}/${name}`;
};

export function extractErrors(errorResponse: {
  data: { [key: string]: { message: string; code: number } };
}): string[] {
  try {
    const errors: string[] = [];

    // Check if the errorResponse contains data
    if (errorResponse && errorResponse.data) {
      // Iterate through the keys of the data object
      for (const [key, value] of Object.entries(errorResponse.data)) {
        // Remove underscores from the key
        const formattedKey = key.replace(/_/g, " ");
        // Construct a message for each error
        const message = `${formattedKey}: ${value.message}`;
        errors.push(message);
      }
    }

    return errors;
  } catch (error) {
    return ["something went wrong"];
  }
}
