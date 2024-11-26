import { createServer } from "http";
const PORT = process.env.PORT;

const users = [
  {
    id: 1,
    name: "Talha ÖZBEK",
  },
  {
    id: 2,
    name: "T",
  },
];

// logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// Json middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};

// Route handler for GET /api/users
const getUserHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};

// Route handler for GET /api/users/:id
const getUserByeIdHandler = (req, res) => {
  const id = req.url.split("/")[3];
  const user = users.find((user) => user.id === parseInt(id));
  if (user) {
    res.write(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "User not found" }));
  }
  res.end();
};

// Route Handler for POST /api/users
const createUserHandle = (req, res) => {
  let body = "";
  // Listen for data
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const newUser = JSON.parse(body);
    users.push(newUser);
    res.statusCode = 201;
    res.write(JSON.stringify(newUser));
    res.end();
  });
};

// Not Found handler
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: "Route not found" }));
  res.end();
};

const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.method === "GET" && req.url === "/api/users")
        getUserHandler(req, res);
      else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET")
        getUserByeIdHandler(req, res);
      else if (req.method === "POST" && req.url === "/api/users")
        createUserHandle(req, res);
      else notFoundHandler(req, res);
    });
  });
});

// First Code
// const server = createServer((req, res) => {
//   if (req.method === "GET" && req.url === "/api/users") {
//     res.setHeader("Content-Type", "application/json");
//     res.write(JSON.stringify(users));
//     res.end();
//   } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
//     const id = req.url.split("/")[3];
//     const user = users.find((user) => user.id === parseInt(id));
//     if (user) {
//       res.setHeader("Content-Type", "application/json");
//       res.write(JSON.stringify(user));
//       res.end();
//     } else {
//       res.setHeader("Content-Type", "application/json");
//       res.statusCode = 404;
//       res.write(JSON.stringify({ message: "User not found" }));
//       res.end();
//     }
//   } else {
//     res.setHeader("Content-Type", "application/json");
//     res.statusCode = 404;
//     res.write(JSON.stringify({ message: "Route not found" }));
//     res.end();
//   }
// });

server.listen(PORT, () => {
  console.log(`Server 2 running port ${PORT}`);
});
