"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CountryDropdown } from "@/components/ui/custom/country-dropdown";
import { CityDropdown } from "@/components/ui/custom/city-dropdown";
import { Button } from "@/components/ui/button";
import { useMutation } from "react-query";
import { createUser } from "@/request/worker/users/manageUsers";
import { extractErrors } from "@/request/actions";
import toast from "react-hot-toast";

function NewEmployeeForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobileNo, setMobileNo] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [city, setCity] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState<Record<string, string>>({});

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError((prevError) => ({ ...prevError, name: "" }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError((prevError) => ({ ...prevError, email: "" }));
  };

  const handleMobileNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobileNo(e.target.value);
    setError((prevError) => ({ ...prevError, mobileNo: "" }));
  };

  const handleGenderChange = (e: string) => {
    setGender(e);
    setError((prevError) => ({ ...prevError, gender: "" }));
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDob(e.target.value);
    setError((prevError) => ({ ...prevError, dob: "" }));
  };

  const handleCountryChange = (e: string) => {
    setCountry(e);
    setError((prevError) => ({ ...prevError, country: "" }));
  };

  const handleCityChange = (e: string) => {
    setCity(e);
    setError((prevError) => ({ ...prevError, city: "" }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError((prevError) => ({ ...prevError, password: "" }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setError((prevError) => ({ ...prevError, confirmPassword: "" }));
  };

  const createNewEmployee = useMutation({
    mutationKey: ["createNewEmployee"],
    mutationFn: async () => {
      return await createUser({
        first_name: name,
        email,
        mobile_no: mobileNo,
        gender,
        dob,
        country,
        city,
        password,
        passwordConfirm: confirmPassword,
        emailVisibility: true,
        role: "EMPLOYEE",
        user_type: "individual",
      });
    },
    onError(error: any, variables, context) {
      console.log(error);
      const errors = extractErrors(error?.response);
      toast.dismiss();
      toast.error("Error! " + errors[0]);
    },
    onSuccess(data, variables, context) {
      console.log(data);
      toast.dismiss();
      toast.success("Employee created successfully");

      setName("");
      setEmail("");
      setMobileNo("");
      setGender("");
      setDob("");
      setCountry("");
      setCity("");
      setPassword("");
      setConfirmPassword("");
      setError({});
    },
  });

  const handleSubmit = () => {
    const errors = {} as Record<string, string>;
    if (password !== confirmPassword) {
      errors.password = "Password do not match";
    }
    if (!name) {
      errors.name = "Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    }
    if (!mobileNo) {
      errors.mobileNo = "Mobile No is required";
    }
    if (!gender) {
      errors.gender = "Gender is required";
    }
    if (!dob) {
      errors.dob = "Dob is required";
    }
    if (!country) {
      errors.country = "Country is required";
    }
    if (!city) {
      errors.city = "City is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    }
    setError(errors);
    if (Object.keys(errors).length === 0) {
      toast.loading("Creating Employee...");
      createNewEmployee.mutate();
    }
  };

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-5 p-5">
        <div className="">
          <Label>Name</Label>
          <Input value={name} onChange={handleNameChange} />
          {error.name && <p className="text-red-500 text-xs">{error.name}</p>}
        </div>
        <div className="">
          <Label>Email ID</Label>
          <Input value={email} onChange={handleEmailChange} />
          {error.email && <p className="text-red-500 text-xs">{error.email}</p>}
        </div>
        <div className="">
          <Label>Mobile No</Label>
          <Input value={mobileNo} onChange={handleMobileNoChange} />
          {error.mobileNo && (
            <p className="text-red-500 text-xs">{error.mobileNo}</p>
          )}
        </div>
        <div className="">
          <Label>Gender</Label>
          <Select value={gender} onValueChange={handleGenderChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">male</SelectItem>
              <SelectItem value="female">female</SelectItem>
            </SelectContent>
          </Select>
          {error.gender && (
            <p className="text-red-500 text-xs">{error.gender}</p>
          )}
        </div>
        <div className="">
          <Label>Dob</Label>
          <Input
            type="date"
            className="block"
            value={dob}
            onChange={handleDobChange}
          />
          {error.dob && <p className="text-red-500 text-xs">{error.dob}</p>}
        </div>

        <div className="">
          <Label>Country</Label>
          <CountryDropdown
            onChange={handleCountryChange}
            value={country}
            className="w-full"
          />
          {error.country && (
            <p className="text-red-500 text-xs">{error.country}</p>
          )}
        </div>

        <div className="">
          <Label>City</Label>
          <CityDropdown
            country={country}
            onChange={handleCityChange}
            value={city}
            className="w-full"
          />
          {error.city && <p className="text-red-500 text-xs">{error.city}</p>}
        </div>
        <div className="">
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {error.password && (
            <p className="text-red-500 text-xs">{error.password}</p>
          )}
        </div>
        <div className="">
          <Label>Confirm Password</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {error.confirmPassword && (
            <p className="text-red-500 text-xs">{error.confirmPassword}</p>
          )}
        </div>
        <div className="">
          <Button
            disabled={createNewEmployee.isLoading}
            onClick={() => {
              handleSubmit();
            }}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewEmployeeForm;
