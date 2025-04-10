import ActivityItem from "@/app/_features/App/ActivityContainer/ActivityItem";
import CreateItem from "@/app/_features/Item/CreateItem";

type PageProps = {
  params: {
    itemSlug: string;
    businessSlug: string;
  };
};

async function Page({ params }: PageProps) {
  const { businessSlug, itemSlug } = await params;

  return (
    <ActivityItem show={true}>
      <div>item: {itemSlug}</div>
      <CreateItem name={itemSlug} businessSlug={businessSlug} />
    </ActivityItem>
  );
}

export default Page;
