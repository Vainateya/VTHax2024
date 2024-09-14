import os
import json 
from pathlib import Path
from haystack import Pipeline
#from haystack.components.converters import TextFileToDocument
from haystack.components.writers import DocumentWriter
from haystack import Document

from haystack_integrations.components.retrievers.chroma import ChromaQueryTextRetriever
from haystack_integrations.document_stores.chroma import ChromaDocumentStore

# Chroma is used in-memory so we use the same instances in the two pipelines below (use cosine similarity)
document_store = ChromaDocumentStore(distance_function="cosine")

HERE = Path(__file__).resolve().parent
json_paths = [HERE / "../Data" / Path(name) for name in os.listdir("../Data") if name.endswith(".json")]

def load_json_files(file_paths):
    documents = [] 
    for file_path in file_paths: 
        with open(file_path, "r") as f:
            json_data = json.load(f)
            for chunk in json_data:
                doc = Document(
                    content=chunk,  # Text of the chunk
                    meta={"source": str(file_path)}  # Optional metadata
                )
                documents.append(doc)
    return documents

#Load the JSON data into list of documents 
documents = load_json_files(json_paths)         

#Indexing Pipeline 
indexing = Pipeline()
#indexing.add_component("converter", TextFileToDocument())
indexing.add_component("writer", DocumentWriter(document_store))
#indexing.connect("converter", "writer")
indexing.run({"writer": {"documents": documents}})

num_chunks = document_store.count_documents()
print(f"Total number of chunks: {num_chunks}")

#Querying Pipeline 
querying = Pipeline()
querying.add_component("retriever", ChromaQueryTextRetriever(document_store))
results = querying.run({"retriever": {"query": "Surgical Instruments", "top_k": num_chunks}})

Document_Objects = []

#Print Results 
for d in results["retriever"]["documents"]:
   Document_Objects.append({
       "content": d.content, 
       "score": d.score, 
       "meta": d.meta
    })
    