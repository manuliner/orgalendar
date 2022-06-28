import http from "./http-common";

class UserService {
  createUser(data) {
    return http.post(`/user`, data);
  }

  getUsersBySlug(slug) {
    return http.get(`/user/bySlug?slug=${slug}`);
  }

  isUserNameTaken(calendarId, userName) {
    return http.get(`/user/exists?calendarId=${calendarId}&user=${userName}`);
  }
}

export default new UserService();
