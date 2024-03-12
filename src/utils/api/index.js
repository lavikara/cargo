export const baseUrl = "http://localhost:5000";

export const getHeaders = () => {
  let headers = {
    Authorization: "Bearer " + getItem("token"),
  };

  return headers;
};
