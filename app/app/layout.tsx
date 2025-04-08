import ProfileImage from "@/app/_features/ProfileImage/ProfileImage";
import BusinessTypes from "@/app/_features/BusinessTypes/BusinessTypes";
import ActivityContainer from "@/app/_features/App/ActivityContainer/ActivityContainer";
import ActivitySearch from "@/app/_features/App/ActivitySearch/ActivitySearch";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-[100svh]">
      <ProfileImage />
      <div className="mt-auto pt-2">
        <div className="flex flex-col items-center gap-3 mx-auto pb-6 px-4 max-w-screen-sm">
          <BusinessTypes />
          <ActivityContainer container={children} />
          <ActivitySearch />
        </div>
      </div>
    </div>
  );
}

export default Layout;
