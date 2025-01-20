import BusinessTypesLoading from "./BusinessTypesLoading";
import ActivityContainerLoading from "./ActivityContainerLoading";
import ActivitySearchLoading from "./ActivitySearchLoading";

function ActivityControlsLoading() {
  return (
    <div className="mt-auto">
      <div className="animate-pulse flex flex-col items-center gap-3 mx-auto pb-6 px-4 max-w-screen-sm">
        <BusinessTypesLoading />
        <ActivityContainerLoading />
        <ActivitySearchLoading />
      </div>
    </div>
  );
}

export default ActivityControlsLoading;
