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
        handleOrderSelection({
          // @ts-ignore
          ingredients: ["123", "123"],
          _id: "test",
          status: "test",
          number: 1,
          createdAt: "123",
          updatedAt: "123",
        })
      )
    ).toEqual(
      expect.objectContaining({
        selectedOrder: {
          ingredients: ["123", "123"],
          _id: "test",
          status: "test",
          number: 1,
          createdAt: "123",
          updatedAt: "123",
        },
      })
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
        wsConnectionClosed({ code: 123, reason: "test", wasClean: true })
      )
    ).toEqual(
      expect.objectContaining({
        wsConnected: false,
        wsClose: { code: 123, reason: "test", wasClean: true },
      })
    );
  });

  it("Должен вернуть wsAuthClose с ошибкой и wsConnected в значении false", () => {
    expect(
      reducer(
        { ...initialOrdersState, wsAuthConnected: true },
        wsAuthConnectionClosed({ code: 123, reason: "test", wasClean: true })
      )
    ).toEqual(
      expect.objectContaining({
        wsAuthConnected: false,
        wsClose: { code: 123, reason: "test", wasClean: true },
      })
    );
  });

  it("wsGetMessage должен вернуть массив полученых заказов, количество заказов за день и за все время", () => {
    const orders = [
      {
        ingredients: ["123", "123"],
        _id: "test",
        status: "test",
        number: 1,
        createdAt: "123",
        updatedAt: "123",
        name: "123",
      },
      {
        ingredients: ["123", "123"],
        _id: "test",
        status: "test",
        number: 1,
        createdAt: "123",
        name: "123",
        updatedAt: "123",
      },
      {
        ingredients: ["123", "123"],
        _id: "test",
        status: "test",
        number: 1,
        createdAt: "123",
        name: "123",
        updatedAt: "123",
      },
    ];

    expect(
      reducer(
        { ...initialOrdersState, wsAuthConnected: true },
        wsGetMessage({ orders, total: 123, totalToday: 321 })
      )
    ).toEqual(expect.objectContaining({ orders, total: 123, totalToday: 321 }));
  });

  it("wsGetMessage не должен менять стейт если заказы не массив, а количество заказов не цифра", () => {
    expect(
      reducer(
        initialOrdersState,
        wsGetMessage({
          orders:
            {
              // @ts-ignore
              name: "123",
              ingredients: ["123", "123"],
              _id: "test",
              status: "test",
              number: 1,
              createdAt: "123",
              updatedAt: "123",
            },

          // @ts-ignore
          total: "123",
          // @ts-ignore
          totalToday: "321",
        })
      )
    ).toEqual(initialOrdersState);
  });

  it("wsAuthGetMessage должен вернуть массив текущих заказов пользователя", () => {
    const orders = [
      {
        ingredients: ["123", "123"],
        _id: "test",
        status: "test",
        number: 1,
        createdAt: "123",
        updatedAt: "123",
        name: "123",
      },
      {
        ingredients: ["123", "123"],
        _id: "test",
        status: "test",
        number: 1,
        createdAt: "123",
        updatedAt: "123",
        name: "123",
      },
      {
        ingredients: ["123", "123"],
        _id: "test",
        status: "test",
        number: 1,
        createdAt: "123",
        updatedAt: "123",
        name: "123",
      },
    ];

    expect(
      reducer(
        { ...initialOrdersState, wsAuthConnected: true },
        wsAuthGetMessage({ orders: orders, total: 123, totalToday: 321 })
      )
    ).toEqual(expect.objectContaining({ currentUserOrders: orders }));
  });
});
