import os

import gradio as gr
import requests

url = os.environ.get("URL")


def question_answer(context, question):
    prev_qa = gr.get_state() or []

    r = requests.post(
        url,
        json={"context": context, "prev_qa": prev_qa, "question": question},
    )

    answer = r.json()["answer"]

    prev_qa.append((question, answer))
    gr.set_state(prev_qa)

    return answer


sample_context = """Once upon a time, in a barn near a farm house, there lived a little white kitten named Cotton. Cotton lived high up in a nice warm place above the barn where all of the farmer's horses slept. But Cotton wasn't alone in her little home above the barn, oh no. She shared her hay bed with her mommy and 5 other sisters. All of her sisters were cute and fluffy, like Cotton. But she was the only white one in the bunch. The rest of her sisters were all orange with beautiful white tiger stripes like Cotton's mommy. Being different made Cotton quite sad. She often wished she looked like the rest of her family. So one day, when Cotton found a can of the old farmer's orange paint, she used it to paint herself like them. When her mommy and sisters found her they started laughing.\n\n"What are you doing, Cotton?!"\n\n"I only wanted to be more like you".\n\nCotton's mommy rubbed her face on Cotton's and said "Oh Cotton, but your fur is so pretty and special, like you. We would never want you to be any other way". And with that, Cotton's mommy picked her up and dropped her into a big bucket of water. When Cotton came out she was herself again. Her sisters licked her face until Cotton's fur was all all dry.\n\n"Don't ever do that again, Cotton!" they all cried. "Next time you might mess up that pretty white fur of yours and we wouldn't want that!"\n\nThen Cotton thought, "I change my mind. I like being special"."""

sample_question = "What color was Cotton?"

context = gr.inputs.Textbox(
    lines=10,
    label="CONTEXT",
    default=sample_context,
)
question = gr.inputs.Textbox(
    label="QUESTION",
    default=sample_question,
)
answer = gr.outputs.Textbox(label="ANSWER")

iface = gr.Interface(
    fn=question_answer,
    inputs=[context, question],
    outputs=answer,
    layout="vertical",
).launch()
