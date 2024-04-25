import chalk from "chalk";
import detect from "detect-port";

export const frontendPort = process.env.PORT;
export const backendPort = import.meta.env.VITE_BACKEND_PORT;
// export const backendPort = process.env.BACKEND_PORT;

export const getBackendPort = async () => {
  return detect(Number(backendPort))
    .then((_port) => {
      if (Number(backendPort) === _port) {
        console.log(chalk.green(`Backend server running at http://localhost:${backendPort}`));
        return Number(backendPort);
      }

      console.log(
        chalk.red(
          `Failed to start the backend server on port ${backendPort}. \nStarting the backend server on port ${_port}. \nPlease update VITE_BACKEND_PORT in the .env file and 'apiUrl' in cypress.json to ${_port}.`
        )
      );
      return _port;
    })
    .catch((err) => {
      console.log(chalk.red(err));
    });
};
