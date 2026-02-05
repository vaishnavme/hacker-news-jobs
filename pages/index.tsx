import Head from "next/head";
import AllJobs from "@/components/jobs/all-jobs";
import YearSelect from "@/components/common-filters/year-select";
import MonthSelect from "@/components/common-filters/month-select";

const Home = () => {
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
        <main className="max-w-4xl">
          <header className="text-center p-10">
            <h1 className="text-2xl font-medium">
              Find tech jobs <br /> in your favorite startups!
            </h1>
          </header>

          <div className="w-full border-b">
            <p className="text-xs font-medium px-2 py-2">Trending Jobs</p>
          </div>

          <AllJobs />
        </main>

        <aside className="relative">
          <div className="w-64 min-h-screen fixed pt-38 space-y-4">
            <p className="text-xs font-sans font-medium">Filters</p>
            <div className="space-y-4">
              <YearSelect />
              <MonthSelect />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Home;
