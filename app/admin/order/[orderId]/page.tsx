async function page({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  return (
    <div className="h-svh w-svw flex items-center justify-center text-stone-500 font-bold">
      {orderId}!! 🎉🎉🎉
    </div>
  );
}

export default page;
