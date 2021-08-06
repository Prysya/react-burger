import reducer, { getDataFromApi, initialDataState } from "./";
import { LoadStatuses } from "../../../enums";
import { fakeDataObjectVariant, fakeIngredientsData } from "../../../fixtures";

describe(`Тест extraReducers компонента dataSlice`, () => {
  it("Должен вернуть initialDataState", () =>
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(initialDataState));

  it("Должен вернуть статус Pending при начале запроса", () => {
    expect(
      reducer(initialDataState, {
        type: getDataFromApi.pending,
      })
    ).toEqual(
      expect.objectContaining({
        dataLoading: LoadStatuses.Pending,
        dataError: null,
      })
    );
  });

  it("Должен вернуть данные при успешном запросе", () => {
    expect(
      reducer(
        { ...initialDataState, dataLoading: LoadStatuses.Pending },
        {
          type: getDataFromApi.fulfilled,
          payload: fakeIngredientsData,
        }
      )
    ).toEqual({
      dataLoading: LoadStatuses.Idle,
      dataError: null,
      data: fakeIngredientsData,
      dataObjectVariant: fakeDataObjectVariant,
    });
  });

  it("При успешном вполнении промиса, но данные не массив стейт даных меняться не должен", () => {
    expect(
      reducer(
        { ...initialDataState, dataLoading: LoadStatuses.Pending },
        {
          type: getDataFromApi.fulfilled,
          payload: undefined,
        }
      )
    ).toEqual({
      ...initialDataState,
    });
  });

  it("Должен вернуть пустые данные и текст ошибки при reject", () => {
    const error = "Ошибка при отправке запроса";

    expect(
      reducer(
        { ...initialDataState, dataLoading: LoadStatuses.Pending },
        {
          type: getDataFromApi.rejected,
          error,
        }
      )
    ).toEqual({
      ...initialDataState,
      dataError: error,
    });
  });
});
