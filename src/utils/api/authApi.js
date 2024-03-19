import client from ".";

export default {
  login(payload) {
    return client.post(`/auth/login`, payload);
  },

  register(payload) {
    return client.post(`/auth/register`, payload);
  },

  registerIndividual(payload) {
    return client.post(`/auth/register/individual`, payload);
  },

  submitKyc(payload, userId) {
    return client.patch(`/auth/register/kyc/${userId}`, payload);
  },

  forgotPassword(payload) {
    return client.post(`/auth/forgot-password`, payload);
  },

  requestEmailToken(email) {
    return client.get(`/auth/request-email-token/${email}`);
  },

  verifyEmail(token, email) {
    return client.get(`/auth/verify/${token}/${email}`);
  },

  resetPassword(payload) {
    return client.post(`/auth/reset-password`, payload);
  },

  addMembers(payload, userId) {
    return client.patch(`/auth/register/invite-team/${userId}`, payload);
  },
};
