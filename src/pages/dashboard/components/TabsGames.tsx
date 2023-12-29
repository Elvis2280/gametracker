import { Tab, Tabs } from '@nextui-org/react';
import { tabStatus } from '@/utils/constants';
import { Key } from 'react';

type Props = {
  activeCount: number;
  completedCount: number;
  onChangeTab: (key: Key) => void;
};

export default function TabsGames({
  activeCount = 0,
  completedCount = 0,
  onChangeTab,
}: Props) {
  return (
    <div className=" w-full pb-2">
      <Tabs
        onSelectionChange={(value) => {
          onChangeTab(value);
        }}
        fullWidth
        aria-label="Options"
        color="primary"
        variant="bordered"
      >
        <Tab
          key={tabStatus.active}
          title={
            <div className="flex items-center gap-x-2">
              <span>Active</span>
              <span className=" px-2 py-1  text-white">{activeCount}</span>
            </div>
          }
        />
        <Tab
          key={tabStatus.completed}
          title={
            <div className="flex items-center gap-x-2">
              <span>Completed</span>
              <span className=" px-2 py-1  text-white">{completedCount}</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
}
