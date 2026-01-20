"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatControler = void 0;
var chat_socket_js_1 = require("./chat.socket.js");
var ChatControler = /** @class */ (function () {
    function ChatControler() {
    }
    ChatControler.post = function (req, res) {
        console.log(req.body);
        chat_socket_js_1.ChatSocket.INSTANCE.send(req.body.message);
        res.status(200).send();
    };
    return ChatControler;
}());
exports.ChatControler = ChatControler;
