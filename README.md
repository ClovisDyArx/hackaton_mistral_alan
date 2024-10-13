# ***Hygie.ia - Your intermediary to ease up interactions between People and Healthcare***

## Overview
The **Healthcare Intermediary App** is an AI-powered platform that serves as a bridge between individuals and healthcare services. It leverages natural language processing (NLP) to extract symptoms and other relevant information from user input, provides an initial assessment of possible conditions, and routes users to the appropriate healthcare service. Users can describe their symptoms as they would when speaking to a doctor, and the app ensures accurate communication of their needs to the right medical service.

## Table of Contents
- [Motivation](#motivation)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Example Workflow](#example-workflow)
- [Contributing](#contributing)
- [License](#license)

## Motivation
The app aims to address common challenges in accessing healthcare, such as:
- **Long waiting times** for initial assessments, especially during peak hours.
- **Limited access** to healthcare services in remote or underserved areas.
- **Scalability issues** in telehealth services that require human doctors for each interaction.

By automating the initial assessment process, the app allows users to get timely insights into their condition and access the right care faster.

## Features
- **NLP-Based Symptom Extraction**: Automatically identifies and extracts symptoms from user input.
- **Sentiment Analysis**: Analyzes the urgency and context of the patient's descriptions.
- **Condition Assessment**: Suggests potential conditions based on symptoms.
- **Verification Step**: Allows users to verify the extracted symptoms to ensure accuracy.
- **Service Recommendation**: Routes users to the appropriate healthcare service or specialist based on the confirmed symptoms.
- **Data Privacy**: Ensures compliance with data protection regulations (e.g., GDPR, HIPAA).

## Technologies Used
- **Python**: Backend and AI model implementation.
- **FastAPI**: Backend API for handling user interactions and processing.
- **Whisper**: For audio transcription and real-time speech-to-text functionality.
- **Gemini Model**: For extracting information from transcriptions.
- **Mistral Model**: For predicting potential conditions based on extracted information.
- **Next.js**: Frontend framework for the user interface.
- **Shadcn-ui**: UI components for a seamless user experience.
- **Docker**: Containerization for easy deployment.

## Architecture
1. **Frontend**: Developed with Next.js and shadcn-ui, allowing users to record their symptoms and receive real-time feedback.
2. **Backend**: Built using FastAPI, it processes audio input through Whisper for transcription and utilizes the Gemini and Mistral models for symptom extraction and diagnosis.
3. **AI Models**: 
   - **Whisper** for transcription.
   - **Gemini** for symptom and sentiment extraction.
   - **Mistral** for condition prediction based on symptoms.
4. **Data Flow**:
   - User inputs audio -> FastAPI processes and transcribes it -> AI models analyze and extract symptoms -> User verifies the symptoms -> Possible conditions are suggested -> User is directed to the right service.

## Setup and Installation
### Prerequisites
- Python 3.8+
- Node.js 16+
- Docker (optional for containerized deployment)

### Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/healthcare-intermediary-app.git
   cd healthcare-intermediary-app
   ```

2. **Backend Setup**
   - Navigate to the backend directory and create a virtual environment:
     ```bash
     cd backend
     python -m venv env
     source env/bin/activate  # On Windows: env\Scripts\activate
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Start the FastAPI server:
     ```bash
     uvicorn main:app --reload --port 5000
     ```

3. **Frontend Setup**
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```

4. **Environment Variables**
   - Create a `.env` file in both the frontend and backend directories with necessary API keys and configurations.
   
### Docker (Optional)
   - To run the entire app using Docker:
     ```bash
     docker-compose up --build
     ```

## Usage
1. Open the app in your browser at `http://localhost:3000`.
2. Record a description of your symptoms using the voice input feature.
3. The app will transcribe your input and extract symptoms and conditions.
4. Verify the extracted symptoms.
5. Receive recommendations for further medical action or connect to a healthcare provider.

## Example Workflow
1. A user describes symptoms like "I've been feeling feverish with a sore throat."
2. The app transcribes the audio and extracts symptoms such as "fever" and "sore throat."
3. The user verifies the accuracy of the extracted symptoms.
4. The app suggests possible conditions (e.g., flu, COVID-19) and recommends consulting a general practitioner.
5. The user is directed to the appropriate service based on the analysis.

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature.
3. Make your changes and test them thoroughly.
4. Submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
