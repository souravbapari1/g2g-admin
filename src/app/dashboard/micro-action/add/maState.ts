import { create } from "zustand";

type MaStateType = {
  data: {
    title: string;
    description: string;
    kgPerUnit: number | null;
    partner: string[];
    isPrimary: boolean;
    public: boolean;
  };

  setData: (key: keyof MaStateType["data"], data: any) => void;
  resetData: () => void;
  validateState: () => { field: any; message: string }[];
  setInitialData: (data: MaStateType["data"]) => void;
};

export const useMaState = create<MaStateType>((set, get) => ({
  data: {
    title: "",
    description: "",
    kgPerUnit: null,
    partner: [],
    isPrimary: false,

    public: false,
  },

  setData: (key: keyof MaStateType["data"], data: any) => {
    set((state) => ({
      data: {
        ...state.data,
        [key]: data,
      },
    }));
  },

  resetData: () => {
    set(() => ({
      data: {
        title: "",
        description: "",
        kgPerUnit: null,
        partner: [],
        sponsors: [],
        public: false,
        isPrimary: false,
      },
    }));
  },

  validateState: () => {
    const state = get();
    const requiredFields = [
      {
        field: state.data.title,
        message: "Please enter title",
      },
      {
        field: state.data.description,
        message: "Please enter description",
      },
      {
        field: state.data.kgPerUnit,
        message: "Please enter kg per unit",
      },
    ];
    return [...requiredFields.filter((f) => !f.field)];
  },

  setInitialData: (data: MaStateType["data"]) => {
    set(() => ({
      data: {
        title: data.title,
        description: data.description,
        kgPerUnit: data.kgPerUnit,
        partner: data.partner,
        isPrimary: data.isPrimary,
        public: data.public,
      },
    }));
  },
}));
