import { jobRolesOptions } from "@/lib/constants";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
} from "../ui/combobox";
import { Label } from "../ui/label";

interface RoleSelectProps {
  value?: string | null;
  onValueChange: (value: { label: string; value: string } | null) => void;
}

const RoleSelect = (props: RoleSelectProps) => {
  const { value, onValueChange } = props;

  const selectedOption = jobRolesOptions.find(
    (option) => option.value === value,
  );

  return (
    <div className="space-y-1">
      <Label>Role</Label>
      <Combobox
        items={jobRolesOptions}
        value={selectedOption}
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

export default RoleSelect;
