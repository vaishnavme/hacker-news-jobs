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

      case "role":
        if (value) {
          currentQuery.role = value.value;
        } else {
          delete currentQuery.role;
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
        <title>HackerNews Jobs | Find tech jobs in startups</title>
        <meta
          name="description"
          content="Discover tech job opportunities in startups with HackerNews Jobs. Search and filter by role, location, and more to find your next career move."
        />
      </Head>
      <div className="relative min-h-screen">
        <main className="w-full max-w-xl mx-auto space-y-4">
          <header className="text-center p-10">
            <h1 className="text-3xl font-normal text-emerald-800 font-serif">
              Find tech <i className="text-emerald-600">jobs</i> <br /> in
              startups!
            </h1>
          </header>

          <form
            onClick={onSearchQuerySubmit}
            className="w-full border-b pb-2 flex items-center gap-4 justify-between px-2"
          >
            <Input
              name="search"
              placeholder="Search jobs by country, role or keyword..."
              ref={inputRef}
            />
            <div className="flex items-center gap-2">
              <Button
                type="submit"
                onClick={() =>
                  onFitlerUpdate("query", inputRef?.current?.value || "")
                }
              >
                <HugeiconsIcon icon={Search01FreeIcons} strokeWidth={2} />
                Search
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
          className="fixed top-4 right-4 z-50 lg:hidden shadow-lg bg-background"
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
