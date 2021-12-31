import bentoml
from bentoml.adapters import JsonInput, JsonOutput
from bentoml.frameworks.transformers import TransformersModelArtifact

import torch


@bentoml.env(requirements_txt_file="./requirements.txt")
@bentoml.artifacts([TransformersModelArtifact("t5QA")])
class TransformerService(bentoml.BentoService):
    @bentoml.api(input=JsonInput(), batch=False, output=JsonOutput())
    def answer(self, parsed_json):
        question = parsed_json.get("question")
        prev_qa = parsed_json.get("prev_qa")
        context = parsed_json.get("context")

        device = torch.device("cuda") if torch.cuda.is_available() else "cpu"
        model = self.artifacts.t5QA.get("model")
        model.to(device)
        tokenizer = self.artifacts.t5QA.get("tokenizer")

        input_text = [f"q: {qa[0]} a: {qa[1]}" for qa in prev_qa]
        input_text.append(f"q: {question}")
        input_text.append(f"c: {context}")
        input_text = " ".join(input_text)
        features = tokenizer([input_text], return_tensors="pt")

        with torch.no_grad():
            tokens = model.generate(
                input_ids=features["input_ids"].to(device),
                attention_mask=features["attention_mask"].to(device),
                max_length=64,
            ).cpu()

        answer = tokenizer.decode(tokens[0], skip_special_tokens=True)

        return {"answer": answer}

    @bentoml.api(input=JsonInput(), batch=False, output=JsonOutput())
    def summary(self, parsed_json):
        context = parsed_json.get("context")

        device = torch.device("cuda") if torch.cuda.is_available() else "cpu"
        model = self.artifacts.t5QA.get("model")
        model.to(device)
        tokenizer = self.artifacts.t5QA.get("tokenizer")

        input_text = f"summarize: {context}"
        features = tokenizer([input_text], return_tensors="pt")

        with torch.no_grad():
            tokens = model.generate(
                input_ids=features["input_ids"].to(device),
                attention_mask=features["attention_mask"].to(device),
                max_length=64,
            ).cpu()

        summary = tokenizer.decode(tokens[0], skip_special_tokens=True)

        return {"summary": summary}

    @bentoml.api(input=JsonInput(), batch=False, output=JsonOutput())
    def emotion(self, parsed_json):
        context = parsed_json.get("context")

        device = torch.device("cuda") if torch.cuda.is_available() else "cpu"
        model = self.artifacts.t5QA.get("model")
        model.to(device)
        tokenizer = self.artifacts.t5QA.get("tokenizer")

        input_text = f"emotion: {context}"
        features = tokenizer([input_text], return_tensors="pt")

        with torch.no_grad():
            tokens = model.generate(
                input_ids=features["input_ids"].to(device),
                attention_mask=features["attention_mask"].to(device),
                max_length=64,
            ).cpu()

        emotion = tokenizer.decode(tokens[0], skip_special_tokens=True)

        return {"emotion": emotion}
