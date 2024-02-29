import { API_PATH } from "../constants";
import instance from "./index";

const Province = (query) =>
  instance.get(API_PATH.ADDRESS.PROVINCE, { params: query });
const District = (province) =>
  instance.get(API_PATH.ADDRESS.DISTRICT, { params: province });
export default {
  Province,
  District,
};
