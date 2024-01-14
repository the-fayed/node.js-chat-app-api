import app from "./app";

const port: number = parseInt(process.env.PORT) || 3000;

const server = app.listen(port, (): void => {
  console.log(`app is running on port ${port}`);
});

process.on("unhandledRejection", (error: Error): void => {
  console.error(`Unhandled Rejection \n Error: ${error.name} \n Message: ${error.message}`);
  server.close(() => {
    console.log("Shutting down ...");
    process.exit(1);
  });
});
