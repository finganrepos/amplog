const appConfigs = {
    multi: true,
    default_lang: 'ar',
    name: 'مرحباً',
    menu: [{label: 'الرئيسية', to: '/'},{ label: 'عربي', to:'/arab'}]
  }
  
  const firebaseConfig = {
    apiKey: 'AIzaSyBzIFD_Dfw_hVYEHZKLEjrwFsJcgKm0Zkc',
    projectId: 'econnect-596bd',
    databaseURL: 'https://econnect-596bd.firebaseio.com',
    authDomain: 'econnect-596bd.firebaseapp.com',
    storageBucket: 'econnect-596bd.appspot.com'
  }
  
  export { appConfigs, firebaseConfig }