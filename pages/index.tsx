import Head from "next/head";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FilterFreeIcons,
  Cancel01FreeIcons,
  Search01FreeIcons,
  Copy01FreeIcons,
  Tick01FreeIcons,
} from "@hugeicons/core-free-icons";
import JobContainer from "@/components/jobs/jobs-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import JobFilters from "@/components/jobs/job-filters";

const Home = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { isCopied, onCopy } = useCopyToClipboard();

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

      case "query":
        if (value) {
          currentQuery.q = value;
        }
        break;

      case "remote":
        if (value) {
          currentQuery.remote = "true";
        } else {
          delete currentQuery.remote;
        }
        break;

      case "freelance":
        if (value) {
          currentQuery.freelance = "true";
        } else {
          delete currentQuery.freelance;
        }
        break;

      case "internship":
        if (value) {
          currentQuery.internship = "true";
        } else {
          delete currentQuery.internship;
        }
        break;

      default:
        break;
    }

    router.push({
      query: currentQuery,
    });
  };

  const onSearchQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFitlerUpdate("query", inputRef?.current?.value || "");
  };

  const clearFilters = () => {
    router.push({
      query: {},
    });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
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

          <form
            onClick={onSearchQuerySubmit}
            className="w-full border-b pb-2 flex items-center gap-4 justify-between px-2"
          >
            <Input name="search" placeholder="Search jobs" ref={inputRef} />
            <div className="flex items-center gap-2">
              <Button
                type="submit"
                onClick={() =>
                  onFitlerUpdate("query", inputRef?.current?.value || "")
                }
                variant="outline"
              >
                Search
                <HugeiconsIcon icon={Search01FreeIcons} strokeWidth={2} />
              </Button>
              <Button
                onClick={() => onCopy(window.location.href)}
                variant="outline"
                size="icon"
              >
                <HugeiconsIcon
                  strokeWidth={2}
                  icon={isCopied ? Tick01FreeIcons : Copy01FreeIcons}
                  className={isCopied ? "text-green-700" : ""}
                />
              </Button>
            </div>
          </form>

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

        <JobFilters
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          onFilterUpdate={onFitlerUpdate}
          clearFilters={clearFilters}
        />
      </div>
    </>
  );
};

export default Home;
