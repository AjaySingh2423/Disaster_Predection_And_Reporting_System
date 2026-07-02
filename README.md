# Disaster Prediction & Reporting System using MERN Stack and Machine Learning

A full-stack Disaster Prediction and Reporting System developed using the MERN Stack (MongoDB, Express.js, React.js, Node.js) integrated with Machine Learning (Python Scikit-learn) for predicting the probability of natural disasters such as Flood, Cloudburst, and Heavy Rainfall.

The system enables users to report disasters on an interactive map, allows administrators to verify reports, and predicts future disasters using weather data obtained from a Weather API and a trained Random Forest model.

---

## Features

### User Module

- User Registration
- User Login using JWT Authentication
- Secure Password Hashing using Bcrypt
- Interactive Map using Leaflet
- Click on Map to Report Disaster
- Submit Disaster Details
- View Verified Disaster Reports
- View Disaster Prediction Results
- View Historical Disaster Reports

---

### Admin Module

- Secure Admin Login
- View All Disaster Reports
- Verify Disaster Reports
- Activate or Deactivate Reports
- Delete Disaster Reports
- Manage User Submitted Reports

---

### Machine Learning Module

- Weather API Integration
- Random Forest Classifier
- Disaster Prediction
- Flood Prediction
- Cloudburst Prediction
- Heavy Rainfall Prediction
- Model Accuracy Evaluation
- Prediction Probability Generation

---

## Technology Stack

### Frontend

- React.js
- React Router DOM
- Leaflet
- React Leaflet
- CSS
- Axios

### Backend

- Node.js
- Express.js
- JWT Authentication
- Bcrypt
- CORS

### Database

- MongoDB
- Mongoose

### Machine Learning

- Python
- Pandas
- NumPy
- Scikit-learn
- Joblib

---

## Project Structure

```
Disaster_Prediction/

│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── ml/
│   ├── data/
│   ├── connection.js
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## System Workflow

1. User registers and logs in.
2. JWT token is generated.
3. User selects a location on the map.
4. Disaster report is submitted.
5. Report is stored in MongoDB.
6. Admin verifies and activates the report.
7. Verified reports become visible to all users.
8. Weather API fetches real-time weather information.
9. Weather data is sent to the Machine Learning model.
10. Random Forest predicts disaster probability.
11. Users can view prediction results.
12. Historical reports are available for analysis.

---

## Authentication

The system uses JWT Authentication.

- Secure Login
- Protected Routes
- Role Based Authorization
- Admin Authentication
- Password Hashing using Bcrypt

---

## Machine Learning

The project uses **Random Forest Classifier** trained on weather-related features.

### Input Features

- Temperature
- Humidity
- Pressure
- Wind Speed
- Rainfall

### Predictions

- Flood
- Cloudburst
- Heavy Rainfall

The model returns prediction probabilities for each disaster type.

---

## Database Collections

### users

```
_id
name
email
password
role
```

### disasters

```
_id
userId
type
severity
location
    lat
    lng
isVerified
isActive
createdAt
```

---

## REST API

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /register | Register User |
| POST | /login | Login |

---

### User

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /home | User Dashboard |
| POST | /disaster | Report Disaster |
| GET | /disaster | Get Verified Reports |

---

### Admin

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /admin | Get All Reports |
| PUT | /verify/:id | Verify Report |
| PUT | /status/:id | Activate/Deactivate |
| DELETE | /:id | Delete Report |

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/disaster-prediction.git
```

---

### Backend

```bash
cd backend

npm install
```

Create a `.env` file

```
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend

```bash
npm start
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

### Machine Learning

Install Python dependencies

```bash
pip install pandas
pip install numpy
pip install scikit-learn
pip install flask
pip install joblib
```

Train Model

```bash
python train_model.py
```

Run Prediction API

```bash
python app.py
```

---

## Security Features

- JWT Authentication
- Password Hashing using Bcrypt
- Role Based Access Control
- Protected APIs
- Admin Authorization
- Secure REST APIs

---

## Future Enhancements

- SMS Alerts
- Email Notifications
- Push Notifications
- Satellite Image Integration
- Mobile Application
- Live Government API Integration
- AI Chatbot
- Multi-language Support
- IoT Sensor Integration
- Deep Learning Models

---

## Author

**Ajay Singh**

MCA Passout

MERN Stack Developer

---

## License

This project is developed for educational and academic purposes.

```

### I also recommend adding these files to your GitHub repository:

```
backend/
    .env.example

frontend/
    .env.example

LICENSE

.gitignore

README.md
```

This README is suitable for a **major project**, **placement portfolio**, and **GitHub**. It clearly explains the architecture, features, APIs, setup, and technologies used, making it easier for recruiters and reviewers to understand your work.