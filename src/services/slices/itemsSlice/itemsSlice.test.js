import reducer, {
  initialItemsState,
  handleBunSelection,
  handleItemAddition,
  setCurrentIngredient,
  calculateFullPrice,
  deleteIngredient,
  deleteAllIngredients,
  handleItemMove,
} from "./";
import { configureStore } from "@reduxjs/toolkit";
import { fakeIngredientsData } from "../../../fixtures";

describe("Тест reducers компонента itemsSlice", () => {
  it("Должен вернуть обьект с данными булки", () => {
    const bun = fakeIngredientsData.find((item) => item.type === "bun");

    expect(reducer(initialItemsState, handleBunSelection(bun))).toEqual(
      expect.objectContaining({ selectedBun: bun })
    );
  });

  it("Должен вернуть массив с добавленным ингредиентом и объект с количеством", () => {
    expect(
      reducer(initialItemsState, handleItemAddition(fakeIngredientsData[1]))
    ).toEqual(
      expect.objectContaining({
        selectedItems: [{ ...fakeIngredientsData[1] }],
        selectedItemsCount: { [fakeIngredientsData[1].name]: 1 },
      })
    );
  });

  it("Должен вернуть массив с добавленными ингредиентами и объект с количеством", () => {
    const store = configureStore({
      reducer: {
        items: reducer,
      },
    });

    store.dispatch(handleItemAddition(fakeIngredientsData[1]));
    store.dispatch(handleItemAddition(fakeIngredientsData[1]));
    store.dispatch(handleItemAddition(fakeIngredientsData[2]));

    const { items } = store.getState();

    expect(items).toEqual(
      expect.objectContaining({
        selectedItems: [
          { ...fakeIngredientsData[1] },
          { ...fakeIngredientsData[1] },
          { ...fakeIngredientsData[2] },
        ],
        selectedItemsCount: {
          [fakeIngredientsData[1].name]: 2,
          [fakeIngredientsData[2].name]: 1,
        },
      })
    );
  });

  it("Должен вернуть обьект с выбраным ингредиентом", () => {
    expect(
      reducer(initialItemsState, setCurrentIngredient(fakeIngredientsData[0]))
    ).toEqual(
      expect.objectContaining({
        currentIngredient: { ...fakeIngredientsData[0] },
      })
    );
  });

  it("Должен вернуть стоимость выбранных ингредиентов", () => {
    const fullPrice =
      fakeIngredientsData[1].price +
      fakeIngredientsData[2].price +
      fakeIngredientsData[3].price;

    expect(
      reducer(
        {
          ...initialItemsState,
          selectedItems: [
            { ...fakeIngredientsData[1] },
            { ...fakeIngredientsData[2] },
            { ...fakeIngredientsData[3] },
          ],
        },
        calculateFullPrice()
      )
    ).toEqual(expect.objectContaining({ fullPrice }));
  });

  it("Должен удалить ингредиент по индексу 1 и вернуть массив из 2х элементов и обьект с уменьшеным количеством", () => {
    expect(
      reducer(
        {
          ...initialItemsState,
          selectedItems: [
            { ...fakeIngredientsData[1] },
            { ...fakeIngredientsData[1] },
            { ...fakeIngredientsData[2] },
            { ...fakeIngredientsData[3] },
          ],
          selectedItemsCount: {
            [fakeIngredientsData[1].name]: 2,
            [fakeIngredientsData[2].name]: 1,
            [fakeIngredientsData[3].name]: 1,
          },
        },
        deleteIngredient({ index: 1, name: fakeIngredientsData[1].name })
      )
    ).toEqual(
      expect.objectContaining({
        selectedItems: [
          { ...fakeIngredientsData[1] },
          { ...fakeIngredientsData[2] },
          { ...fakeIngredientsData[3] },
        ],
        selectedItemsCount: {
          [fakeIngredientsData[1].name]: 1,
          [fakeIngredientsData[2].name]: 1,
          [fakeIngredientsData[3].name]: 1,
        },
      })
    );
  });

  it("Должен очистить ингредиенты, количество ингредиентов и выбранную булку", () => {
    expect(
      reducer(
        {
          ...initialItemsState,
          selectedBun: {
            ...fakeIngredientsData[1],
          },
          selectedItems: [
            { ...fakeIngredientsData[1] },
            { ...fakeIngredientsData[1] },
            { ...fakeIngredientsData[2] },
            { ...fakeIngredientsData[3] },
          ],
          selectedItemsCount: {
            [fakeIngredientsData[1].name]: 2,
            [fakeIngredientsData[2].name]: 1,
            [fakeIngredientsData[3].name]: 1,
          },
        },
        deleteAllIngredients()
      )
    ).toEqual(
      expect.objectContaining({
        selectedBun: {},
        selectedItems: [],
        selectedItemsCount: {},
      })
    );
  });

  it("Должен поменять местами ингредиенты 1 и 2", () => {
    expect(
      reducer(
        {
          ...initialItemsState,
          selectedItems: [
            { ...fakeIngredientsData[1] },
            { ...fakeIngredientsData[2] },
            { ...fakeIngredientsData[3] },
          ],
        },
        handleItemMove({ dragIndex: 1 })
      )
    ).toEqual(
      expect.objectContaining({
        selectedItems: [
          { ...fakeIngredientsData[2] },
          { ...fakeIngredientsData[1] },
          { ...fakeIngredientsData[3] },
        ],
      })
    );
  });
});
