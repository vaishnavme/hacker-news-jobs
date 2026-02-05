import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const username = "whoishiring";
// https://hacker-news.firebaseio.com/v0/user/

const MonthlyHiring = (props) => {
  const feedData = useQuery({
    queryKey: ["monthly-hiring-data"],
    queryFn: async () => {
      const response = await axios.get(
        `https://hacker-news.firebaseio.com/v0/user/${username}.json`,
      );
      const storyIds = response.data.submitted;

      // const story =
      console.log(response.data);
      return;
    },
  });

  return <div>Monthly Hiring Component</div>;
};

export default MonthlyHiring;
