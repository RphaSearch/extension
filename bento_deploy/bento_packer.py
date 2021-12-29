from bento_service import TransformerService

from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

ts = TransformerService()

model_name = "t5QA"
model = AutoModelForSeq2SeqLM.from_pretrained("kiri-ai/t5-base-qa-summary-emotion")

tokenizer = AutoTokenizer.from_pretrained("kiri-ai/t5-base-qa-summary-emotion")

artifact = {"model": model, "tokenizer": tokenizer}
ts.pack("t5QA", artifact)

saved_path = ts.save()
