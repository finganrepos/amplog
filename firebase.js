import firebase from 'firebase/app'
import 'firebase/firestore'

const firestoreConfig = {
    apiKey: 'AIzaSyBzIFD_Dfw_hVYEHZKLEjrwFsJcgKm0Zkc',
    projectId: 'econnect-596bd',
    databaseURL: 'https://econnect-596bd.firebaseio.com',
    authDomain: 'econnect-596bd.firebaseapp.com'
}
  
const firestoreSettings = { timestampsInSnapshots: true }

if (!firebase.apps.length) {
    firebase.initializeApp(firestoreConfig);
    firebase.firestore().settings(firestoreSettings);
}

export default firebase
