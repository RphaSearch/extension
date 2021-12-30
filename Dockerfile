FROM python

RUN pip install gradio requests

COPY ./app.py ./app.py

ENV URL="http://127.0.0.1:5000/predict"
ENV GRADIO_SERVER_NAME="0.0.0.0"
ENV GRADIO_SERVER_PORT="7860"
ENTRYPOINT ["/bin/bash", "-c", "python app.py"]
