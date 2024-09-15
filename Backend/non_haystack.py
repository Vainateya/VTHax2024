import chromadb
from chromadb.utils import embedding_functions
import json
from pathlib import Path
import os

class ChromaDB:

	k = 3

	def __init__(self):
		CHROMA_DATA_PATH = "chroma_data/"
		EMBED_MODEL = "all-MiniLM-L6-v2"
		COLLECTION_NAME = "demo_docs"

		client = chromadb.PersistentClient(path=CHROMA_DATA_PATH)

		embedding_func = embedding_functions.SentenceTransformerEmbeddingFunction(
			model_name=EMBED_MODEL
		)

		if COLLECTION_NAME in [c.name for c in client.list_collections()]:
			print('Already exists')
			self.collection = client.get_or_create_collection(
				name=COLLECTION_NAME,
				embedding_function=embedding_func,
				metadata={"hnsw:space": "cosine"},
			)
			return

		self.collection = client.get_or_create_collection(
			name=COLLECTION_NAME,
			embedding_function=embedding_func,
			metadata={"hnsw:space": "cosine"},
		)

		def load_json_files(file_paths):
			documents = [] 
			sources = []
			for file_path in file_paths: 
				with open(file_path, "r") as f:
					json_data = json.load(f)
					for chunk in json_data:
						documents.append(chunk)
						sources.append(str(file_path))
			return documents, sources

		HERE = Path(__file__).resolve().parent
		json_paths = [HERE / "../Data" / Path(name) for name in os.listdir("../Data") if name.endswith(".json")]

		documents, sources = load_json_files(json_paths)

		self.collection.add(
			documents=documents[:3500],
			ids=[f"id{i}" for i in range(len(documents[:3500]))],
			metadatas=[{"source": g} for g in sources[:3500]]
		)

		self.collection.add(
			documents=documents[3500:],
			ids=[f"id{i}" for i in range(len(documents[3500:]))],
			metadatas=[{"source": g} for g in sources[3500:]]
		)

		# print('done embedding')

	def get_documents(self, query, agent):
		query_results = self.collection.query(
			query_texts=[query],
			n_results=self.k,
		)

		# print('done inference')
		# print(query_results)

		documents = []
		for i in range(self.k):
			content = query_results['documents'][0][i]
			source = query_results['metadatas'][0][i]['source']
			source = str(source).split('\\')[-1][:-9]
			score = query_results['distances'][0][i]
			documents.append({
                "content": content, 
                "score": score, 
                "meta": source
            })

		return self._top_k_documents(documents, agent.get_weights(), 1)
	
	def _top_k_documents(self, chunks, scores, k):
		updated_documents = []
		for i, doc in enumerate(chunks):
			updated_documents.append((doc['score'] * scores[doc['meta']], i))
		updated_documents.sort(reverse=True)
		res = []
		for i in range(k):
			res.append({
				'content': chunks[i]['content'],
				'meta': chunks[i]['meta']
			})
		return res
	
# db = ChromaDB()
# db.get_documents('What can I expect from my upcoming wisdom teeth removal surgery?')