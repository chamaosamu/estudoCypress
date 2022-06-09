describe("login e registro de usuários alura pic", () => {
  beforeEach(() => {
    cy.visit("https://alura-fotos.herokuapp.com");
  });

  it("verifica mensagens validação", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Email is required").should("be.visible");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "User name is required").should("be.visible");
    cy.contains("ap-vmessage", "Password is required").should("be.visible");
    cy.contains("ap-vmessage", "Full name is required").should("be.visible");
  });

  it("verifica mensagem de email invalido", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.get('input[formcontrolname="email"]').type("jacqueline");
    cy.contains("ap-vmessage", "Invalid e-mail").should("be.visible");
  });

  it("verifica mensagem de senha com menos de 8 caracteres", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.get('input[formcontrolname="password"]').type("123");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Mininum length is 8").should("be.visible");
  });

  it("verifica mensagem de letra maiuscula no user name", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.get('input[formcontrolname="userName"]').type("Samuel");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Must be lower case").should("be.visible");
  });

  it("verifica mensagem de minimo de letras no full name", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.get('input[formcontrolname="fullName"]').type("S");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Mininum length is 2").should("be.visible");
  });

  it("fazer login de usuario valido", () => {
    cy.login("flavio", "123");
    cy.contains("a", "(Logout)").should("be.visible");
  });

  it("fazer login de usuario invalido", () => {
    cy.login("jacqueline", "1234");
    cy.on("windows:alert", (str) => {
      expect(str).to.equal("Invalid user name or password");
    });
  });

  const usuarios = require("../../fixtures/usuarios.json");
  usuarios.forEach((usuario) => {
    it.only(`registra novo usuario ${usuario.userName}`, () => {
      cy.contains("a", "Register now").click();
      cy.contains("button", "Register").click();
      cy.get('input[formcontrolname="email"]').type(usuario.email);
      cy.get('input[formcontrolname="fullName"]').type(usuario.fullName);
      cy.get('input[formcontrolname="userName"]').type(usuario.userName);
      cy.get('input[formcontrolname="password"]').type(usuario.password);
      cy.get('input[formcontrolname="email"]').type(
        "jacqueline.oliveira@alura.com.br"
      );
      cy.contains("button", "Register").click();
    });
  });
});
