from flask import Flask, request, jsonify
from flask_cors import CORS
import time

from rag import RAG
from rl.bandit import UCBAgent

sources = {
    'ACS Surgery Principles and Practices': 0,
    'MayoClinic Preparing For Your Surgery or Procedure': 1,
    'NOMESCO Classification of Surgical Procedures': 2
}

agent = UCBAgent(sources)
rag = RAG(agent)
id_val = 0

app = Flask(__name__)
CORS(app)

@app.route('/your-api-endpoint', methods=['POST'])
def handle_request():
    data = request.json
    query = data.get('query', '')
    response = rag.execute_prompt(query)
    return jsonify({
        'answer': process_response(response)
    })
    # response = {"answer": f"Response to: {query}"}
    # time.sleep(2)
    # response = {
    #     'answer': [
    #         {
    #             'msg': 'Hello, this is a response. As cited by ',
    #             'type': 'text'
    #         },
    #         {
    #             'msg': 'ACS Surgery Principles and Practices',
    #             'type': 'source',
    #             'id': 0
    #         }
    #     ]
    # }

def process_response(response):
    res = []
    i = 0
    global id_val
    while i < len(response):
        for name in sources:
            if response[i:].startswith(name):
                res.append({
                    'msg': name,
                    'type': 'source',
                    'id': id_val
                })
                id_val += 1
                i += len(name)
                break
        else:
            if len(res) == 0 or res[-1]['type'] == 'source':
                res.append({
                    'msg': '',
                    'type': 'text'
                })
            res[-1]['msg'] += response[i]
            i += 1
    return res

@app.route('/react-to-source', methods=['POST'])
def react():
    data = request.json
    source = data.get('source', '')
    reward = data.get('reward', '')
    agent.learn(source, reward)
    return jsonify({
        'success': True
    })


if __name__ == "__main__":
    app.run(debug=True)
