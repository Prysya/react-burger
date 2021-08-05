import reducer, { setUserData, initialAuthState } from "./index";

describe("Тест reducers компонента authSlice", () => {
  it("Должен вернуть имя, email и авторизацию", () => {
    expect(
      reducer(initialAuthState, {
        type: setUserData.type,
        payload: {
          user: { email: "test@test.ru", name: "testName" },
          success: true,
        },
      })
    ).toEqual(
      expect.objectContaining({
        userEmail: "test@test.ru",
        userName: "testName",
        isAuthenticated: true,
      })
    );
  });
});
