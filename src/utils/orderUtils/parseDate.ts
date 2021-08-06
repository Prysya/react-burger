import moment from "moment";

export const parseDate = (updatedAt: string): string => {
  const time = moment(updatedAt)?.locale("ru");

  return `${time.fromNow()}, ${time.format("LTS")}, i-GMT+3`;
};
