import reducer, { getDataFromApi, initialDataState } from "./";
import { LOAD_STATUSES } from "../../../constants";
import { fakeDataObjectVariant, fakeIngredientsData } from "../../../fixtures";

describe(`Тест extraReducers компонента dataSlice`, () => {
  it("Должен вернуть initialDataState", () =>
    expect(reducer(undefined, {})).toEqual(initialDataState));

  it("Должен вернуть статус PENDING при начале запроса", () => {
    expect(
      reducer(initialDataState, {
        type: getDataFromApi.pending,
      })
    ).toEqual(
      expect.objectContaining({
        dataLoading: LOAD_STATUSES.PENDING,
        dataError: null,
      })
    );
  });

  it("Должен вернуть данные при успешном запросе", () => {
    expect(
      reducer(
        { ...initialDataState, dataLoading: LOAD_STATUSES.PENDING },
        {
          type: getDataFromApi.fulfilled,
          payload: fakeIngredientsData,
        }
      )
    ).toEqual({
      dataLoading: LOAD_STATUSES.IDLE,
      dataError: null,
      data: fakeIngredientsData,
      dataObjectVariant: fakeDataObjectVariant,
    });
  });

  it("При успешном вполнении промиса, но данные не массив стейт даных меняться не должен", () => {
    expect(
      reducer(
        { ...initialDataState, dataLoading: LOAD_STATUSES.PENDING },
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
        { ...initialDataState, dataLoading: LOAD_STATUSES.PENDING },
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
