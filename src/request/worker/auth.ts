import { UserItem } from "@/interfaces/user";
import { client } from "../actions";
import { Collection } from "@/interfaces/collection";
import { auth } from "@/auth";

export const authAdmin = async ({
  email,
  password,
  role,
}: {
  email: string;
  password: string;
  role: ("ADMIN" | "EMPLOYEE" | "MANAGER")[];
}) => {
  console.log(email, password, role);

  const req = await client
    .post("/api/collections/users/auth-with-password")
    .json({
      identity: email,
      password,
    })
    .send<{ token: string; record: UserItem }>();
  if (role?.includes(req.record.role as any)) {
    const token = await superUserToken();
    return { ...req, token };
  } else {
    throw new Error("User not found");
  }
};

const superUserToken = async () => {
  const req = await client
    .post("/api/admins/auth-with-password")
    .json({
      identity: "sourav0w@gmail.com",
      password: "sour@V#404",
    })
    .send<{ token: string; admin: any }>();

  return req.token;
};

export const getUsers = async (page: number = 1) => {
  const req = await client
    .get("/api/collections/users/records", {
      sort: "-created",
      perPage: 20,
      page: page,
    })
    .send<Collection<UserItem>>();
  return req;
};

export const getAccessToken = async () => {
  try {
    if (window) {
      const token = window.localStorage.getItem("token");
      return { Authorization: token || "" };
    } else {
      return { Authorization: "" };
    }
  } catch (error) {
    try {
      const user = await auth();
      const token = user?.user.token;
      return { Authorization: token || "" };
    } catch (error) {
      return { Authorization: "" };
    }
  }
};
