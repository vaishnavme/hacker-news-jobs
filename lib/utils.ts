import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getYearOptions = (startYear: number): number[] => {
  const currentYear = startYear;
  const years: number[] = [];
  for (let year = currentYear; year >= currentYear - 10; year--) {
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
