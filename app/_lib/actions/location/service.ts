import {
  LocationClient,
  SearchForPositionResult,
  SearchPlaceIndexForPositionCommand,
  SearchPlaceIndexForPositionCommandInput,
} from "@aws-sdk/client-location";

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
  }
}
