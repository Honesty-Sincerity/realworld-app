import { MemoryRouter } from "react-router-dom";
import { SignInForm } from "./SignInForm";
import { createActor } from "xstate";
import { authMachine } from "@machines/authMachine";

describe("SignInForm", () => {
  let authService;
  beforeEach(() => {
    authService = createActor(authMachine);
    authService.start();
    expect(authService.getSnapshot().value).equal("unauthorized");

    cy.intercept("POST", "http://localhost:3001/login", {
      user: {
        id: "t45AiwidW",
        uuid: "6383f84e-b511-44c5-a835-3ece1d781fa8",
        firstName: "Edgar",
        lastName: "Johns",
        username: "Katharina_Bernier",
        password: "$2a$10$5PXHGtcsckWtAprT5/JmluhR13f16BL8SIGhvAKNP.Dhxkt69FfzW",
        email: "Norene39@yahoo.com",
        phoneNumber: "625-316-9882",
        avatar: "https://cypress-realworld-app-svgs.s3.amazonaws.com/t45AiwidW.svg",
        defaultPrivacyLevel: "public",
        balance: 168137,
        createdAt: "2019-08-27T23:47:05.637Z",
        modifiedAt: "2020-05-21T11:02:22.857Z",
      },
    }).as("loginPost");
  });

  it("submits the username and password to the backend", () => {
    cy.mount(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );
    cy.getByData("signin-username").type("Katharina_Bernier");
    cy.getByData("signin-signin-password").type("s3cret");
    cy.getByData("signin-submit]").click(); //.should("be.disabled");

    cy.wait("@loginPost");

    cy.get("signin-error").should("not.exist");
  });
});
