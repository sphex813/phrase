export const useMostFrequent = () => {
  const mostFrequent = (array: string[] | undefined) => {
    if (!array || array.length == 0) {
      return null;
    }
    let occurences: { [key: string]: number } = {};
    let mostFrequent: string = array[0],
      maxCount: number = 1;
    for (let i = 0; i < array.length; i++) {
      let element = array[i];
      if (occurences[element] == null) {
        occurences[element] = 1;
      } else {
        occurences[element]++;
      }
      if (occurences[element] > maxCount) {
        mostFrequent = element;
        maxCount = occurences[element];
      }
    }
    return mostFrequent;
  };

  return { mostFrequent };
};
