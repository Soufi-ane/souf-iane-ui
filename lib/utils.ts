export const isLeap = (year: number): boolean => {
  if (year % 4 == 0) {
    console.log("By 4 : true");
    if (year % 100 == 0) {
      console.log("By 100 : true");
      if (year % 400 == 0) {
        console.log("By 400n: true");
        return true;
      }
      return false;
    }
    return true;
  }
  return false;
};

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const allDays = Array.from({ length: 31 }, (_, index) => index + 1);

export const formatDayOrMonth = (DoM: number): string => {
  let result = DoM.toString();
  if (DoM == 0) result = `01`;
  else if (DoM < 10) result = `0${DoM}`;
  return result;
};
