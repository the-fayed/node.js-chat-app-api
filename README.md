# REST Real-Time Chat API

## Description

Self-training RESTful back-end project for understanding Socket.io concepts.

## Key Features

  1- Authentication system

  2- Authorization system

  3- User management

  4- Friends management

  5- Conversations management

  6- Real-time messaging

  7- Messages management

## Installation

First, clone the repo to your local repo

```bash
git clone https://github.com/the-fayed/node.js-chat-app-api.git
```

Then, run ``` npm install ``` to install dependencies.

Finally, create .env file in project's root directory and specify the environment variables as:

```env
# APP_SETTING
BASEURL = "http://localhost:3000"
NODE_ENV = "Development"
APP_PORT = "3000"
SOCKET_PORT = "8900"

# MONGO
MONGO_URI =

# JWT
JWT_SECRET =
JWT_EXPIRE =

# CLOUDINARY
CLOUDINARY_CLOUD_NAME =
CLOUDINARY_API_KEY =
CLOUDINARY_API_SECRET =
```

## Running the app

  1- To run the app in development environment run:
  ``` npm run start:dev ```

  2- To run the app in production environment run:
  ``` npm run start:prod ```

## End Points

After running the app on any environment(e.g. development)

visit: `/api/docs` endpoint from full documentation with swagger.

### Socket.io Events

| Event Name     | Payload                           | Description                      |
| -------------- | --------------------------------- | -------------------------------- |
| connection     | userId                            | Connect to socket io server      |
| sendMessage    | { senderId, receiverId, content } | Add a new post                   |
| getMessage     | null                              | get message from socket          |
| getOnlineUsers | null                              | Get all online users             |
| disconnect     | null                              | disconnect from socket io server |

> *note that all ids sent on payload are the database id of each user*

## License

MIT License
