import ActivityItem from "@/app/_features/App/ActivityContainer/ActivityItem";
import BusinessHeader from "@/app/_features/Business/BusinessHeader";
import BusinessProducts from "@/app/_features/Business/BusinessProducts";
import { BusinessDTO } from "@/app/_interfaces/interfaces";

async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ businessSlug: string }>;
}) {
  const { businessSlug } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/business/${businessSlug}`
  );
  const business: BusinessDTO | null = await res.json();

  if (!business) return <div>Could not find your requested business</div>;

  return (
    <ActivityItem show={true}>
      <div className="p-4 w-full h-full">
        <BusinessHeader business={business} />
        <div>{children}</div>
        <BusinessProducts business={business} />
      </div>
    </ActivityItem>
  );
}

export default Layout;
