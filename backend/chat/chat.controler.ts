import { ChatSocket } from "./chat.socket.js";

export class ChatControler {
  static post(req, res) {
    console.log(req.body);
    ChatSocket.INSTANCE.send(req.body.message);
    res.status(200).send();
  }
}
