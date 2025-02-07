"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "./store";
import { UserDTO } from "../_interfaces/interfaces";
import { setUser } from "../_features/User/userSlice";

export default function StoreProvider({
  user,
  children,
}: {
  user: UserDTO | undefined;
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(setUser(user));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
