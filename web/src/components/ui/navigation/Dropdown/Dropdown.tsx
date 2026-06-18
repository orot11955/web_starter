import { useState, type ReactNode } from 'react';

type DropdownItem = {
  label: ReactNode;
  onClick: () => void;
  danger?: boolean;
};

type DropdownProps = {
  trigger: ReactNode;
  items: DropdownItem[];
};

export function Dropdown({ trigger, items }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown">
      <button type="button" className="button button--secondary button--sm" onClick={() => setOpen((value) => !value)}>
        {trigger}
      </button>
      {open && (
        <div className="dropdown__menu">
          {items.map((item, index) => (
            <button
              key={index}
              type="button"
              className={item.danger ? 'dropdown__item dropdown__item--danger' : 'dropdown__item'}
              onClick={() => {
                setOpen(false);
                item.onClick();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
