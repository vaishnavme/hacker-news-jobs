import { useRouter } from "next/router";
import MonthSelect from "../common-filters/month-select";
import YearSelect from "../common-filters/year-select";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import RoleSelect from "../common-filters/role-select";

interface JobFiltersProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  onFilterUpdate: (
    type: string,
    value:
      | string
      | number
      | boolean
      | null
      | { label: string; value: number | string }
      | null,
  ) => void;
  clearFilters: () => void;
}

const JobFilters = (props: JobFiltersProps) => {
  const { isFilterOpen, setIsFilterOpen, onFilterUpdate, clearFilters } = props;

  const router = useRouter();

  return (
    <>
      {/* Backdrop for mobile */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-background z-40 transform transition-transform duration-300 ease-in-out lg:top-0 lg:right-[calc(50%-20rem-16rem)] ${
          isFilterOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="w-64 min-h-screen p-4 space-y-4">
          <div className="flex items-center justify-between pt-38">
            <p className="text-sm font-medium font-sans uppercase tracking-wider">
              Filters
            </p>
          </div>
          <div className="space-y-4">
            <RoleSelect
              value={(router.query.role as string) || null}
              onValueChange={(value) => onFilterUpdate("role", value)}
            />
            <YearSelect
              value={
                router.query.year
                  ? parseInt(String(router.query.year), 10)
                  : null
              }
              onValueChange={(value) => onFilterUpdate("year", value)}
            />
            <MonthSelect
              value={
                router.query.month
                  ? parseInt(String(router.query.month), 10)
                  : null
              }
              onValueChange={(value) => onFilterUpdate("month", value)}
            />

            <div className="flex items-center gap-1">
              <Checkbox
                id="remote-only"
                checked={router.query.remote === "true"}
                onCheckedChange={(checked) => onFilterUpdate("remote", checked)}
              />
              <Label htmlFor="remote-only">Remote only</Label>
            </div>

            <div className="flex items-center gap-1">
              <Checkbox
                id="freelance-only"
                checked={router.query.freelance === "true"}
                onCheckedChange={(checked) =>
                  onFilterUpdate("freelance", checked)
                }
              />
              <Label htmlFor="freelance-only">Freelance only</Label>
            </div>

            <div className="flex items-center gap-1">
              <Checkbox
                id="internship-only"
                checked={router.query.internship === "true"}
                onCheckedChange={(checked) =>
                  onFilterUpdate("internship", checked)
                }
              />
              <Label htmlFor="internship-only">Internship only</Label>
            </div>

            <Button
              variant="outline"
              onClick={clearFilters}
              className="ml-auto"
            >
              Reset
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default JobFilters;
