import ActivityItem from "@/app/_features/App/ActivityContainer/ActivityItem";

type PageProps = {
  params: {
    businessSlug: string;
  };
};

async function Page({ params }: PageProps) {
  const { businessSlug } = await params;

  return <ActivityItem show={true}>Business: {businessSlug}</ActivityItem>;
}

export default Page;
