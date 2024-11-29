import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/all`);
  console.log("full url: ", request);
  return request.then((response) => response);
};

export default { getAll };
