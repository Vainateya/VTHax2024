# from flask import Flask, request, jsonify
# from rag_processor import RAGProcessor  # Import your class

# app = Flask(__name__)
# rag_processor = RAGProcessor()  # Create an instance of your class

# @app.route('/process', methods=['POST'])
# def process_text():
#     user_input = request.json.get('text')  # Get the input from the frontend
#     if not user_input:
#         return jsonify({"error": "No text provided"}), 400

#     # Send the input to the RAG pipeline (for now, just simulate this)
#     processed_text = rag_processor.process_input(user_input)

#     # Get the output from the pipeline
#     output = rag_processor.get_output(processed_text)

#     # Send the output back to the frontend
#     return jsonify({"output": output})

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, request, jsonify

app = Flask(__name__)

# RAGProcessor class
class RAGProcessor:
    def __init__(self):
        # Initialization logic (if needed)
        pass

    def process_input(self, user_input):
        # Simulate processing input (e.g., sending it to the RAG pipeline)
        return f"Processed: {user_input}"

    def get_output(self, processed_text):
        # Simulate returning output from RAG pipeline
        return f"RAG Output: {processed_text}"

# Instantiate RAGProcessor
rag_processor = RAGProcessor()

@app.route('/')
def home():
    return "Hello, Flask!"

# New route to handle text input
@app.route('/process', methods=['POST'])
def process_text():
    user_input = request.json.get('text')  # Expecting JSON input with a "text" field
    if not user_input:
        return jsonify({"error": "No text provided"}), 400

    # Process the input through the RAGProcessor
    processed_text = rag_processor.process_input(user_input)
    output = rag_processor.get_output(processed_text)

    # Return the output as JSON
    return jsonify({"output": output})

if __name__ == '__main__':
    app.run(debug=True)

