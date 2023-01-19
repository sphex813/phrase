import dayjs from "dayjs";

export const useFormatDate = () => {
  const formatDate = (date: Date): string => {
    return dayjs(date).format("DD.MM.YYYY HH:mm").toString();
  };

  return { formatDate };
};
