import { PostType } from "@/lib/global.types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import JobCard, { JobSkeletonCard } from "./job-card";
import { Button } from "../ui/button";
import { jobsAPI } from "@/lib/api";

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
        <div>
          {feedData.data.map((post: PostType) => (
            <JobCard key={post.story_id} post={post} />
          ))}
        </div>
      ) : null}

      <div className="flex items-center justify-between my-6 px-2 fixed bottom-2 w-full max-w-xl">
        <Button
          variant="outline"
          className="bg-background"
          onClick={onPreviousClick}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          className="bg-background"
          onClick={onNextClick}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default JobContainer;
