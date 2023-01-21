export const useFormatArray = () => {
  const formatArray = (arrary: string[] | undefined): string => {
    return arrary?.join(", ") ?? "";
  };

  return { formatArray };
};
