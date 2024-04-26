import { authMachine } from "@machines/authMachine";
import { AuthPanel } from "./index";
import { MemoryRouter } from "react-router-dom";
import { createActor } from "xstate";

describe("Authenticate Unit Test", () => {
  let authService;

  beforeEach(() => {
    authService = createActor(authMachine);
    authService.start();

    expect(authService.getSnapshot().value).equal("unauthorized");
    cy.intercept("POST", "http://localhost:4001/login", {
      user: {
        username: "Katharina_Bernier",
        password: "$2a$10$5PXHGtcsckWtAprT5/JmluhR13f16BL8SIGhvAKNP.Dhxkt69FfzW",
      },
    }).as("loginPost");
  });

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

  it("chage mode to signup and click signup", () => {
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

    // cy.wait("@signup");
  });

  it.only("check the signin panel filds", () => {
    cy.mount(
      <MemoryRouter>
        <AuthPanel />
      </MemoryRouter>
    );
    cy.getByData("signin-social").should("exist");
    cy.getByData("signin-username").type("1{backspace}");
    cy.getByData("signin-error-username").should("contain", "Username is required");
    cy.getByData("signin-password").type("203");
    cy.getByData("signin-error-password").should("contain", "Least 4 characters");
    cy.getByData("signin-button").should("be.disabled");
    cy.getByData("signin-username").type("Oliver");
    cy.getByData("signin-password").type("7886");
    cy.getByData("signin-button").should("be.enabled");
    cy.getByData("signin-button").click();

    // cy.wait("@loginPost");
  });
});
