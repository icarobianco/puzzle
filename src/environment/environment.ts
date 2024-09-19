export const environment:any = {

    ENVIRONMENT: 'DUMMY', 
  
    firebaseConfig: {
        apiKey: "AIzaSyBkIckdcLygtOY8ixwTaNThg2wyjq5vk5c",
        authDomain: "montaretrato.firebaseapp.com",
        projectId: "montaretrato",
        storageBucket: "montaretrato.appspot.com",
        messagingSenderId: "1017533587783",
        appId: "1:1017533587783:web:97774c924a98836ac4ec62"
    },
  
    jwtSecret: "MySecretDev",
  
    token: {
      label: '',
      algorithm: '',
      digits: 0,
      period: 0
    },
  
    icons: {
      active: 'check_circle',
      inactive: 'do_not_disturb_on',
  
      buy: 'download_for_offline',
      sell: 'publish',
  
      add: 'add_circle', 
      edit: 'ink_pen',
      delete: 'delete_forever',
      attach: 'attach_file_add'
    }
    
  }