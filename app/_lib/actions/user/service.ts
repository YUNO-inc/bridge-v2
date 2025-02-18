import { UserDTO } from "@/app/_interfaces/interfaces";
import { connect } from "../../db";
import User from "../../models/user/model";
import { auth } from "../auth/auth";
import {
  LocationClient,
  SearchForPositionResult,
  SearchPlaceIndexForPositionCommand,
  SearchPlaceIndexForPositionCommandInput,
} from "@aws-sdk/client-location";

export async function createUser(user: UserDTO) {
  await connect();
  const newUser = await User.create({ name: user.name, email: user.email });
  return newUser;
}

export async function getUser(queryObj: Partial<UserDTO>) {
  await connect();
  const user = await User.findOne(queryObj);
  return user;
}

export async function updateUserById(id: string, updateObj: Partial<UserDTO>) {
  await connect();
  const user = await User.findByIdAndUpdate(id, updateObj, { new: true });
  return user;
}

export async function updateMe(updateObj: Partial<UserDTO>) {
  const session = await auth();
  if (!session?.user) return;
  const id = session.user.id;
  await connect();
  const user = await User.findByIdAndUpdate(id, updateObj, { new: true });
  if (!user)
    throw new Error(
      "You are logged in but your data is missing in our database."
    );
  return user;
}

export async function ReverseGeoCode({
  options,
}: {
  options: SearchPlaceIndexForPositionCommandInput;
}): Promise<SearchForPositionResult[] | undefined> {
  try {
    if (!options.Position || options.Position.length < 2)
      throw new Error("Latitude and longitude are required");

    const client = new LocationClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const command = new SearchPlaceIndexForPositionCommand(options);

    const response = await client.send(command);

    return response.Results || [];
  } catch (error) {
    console.error(error);
    console.log({ error: "Failed to reverse geocode" });
  }
}
