import { PostType } from "@/lib/global.types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import JobCard, { JobSkeletonCard } from "./job-card";
import { Button } from "../ui/button";
import { jobsAPI } from "@/lib/api";
import { HugeiconsIcon } from "@hugeicons/react";
import { NoteFreeIcons } from "@hugeicons/core-free-icons";

const JobContainer = () => {
  const router = useRouter();

  const feedData = useQuery({
    queryKey: ["job-feed", Object.values(router.query)],
    queryFn: async () => {
      const response = await jobsAPI.allJobs(router.query);
      return response.data || [];
    },
  });

  const onPreviousClick = () => {
    const currentQuery = router?.query ? { ...router.query } : {};
    const currentPage = currentQuery.page
      ? parseInt(currentQuery.page as string, 10)
      : 1;

    if (currentPage > 1) {
      const newPage = currentPage - 1;
      if (newPage === 1) {
        delete currentQuery.page;
      } else {
        currentQuery.page = String(newPage);
      }
      router.push({
        query: currentQuery,
      });
    }
  };

  const onNextClick = () => {
    const currentQuery = router?.query ? { ...router.query } : {};
    const currentPage = currentQuery.page
      ? parseInt(currentQuery.page as string, 10)
      : 1;

    currentQuery.page = String(currentPage + 1);
    router.push({
      query: currentQuery,
    });
  };

  return (
    <div className="pb-20">
      {feedData.isLoading ? (
        <div>
          {new Array(10).fill(null).map((_, index) => (
            <JobSkeletonCard key={`skeleton-${index + 2}`} />
          ))}
        </div>
      ) : null}
      {!feedData.isLoading && feedData.data.length > 0 ? (
        <div className="space-y-2">
          {feedData.data.map((post: PostType) => (
            <JobCard key={post.story_id} post={post} />
          ))}
        </div>
      ) : null}

      {!feedData.isLoading && feedData?.data?.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-2 my-10">
          <HugeiconsIcon
            icon={NoteFreeIcons}
            strokeWidth={1}
            size={40}
            className="text-center text-muted-foreground"
          />
          <div>
            {router.query.page ? (
              <>
                <p className="text-center text-sm font-medium">
                  You&apos;ve reached the end!
                </p>
                <p className="text-center text-xs text-muted-foreground">
                  No more jobs to show. Go back to previous pages.
                </p>
              </>
            ) : (
              <>
                <p className="text-center text-sm font-medium">
                  We couldn&apos;t find jobs matching your criteria.
                </p>
                <p className="text-center text-xs text-muted-foreground">
                  Maybe try with different job filters.
                </p>
              </>
            )}
          </div>
        </div>
      ) : null}

      <div className="flex items-center justify-between py-4 px-2 fixed bottom-0 w-full max-w-xl bg-background/50 backdrop-blur-sm">
        <Button variant="black" onClick={onPreviousClick}>
          Previous
        </Button>
        <Button variant="black" onClick={onNextClick}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default JobContainer;
