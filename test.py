# Use a pipeline as a high-level helper
from transformers import pipeline

pipe = pipeline("text-generation", model="kaleem11/Llama-2-7b-chat-finetune_Disease_Symptom_Prediction_v1")
pipe(["my Symptoms are fatigue yellowish skin nausea loss of appetite yellowing of eyes family history"])