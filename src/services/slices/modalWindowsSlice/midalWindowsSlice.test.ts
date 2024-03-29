import reducer, {
  handleOpenIngredientDetailsModal,
  handleCloseIngredientDetailsModal,
  handleOpenOrderDetailsModal,
  handleCloseOrderDetailsModal,
  handleWaitingOrderNumber,
  handleOpenFeedInfoModal,
  handleCloseFeedInfoModal,
  initialModalsState,
} from "./";
import { LoadStatuses } from "../../../enums";

describe("Тест открытия и закрытия модального окна ингредиентов", () => {
  it("Должен вернуть true в стейте окна ингредиентов", () => {
    expect(
      reducer(initialModalsState, handleOpenIngredientDetailsModal())
    ).toEqual(
      expect.objectContaining({ isIngredientDetailsModalIsOpen: true })
    );
  });
  it("Должен вернуть false в стейте окна ингредиентов", () => {
    expect(
      reducer(
        { ...initialModalsState, isIngredientDetailsModalIsOpen: true },
        handleCloseIngredientDetailsModal
      )
    ).toEqual(
      expect.objectContaining({ isIngredientDetailsModalIsOpen: false })
    );
  });
});

describe("Тест открытия и закрытия модального окна заказов", () => {
  it("Должен вернуть true в стейте окна ингредиентов", () => {
    expect(reducer(initialModalsState, handleOpenFeedInfoModal())).toEqual(
      expect.objectContaining({ isFeedInfoModalIsOpen: true })
    );
  });
  it("Должен вернуть false в стейте окна ингредиентов", () => {
    expect(
      reducer(
        { ...initialModalsState, isFeedInfoModalIsOpen: true },
        handleCloseFeedInfoModal
      )
    ).toEqual(expect.objectContaining({ isFeedInfoModalIsOpen: false }));
  });
});

describe("Тест открытия и закрытия модального окна номера заказа", () => {
  it("Должен вернуть статус Pending, стейты orderNumberWaitAuth и isOrderButtonDisabled со значением true", () => {
    expect(
      reducer(initialModalsState, { type: handleOpenOrderDetailsModal.pending })
    ).toEqual(
      expect.objectContaining({
        orderNumberWaitAuth: true,
        isOrderButtonDisabled: true,
        orderNumberLoading: LoadStatuses.Pending,
      })
    );
  });

  it("Должен вернуть вернуть статус Idle, номер заказа, разблокировать кнопку и открыть модальное окно при fulfilled", () => {
    expect(
      reducer(
        { ...initialModalsState, orderNumberLoading: LoadStatuses.Pending },
        { type: handleOpenOrderDetailsModal.fulfilled, payload: 12345 }
      )
    ).toEqual(
      expect.objectContaining({
        orderNumberLoading: LoadStatuses.Idle,
        orderNumber: 12345,
        isOrderButtonDisabled: false,
        isOrderDetailsModalIsOpen: true,
        orderNumberWaitAuth: false,
      })
    );
  });

  it("Должен вернуть вернуть статус Idle, ошибку и разблокаровать кнопку при rejected", () => {
    expect(
      reducer(
        { ...initialModalsState, orderNumberLoading: LoadStatuses.Pending },
        { type: handleOpenOrderDetailsModal.rejected, error: "Ошибка запроса" }
      )
    ).toEqual(
      expect.objectContaining({
        orderNumberLoading: LoadStatuses.Idle,
        orderNumberError: "Ошибка запроса",
        isOrderButtonDisabled: false,
        orderNumberWaitAuth: false,
      })
    );
  });

  it("Должен закрыть модальное окно с номером заказа", () => {
    expect(
      reducer(
        { ...initialModalsState, isOrderDetailsModalIsOpen: true },
        handleCloseOrderDetailsModal()
      )
    ).toEqual(
      expect.objectContaining({
        isOrderDetailsModalIsOpen: false,
      })
    );
  });

  it("Должен вернуть значение true стейта ожидания номера заказа", () => {
    expect(
      reducer({ ...initialModalsState }, handleWaitingOrderNumber())
    ).toEqual(
      expect.objectContaining({
        orderNumberWaitAuth: true,
      })
    );
  });
});
