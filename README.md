# Doctor-Patient Symptom Tracker App

## Project Overview

The Doctor-Patient Symptom Tracker is a speech-to-text-powered application that simplifies the interaction between patients and doctors. The app allows patients to describe their symptoms verbally, which are then automatically converted into a structured summary of bullet points using a Large Language Model (LLM). The doctor receives these summarized symptoms prior to consultation, ensuring that no crucial symptom is overlooked during the medical visit. After the consultation, the doctor provides feedback by diagnosing the disease associated with the symptoms. This feedback is collected to create a powerful dataset mapping symptoms to diseases, which can be used for further analysis and improving medical research.

## Key Features

- **Speech-to-Text Conversion:** The app uses a state-of-the-art speech-to-text model to transcribe the patient's spoken symptoms into text.
- **LLM-Powered Summarization:** An LLM processes the raw transcript, creating bullet-pointed symptoms and a concise summary for easy consumption by the doctor.
- **Symptom Summary for Doctors:** Doctors receive a structured summary before the consultation, allowing them to address all the key symptoms without missing details.
- **Doctor Feedback:** After the consultation, doctors input their diagnosis, allowing for the creation of a dataset mapping symptoms to diagnosed diseases.
- **Building a Medical Dataset:** Over time, the app generates a robust dataset that links symptoms to diseases, which could be used for training future models or medical research.

## Motivation

In busy healthcare environments, it can be easy to overlook important details when discussing symptoms with patients. This app aims to reduce the risk of missed information by providing doctors with a complete and organized list of symptoms ahead of time, ensuring better patient care and efficiency. Additionally, the data collected from doctor feedback could be valuable in creating predictive models for diagnosing diseases based on symptoms.

## Tech Stack

- **Speech-to-Text Model:** Transcribes spoken input from the patient into text.
- **Large Language Model (LLM):** Formats the text into bullet points and summaries.
- **Frontend:** A simple user interface where patients record their symptoms and doctors view the summaries.
- **Backend:** Handles the processing of patient input, LLM interaction, and data storage.
- **Database:** Stores the raw symptoms, bullet-pointed summaries, and doctor feedback (symptom-to-disease dataset).

## How It Works

1. **Patient Input:**
   - The patient opens the app and verbally describes their symptoms.
   - The speech-to-text model converts their spoken input into a text format.
   
2. **LLM Processing:**
   - The text is sent to the LLM, which converts it into an organized list of bullet-pointed symptoms and a summary.
   
3. **Doctor View:**
   - Before the consultation, the doctor receives the processed symptoms summary, ensuring they don’t miss anything during the patient interview.
   
4. **Doctor Feedback:**
   - After the consultation, the doctor enters the diagnosis. This data is linked to the original symptoms and stored.
   
5. **Dataset Creation:**
   - Over time, the app compiles a dataset mapping symptoms to diagnosed diseases, which can be analyzed for insights or used to improve diagnostic models.

## Future Enhancements

- **Machine Learning Model for Diagnosis:** Use the dataset of symptoms and diagnoses to train a model that can suggest possible diagnoses based on symptoms.
- **Multi-Language Support:** Expand the app’s functionality by adding support for multiple languages, allowing non-English-speaking patients to describe their symptoms in their native language.
- **Integration with Healthcare Systems:** Link the app to electronic medical records (EMR) for seamless sharing of patient data with healthcare providers.

## Installation and Usage

### Prerequisites

- Python 3.x
- [API Name] for Speech-to-Text functionality
- [API Name] for LLM processing

### Installation Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/doctor-patient-symptom-tracker.git
    cd doctor-patient-symptom-tracker
    ```

2. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Run the application:
    ```bash
    python app.py
    ```

### Usage

- Patients can log in to the app and record their symptoms.
- Doctors log in to view patient summaries and provide diagnoses.

## Contributions

We welcome contributions from the community! Feel free to fork this repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

