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

export const validateWebsite = (website) => {
  const prefix = "https://";
  let newUrl = "";
  const hasHttps = website.trim().toLowerCase().startsWith("https://");
  if (!hasHttps) {
    newUrl = prefix.concat(website);
  } else {
    newUrl = website;
  }
  return String(newUrl).match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
};
