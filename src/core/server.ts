import app from "./app";

const port: number = parseInt(process.env.PORT as string) || 3000;

const server = app.listen(port, (): void => {
  console.log(`app is running on port ${port}`);
});

process.on('unhandledRejection', (error: Error) => {
  console.error(`Unhandled Rejection >> error: ${error.name} \n message: ${error.message}`);
  server.close(() => {
    console.error('Shutting down ...');
    process.exit(1);
  })
})

export default server;