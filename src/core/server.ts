import io from './socket-io';
import app from "./app";

const appPort: number = parseInt(process.env.APP_PORT as string) || 3000;
const socketPort: number = parseInt(process.env.SOCKET_PORT as string) || 8900;

const server = app.listen(appPort, (): void => {
  console.log(`app is running on port ${appPort}`);
});

io.listen(socketPort);

process.on("unhandledRejection", (error: Error) => {
  console.error(`Unhandled Rejection >> error: ${error.name} >> message: ${error.message}`);
  server.close(() => {
    console.error("Shutting down ...");
    process.exit(1);
  });
});

export default server;
