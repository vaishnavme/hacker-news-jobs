import { getMonthOptions } from "@/lib/utils";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
} from "../ui/combobox";
import { Label } from "../ui/label";

const monthOptions = getMonthOptions();

interface MonthSelectProps {
  value?: { label: string; value: number } | null;
  onValueChange: (value: { label: string; value: number } | null) => void;
}

const MonthSelect = (props: MonthSelectProps) => {
  const { value, onValueChange } = props;
  return (
    <div className="space-y-1">
      <Label>Month</Label>
      <Combobox
        items={monthOptions}
        defaultValue={value}
        onValueChange={onValueChange}
      >
        <ComboboxInput />
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
    </div>
  );
};

export default MonthSelect;
