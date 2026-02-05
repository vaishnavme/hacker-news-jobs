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
      : 0;

    if (currentPage > 0) {
      currentQuery.page = String(currentPage - 1);
      router.push({
        query: currentQuery,
      });
    }
  };

  const onNextClick = () => {
    const currentQuery = router?.query ? { ...router.query } : {};
    const currentPage = currentQuery.page
      ? parseInt(currentQuery.page as string, 10)
      : 0;

    currentQuery.page = String(currentPage + 1);
    router.push({
      query: currentQuery,
    });
  };

  return (
    <div>
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

      <div className="flex items-center justify-between my-6">
        <Button variant="outline" onClick={onPreviousClick}>
          Previous
        </Button>
        <Button variant="outline" onClick={onNextClick}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default JobContainer;
