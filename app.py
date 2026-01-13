import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template(
        "index.html",
        API_KEY=os.getenv("CHATBOT_API_KEY"),
        WEBHOOK_URL=os.getenv("N8N_WEBHOOK_URL")
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5500, debug=False)
