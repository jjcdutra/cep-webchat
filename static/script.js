const chat = document.getElementById("chat");
const input = document.getElementById("cepInput");
const btn = document.getElementById("sendBtn");

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function enviar() {
  const cep = input.value.trim();
  if (!cep) return;

  addMessage(cep, "user");
  input.value = "";

  try {
    const res = await fetch(window.WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": window.API_KEY
      },
      body: JSON.stringify({ cep })
    });

    const data = await res.json();
    addMessage(data.reply || "Erro na resposta", "bot");
  } catch (e) {
    console.error(e);
    addMessage("Erro ao conectar com o servidor.", "bot");
  }
}

btn.addEventListener("click", enviar);