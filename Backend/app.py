from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

@app.route('/your-api-endpoint', methods=['POST'])
def handle_request():
    data = request.json
    query = data.get('query', '')
    response = {"answer": f"Response to: {query}"}
    time.sleep(2)
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
