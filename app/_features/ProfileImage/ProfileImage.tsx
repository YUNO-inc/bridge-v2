// import { UserIcon } from "@heroicons/react/16/solid";
import { UserIcon } from "@heroicons/react/24/outline";

function ProfileImage() {
  return (
    <div className="absolute w-full top-0 left-0 flex justify-end px-3 sm:px-6 pt-3">
      <div className="bg-phthaloGreen h-9 w-9 rounded-full flex items-center justify-center">
        <UserIcon className="stroke-white w-5 h-5" />
      </div>
    </div>
  );
}

export default ProfileImage;
