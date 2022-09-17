import { notify } from "react-notify-toast";
const uuIdv4 = require("uuid/v4");
const _ = require("lodash");
import apiError from "constants/ApiError";
import jwtDecode from "jwt-decode";
import config from "config";
import moment from "moment";

const utility = {};

/**
 * Generate a valid V4 UUID
 * @return string
 */
utility.uuid = function () {
  return uuIdv4();
};

/**
 * check string is valid or return default value
 * @param {string} value
 * @param {string} defaultValue
 *
 * @return string
 */
utility.validOrDefault = (value, defaultValue = "") => {
  if (utility.isEmpty(value) === false) {
    return _.isString(value) === true ? value : defaultValue;
  }
  return defaultValue;
};

/**
 * check variable is exit or not
 *
 * @return boolean
 */
utility.isset = function (params) {
  return typeof params !== "undefined";
};

/**
 * @description it is specific to show notification toaster
 * @param message
 */
utility.errorToaster = (msg, timePeriod, msgType) => {
  if (msgType) notify.show(msg, msgType, timePeriod ? timePeriod : 5000);
  else notify.show(msg, "error", timePeriod ? timePeriod : 5000);
};

/**
 * Check any object, array, string, number, boolean is empty or not.
 *
 * @param obj
 * @return {boolean}
 */
utility.isEmpty = function (obj) {
  if (
    obj == undefined ||
    obj == 0 ||
    obj == "0" ||
    obj === false ||
    obj == null
  ) {
    return true;
  }

  if (_.isObject(obj) && _.size(obj) === 0) {
    return true;
  }

  if (
    _.isNumber(obj) ||
    _.isBoolean(obj) ||
    _.isDate(obj) ||
    (_.isObject(obj) && _.size(obj) > 0)
  ) {
    return false;
  }

  return _.isEmpty(obj);
};

utility.isEmptyWithoutZero = function (obj) {
  if (obj == undefined || obj === false || obj == null) {
    return true;
  }

  if (_.isObject(obj) && _.size(obj) === 0) {
    return true;
  }

  if (
    _.isNumber(obj) ||
    _.isBoolean(obj) ||
    _.isDate(obj) ||
    (_.isObject(obj) && _.size(obj) > 0)
  ) {
    return false;
  }

  return _.isEmpty(obj);
};

utility.isEmptyWithoutBoolean = function (obj) {
  if (obj === undefined || obj === 0 || obj === "0" || obj === null) {
    return true;
  }

  if (_.isObject(obj) && _.size(obj) === 0) {
    return true;
  }

  if (
    _.isNumber(obj) ||
    _.isBoolean(obj) ||
    _.isDate(obj) ||
    (_.isObject(obj) && _.size(obj) > 0)
  ) {
    return false;
  }
  return _.isEmpty(obj);
};




utility.setCookie = function (name, value, min, domain = "", expiry = "") {
  let expires = "; expires=" + expiry;
  if (min) {
    let date = new Date();
    date.setTime(date.getTime() + min * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  }
  let primaryDomain = "; domain=" + domain;

  document.cookie = name + "=" + value + expires + primaryDomain + "; path=/";
};

utility.getCookie = function (name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
};

utility.removeCookie = function (name) {
  const { cookieDomain = "karomi.com" } = config;
  utility.setCookie(name, "", -1);
  return
};


utility.formatDate = function (date, formatted = false) {
  if (utility.isEmpty(date) === false) {
    if (formatted === true) {
      var newDate = date.split("-");
      date = newDate["1"] + "-" + newDate["0"] + "-" + newDate["2"];
    }
    var newDate = new Date(date.replace(/-/g, "/"));
  } else {
    var newDate = new Date();
  }

  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  var day = newDate.getDate();
  var monthIndex = newDate.getMonth();
  var year = newDate.getFullYear();

  return monthNames[monthIndex] + " " + day + ", " + year;
};

utility.dateTimeDifference = function (
  fromDate = null,
  toDate = null,
  type = ""
) {
  var diff = 0;
  toDate = toDate ? toDate : new Date();

  if (_.size(fromDate) > 0) {
    var today = new Date(toDate);
    var oldData = new Date(fromDate);

    var diffMs = today - oldData; // milliseconds between now & Christmas

    if (type === "D") {
      diff = diffMs / (60000 * 60 * 24); // days
    }

    if (type === "H") {
      diff = diffMs / (60000 * 60); // hours
    }

    if (type === "M") {
      diff = diffMs / 60000; // minutes
    }

    if (type === "S") {
      diff = Math.round(diffMs / 1000); // seconds
    }
  }

  return diff;
};

utility.btoa = function (string, unescape = false) {
  if (unescape === true) {
    return btoa(encodeURIComponent(string));
  }
  return btoa(string);
};

utility.atob = function (string) {
  return atob(string);
};

utility.getDeviceType = function () {
  let deviceType = "DESKTOP";
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    deviceType = "MOBILE";
  }
  return deviceType;
};

utility.redirectTo = function (redirectPath) {
  window.location.href = redirectPath;
};

utility.cammelCase = (str, separation = "") => {
  if (typeof str == "string") {
    let arr = str.toLowerCase().split(" ");
    let words = arr.filter((v) => v != "");
    words.forEach((w, i) => {
      words[i] = w.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1);
      });
    });
    return words.join(separation);
  } else {
    return str;
  }
};

/**
 * @description generic error displaying function
 * @param errors
 * @returns toast err msg
 */
utility.showErrorMsg = (errors = [], isPersist = false) => {
  return errors.map((error) => {
    const err = apiError[error.errCode] || error.message,
      time = isPersist ? -1 : 7000;
    utility.errorToaster(err, time);
  });
};

utility.hideErrorMessage = () => {
  notify.hide();
};

/**
 * @description conver string to lowercase
 * @param string
 * @returns string
 */

utility.lowerCase = (str) => {
  return str.toLowerCase();
};
/**
 * @description conver string to uppercase
 * @param string
 * @returns string
 */

utility.upperCase = (str) => {
  return str.toUpperCase();
};

utility.properCase = (str) => {
  const removeUnderscore = str.replace(/(\w)(_)(\w)/g, "$1 $3");
  return utility
    .lowerCase(removeUnderscore)
    .replace(/^\w|\s\w/g, utility.upperCase);
};

/**
 * @description removes specific element from array
 * @param array and value to be removed
 * @returns new array
 */
utility.arrayRemove = (arr, value) => {
  return arr.filter((ele) => {
    return ele != value;
  });
};

utility.getQueryFromUrl = () => {
  const url = window.location.search;
  return url.replace("?", "");
};
/* @description conver array  to object with array key
 * @param arr
 * @returns string
 */
utility.arrToObj = (o) => {
  const obj = {};
  o.length > 0 &&
    o.map((item) => {
      obj[item] = "";
    });
  return obj;
};


utility.isMobile = () => {
  return document.documentElement.clientWidth < 768;
};


utility.formatDateTime = (date, formt = "lll") => {
  return date ? moment(date).format(formt) : "";
};

utility.setRedirect = (url, time) => {
  return setTimeout(() => {
    window.location.href = url || "/";
  }, time || 3000);
};

utility.reloadPage = (time) => {
  return time
    ? setTimeout(() => {
      window.location.reload();
    }, time)
    : window.location.reload();
};

utility.setLocalStorage = (key, value = []) => {
  localStorage.setItem(key, JSON.stringify(value));
};

utility.getLocalStorage = (key) => {
  const _localStorage =
    localStorage.getItem(key) !== "undefined"
      ? localStorage.getItem(key)
      : null;
  return JSON.parse(_localStorage);
};

utility.deleteLocalStorage = (key) => {
  localStorage.removeItem(key);
};

utility.isArray = (a) => {
  return !!a && a.constructor === Array;
};

utility.isObject = (a) => {
  return !!a && a.constructor === Object;
};

utility.cookieExpiryTime = (token) => {
  const decodeJWT = jwtDecode(token.replace("Bearer ", ""));
  const { exp = "" } = decodeJWT;
  return new Date((exp - 300) * 1000).toGMTString();
};

// saves token to cookie
utility.saveToCookie = (token, removeOld) => {
  const expires = utility.cookieExpiryTime(token);
  const { cookieDomain = "karomi.com" } = config;
  utility.setCookie("uuid", token, false, cookieDomain, expires);
  if (removeOld) utility.removeCookie(removeOld);
};




export default utility;
