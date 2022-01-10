# Conversational Question Answering Chrome Extension

## Installation

### run bentoml service

1. install bentoml 
    run `pip install bentoml`

2. package artifacts
    run `cd bento_deploy && python3 bento_packer.py`

3. containerize model api server
    run `bentoml containerize 


### load chrome extension

1. create .env file containing the bentoml service ip address like this: `ML_HOST={ip}`
2. build chrome extension
    build in dev mode: `npm run dev`
    build for productino: `npm run build`
3. load extension in chrome

## Backend API

### POST /api/v1/answer
runs question answering on bentoml service

request body:
{
    context: context string,
    prev_qa: list of previous questions and answers: e.g. [question, answer, question, answer...],
    question: question string
}

response body:
{
    answer: answer string
}

### GET /api/v1/context?q={query}
searchs wikipedia and extracts text from article

response body:
{
    context: article string
}
