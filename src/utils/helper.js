/**
 *
 * This utility is used for have the common feature functions which will use in the application like JWT, formatClass or others
 * @class Helper
 */
import utility from "./utility";
import { isEmpty, keyBy, isUndefined, map } from "lodash";
import jwtDecode from "jwt-decode";

class Helper {
  escapeRegExp = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  setSearch = (searchTerm = "", arr = []) => {
    const _searchTerm = this.escapeRegExp(searchTerm.replace(/\s/g, ""));
    const term = new RegExp(_searchTerm, "i");
    let _searchFilter = arr;
    if (!isEmpty(searchTerm)) {
      _searchFilter = arr.filter((item) => {
        return item.searchKey.search(term) !== -1;
      });
    }
    return _searchFilter;
  };

  /**
   *
   * Get the User obj from JWT token
   * @memberof Helper
   */
  getUserInfoFromJwt = () => {
    try {
      let jwtToken = utility.getCookie("uuid");
      if (window.location.pathname.includes('admin')) {
        jwtToken = utility.getCookie("a_uuid");
      }
      const decodedJwtToken = jwtDecode(jwtToken.replace("Bearer ", ""));
      return JSON.parse(decodedJwtToken["sub"]);
    } catch (error) {
      return {};
    }
  };
  setJwtAsUUID = (token, name = "uuid") => {
    try {
      utility.setCookie(name, `Bearer ${token}`, 1440);
    } catch (error) {
      return {};
    }
  };
  setEmpId = (id, name) => {
    try {
      utility.setCookie(name, `${id}`, 1440);
    } catch (error) {
      return {};
    }
  };

  getJwtToken = (id = "uuid") => {
    let key = id;
    if (window.location.pathname.includes('admin')) {
      key = 'a_uuid';
    }
    return utility.getCookie(key);
  };

  /**
   * Create classNames string to base class if conditions in config object evaluate to be true.
   */
  classNames = (baseClass, config) => {
    let _key;
    const classNames = [baseClass];
    for (_key in config) {
      if (config.hasOwnProperty(_key)) {
        if (config[_key]) {
          classNames.push(_key);
        }
      }
    }
    return classNames.join(" ").trim();
  };

  formatPrice = (number, curr, noStyle) => {
    if (noStyle) {
      return new Intl.NumberFormat("en-IN").format(number);
    }
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: curr ? curr : "INR",
    }).format(number);
  };

  scrollToTop = (payload) => {
    window.scrollTo({
      top: payload.top,
      behavior: "smooth",
    });
  };

  /**
   * Deep clones an object.
   * @param payload
   */
  deepClone = (payload) => {
    return JSON.parse(JSON.stringify(payload));
  };

  convertToMultiSelectOptions = (data) => {
    const _map = [];
    data.forEach((item) => {
      _map.push({
        value: item.value,
        label: item.displayLabel,
      });
    });
    return _map;
  };
}
const helper = new Helper();

Object.freeze(helper);

export default helper;
