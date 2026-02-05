import { getYearOptions } from "@/lib/utils";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
} from "../ui/combobox";

const currentYear = new Date().getFullYear();
const yearOptions = getYearOptions(currentYear);

interface YearSelectProps {
  value: number | null;
  onValueChange: (value: number | null) => void;
}

const YearSelect = (props: YearSelectProps) => {
  const { value, onValueChange } = props;
  return (
    <Combobox
      items={yearOptions}
      defaultValue={value}
      onValueChange={onValueChange}
    >
      <ComboboxInput placeholder="Please select year" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default YearSelect;
