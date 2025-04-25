import ProfileImage from "./_features/ProfileImage/ProfileImage";

export default async function Home() {
  return (
    <div className="relative flex flex-col min-h-[100svh]">
      <ProfileImage />
    </div>
  );
}
