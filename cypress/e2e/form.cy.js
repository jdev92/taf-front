describe("Affichage des messages d'erreur", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Message d'erreur", () => {
    cy.get("li").contains("Créer un utilisateur").should("exist").click();
    cy.get("#submitForm").click();
    cy.contains("Veuillez renseigner votre Nom").should("be.visible");
    cy.contains("Veuillez renseigner votre Prénom").should("be.visible");
    cy.contains("Veuillez renseigner votre email").should("be.visible");
  });

  it("Message d'erreur pour le lastName", () => {
    cy.get("li").contains("Créer un utilisateur").should("exist").click();
    cy.get("#lastName").clear();
    cy.get("#firstName").type("a");
    cy.get("#email").type("tom@tom.fr");
    cy.get("#submitForm").click();
    cy.contains("Veuillez renseigner votre Nom").should("be.visible");
  });

  it("Message d'erreur pour le firstname", () => {
    cy.get("li").contains("Créer un utilisateur").should("exist").click();
    cy.get("#lastName").type("a");
    cy.get("#firstName").clear();
    cy.get("#email").type("tom@tom.fr");
    cy.get("#submitForm").click();
    cy.contains("Veuillez renseigner votre Prénom").should("be.visible");
  });

  it("Message d'erreur pour l'email", () => {
    cy.get("li").contains("Créer un utilisateur").should("exist").click();
    cy.get("#lastName").type("a");
    cy.get("#firstName").type("a");
    cy.get("#email").clear();
    cy.get("#submitForm").click();
    cy.contains("Veuillez renseigner votre email").should("be.visible");
  });

  it("Message d'erreur pour un email non valide", () => {
    cy.get("li").contains("Créer un utilisateur").should("exist").click();
    cy.get("#lastName").type("a");
    cy.get("#firstName").type("a");
    cy.get("#email").type("a");
    cy.get("#submitForm").click();
    cy.contains("Email non valide !").should("be.visible");
  });
});
