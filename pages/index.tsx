import Head from "next/head";
import { useRouter } from "next/router";
import YearSelect from "@/components/common-filters/year-select";
import MonthSelect from "@/components/common-filters/month-select";
import JobContainer from "@/components/jobs/jobs-container";

const Home = () => {
  const router = useRouter();

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
      <div className="relative flex items-start justify-center gap-6">
        <main className="w-full max-w-xl">
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

        <aside className="relative">
          <div className="w-64 min-h-screen fixed pt-38 space-y-4">
            <p className="text-xs font-sans font-medium">Filters</p>
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
