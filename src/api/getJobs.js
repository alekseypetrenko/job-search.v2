import axios from "axios";

const getJobs = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  await axios.get(`${baseUrl}/jobs`);
};

export default getJobs;
