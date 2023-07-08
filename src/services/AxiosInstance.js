import axios from "axios";
const AxiosInstance = axios.create({
    baseURL: 'https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/'
  });
export default AxiosInstance