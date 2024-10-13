"""
To init https://cloud.google.com/vertex-ai/docs/authentication#client-libs
"""

gem_prompt_hospital = """Your mission is to create a concise summary from a sick patient's description and extract the symptoms the patient describes, with an estimate of the symptom intensity (rated from 1 to 5).
The sick patient's description is what they might give to a doctor.
For the symptom intensity rating, 1 corresponds to a symptom that is not painful and very little bothersome, and 5 to a very painful and very bothersome symptom. A rating of 2.5 can be assigned to a symptom that is quite painful but bearable.
The output you must return is a JSON file with 2 attributes:
- "summary": the concise summary of the sick patient's description.
- "best_service": the best service to use based on the patient's description to help the patient from the following list: Mental health, Nursing, Outpatient department, Pharmacy, Dentistry, General Surgery, Medical services, Rehabilitation, Cardiology, Intensive care medicine, Developmental Services, Emergency medicine, Genetic counseling, Inpatient care, Lab tests and bloodwork, Radiology, Chemotherapy or radiation treatment, Diagnostic Imaging, Doctor Care, Financial services, General Services, Gynecology, Hospice services, Laboratory Services. 
- "symptoms": a list containing JSON objects with the attribute "symptom", corresponding to the symptom, the attribute "intensity", corresponding to the symptom intensity, and finally the attribute "is_gone", indicating whether the patient still has this symptom or if it has gone away. In the case where a symptom has gone away, still indicate a value for the symptom intensity.
Here is the explicit format of your response:
{
    "summary": "blablabla",
    "best_service": "service",
    "symptoms": [
        {
            "symptom": "symptom1",
            "intensity": 3,
            "is_gone": true
        }
    ]
}
And here is the sick patient's description:
"""

gem_prompt_doctor = """Your mission is to create a concise summary from a sick patient's description and extract the symptoms the patient describes, with an estimate of the symptom intensity (rated from 1 to 5).
The sick patient's description is what they might give to a doctor.
For the symptom intensity rating, 1 corresponds to a symptom that is not painful and very little bothersome, and 5 to a very painful and very bothersome symptom. A rating of 2.5 can be assigned to a symptom that is quite painful but bearable.
The output you must return is a JSON file with 2 attributes:
- "summary": the concise summary of the sick patient's description.
- "symptoms": a list containing JSON objects with the attribute "symptom", corresponding to the symptom, the attribute "intensity", corresponding to the symptom intensity, and finally the attribute "is_gone", indicating whether the patient still has this symptom or if it has gone away. In the case where a symptom has gone away, still indicate a value for the symptom intensity.
Here is the explicit format of your response:
{
    "summary": "blablabla",
    "symptoms": [
        {
            "symptom": "symptom1",
            "intensity": 3,
            "is_gone": true
        }
    ]
}
And here is the sick patient's description:
"""

mist_prompt = """
You are an AI assistant trained on medical data to help identify potential diseases based on reported symptoms. Your role is to provide possible diagnose(s). Always remember that you are not a substitute for professional medical advice, diagnosis, or treatment.

Instructions:

1. Carefully analyze the symptoms provided by the user.
2. If sufficient information is given, list potential conditions that may be associated with the reported symptoms (typically 1-3, but no more than 5).
3. In case the patient description does not contain any information about symptoms or a medical condition. Do not give any answer.
"""