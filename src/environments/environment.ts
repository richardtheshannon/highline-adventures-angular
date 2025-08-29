export const environment = {
  production: false,
  firebase: {
    apiKey: 'PLACEHOLDER_FOR_LOCAL_DEV',
    authDomain: 'daily-mainfest.firebaseapp.com',
    projectId: 'daily-mainfest',
    storageBucket: 'daily-mainfest.appspot.com',
    messagingSenderId: '123456789',
    appId: 'your-firebase-app-id'
  },
  googleCalendar: {
    apiKey: 'PLACEHOLDER_FOR_LOCAL_DEV', // Set actual key in Railway environment variables
    calendarId: 'richard@highlineadventures.com'
  },
  vapid: {
    publicKey: 'BGS4tXQG9Tzi9fiwQecOGfrjkyI6WLD_m92EdPd89j9S1-aP2eU6qzso3uY_9pk8kBiOIeK_gQ1e6iz-hLYTalI'
  },
  functionsBaseUrl: 'https://us-central1-daily-mainfest.cloudfunctions.net'
};