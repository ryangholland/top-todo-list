import { isToday, isTomorrow, isPast } from "date-fns";

function getAdjustedDate(date) {
  if (!date) return;
  let adjustedDate = new Date(date);
  adjustedDate.setMinutes(
    adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset()
  );

  if (isToday(adjustedDate)) {
    return "Today";
  } else if (isTomorrow(adjustedDate)) {
    return "Tomorrow";
  } else if (isPast(adjustedDate)) {
    return "Past Due";
  } else {
    return date;
  }
}

export { getAdjustedDate };
