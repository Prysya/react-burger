import { IDataObject } from "../../interfaces";

export const parseFullPrice = (
  ingredientsArray: string[],
  dataObject: IDataObject
) =>
  ingredientsArray?.length > 0
    ? ingredientsArray.reduce((acc, item) => acc + dataObject?.[item].price, 0)
    : 0;
