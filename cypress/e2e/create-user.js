describe("Sidebar", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Create user", () => {
    cy.get("li").contains("Créer un utilisateur").should("exist").click();
    cy.location("pathname").should("eq", "/createUser");
    cy.get("#lastName").type("Tom");
    cy.get("#firstName").type("tom");
    cy.get("#email").type("tom@tom.fr");
    cy.get("#submitForm").click();
    cy.contains("Utilisateur enregistré avec succès !").should("be.visible");
    cy.location("pathname").should("eq", "/users");
  });
});
