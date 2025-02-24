const getConfigObj = () => {
    const env =  "development";
    switch (env) {
      
      default:
        return {
          API: {
            baseURL: "http://localhost:3000" 
            // baseURL: "https://expense-backend-gymb.onrender.com"
          }
        };
    }
  };
  
  const config = getConfigObj();
  
  export default config;
  