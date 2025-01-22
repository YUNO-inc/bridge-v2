import BusinessTypes from "../BusinessTypes/BusinessTypes";
import ActivityContainer from "./ActivityContainer/ActivityContainer";
import ActivitySearch from "./ActivitySearch/ActivitySearch";

async function ActivityControls() {
  return (
    <div className="mt-auto pt-2">
      <div className="flex flex-col items-center gap-3 mx-auto pb-6 px-4 max-w-screen-sm">
        <BusinessTypes />
        <ActivityContainer />
        <ActivitySearch />
      </div>
    </div>
  );
}

export default ActivityControls;
