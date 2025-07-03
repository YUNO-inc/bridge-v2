"use server";

import { BusinessDTO } from "@/app/_interfaces/interfaces";
import { getAdminAggregates, toggleBusinessOpenState } from "./service";

export async function GetAdminAggregatesAction() {
  return await getAdminAggregates();
}

export async function ToggleBusinessOpenStateAction(opt: {
  id: BusinessDTO["id"];
  isOpen: BusinessDTO["isOpen"];
}) {
  await toggleBusinessOpenState(opt);
}
