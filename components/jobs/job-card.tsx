import { HugeiconsIcon } from "@hugeicons/react";
import { Link01FreeIcons } from "@hugeicons/core-free-icons";
import { JobPost } from "@/lib/global.types";
import { Button } from "../ui/button";
import { formatUnixDate, getHackerNewsItemUrl } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface JobCardProps {
  job: JobPost;
}

const JobCard = (props: JobCardProps) => {
  const { job } = props;

  return (
    <div className="p-2 flex items-start justify-between">
      <div className="space-y-0.5">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={getHackerNewsItemUrl(job.id)}
        >
          <h3 className="font-medium text-sm hover:underline">{job.title}</h3>
        </a>
        <p className="text-xs text-neutral-500">
          @{job.by} ·{" "}
          <span className="font-mono">{formatUnixDate(job.time)}</span>
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        render={
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={job?.url ?? getHackerNewsItemUrl(job.id)}
          />
        }
      >
        <HugeiconsIcon icon={Link01FreeIcons} strokeWidth={2} />
      </Button>
    </div>
  );
};

export default JobCard;

export const JobSkeletonCard = () => (
  <div className="p-2 flex items-start justify-between">
    <div className="flex flex-col gap-1">
      <Skeleton className="h-5 w-64" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-28" />
      </div>
    </div>
    <Skeleton className="size-6 mr-1" />
  </div>
);
