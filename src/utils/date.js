import {
  formatDistanceStrict,
  differenceInCalendarDays,
  differenceInCalendarYears,
  differenceInCalendarWeeks,
  format,
} from "date-fns";

const formatDate = (date, formatFig) => {
  date = new Date(date);
  const formattedDate = format(date, formatFig);
  return formattedDate;
};

//seconds ago, minutes ago, hours ago, days ago. More than 7 days then date... JANUARY 22. If other year then year too JANUARY 22, 2020.
export const formatDatePost = (date) => {
  const differenceInYears = differenceInCalendarYears(
    new Date(),
    new Date(date)
  );

  if (differenceInYears > 0) {
    return formatDate(date, "MMMM d, yyyy");
  }

  const differenceInDays = differenceInCalendarDays(new Date(), new Date(date));

  if (differenceInDays > 7) {
    return formatDate(date, "MMMM d");
  }

  const format = formatDistanceStrict(new Date(), new Date(date));

  if (format === "0 seconds") {
    return "Now";
  }

  return format + " ago";
};

//Now 1s 5s 1m 5h, 16h , 2d . 6d... 7d.. 1w, 2w 3w ... 8w ...
export const formatDateComments = (date) => {
  const differenceInDays = differenceInCalendarDays(new Date(), new Date(date));

  if (differenceInDays > 7) {
    return differenceInCalendarWeeks(new Date(), new Date(date)) + "w";
  }

  const format = formatDistanceStrict(new Date(), new Date(date));

  const duration = format.split(" ");

  duration[1] = duration[1].substring(0, 1);

  if (duration[1] === "s") {
    return "Now";
  }

  return duration.join("");
};
