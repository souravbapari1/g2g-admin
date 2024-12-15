import { UserItem } from "@/interfaces/user";
import NextClient from "nextclient";

export const client = new NextClient("https://g2g-pocketbase.souravbapari.in");
export const exportClient = new NextClient(
  "https://g2g-process.souravbapari.in",
  {
    headers: {
      "Content-Type": "application/json",
      "access-key": "1236789",
    },
  }
);

export const localClient = new NextClient("https://gray-to-green.com");

export function AdminAuthToken() {
  return { Authorization: "Bearer " + localStorage.getItem("token") || "" };
}

export function getUserLocalData(): UserItem | null {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
}

export const genPbFiles = (record: any, name: any) => {
  return `${client.baseUrl}/api/files/${record?.collectionName}/${record?.id}/${name}`;
};

export function extractErrors(
  errorResponse: {
    message?: any;
    data: { [key: string]: { message: string; code: number } };
  },
  defaultError: string = "something went wrong"
): string[] {
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
    console.log(errorResponse);

    return [...errors, errorResponse?.message || defaultError];
  } catch (error) {
    return [defaultError];
  }
}
