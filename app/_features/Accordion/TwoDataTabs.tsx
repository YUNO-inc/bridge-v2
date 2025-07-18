function TwoDataTabs({
  tabs,
}: {
  tabs: [{ title: string; value: string }, { title: string; value: string }];
}) {
  return (
    <div className="flex bg-white p-4 rounded-[16px]">
      {tabs.map((tab, i) => (
        <div key={i} className="basis-[50%] flex flex-col gap-2">
          <p className="text-phthaloGreen text-opacity-[0.37]">{tab.title}</p>
          <p className="font-bold">{tab.value}</p>
        </div>
      ))}
    </div>
  );
}

export default TwoDataTabs;
