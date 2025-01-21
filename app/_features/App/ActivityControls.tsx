import { auth } from "@/app/_lib/actions/auth/auth";
import BusinessTypes from "../BusinessTypes/BusinessTypes";
import ActivityContainer from "./ActivityContainer/ActivityContainer";
import ActivitySearch from "./ActivitySearch/ActivitySearch";
import ActivityControlsSegmentedControl from "./ActivityControlsSegmentedControl";

async function ActivityControls() {
  const session = await auth();

  return (
    <div className="mt-auto pt-2">
      <div className="flex flex-col items-center gap-3 mx-auto pb-6 px-4 max-w-screen-sm">
        <BusinessTypes />
        <ActivityContainer />
        {!session?.user && <ActivityControlsSegmentedControl />}
        <ActivitySearch />
      </div>
    </div>
  );
}

export default ActivityControls;
