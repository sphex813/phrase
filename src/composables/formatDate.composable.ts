import dayjs from "dayjs";

export const useFormatDate = () => {
  const formatDate = (date: Date | undefined): string => {
    if (!date) {
      return "";
    }
    return dayjs(date).format("DD.MM.YYYY HH:mm").toString();
  };

  return { formatDate };
};
