import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";

export const parseIngredients = (ingredientsArray, dataObjectVariant) => {
  const ingredientsCount = ingredientsArray?.reduce((obj, item) => ({
    ...obj,
    [item]: (obj[item] || 0) + 1,
  }), {});

  return [...new Set(ingredientsArray)]?.map((item) => ({
    count: item.type === "bun" ? 2 : ingredientsCount[item],
    image: dataObjectVariant?.[item].image,
    id: generateUniqueID(),
    itemPrice: dataObjectVariant?.[item].price,
    name: dataObjectVariant?.[item].name,
  }));
};
