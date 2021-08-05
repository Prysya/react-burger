import { v4 as uuidv4 } from "uuid";
import { ParsedIngredient, IDataObject } from "../../interfaces";

export const parseIngredients = (
  ingredientsArray: Array<string>,
  dataObjectVariant: IDataObject
): ParsedIngredient[] => {
  const ingredientsCount: { [key: string]: number } = ingredientsArray?.reduce(
    (obj: { [key: string]: number }, item) => ({
      ...obj,
      [item]: (obj[item] || 0) + 1,
    }),
    {}
  );

  return [...new Set(ingredientsArray)]?.map((item) => ({
    count:
      dataObjectVariant?.[item]?.type === "bun" ? 2 : ingredientsCount[item],
    image: dataObjectVariant?.[item].image,
    id: uuidv4(),
    itemPrice: dataObjectVariant?.[item].price,
    name: dataObjectVariant?.[item].name,
  }));
};
