// import * as CryptoJS from "crypto-js";
import { useAuthStore } from "@/stores/authStore";
import { useBaseStore } from "@/stores/baseStore";

export const isNumber = (evt) => {
  evt = evt ? evt : window.event;
  let charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode === 190) return true;
  if (
    (charCode < 48 && charCode !== 46) ||
    (charCode > 57 && charCode !== 46)
  ) {
    evt.preventDefault();
  } else {
    return true;
  }
};

export const addCommaToNumber = (number) => {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export const emailValidation = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const capitalize = (string) => {
  if (!string) return;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatAmount = (amount, decimal, currency) => {
  if (amount === undefined) return;
  const value = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: decimal,
    currencyDisplay: "narrowSymbol",
  });
  return value.format(amount);
};

export const formatISODate = (date) => {
  if (!date) return "";
  let currentdate = new Date(date);

  let datetime =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate();

  return datetime;
};

export const formatToStringDate = (date, hideDay) => {
  if (!date) return "";
  let datetime = "";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentdate = new Date(date);
  if (hideDay) {
    datetime =
      currentdate.getDate() +
      " " +
      months[currentdate.getMonth()] +
      ", " +
      currentdate.getFullYear();
  } else {
    datetime =
      days[currentdate.getDay()] +
      ", " +
      currentdate.getDate() +
      " " +
      months[currentdate.getMonth()] +
      " " +
      currentdate.getFullYear();
  }

  return datetime;
};

export const compairObj = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const truncate = (text, length) => {
  if (!text) return "Nill";
  if (text.length > length) {
    return text.slice(0, length) + "...";
  } else {
    return text;
  }
};

export const removeCamelCase = (value) => {
  if (!value) return "";
  return value.replace(/[A-Z]/g, (str) => " " + str.toLowerCase());
};

export const removeDash = (value) => {
  if (!value) return "";
  if (!value.includes("-")) return value;
  const splitValue = value.split("-");
  if (splitValue.length === 1) return splitValue;
  return splitValue.join(" ");
};

export const validateEmail = (email) => {
  if (!email) return false;

  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePassword = (password) => {
  const baseStore = useBaseStore();

  if (!password) {
    baseStore.showToast({
      description: "Please enter password",
      display: true,
      type: "error",
    });

    return false;
  }

  if (password.length < 8) {
    baseStore.showToast({
      description: "Please enter password of 8 characters",
      display: true,
      type: "error",
    });

    return false;
  }

  return true;
};

// export const encryptPayload = (formData) => {
//   const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_APP_ENCRYPTION_KEY);
//   const iv = CryptoJS.enc.Utf8.parse(
//     import.meta.env.VITE_APP_ENCRYPTION_SECRET
//   );

//   const postDataObj = JSON.stringify(formData);
//   const encryptedData = CryptoJS.AES.encrypt(
//     CryptoJS.enc.Utf8.parse(postDataObj),
//     key,
//     {
//       keySize: 128 / 8,
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     }
//   );
//   const payload = encryptedData.toString();
//   const formSending = {
//     requestParam: payload,
//   };
//   return formSending;
// };

// export const decryptPayload = (payload) => {
//   const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_APP_ENCRYPTION_KEY);
//   const iv = CryptoJS.enc.Utf8.parse(
//     import.meta.env.VITE_APP_ENCRYPTION_SECRET
//   );

//   const decryptedData = CryptoJS.AES.decrypt(payload, key, {
//     keySize: 128 / 8,
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7,
//   });
//   const decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);
//   const decryptedObj = JSON.parse(decryptedText);

//   return decryptedObj;
// };
