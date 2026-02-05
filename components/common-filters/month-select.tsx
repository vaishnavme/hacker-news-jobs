import { getMonthOptions } from "@/lib/utils";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
} from "../ui/combobox";

const monthOptions = getMonthOptions();

interface MonthSelectProps {
  value: { label: string; value: number } | null;
  onValueChange: (value: { label: string; value: number } | null) => void;
}

const MonthSelect = (props: MonthSelectProps) => {
  const { value, onValueChange } = props;
  return (
    <Combobox
      items={monthOptions}
      defaultValue={value}
      onValueChange={onValueChange}
    >
      <ComboboxInput placeholder="Please select month" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default MonthSelect;