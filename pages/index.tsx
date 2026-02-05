import { useState } from "react";
import MonthSelect from "@/components/common-filters/month-select";
import YearSelect from "@/components/common-filters/year-select";

const Home = () => {
  const [currentMonth, setCurrentMonth] = useState<{
    label: string;
    value: number;
  } | null>(null);

  const [currentYear, setCurrentYear] = useState<number | null>(
    new Date().getFullYear(),
  );

  return (
    <main>
      <header className="text-center p-10">
        <h1 className="text-2xl font-medium">
          Find tech jobs <br /> in your favorite startups!
        </h1>
      </header>

      <div className="flex items-center gap-2">
        <YearSelect value={currentYear} onValueChange={setCurrentYear} />
        <MonthSelect value={currentMonth} onValueChange={setCurrentMonth} />
      </div>
    </main>
  );
};

export default Home;
