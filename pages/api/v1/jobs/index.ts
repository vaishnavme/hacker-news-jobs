import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { PostType } from "@/lib/global.types";
import { getHNTimeRange } from "@/lib/utils";

const getHackerNewsAPIURL = ({
  timeRange,
  queryInput,
  pageNumber,
  remote,
  freelance,
  internship,
}: {
  timeRange?: { start: number; end: number } | null;
  queryInput?: string | null;
  pageNumber?: number | null;
  remote?: boolean;
  freelance?: boolean;
  internship?: boolean;
}): string => {
  let queryString = queryInput ? queryInput.trim() : "";

  if (remote && !queryString.toLowerCase().includes("remote")) {
    queryString += " remote";
  }

  if (freelance && !queryString.toLowerCase().includes("freelance")) {
    queryString += " freelance";
  }

  if (internship && !queryString.toLowerCase().includes("internship")) {
    queryString += " internship";
  }

  const url = new URL("https://hn.algolia.com/api/v1/search_by_date");
  url.searchParams.set(
    "tags",
    queryString ? "job" : "story,author_whoishiring",
  );
  url.searchParams.set("hitsPerPage", String(50));

  if (pageNumber && pageNumber > 0) {
    url.searchParams.set("page", String(pageNumber));
  }

  if (timeRange) {
    const numericFilters = `created_at_i>=${timeRange.start},created_at_i<${timeRange.end}`;
    url.searchParams.set("numericFilters", numericFilters);
  }

  if (queryString) {
    url.searchParams.set("query", queryString.trim());
  }

  return url.toString();
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, month, year, q, remote, freelance, internship } = req.query;

  const pageNumber = Math.max(0, parseInt((page as string) || "1", 10) - 1);

  const queryInput = (q as string)?.trim() as string | undefined;

  const yearNum = year ? parseInt(year as string, 10) : undefined;
  const monthNum = month ? parseInt(month as string, 10) : undefined;
  const timeRange =
    yearNum || monthNum ? getHNTimeRange(yearNum, monthNum) : null;

  try {
    const hackernewsAPI = getHackerNewsAPIURL({
      timeRange,
      queryInput,
      pageNumber,
      remote: remote === "true",
      freelance: freelance === "true",
      internship: internship === "true",
    });
    console.log("Fetching from HackerNews API with URL:", hackernewsAPI);
    const response = await axios.get(hackernewsAPI);
    let posts = response.data.hits || [];

    posts = posts.filter((post: PostType) => {
      const jobTitle = post.title.toLowerCase();
      return !jobTitle.includes("who wants to be hired");
    });

    return res.status(200).send({
      success: true,
      data: posts,
    });
  } catch (_err) {
    res.status(500).send({
      success: false,
      error: {
        message: "Something went wrong while fetching job posts.",
      },
    });
  }
};

export default handler;
