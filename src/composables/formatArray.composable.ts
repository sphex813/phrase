export const useFormatArray = () => {
  const formatArray = (arrary: string[]): string => {
    return arrary.join(", ");
  };

  return { formatArray };
};
