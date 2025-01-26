# ThreatIntelligence 

Application Setup and Usage Guide. 

Steps to Set Up and Run the Application

## Installation

## Step 1: Clone the Repository or Extract the Files 

Clone the repository from the provided link using the following command:

```bash
git clone https://github.com/LavanyaaCSE/ThreatIntelligence.git
```
OR

If you have a zipped file, extract it to your desired directory.

## Step 2: Install Required Python Libraries

Open a terminal in the root directory of the project and run the following commands to install the required Python libraries:

```bash
pip install flask flask-cors spacy pandas pdfplumber python-docx easyocr
python -m spacy download en_core_web_sm
pip install pytesseract
```
## Step 3: Install Required JavaScript Libraries

Navigate to the React frontend folder (react-flask-app) using the terminal.

Install the required npm packages by running:

```bash
npm install react-router-dom react-icons axios jspdf
npm install
npm install vite
```
## Step 4: Start the Backend

Open a terminal in the project root directory where the backend files are located.

Start the backend server by running

```bash
python app.py
```
## Step 5: Start the Frontend

Open a new terminal and navigate to the React frontend directory:

```bash
cd react-flask-app
```

Start the frontend development server:

```bash
npm run dev
```

## Step 6: Access the Application

Once both the backend and frontend are running, open your browser and navigate to the URLs displayed in the terminal:

Frontend: http://localhost:5173

Backend: http://localhost:5000

## Usage

## Step 1: Upload a File

Upload a file in one of the supported formats: pdf, txt, docx (Word), jpeg, png, or jpg.

The application will process the uploaded file to extract relevant threat intelligence data.

## Step 2: View Extracted Results

After processing, you'll be navigated to the Extracted Results screen.
View the extracted details, including:

Indicators of Compromise (IoCs)

Tactics, Techniques, and Procedures (TTPs)

Threat actors, malware, and targeted entities

Use filters to focus on specific details.

## Step 3: Save Scan Results

Save the extracted scan results for future reference.

Access saved results from the Saved Scan Results page.

## Step 4: Download Scan Results

Download the extracted results in your preferred format (JSON or PDF).

This enables easy sharing or integration with other systems.

## Step 5: View Saved Results

Navigate to the Saved Scan Results page to revisit past analyses.

## Step 6: Access Recent Downloads

View a list of downloaded files on the Recent Downloads page.

Quickly access previously downloaded results.
