import pandas as pd
import json
from sklearn.model_selection import train_test_split

df = pd.read_csv('combined_symptoms_diseases.csv')

train_df, eval_df = train_test_split(df, test_size=0.05, random_state=42)

def convert_to_jsonl(dataframe):
    jsonl_data = []
    for _, row in dataframe.iterrows():
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
    return jsonl_data

train_jsonl_data = convert_to_jsonl(train_df)

eval_jsonl_data = convert_to_jsonl(eval_df)

with open('train_data.jsonl', 'w') as train_file:
    for entry in train_jsonl_data:
        train_file.write(json.dumps(entry) + "\n")

with open('eval_data.jsonl', 'w') as eval_file:
    for entry in eval_jsonl_data:
        eval_file.write(json.dumps(entry) + "\n")

print("Data has been successfully split and written to train_data.jsonl and eval_data.jsonl!")