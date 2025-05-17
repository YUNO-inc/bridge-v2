type TabDTO = { title: string; text: string };

function ThreeTabs({ tabs }: { tabs: TabDTO[] }) {
  return (
    <div className="max-w-full overflow-hidden flex justify-between gap-2">
      {tabs.map((t) => (
        <Tab tab={t} key={t.text} />
      ))}
    </div>
  );
}

function Tab({ tab }: { tab: TabDTO }) {
  return (
    <div
      className="text-center basis-[30%] max-w-[30%] bg-slate-500/10 text-slate-500 p-2 rounded-xl"
      title={tab.title}
    >
      <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis capitalize">
        {tab.title}
      </p>
      <p className="text-base font-bold">{tab.text}</p>
    </div>
  );
}

export default ThreeTabs;
