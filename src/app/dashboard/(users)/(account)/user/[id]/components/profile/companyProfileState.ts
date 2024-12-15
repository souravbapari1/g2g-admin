import { isValidNumber, isValidURL } from "@/helper/validate";
import { Company, UserItem } from "@/interfaces/user";

import toast from "react-hot-toast";
import { create } from "zustand";
interface ProfileState {
  state: {
    file: File | null;
    first_name: string;
    last_name: string;
    email: string;
    mobile_no: string;
    country: string;
    city: string;
    mr_ms: string;
    gender: string;
    address: string;
    breef: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    youtube: string;
    targetTrees: string;
    targetPlastic: string;
    companySize: string;
    companyName: string;
    industry: string;
    position: string;
    website: string;
    heardFrom: string;
    reasons: any[];
    location: string;
    companyType: string;
    annualBudget: string;
    categoriesConsider: string;
    othersComment: string;
    level: string;
  };
  setCompanyProfileState: (
    key: keyof ProfileState["state"],
    value: any
  ) => void;
  validateUserData: (state: ProfileState["state"]) => boolean;
  initCompanySate: (user: UserItem, company: Company) => void;
}

export const useCompanyProfileState = create<ProfileState>((setState) => ({
  state: {
    file: null,
    first_name: "",
    last_name: "",
    email: "",
    mobile_no: "",
    country: "",
    city: "",
    mr_ms: "",
    breef: "",
    address: "",
    gender: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    youtube: "",
    targetTrees: "",
    targetPlastic: "",
    companySize: "",
    companyName: "",
    industry: "",
    position: "",
    website: "",
    heardFrom: "",
    reasons: [],
    location: "",
    companyType: "",
    annualBudget: "",
    categoriesConsider: "",
    othersComment: "",
    level: "",
  },
  setCompanyProfileState: (key: keyof ProfileState["state"], value: any) => {
    return setState((state) => ({
      state: {
        ...state.state,
        [key]: value,
      },
    }));
  },

  initCompanySate: (user: UserItem, company: Company) => {
    return setState((state) => ({
      state: {
        ...state.state,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        mobile_no: user.mobile_no,
        country: user.country,
        city: user.city,
        gender: user.gender,
        breef: user.breef,
        linkedin: user.linkedin,
        twitter: user.twitter,
        instagram: user.instagram,
        youtube: user.youtube,
        targetTrees: user.targetTrees,
        targetPlastic: user.targetPlastic,
        position: company.position,
        website: company.website,
        reasons: company.resonses,
        heardFrom: company.about_us,
        industry: company.Industry_type,
        companySize: company.size_hint,
        companyName: company.company_name,
        mr_ms: company.mr_ms,
        address: company.address,
        location: company.map_location,
        companyType: company.companyType || "",
        annualBudget: company.summery?.annualBudget || "",
        categoriesConsider: company.summery?.categoriesConsider || "",
        othersComment: company.summery?.othersComment || "",
        level: user.level || "",
      },
    }));
  },

  validateUserData: (state: ProfileState["state"]) => {
    const requiredFields: Array<keyof ProfileState["state"]> = [
      "first_name",
      "last_name",
      "email",
      "mobile_no",
      "country",
      "city",
      "mr_ms",
      "breef",
      "targetTrees",
      "targetPlastic",
      "companySize",
      "companyName",
      "industry",
      "position",
    ];

    for (let field of requiredFields) {
      if (!state[field]) {
        toast.error(`"${field.replace("_", " ")}" is required.`);
        return false;
      }
    }

    if (
      state.email &&
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(state.email)
    ) {
      toast.error("Email is not valid.");
      return false;
    }

    if (!state.mobile_no) {
      toast.error("Mobile no is not valid.");
      return false;
    }

    if (state.mobile_no) {
      try {
        const number = parseInt(state.mobile_no);
        if (isNaN(number)) {
          toast.error("Mobile no is not valid.");
          return false;
        }
      } catch (e) {
        toast.error("Mobile no is not valid.");
        return false;
      }
    }
    // validate is url exist is valid
    if (state.website) {
      if (!isValidURL(state.website)) {
        toast.error("Website is not valid Url.");
        return false;
      }
    }

    if (state.linkedin) {
      if (!isValidURL(state.linkedin)) {
        toast.error("Linkedin is not valid Url.");
        return false;
      }
    }
    if (state.twitter) {
      if (!isValidURL(state.twitter)) {
        toast.error("Twitter is not valid Url.");
        return false;
      }
    }
    if (state.instagram) {
      if (!isValidURL(state.instagram)) {
        toast.error("Instagram is not valid Url.");
        return false;
      }
    }
    if (state.youtube) {
      if (!isValidURL(state.youtube)) {
        toast.error("Youtube is not valid Url.");
        return false;
      }
    }

    if (state.targetTrees) {
      if (!isValidNumber(state.targetTrees)) {
        toast.error("Target trees is not valid.");
        return false;
      }
    }

    if (state.targetPlastic) {
      if (!isValidNumber(state.targetPlastic)) {
        toast.error("Target plastic is not valid.");
        return false;
      }
    }

    return true;
  },
}));
