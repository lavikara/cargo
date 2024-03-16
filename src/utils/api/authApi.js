import client, { baseUrl } from ".";

export default {
  login(payload) {
    return client.post(`${baseUrl}/auth/login`, payload);
  },

  register(payload) {
    return client.post(`${baseUrl}/auth/register`, payload);
  },

  registerIndividual(payload) {
    return client.post(`${baseUrl}/auth/register/individual`, payload);
  },

  submitKyc(payload, userId) {
    return client.patch(`${baseUrl}/auth/register/kyc/${userId}`, payload);
  },

  forgotPassword(payload) {
    return client.post(`${baseUrl}/auth/forgot-password`, payload);
  },

  requestEmailToken(email) {
    return client.get(`${baseUrl}/auth/request-email-token/${email}`);
  },
};
