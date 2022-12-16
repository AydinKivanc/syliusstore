import axios from "axios";

const useApi = () => {
  const baseApiUrl = "https://ecommerce-api.udemig.dev/api/v2/";

  axios.defaults.baseURL = baseApiUrl;

  const token = localStorage.getItem("token");

  axios.defaults.headers.common["accept"] = "application/json"; //  apide TAXON ALTINDA Taxon collection response Media type application/json OLARAK AYARLADIK KI GEREKSIZ BILGILER GELMESIN

  if (token) {
    console.log(">>> There is Token", token);

    // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;     api de bakildi bearer a gerek yokmus
    axios.defaults.headers.common["Authorization"] = token;
  }

  return axios;
};

export default useApi;
