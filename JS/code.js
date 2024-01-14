(function () {
    const app = document.querySelector(".app");
    const socket = io();
    let username;

    app.querySelector(".join-screen #join-user").addEventListener("click", function () {
        username = app.querySelector(".join-screen #username").value;
        if (username.length === 0) {
            return;
        }
        socket.emit("newuser", username);
        app.querySelector(".join-screen").classList.remove("active");
    });

    app.querySelector(".zone_de_chat #envoyer-message").addEventListener("click", function () {
        const message = app.querySelector(".zone_de_chat #chat-input").value;
        if (message.length === 0) {
            return;
        }
        socket.emit("chat", { username, text: message });
        renderMessage("my", { username, text: message });
        app.querySelector(".zone_de_chat #chat-input").value = "";
    });

    socket.on("chat", function (message) {
        renderMessage("other", message);
    });

    function renderMessage(type, message) {
        let messageContainer = app.querySelector(".zone_de_chat .zone_writting .messages"); // Utiliser .zone_de_chat au lieu de .chat-screen
        let el;

        if (type === "my") {
            el = document.createElement("div");
            el.setAttribute("class", "message my-message");
            el.innerHTML = `
                <div>
                    <div class="name">You</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
        } else if (type === "other") {
            el = document.createElement("div");
            el.setAttribute("class", "message other-message");
            el.innerHTML = `
                <div>
                    <div class="name">${message.username}</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
        }

        messageContainer.appendChild(el);
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }
})();
