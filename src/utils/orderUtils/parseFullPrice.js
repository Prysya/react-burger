export const parseFullPrice = (ingredientsArray, dataObject) =>
  ingredientsArray?.length > 0
    ? ingredientsArray.reduce((acc, item) => acc + dataObject?.[item].price, 0)
    : 0;
