import pandas as pd
import numpy as np

df1 = pd.read_json("hf://datasets/fhai50032/Symptoms_to_disease_7k/Symptoms_to_disease_7k.json")
df2 = pd.read_csv("hf://datasets/QuyenAnhDE/Diseases_Symptoms/Diseases_Symptoms.csv")
df3 = pd.read_parquet("hf://datasets/kaleem11/Disease_Symptom_Prediction_v5/data/train-00000-of-00001.parquet")
df4 = pd.read_csv("training_data.csv")


df1['query'] = df1['query'].apply(lambda x: x.split('\n')[1][8:])
df1.columns = ['symptoms', 'disease']
df1['symptoms'] = df1['symptoms'].apply(lambda x: x[11:])
df1['disease'] = df1['disease'].apply(lambda x: x[13:])


df2.drop(columns=['Code', 'Treatments'], inplace=True)
df2.rename(columns={'Symptoms': 'symptoms', 'Name': 'disease'}, inplace=True)
columns_titles = ["symptoms","disease"]
df2=df2.reindex(columns=columns_titles)


 
df3['symptoms'] = df3['text'].apply(lambda x: x.split('/')[0][10:-1].lower())
df3['disease'] = df3['text'].apply(lambda x: x.split('/')[1][30:])
df3['symptoms'] = df3['symptoms'].apply(lambda x: x[16:])
df3.drop(columns=['text'], inplace=True)



df4.drop(columns='Unnamed: 133', inplace=True)

e = np.array(df4.columns)[:-1]
df4['SSSS'] = df4.apply(lambda x: ', '.join(e[np.array(x.values[:-1]).astype(bool)]), axis=1)
df4 = df4[['SSSS', 'prognosis']]
df4.rename(columns={'SSSS': 'symptoms', 'prognosis': 'disease'}, inplace=True)
columns_titles = ["symptoms","disease"]
df4=df4.reindex(columns=columns_titles) 
 
 
df = pd.concat([df1, df2, df3, df4], ignore_index=True)

 
 
df.to_csv('combined_symptoms_diseases.csv', index=False)