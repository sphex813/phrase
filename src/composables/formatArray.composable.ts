export const useFormatArray = () => {
  const formatArray = (array: string[] | undefined, breakAfter = 0): string => {
    let result = "";

    array?.forEach((value, index) => {
      result += value;

      if (index === array.length - 1) {
        return result;
      }

      result += ", ";
      if (breakAfter > 0 && (index + 1) % breakAfter === 0) {
        result += "\n";
      }
    });

    return result;
  };

  return { formatArray };
};
