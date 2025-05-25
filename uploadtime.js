const admin = require('firebase-admin');
const serviceAccount = require('./DTI.json'); // Path to your service account key
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase
try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log('🔥 Firebase initialized successfully!');
} catch (error) {
    console.error('❌ Error initializing Firebase:', error);
    process.exit(1); // Exit if Firebase initialization fails
}

// Initialize Firestore
const db = getFirestore();

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

// Function to upload timetables (creates collection if missing)
async function uploadTimetables() {
    for (const timetable of timetables) {
        const docId = `${timetable.year}-${timetable.branch}-${timetable.section}`; // Unique ID
        try {
            // Set the document (create if it doesn't exist, update if it does)
            await db.collection('timetables').doc(docId).set(timetable, { merge: true });

            console.log(`✅ Timetable uploaded: ${docId}`);
        } catch (error) {
            console.error(`❌ Error uploading ${docId}:`, error);
        }
    }
}

// Call the function
uploadTimetables();
