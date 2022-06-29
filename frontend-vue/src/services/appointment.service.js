import http from "./http-common";

class AppointmentService {
  getAppointmentsInRange(calendarId, start, end) {
    return http.get(
      `/appointment?calendarId=${calendarId}&start=${start}&end=${end}`
    );
  }

  createAppointment(appointment) {
    return http.post(`/appointment/`, appointment);
  }

  updateAppointment(appointment) {
    return http.put(`/appointment/${appointment.id}`, appointment);
  }

  deleteAppointment(id) {
    return http.delete(`/appointment/${id}`);
  }
}

export default new AppointmentService();
