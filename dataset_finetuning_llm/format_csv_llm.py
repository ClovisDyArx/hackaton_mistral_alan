import pandas as pd
import json

df = pd.read_csv('combined_symptoms_diseases.csv')

jsonl_data = []

for _, row in df.iterrows():
    entry = {
        "messages": [
            {
                "role": "user",
                "content": row['symptoms']
            },
            {
                "role": "assistant",
                "content": row['disease']
            }
        ]
    }

    jsonl_data.append(entry)

with open('output_file.jsonl', 'w') as f:
    for entry in jsonl_data:
        f.write(json.dumps(entry) + "\n")

print("Data has been successfully converted to JSONL format!")
