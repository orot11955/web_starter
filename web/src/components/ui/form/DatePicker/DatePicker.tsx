import { toDateInputValue, fromDateInputValue } from '@/utils/date';
import { Input } from '../../Input/Input';

type DatePickerProps = {
  value: Date | null;
  onChange: (value: Date | null) => void;
};

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <Input
      type="date"
      value={toDateInputValue(value)}
      onChange={(event) => onChange(fromDateInputValue(event.target.value))}
    />
  );
}
