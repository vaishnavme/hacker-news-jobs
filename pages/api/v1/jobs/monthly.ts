import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import JobServices from "@/services/jobs-services";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.get(
      `https://hacker-news.firebaseio.com/v0/user/whoishiring.json`,
    );
    const monthlyJobPostIds: string[] = response.data.submitted;

    if (monthlyJobPostIds.length === 0) {
      return res.status(200).send({
        success: true,
        data: [],
      });
    }

    const result = await JobServices.getAllPostByIds(
      monthlyJobPostIds.slice(0, 50),
    );

    const filteredResult = result.filter((job) => {
      const jobTitle = job.title.toLowerCase();
      return (
        !jobTitle.includes("who wants to be hired") &&
        !jobTitle.includes("ask hn: freelancer? seeking freelancer? ")
      );
    });

    return res.status(200).send({
      success: true,
      data: filteredResult,
    });
  } catch (_err) {
    return res.status(500).send({
      success: false,
      error: {
        message: "Something went wrong while fetching monthly job posts.",
      },
    });
  }
};

export default handler;
