def top_k_documents(chunks, scores, k):
    updated_documents = []
    for i, doc in enumerate(chunks):
        updated_documents.append((doc['score'] * scores[doc['meta']], i))
    updated_documents.sort(reverse=True)
    res = []
    for i in range(k):
        res.append({
            'content': chunks[i]['content'],
            'meta': chunks[i]['content']
        })
    return res