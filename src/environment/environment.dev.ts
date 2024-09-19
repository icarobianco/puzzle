export const environment:any = {

    ENVIRONMENT: 'DEV', 
  
    firebaseConfig: {
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: ""
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