const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "/public")));

io.on("connection", function (socket) {
    // Gérer la connexion d'un nouvel utilisateur
    socket.on("newuser", function (username) {
        socket.broadcast.emit("update", `${username} joined the conversation`);
    });

    // Gérer la déconnexion d'un utilisateur
    socket.on("exituser", function (username) {
        socket.broadcast.emit("update", `${username} left the conversation`);
    });

    // Gérer les messages du chat
    socket.on("chat", function (message) {
        socket.broadcast.emit("chat", message);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
