import ActivityItem from "@/app/_features/App/ActivityContainer/ActivityItem";

type PageProps = {
  params: {
    itemSlug: string;
  };
};

async function Page({ params }: PageProps) {
  const { itemSlug } = await params;

  return <ActivityItem show={true}>item: {itemSlug}</ActivityItem>;
}

export default Page;
