from non_haystack import ChromaDB
from model import query_claude

class RAG:
    def __init__(self, agent):
        # Initialization logic (if needed)
        self.agent = agent
        self.chromadb = ChromaDB()

    def execute_prompt(self, query):
        documents = self.chromadb.get_documents(query, self.agent)
        response = query_claude(query, documents)
        return response
