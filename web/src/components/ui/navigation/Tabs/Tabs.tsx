import { useState, type ReactNode } from 'react';

type TabItem = {
  value: string;
  label: ReactNode;
  content: ReactNode;
};

type TabsProps = {
  items: TabItem[];
  defaultValue?: string;
};

export function Tabs({ items, defaultValue }: TabsProps) {
  const [value, setValue] = useState(defaultValue ?? items[0]?.value);
  const current = items.find((item) => item.value === value) ?? items[0];

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist">
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            className={item.value === current.value ? 'tabs__button tabs__button--active' : 'tabs__button'}
            onClick={() => setValue(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div>{current?.content}</div>
    </div>
  );
}
