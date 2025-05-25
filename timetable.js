const admin = require('firebase-admin');
const serviceAccount = require('./DTI.json'); // Path to your service account key
const axios = require('axios'); // Modern alternative to 'request'
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
// Initialize Firebase
try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase initialized successfully!');
} catch (error) {
    console.error('Error initializing Firebase:', error);
    process.exit(1); // Exit the script if Firebase initialization fails
}

// Initialize Firestore
const db = admin.firestore();

// Timetable data
const timetables = [
    {
        year: "1",
        branch: "cse",
        section: "A",
        timetable: [
            {
                time: "9:00 AM - 10:00 AM",
                monday: "Math",
                tuesday: "Physics",
                wednesday: "Chemistry",
                thursday: "Math",
                friday: "Physics",
                saturday: "Lab"
            }
        ]
    },
    {
        year: "2",
        branch: "cse",
        section: "B",
        timetable: [
            {
                time: "10:00 AM - 11:00 AM",
                monday: "Physics",
                tuesday: "Chemistry",
                wednesday: "Math",
                thursday: "Physics",
                friday: "Chemistry",
                saturday: "Math"
            }
        ]
    }
];
const firebaseConfig = {
    apiKey: "AIzaSyD5NPfSNedNHTNriM14soBMz2Sa17e04uw",
    authDomain: "posnidti.firebaseapp.com",
    projectId: "posnidti",
    storageBucket: "posnidti.firebasestorage.app",
    messagingSenderId: "421688629086",
    appId: "1:421688629086:web:fc6d453253af1214a361cf"
};
// Function to upload timetables
function uploadTimetables() {
    for (const timetable of timetables) {
        db.collection('timetables').add(timetable)
            .then((docRef) => {
                console.log(`Timetable added with ID: ${docRef.id}`);
            })
            .catch((error) => {
                console.error(`Error adding timetable: ${error}`);
            });
    }
}

// Call the function to upload timetables
uploadTimetables();
