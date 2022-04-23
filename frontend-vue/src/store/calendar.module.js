import Vue from "vue";

function isEmptyObject(object) {
  return (
    object === null ||
    (object && // null and undefined check
      Object.keys(object).length === 0 &&
      Object.getPrototypeOf(object) === Object.prototype)
  );
}

function getLocalStorage(name) {
  let parsedStorage = JSON.parse(localStorage.getItem(name));
  if (isEmptyObject(parsedStorage)) {
    return {};
  } else {
    return parsedStorage;
  }
}
function setLocalStorage(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}
function getOrgaStorage() {
  let user = getLocalStorage("orgalendarUser");
  let calendar = getLocalStorage("orgalendarCalendar");

  return { user, calendar };
}
export const calendar = {
  namespaced: false,
  state: {
    user: {},
    calendar: {},
  },
  getters: {
    user(state) {
      return state.user;
    },
    calendars(state) {
      return state.calendar;
    },
  },
  mutations: {
    GET_LOCAL_STORAGE: (state) => {
      let { user, calendar } = getOrgaStorage();
      state.user = user;
      state.calendar = calendar;
    },
    SET_USER: (state, data) => {
      setLocalStorage("orgalendarUser", data);
      state.user = data;
    },
    SET_CALENDAR: (state, data) => {
      setLocalStorage("orgalendarCalendar", data);
      state.calendar = data;
    },
  },
  actions: {
    getLocalStorage: ({ commit }) => {
      Vue.$log.debug("retrieve local storage if available");
      commit("GET_LOCAL_STORAGE");
      return {};
    },
    setUser: ({ commit, state }, value) => {
      Vue.$log.debug(value);
      commit("SET_USER", value);
      return state.user;
    },
    setCalendar: ({ commit, state }, value) => {
      Vue.$log.debug(value);
      commit("SET_CALENDAR", value);
      return state.calendar;
    },
  },
};
