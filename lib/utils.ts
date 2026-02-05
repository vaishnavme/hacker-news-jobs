import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getYearOptions = (startYear: number): number[] => {
  const currentYear = startYear;
  const years: number[] = [];
  for (let year = currentYear; year >= 2006; year--) {
    years.push(year);
  }
  return years;
};

export const getMonthOptions = (): Array<{ label: string; value: number }> => {
  const months = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];
  return months;
};

export const formatUnixDate = (unixTime: number): string => {
  const date = new Date(unixTime * 1000);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const getHackerNewsItemUrl = (id: number): string =>
  `https://news.ycombinator.com/item?id=${id}`;

export const getHNTimeRange = (year?: number, month?: number) => {
  const yearNum = year ?? new Date().getUTCFullYear();

  if (month !== undefined) {
    if (month < 1 || month > 12) {
      throw new Error("month must be between 1 and 12");
    }

    const start = Math.floor(Date.UTC(yearNum, month - 1, 1, 0, 0, 0) / 1000);
    const end = Math.floor(Date.UTC(yearNum, month, 1, 0, 0, 0) / 1000);

    return { start, end, year: yearNum, month };
  }

  const start = Math.floor(Date.UTC(yearNum, 0, 1, 0, 0, 0) / 1000);
  const end = Math.floor(Date.UTC(yearNum + 1, 0, 1, 0, 0, 0) / 1000);

  return { start, end, year: yearNum };
};
