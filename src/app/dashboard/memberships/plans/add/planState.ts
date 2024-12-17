import { MembershipItem } from "@/interfaces/membership";
import toast from "react-hot-toast";
import { create } from "zustand";

// Define types for the state
interface PlanDetail {
  icon: string;
  title: string;
}

interface QnA {
  question: string;
  answers: string[];
}

interface PlanState {
  planName: string;
  planIcon: File | null;
  originalPrice: number;
  comparePrice: number;
  isAvailable: boolean;
  popular: boolean;

  stocks: number;
  planDetails: PlanDetail[];
  qna: QnA[];
}

interface PlanActions {
  updatePlanData: (key: keyof PlanState, value: any) => void;
  setIntValue: (data: MembershipItem) => void;
  addPlanDetail: (newDetail: PlanDetail) => void;
  updatePlanDetail: (index: number, updatedDetail: Partial<PlanDetail>) => void;
  deletePlanDetail: (index: number) => void;
  addQnA: (newQnA: QnA) => void;
  updateQnA: (index: number, updatedQnA: Partial<QnA>) => void;
  deleteQnA: (index: number) => void;
  validateState: (e: "add" | "edit") => boolean;
  resetState: () => void;
}

export const usePlanState = create<PlanState & PlanActions>((set, get) => ({
  // Initial state
  planName: "",
  planIcon: null,
  originalPrice: 0,
  comparePrice: 0,
  isAvailable: false,
  stocks: 0,
  popular: false,
  planDetails: [
    {
      icon: "info",
      title: "",
    },
  ],
  qna: [
    {
      question: "",
      answers: ["", ""],
    },
  ],

  setIntValue: (data: MembershipItem) => {
    set((state) => ({
      ...state,
      planName: data.name,
      planIcon: null,
      originalPrice: data.amount,
      comparePrice: data.compare_amount,
      isAvailable: data.active,
      planDetails: data.info,
      qna: data.qna as QnA[],
      stocks: data.stocks,
      popular: data.popular,
    }));
  },

  // Actions
  updatePlanData: (key, value) => {
    set((state) => ({
      ...state,
      [key]: value,
    }));
  },

  addPlanDetail: (newDetail) => {
    set((state) => ({
      planDetails: [...state.planDetails, newDetail],
    }));
  },

  updatePlanDetail: (index, updatedDetail) => {
    set((state) => ({
      planDetails: state.planDetails.map((detail, idx) =>
        idx === index ? { ...detail, ...updatedDetail } : detail
      ),
    }));
  },

  deletePlanDetail: (index) => {
    set((state) => ({
      planDetails: state.planDetails.filter((_, idx) => idx !== index),
    }));
  },

  addQnA: (newQnA) => {
    set((state) => ({
      qna: [...state.qna, newQnA],
    }));
  },

  updateQnA: (index, updatedQnA) => {
    set((state) => ({
      qna: state.qna.map((qnaItem, idx) =>
        idx === index ? { ...qnaItem, ...updatedQnA } : qnaItem
      ),
    }));
  },

  deleteQnA: (index) => {
    set((state) => ({
      qna: state.qna.filter((_, idx) => idx !== index),
    }));
  },

  validateState: (type: "add" | "edit" = "add") => {
    const { planName, planDetails, qna, planIcon, stocks } = get();

    if (!planName) {
      toast.error("Please enter plan name");
      return false;
    }
    if (type === "add") {
      if (!planIcon) {
        toast.error("Please select plan icon");
        return false;
      }
    }
    if (!planDetails.length) {
      toast.error("Please add plan details");
      return false;
    }
    if (!qna.length) {
      toast.error("Please add Q&A");
      return false;
    }
    if (planDetails.some((detail) => !detail.title)) {
      toast.error("Please enter plan details");
      return false;
    }
    if (qna.some((qna) => !qna.question)) {
      toast.error("Please enter question");
      return false;
    }
    if (qna.some((qna) => !qna.answers)) {
      toast.error("Please enter answer");
      return false;
    }
    if (qna.some((qna) => !qna.answers.length)) {
      toast.error("Please enter answer");
      return false;
    }
    if (stocks < 0) {
      toast.error("Please enter stocks");
      return false;
    }

    return true;
  },
  resetState: () => {
    set({
      planName: "",
      planIcon: null,
      originalPrice: 0,
      comparePrice: 0,
      isAvailable: false,
      planDetails: [
        {
          icon: "info",
          title: "",
        },
      ],
      qna: [
        {
          question: "",
          answers: ["", ""],
        },
      ],
    });
  },
}));
