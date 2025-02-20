"use server";

import { cleanObject } from "@/app/_utils/helpers";
import { ReverseGeoCode, updateMe } from "./service";
import { UserDTO } from "@/app/_interfaces/interfaces";

export async function UpdateMeAction(
  formdata?: FormData,
  dataObj?: Partial<UserDTO>
): Promise<Partial<UserDTO>> {
  try {
    let updateObject = {};

    if (formdata) {
      const name = formdata.get("name");
      const email = formdata.get("email");
      const phoneNumber = formdata.get("phoneNumber");
      updateObject = cleanObject({ name, email, phoneNumber });
    } else if (dataObj) {
      updateObject = cleanObject(dataObj);
    }

    if (Object.keys(updateObject).length < 1)
      throw new Error("No valid updates where sent.");

    const user = await updateMe(updateObject);
    return {
      name: user?.name,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      addresses: user?.addresses,
    };
  } catch (error: unknown) {
    const err = error as Error;
    throw new Error(err.message || "Failed to update user.");
  }
}

export async function ReverseGeoCodeAction({
  lat,
  lng,
  maxResults = 1,
}: {
  lat: number;
  lng: number;
  maxResults?: number;
}) {
  try {
    return ReverseGeoCode({
      options: {
        IndexName: process.env.AWS_PLACE_INDEX,
        Position: [lng, lat],
        MaxResults: maxResults,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
