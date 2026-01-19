const PORT = 3000;
const app = express();
const server = http.createServer(app);

// Websocket
// Utilisation d'un singleton pour pouvoir la partager
ChatSocket.INSTANCE.setup(server);

// Front+Api
app.use(express.static("..front/dist"));
app.use(express.json());
app.get("/api/whoami", WhoIAmControler.get);
app.post("/api/chat", ChatControler.post);

// Ecoute de l'API de la websocket
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
