"use client";

import { useCallback, useState } from "react";
import InputsClient from "./InputsClient";
import Button from "./Button";
import { UpdateMeAction } from "@/app/_lib/user/actions";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/reduxHooks";
import { getUser, setUser } from "../User/userSlice";

function AccountForm() {
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState(user?.name || undefined);
  const [email, setEmail] = useState(user?.email || undefined);
  const [phoneNumber, setPhoneNumber] = useState(
    user?.phoneNumber || undefined
  );
  const formIsChanged = !(
    name === user?.name &&
    email === user?.email &&
    phoneNumber === user?.phoneNumber
  );

  const handleAction = useCallback(
    async (formdata: FormData) => {
      setIsSubmitting(true);
      try {
        const userUpdate = { ...(await UpdateMeAction(formdata)) };
        dispatch(setUser(userUpdate));
      } catch (error) {
        const err = error as Error;
        console.error(err.message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [dispatch, setIsSubmitting]
  );

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleAction(formData);
      }}
      className="flex flex-col gap-6 p-3 text-stone-700 text-sm"
    >
      <InputsClient
        type="text"
        label="Name"
        name="name"
        placeHolder="What should we call you?"
        value={name}
        setValue={setName}
      />
      <InputsClient
        type="email"
        label="Email"
        name="email"
        placeHolder="Email e.g johndoe@bridge.com"
        value={email}
        setValue={setEmail}
      />
      <InputsClient
        type="tel"
        label="Phone"
        placeHolder="08000000000"
        name="phoneNumber"
        value={phoneNumber}
        setValue={setPhoneNumber}
      />
      {formIsChanged && (
        <Button
          text="Save and Continue"
          className="mt-2"
          type="submit"
          isLoading={isSubmitting}
        />
      )}
    </form>
  );
}

export default AccountForm;
