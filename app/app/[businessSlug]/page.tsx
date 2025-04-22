import ActivityItem from "@/app/_features/App/ActivityContainer/ActivityItem";
import CreateBiz from "@/app/_features/Business/CreateBiz";

type PageProps = {
  params: Promise<{
    businessSlug: string;
  }>;
};

async function Page({ params }: PageProps) {
  const { businessSlug } = await params;

  return (
    <ActivityItem show={true}>
      <div>Business: {businessSlug}</div>
      <CreateBiz name={businessSlug} />
    </ActivityItem>
  );
}

export default Page;
