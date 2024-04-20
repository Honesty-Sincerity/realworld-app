import { mount } from "cypress/react18";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
