import { io } from "socket.io-client";
import "./style.css";

const form = document.querySelector(".input-bar")!;
const input = form.querySelector("input[name='message']")! as HTMLInputElement;

const CHANNEL = "message";

function connectWs(ip: string) {
  const socket = io(`http://${ip}:3000`);
  socket.on("connect", () => console.log("Connecté au serveur WebSocket"));
  socket.on(CHANNEL, (msg) => displayMessage(msg));
}

function displayWhoami(serverIp: string) {
  const div = document.getElementById("whoami")!;
  div.textContent = serverIp;
}

function displayMessage(message: string) {
  const div = document.getElementById("message")!;
  const paragraph = div.appendChild(document.createElement("p"));
  paragraph.classList.add("msg-paragraph");
  paragraph.textContent = message;

  const scrollTarget =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  window.scrollTo({
    top: scrollTarget,
    behavior: "smooth",
  });
}

window.addEventListener("load", async () => {
  const call = await fetch("/api/whoami");
  const json = await call.json();
  displayWhoami(json.ip);
  connectWs(json.ip);
  input.focus();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = input.value;
  if (!message) return;

  await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message,
    }),
  });

  input.value = "";
});
