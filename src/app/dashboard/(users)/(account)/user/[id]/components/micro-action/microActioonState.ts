import { create } from "zustand";
import { MicroActionItem } from "./md";
import toast from "react-hot-toast";
import { isValidEmail, isValidNumber } from "@/helper/validate";
type UserData = {
  name: string;
  code: string;
  email: string;
  mobile_no: string;
  impact: number | undefined;
  id: string | null;
  city: string | null;
  country: string | null;
};

export const useMicroActionState = create<{
  selected: MicroActionItem | null;
  data: UserData;

  setSelected: (selected: MicroActionItem | null) => void;
  setData: (data: keyof UserData, value: any) => void;
  validateData: () => boolean;
}>((set, get) => ({
  selected: null,

  data: {
    name: "",
    code: "+968",
    email: "",
    mobile_no: "",
    country: "",
    impact: undefined,
    id: null,
    city: null,
  },
  setSelected: (selected: MicroActionItem | null) =>
    set({ selected, data: { ...get().data, impact: undefined } }),
  setData: (data: keyof UserData, value: string) => {
    set((state) => ({
      data: {
        ...state.data,
        [data]: value,
      },
    }));
  },
  validateData: () => {
    const { data } = get();
    toast.dismiss();
    if (data.name == "" || data.email == "" || data.mobile_no == "") {
      toast.error("All fields are required");
      return false;
    }
    if (!isValidEmail(data.email)) {
      toast.error("Email is not valid");
      return false;
    }
    if (!isValidNumber(data.mobile_no)) {
      toast.error("Mobile number is not valid");
      return false;
    }

    return true;
  },
}));
