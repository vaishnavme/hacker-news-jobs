import { useQuery } from "@tanstack/react-query";
import { jobsAPI } from "@/lib/api";
import JobCard, { JobSkeletonCard } from "./job-card";
import { JobPost } from "@/lib/global.types";

const MonthlyHiring = () => {
  const feedData = useQuery({
    queryKey: ["monthly-hiring-data"],
    queryFn: async () => {
      const response = await jobsAPI.monthly();
      return response.data;
    },
  });

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
          {feedData.data.map((job: JobPost) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MonthlyHiring;
