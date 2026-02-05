import { Activity } from "react";
import { useRouter } from "next/router";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabOptions } from "@/lib/constants";
import MonthlyHiring from "@/components/jobs/monthly-hiring";
import AllJobs from "@/components/jobs/all-jobs";
import YearSelect from "@/components/common-filters/year-select";
import MonthSelect from "@/components/common-filters/month-select";
import Head from "next/head";

const Home = () => {
  const router = useRouter();

  const currentActiveTab =
    (router.query.tab as string) || tabOptions.trendingJobs.value;

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
    <>
      <Head>
        <title>Tech Jobs in Startups - Monthly Hiring & Trending Jobs</title>
        <meta
          name="description"
          content="Discover the latest tech job trends in startups with our comprehensive dashboard. Explore monthly hiring patterns and trending job roles to stay ahead in the competitive job market."
        />
      </Head>
      <main className="space-y-4">
        <header className="text-center p-10">
          <h1 className="text-2xl font-medium">
            Find tech jobs <br /> in your favorite startups!
          </h1>
        </header>

        <div className="border-b w-full flex items-center justify-between">
          <Tabs
            defaultValue={tabOptions.trendingJobs.value}
            value={currentActiveTab}
            onValueChange={onTabChange}
          >
            <TabsList variant="line">
              <TabsTrigger value={tabOptions.trendingJobs.value}>
                {tabOptions.trendingJobs.label}
              </TabsTrigger>
              <TabsTrigger value={tabOptions.monthlyHiring.value}>
                {tabOptions.monthlyHiring.label}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <YearSelect />
            <MonthSelect />
          </div>
        </div>

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
            currentActiveTab === tabOptions.trendingJobs.value
              ? "visible"
              : "hidden"
          }
        >
          <AllJobs />
        </Activity>

        {/* <div className="flex items-center gap-2">
        <YearSelect value={currentYear} onValueChange={setCurrentYear} />
        <MonthSelect value={currentMonth} onValueChange={setCurrentMonth} />
      </div> */}
      </main>
    </>
  );
};

export default Home;
