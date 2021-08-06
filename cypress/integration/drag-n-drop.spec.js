describe("D & D test", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:3000");
  });

  it("Должен взять булку и дропнуть ее на burgerContainer", () => {
    cy.get("[class^=IngredientCard]").first().trigger("dragstart");
    cy.get("[class^=BurgerConstructor]")
      .first()
      .trigger("dragenter")
      .trigger("drop");
  });

  it("Должен взять ингредиент и дропнуть его на burgerContainer", () => {
    cy.get("[class^=IngredientCard]").last().trigger("dragstart");
    cy.get("[class^=BurgerConstructor]")
      .first()
      .trigger("dragenter")
      .trigger("drop");
  });

  it("Конструктор должен содержать 2 булки и 1 ингредиента", () => {
    cy.get("[class^=BurgerElement_container]").should("have.length", 3);
  });
});
