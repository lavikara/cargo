import axios from "axios";
import { baseUrl } from ".";

export default {
  login(payload) {
    return axios.post(`${baseUrl}/auth/login`, payload);
  },

  register(payload) {
    return axios.post(`${baseUrl}/auth/register`, payload);
  },

  registerIndividual(payload) {
    return axios.post(`${baseUrl}/auth/register/individual`, payload);
  },

  submitKyc(payload, userId) {
    return axios.patch(`${baseUrl}/auth/register/kyc/${userId}`, payload);
  },
};
