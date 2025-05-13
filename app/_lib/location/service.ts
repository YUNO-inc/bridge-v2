import {
  LocationClient,
  SearchForPositionResult,
  SearchForTextResult,
  SearchPlaceIndexForPositionCommand,
  SearchPlaceIndexForPositionCommandInput,
  SearchPlaceIndexForTextCommand,
  SearchPlaceIndexForTextCommandInput,
} from "@aws-sdk/client-location";

const client = new LocationClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function ReverseGeoCode({
  options,
}: {
  options: SearchPlaceIndexForPositionCommandInput;
}): Promise<SearchForPositionResult[] | undefined> {
  try {
    if (!options.Position || options.Position.length < 2)
      throw new Error("Latitude and longitude are required");

    const command = new SearchPlaceIndexForPositionCommand(options);

    const response = await client.send(command);
    return response.Results || [];
  } catch (error) {
    console.error(error);
  }
}

export async function QueryPlaceString({
  options,
}: {
  options: SearchPlaceIndexForTextCommandInput;
}): Promise<SearchForTextResult[] | undefined> {
  try {
    if (!options.Text) throw new Error("Latitude and longitude are required");

    const command = new SearchPlaceIndexForTextCommand(options);

    const response = await client.send(command);

    return response.Results || [];
  } catch (error) {
    console.error(error);
  }
}
