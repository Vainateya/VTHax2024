import anthropic

from creds import get_api_key

API_KEY = get_api_key()

client = anthropic.Anthropic(api_key=API_KEY)

def query_claude(query, documents):
    return 'Response hehehe'
    # #Prepare the context for CLaude, incorporating retrieved documents
    # text_context = "\n\n".join([f"Document {i+1}: {doc['content']}" for i, doc in enumerate(documents)])
    
    # #Prepare the citations
    # all_citations = [doc['meta'] for doc in documents]
    # unique_citations = list(set(all_citations))
    # citations = [f"Source {i+1}: {source}" for i, source in enumerate(unique_citations)]
    
    # message = client.completions.create(
    #     model = "claude-3-5-sonnet-20240620",
    #     max_tokens=1024, #Can be changed later 
    #     prompt = f"User's query: {query}\nRelevant documents:\n{text_context}\nAnswer the user's question based on the documents."
    # )
    
    # # Claude's response
    # response = message.completion.strip()
    
    # # Append citations at the end of the response
    # citation_text = "\n\n".join(citations)
    # final_output = f"{response}\n\nCitations:\n{citation_text}"
    
    # return final_output
    









"""
from transformers import AutoModelForCausalLM, AutoProcessor
import torch




#Initialize the Phi-3 Model and Processor 
model_id = "microsoft/Phi-3-vision-128k-instruct"
model = AutoModelForCausalLM.from_pretrained(model_id, device_map = "cuda", trust_remote_code=True, torch_dtype="auto", attn_implementation="flash_attention_2",)
processor = AutoProcessor.from_pretrained(model_id, trust_remote_code=True)

class RAG_Model: 
    def __init__(self, model, processor): 
        self.model = model 
        self.processor = processor 
    
    def get_answer(self, query, documents):
        #Step 1: Preprocess the inputs (query and documents)
        pre_input = self.prepare_input(query, documents)
        
        #Step 2: Tokenize the input 
        inputs = self.processor(pre_input, return_tensors="pt").to("cuda:2")
        
        #Step 3: Run the model to generate output
        outputs = self.model.generate(
            input_ids=inputs['input_ids'],
            attention_mask=inputs['attention_mask'],
            max_new_tokens=50,  # Limit the number of tokens to generate
            num_beams=3  # Optional: Use beam search for more coherent results
        )
        
        # Step 4: Decode the model's output into human-readable text
        answer = self.processor.batch_decode(outputs, skip_special_tokens=True)[0]

        return answer
    
    def prepare_input(self, query, documents):
        # Handle case where documents might be empty
        if not documents:
            return f"Question: {query} Context: No relevant documents found."
        
        # Combine the query with the filtered document contents (context)
        document_texts = " ".join([doc['content'] for doc in documents])
        
        return f"Question: {query} Context: {document_texts}"
        
"""