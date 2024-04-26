import { AuthPanel } from "./index";
import { MemoryRouter } from "react-router-dom";

describe("Authenticate Unit Test", () => {
  beforeEach(() => {});

  it("chage mode to signup and check the all input filed", () => {
    cy.mount(
      <MemoryRouter>
        <AuthPanel />
      </MemoryRouter>
    );
    cy.getByData("signup-handle").click();
    cy.getByData("signup-social").should("exist");
    cy.getByData("signup-firstName").type("1{backspace}");
    cy.getByData("signup-error-firstName").should("contain", "FirstName is required");
    cy.getByData("signup-lastName").type("1{backspace}");
    cy.getByData("signup-error-lastName").should("contain", "LastName is required");
    cy.getByData("signup-username").type("1{backspace}");
    cy.getByData("signup-error-username").should("contain", "Username is required");
    cy.getByData("signup-email").type("gghe.$ik");
    cy.getByData("signup-error-email").should("contain", "Invalid eamil format");
    cy.getByData("signup-password").type("$ik");
    cy.getByData("signup-error-password").should("contain", "Least 4 characters");
    cy.getByData("signup-password").type("3");
    cy.getByData("signup-confirmPassword").type("$ik34");
    cy.getByData("signup-error-confirmPassword").should("contain", "No mached");
  });

  it.only("chage mode to signup and click signup", () => {
    cy.mount(
      <MemoryRouter>
        <AuthPanel />
      </MemoryRouter>
    );
    cy.getByData("signup-handle").click();
    cy.getByData("signup-social").should("exist");
    cy.getByData("signup-button").should("be.disabled");
    cy.getByData("signup-firstName").type("Oliver");
    cy.getByData("signup-lastName").type("Boucher");
    cy.getByData("signup-username").type("Oliver");
    cy.getByData("signup-email").type("henry.campbell.1225@gmail.com");
    cy.getByData("signup-password").type("2037886");
    cy.getByData("signup-confirmPassword").type("2037886");
    cy.getByData("signup-button").click();
  });
});
