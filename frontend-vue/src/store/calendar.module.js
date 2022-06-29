import Vue from "vue";
import UserService from "../services/user.service";
//import CalendarService from "../../services/calendar.service";

function isEmptyObject(object) {
  return (
    object === null ||
    (object && // null and undefined check
      Object.keys(object).length === 0 &&
      Object.getPrototypeOf(object) === Object.prototype)
  );
}

function getLocalStorage(name) {
  let storage = localStorage.getItem(name);
  if (isEmptyObject(storage)) {
    return {};
  }

  let parsedStorage = JSON.parse(storage);
  if (isEmptyObject(parsedStorage)) {
    return {};
  } else {
    return parsedStorage;
  }
}
function setLocalStorage(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}
function setOrgaStorage(data) {
  setLocalStorage("orgalendarCalendar", data.calendar);
  setLocalStorage("orgalendarUser", data.user);
}
function getOrgaStorage() {
  return {
    calendar: getLocalStorage("orgalendarCalendar"),
    user: getLocalStorage("orgalendarUser"),
  };
}
function findUserBySlug(users, slug) {
  let index = -1;
  users.forEach((element, idx) => {
    if (element.slug === slug) {
      index = idx;
    }
  });

  return index;
}
function findCalendarBySlug(calendars, slug) {
  let index = -1;
  calendars.forEach((element, idx) => {
    if (element.slug === slug) {
      index = idx;
    }
  });

  return index;
}
export const calendar = {
  namespaced: false,
  state: {
    calendar: [],
    userNames: [],
    user: [],
  },
  getters: {
    calendars(state) {
      return state.calendar;
    },
    userNames(state) {
      return state.userNames;
    },
  },
  mutations: {
    GET_LOCAL_STORAGE: (state) => {
      let storage = getOrgaStorage();

      if (isEmptyObject(storage.calendar)) {
        storage.calendar = [];
      }
      if (isEmptyObject(storage.user)) {
        storage.user = [];
      }
      state.calendar = storage.calendar;
      state.user = storage.user;
    },
    SET_USERNAMES: (state, data) => {
      state.userNames = data.map((element) => {
        return element.name;
      });
    },
    SET_USER: (state, data) => {
      let idx = findUserBySlug(state.user, data.slug);
      if (idx === -1) {
        state.user.push(data);
      } else {
        state.user[idx] = data;
      }

      setOrgaStorage({ calendar: state.calendar, user: state.user });
    },

    ADD_CALENDAR: (state, data) => {
      let idx = findCalendarBySlug(state.calendar, data.slug);
      if (idx === -1) {
        state.calendar.push(data);
      } else {
        state.calendar[idx] = data;
      }

      setOrgaStorage({ calendar: state.calendar, user: state.user });
    },
  },
  actions: {
    getOrgaStorage: ({ commit }) => {
      commit("GET_LOCAL_STORAGE");
      return {};
    },
    setUser: ({ commit, state }, value) => {
      commit("SET_USER", value);
      return state.user;
    },
    getUser: ({ commit, state }, slug) => {
      let idx = findUserBySlug(state.calendar, slug);
      if (idx === -1) {
        Vue.$log.error("couldn't find fitting user");
        commit();
      } else {
        if (!isEmptyObject(state.user[idx])) {
          return state.user[idx];
        }

        return "";
      }
    },
    fetchUsers: ({ commit, state }, slug) => {
      let idx = findCalendarBySlug(state.calendar, slug);
      if (idx === -1) {
        return state.user;
      }

      UserService.getCalendarUsers(state.calendar[idx].id)
        .then((response) => {
          const payload = response.data;

          commit("SET_USERNAMES", payload.data);
          return state.userNames;
        })
        .catch((e) => {
          Vue.$log.error(e);
          return state.userNames;
        });
    },

    addCalendar: ({ commit, state }, value) => {
      commit("ADD_CALENDAR", value);
      return state.calendar;
    },

    getCalendarID: ({ commit, state }, slug) => {
      let idx = findCalendarBySlug(state.calendar, slug);
      if (idx === -1) {
        Vue.$log.error("getCalendarID");
        commit();
        return;
      }

      return state.calendar[idx].id;
    },
  },
};
