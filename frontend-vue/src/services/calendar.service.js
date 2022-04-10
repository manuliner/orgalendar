import http from "./http-common";

class CalendarService {
  create(data) {
    return http.post(`/calendar/new`, data);
  }

  update(id, data) {
    return http.put(`/calendar/${id}`, data);
  }

  delete(id) {
    return http.delete(`/calendar/${id}`);
  }

  getCalendarBySlug(id) {
    return http.get(`/calendar/${id}`);
  }
}

export default new CalendarService();
