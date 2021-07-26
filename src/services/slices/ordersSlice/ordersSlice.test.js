import reducer, {
  initialOrdersState,
  handleOrderSelection,
  wsConnectionSuccess,
  wsAuthConnectionSuccess,
  wsConnectionError,
  wsAuthConnectionError,
  wsConnectionClosed,
  wsAuthConnectionClosed,
  wsGetMessage,
  wsAuthGetMessage,
} from "./";

describe("Тест добавления выбранного заказа в стейт", () => {
  it("Должен вернуть обьект с выбранным элементом", () => {
    expect(
      reducer(
        initialOrdersState,
        handleOrderSelection({ item: "test", id: "test" })
      )
    ).toEqual(
      expect.objectContaining({ selectedOrder: { item: "test", id: "test" } })
    );
  });

  it("Не должен изменять значение если в payload массив", () => {
    expect(
      reducer(initialOrdersState, handleOrderSelection([1, 2, 3]))
    ).toEqual(expect.objectContaining(initialOrdersState));
  });

  it("Не должен изменять значение если в payload строка", () => {
    expect(reducer(initialOrdersState, handleOrderSelection("Test"))).toEqual(
      expect.objectContaining(initialOrdersState)
    );
  });
});

describe("Тест стейтов сокета", () => {
  it("Должен вернуть wsConnected в значении true", () => {
    expect(reducer(initialOrdersState, wsConnectionSuccess())).toEqual(
      expect.objectContaining({ wsConnected: true })
    );
  });

  it("Должен вернуть wsAuthConnected в значении true", () => {
    expect(reducer(initialOrdersState, wsAuthConnectionSuccess())).toEqual(
      expect.objectContaining({ wsAuthConnected: true })
    );
  });

  it("Должен вернуть wsError с ошибкой и wsConnected в значении false", () => {
    expect(
      reducer(
        { ...initialOrdersState, wsConnected: true },
        wsConnectionError("Ошибка сокета")
      )
    ).toEqual(
      expect.objectContaining({ wsConnected: false, wsError: "Ошибка сокета" })
    );
  });

  it("Должен вернуть wsError с ошибкой и wsAuthConnected в значении false", () => {
    expect(
      reducer(
        { ...initialOrdersState, wsAuthConnected: true },
        wsAuthConnectionError("Ошибка сокета")
      )
    ).toEqual(
      expect.objectContaining({
        wsAuthConnected: false,
        wsError: "Ошибка сокета",
      })
    );
  });

  it("Должен вернуть wsClose с ошибкой и wsConnected в значении false", () => {
    expect(
      reducer(
        { ...initialOrdersState, wsConnected: true },
        wsConnectionClosed("Ошибка сокета")
      )
    ).toEqual(
      expect.objectContaining({ wsConnected: false, wsClose: "Ошибка сокета" })
    );
  });

  it("Должен вернуть wsAuthClose с ошибкой и wsConnected в значении false", () => {
    expect(
      reducer(
        { ...initialOrdersState, wsAuthConnected: true },
        wsAuthConnectionClosed("Ошибка сокета")
      )
    ).toEqual(
      expect.objectContaining({
        wsAuthConnected: false,
        wsClose: "Ошибка сокета",
      })
    );
  });

  it("wsGetMessage должен вернуть массив полученых заказов, количество заказов за день и за все время", () => {
    const orders = [{ order: 1 }, { order: 2 }, { order: 3 }];

    expect(
      reducer(
        { ...initialOrdersState, wsAuthConnected: true },
        wsGetMessage({ orders, total: 123, totalToday: 321 })
      )
    ).toEqual(expect.objectContaining({ orders, total: 123, totalToday: 321 }));
  });

  it("wsGetMessage не должен менять стейт если заказы не массив, а количество заказов не цифра", () => {
    const orders = 123;

    expect(
      reducer(
        initialOrdersState,
        wsGetMessage({ orders, total: "123", totalToday: "321" })
      )
    ).toEqual(initialOrdersState);
  });

  it("wsAuthGetMessage должен вернуть массив текущих заказов пользователя", () => {
    const orders = [{ order: 1 }, { order: 2 }, { order: 3 }];

    expect(
      reducer(
        { ...initialOrdersState, wsAuthConnected: true },
        wsAuthGetMessage({ orders })
      )
    ).toEqual(expect.objectContaining({ currentUserOrders: orders }));
  });

  it("wsAuthGetMessage не должен менять стейт если в payload не массив", () => {
    const orders = "123";

    expect(
      reducer(
        initialOrdersState,
        wsAuthGetMessage({ orders })
      )
    ).toEqual(initialOrdersState);
  });
});
