import { OnlineUserModel as OnlineUser } from '../modules/online-users/online-user.model';
import io from './socket-io';
import app from "./app";

const appPort: number = parseInt(process.env.APP_PORT as string) || 3000;

const server = app.listen(appPort, (): void => {
  console.log(`app is running on port ${appPort}`);
});

io.listen(server)

process.on("unhandledRejection", (error: Error) => {
  console.error(`Unhandled Rejection >> error: ${error.name} >> message: ${error.message}`);
  server.close(async () => {
    console.error("Shutting down ...");
    await OnlineUser.deleteMany();
    process.exit(1);
  });
});

export default server;
