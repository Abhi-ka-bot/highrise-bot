const WebSocket = require("ws");

const ROOM_ID = "67dfab42acc2dbf974081145";
const TOKEN = "20b7f745a44c209c3293c2e16475bad487006027559788f9ffcab01454950b8f";

const ws = new WebSocket(`wss://HR_DOMAIN/client/${ROOM_ID}?token=${TOKEN}`);

ws.on("open", () => {
  console.log("✅ Connected to Highrise Room");
  sendMessage("Bot is now online! 🚀");
});

ws.on("message", (data) => {
  const message = JSON.parse(data);

  // Auto reply to messages
  if (message.type === "chat" && message.data && message.data.username !== "your-bot-name") {
    const user = message.data.username;
    const text = message.data.message;
    
    if (text.toLowerCase().includes("hello")) {
      sendMessage(`Hello @${user} 👋! Welcome!`);
    }
  }
});

function sendMessage(text) {
  ws.send(JSON.stringify({
    op: 1,
    data: {
      type: "chat",
      message: text
    }
  }));
}
