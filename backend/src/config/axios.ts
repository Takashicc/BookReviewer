import axios from "axios";
import qs from "qs";

function paramsSerializer(params: any) {
  return qs.stringify(params);
}

axios.interceptors.request.use((config) => {
  return { ...config, paramsSerializer };
});

export default axios;
