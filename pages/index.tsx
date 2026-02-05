import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { HugeiconsIcon } from "@hugeicons/react";
import { FilterFreeIcons, Cancel01FreeIcons } from "@hugeicons/core-free-icons";
import YearSelect from "@/components/common-filters/year-select";
import MonthSelect from "@/components/common-filters/month-select";
import JobContainer from "@/components/jobs/jobs-container";
import { Button } from "@/components/ui/button";

const Home = () => {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFitlerUpdate = (type: string, value: any) => {
    const currentQuery = router?.query ? { ...router.query } : {};

    switch (type) {
      case "year":
        currentQuery.year = value;
        break;

      case "month":
        currentQuery.month = value.value;
        break;

      default:
        break;
    }

    router.push({
      query: currentQuery,
    });
  };

  return (
    <>
      <Head>
        <title>Tech Jobs in Startups - Monthly Hiring & Trending Jobs</title>
        <meta
          name="description"
          content="Discover the latest tech job trends in startups with our comprehensive dashboard. Explore monthly hiring patterns and trending job roles to stay ahead in the competitive job market."
        />
      </Head>
      <div className="relative min-h-screen">
        <main className="w-full max-w-xl mx-auto">
          <header className="text-center p-10">
            <h1 className="text-2xl font-medium">
              Find tech jobs <br /> in your favorite startups!
            </h1>
          </header>

          <div className="w-full border-b">
            <p className="text-xs font-medium px-2 py-2">Trending Jobs</p>
          </div>

          <JobContainer />
        </main>

        {/* Mobile filter toggle button */}
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 right-4 z-50 lg:hidden shadow-lg"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <HugeiconsIcon
            icon={isFilterOpen ? Cancel01FreeIcons : FilterFreeIcons}
            strokeWidth={2}
          />
        </Button>

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
              <p className="text-xs font-sans font-medium">Filters</p>
            </div>
            <div className="space-y-4">
              <YearSelect
                onValueChange={(value) => onFitlerUpdate("year", value)}
              />
              <MonthSelect
                onValueChange={(value) => onFitlerUpdate("month", value)}
              />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Home;
