# VTHax2024

Three months ago, Vyas was preparing for wrist surgery. When he asked the doctor for a detailed explanation, the response was unclear and difficult to understand. This left Vyas with many unanswered questions. After searching for more information online, he found that the resources lacked the specificity he needed. Even chatbots like ChatGPT didn’t help—some even provided made-up sources. This experience motivated us to create a platform that makes medical information more accessible, breaking down complex yet essential concepts for the average person.

## Overview
We’ve built a Question-Answer platform where users can ask Dr. HowAI their medical questions. Dr. HowAI consults a curated list of trusted sources—including publications, medical textbooks, and journals—using Multi-Modal Retrieval Augmented Generation (RAG) to generate accurate answers. Users can also hover over groups of sentences in the response to see which source contributed most to that portion. Additionally, users can “like” or “dislike” specific sentence groups, helping Dr. HowAI adjust its future responses by weighting the sources accordingly.

## Technology
The website was built using React, leveraging its strengths in component reusability, performance, and ease of integration with external APIs. Tailwind CSS was used for efficient styling. The frontend communicates with a Flask API, which acts as a middleman between the user and the AI via HTTP requests.

To answer user queries, we implemented Multi-Modal Retrieval Augmented Generation (RAG) alongside a vector database. First, we used CLIP, a visual-language model, to encode our resources—textbooks, articles, and images—into the Chroma vector database. When a user asks a question, it is also encoded by the CLIP model, and we query the encoding in the vector database to find relevant answers.

Instead of traditional cosine-similarity matching, we implemented a custom algorithm inspired by Reinforcement Learning. Specifically, we use a variation of the Upper Confidence Bound (UCB) algorithm to determine the weight each source should contribute to the response. The UCB algorithm encourages exploration by prioritizing sources that haven’t been used much, while gradually favoring those that receive positive feedback from users.

We then multiply the UCB weighting by the cosine similarity scores to select the best text chunks for the model to use. Finally, we use Claude 3.5 Sonnet to generate intelligent responses based on the selected chunks.
