import { Activity } from "react";
import { useRouter } from "next/router";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabOptions } from "@/lib/constants";
import MonthlyHiring from "@/components/jobs/monthly-hiring";
import AllJobs from "@/components/jobs/all-jobs";

const Home = () => {
  const router = useRouter();

  const currentActiveTab =
    (router.query.tab as string) || tabOptions.allJobs.value;

  const onTabChange = (value: string) => {
    router.push(
      {
        pathname: router.pathname,
        query: { tab: value },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <main className="space-y-4">
      <header className="text-center p-10">
        <h1 className="text-2xl font-medium">
          Find tech jobs <br /> in your favorite startups!
        </h1>
      </header>

      <Tabs
        defaultValue={tabOptions.allJobs.value}
        value={currentActiveTab}
        onValueChange={onTabChange}
        className="w-full border-b"
      >
        <TabsList variant="line">
          <TabsTrigger value={tabOptions.allJobs.value}>
            {tabOptions.allJobs.label}
          </TabsTrigger>
          <TabsTrigger value={tabOptions.monthlyHiring.value}>
            {tabOptions.monthlyHiring.label}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Activity
        mode={
          currentActiveTab === tabOptions.monthlyHiring.value
            ? "visible"
            : "hidden"
        }
      >
        <MonthlyHiring />
      </Activity>

      <Activity
        mode={
          currentActiveTab === tabOptions.allJobs.value ? "visible" : "hidden"
        }
      >
        <AllJobs />
      </Activity>

      {/* <div className="flex items-center gap-2">
        <YearSelect value={currentYear} onValueChange={setCurrentYear} />
        <MonthSelect value={currentMonth} onValueChange={setCurrentMonth} />
      </div> */}
    </main>
  );
};

export default Home;
