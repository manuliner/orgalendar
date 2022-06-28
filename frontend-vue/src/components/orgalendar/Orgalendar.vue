<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" @click="setToday"> Heute </v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer />
          <v-menu bottom right>
            <template #activator="{ on, attrs }">
              <v-btn outlined v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[viewType] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="viewType = 'day'">
                <v-list-item-title>{{ typeToLabel["day"] }}</v-list-item-title>
              </v-list-item>
              <v-list-item @click="viewType = 'week'">
                <v-list-item-title>{{ typeToLabel["week"] }}</v-list-item-title>
              </v-list-item>
              <v-list-item @click="viewType = 'month'">
                <v-list-item-title>{{
                  typeToLabel["month"]
                }}</v-list-item-title>
              </v-list-item>
              <v-list-item @click="viewType = '4day'">
                <v-list-item-title>{{ typeToLabel["4day"] }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="calendarDate"
          :events="appointments"
          :event-color="getAppointmentDay"
          :event-ripple="true"
          :type="viewType"
          :interval-format="intervalFormat"
          @change="onChange"
          @click:more="jumpToDayView"
          @click:date="jumpToDayView"
          @mouseenter:event="isAppointmentHovered = true"
          @mouseleave:event="isAppointmentHovered = false"
          @mousedown:event="onAppointmentMouseDown"
          @mouseup:event="onAppointmentMouseUp"
          @mousedown:time="onTimeMouseDown"
          @mousemove:time="onTimeMouseMove"
          @mouseup:time="onTimeMouseUp"
          @mouseleave.native="onMouseLeave"
        >
          <template #event="{ event, timed, eventSummary }">
            <div class="v-event-draggable" v-html="eventSummary()" />
            <div
              v-if="timed"
              class="v-event-drag-bottom"
              @mousedown.stop="onAppointmentBottomMouseDown(event)"
            />
          </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import AppointmentHelper from "../../helpers/appointment.helper";

export default {
  name: "CalendarView",
  components: {},
  props: {
    appointments: {
      type: Array,
    },
    repeatation: {
      type: Array,
    },
    colors: {
      type: Array,
    },
    defaultEventDuration: {
      type: Number,
      default: 3600000,
    },
  },

  data: () => ({
    isAppointmentHovered: false,
    calendarDate: "",
    typeToLabel: {
      month: "Monat",
      week: "Woche",
      day: "Tag",
      "4day": "4 Tage",
    },
    deleteInProgress: false,
    viewType: "4day",
    appointmentX: 0,
    appointmentY: 0,

    draggedAppointment: null,
    createdAppointment: null,
    extendedAppointment: null,
    mouseOnAppointmentDownTime: null,
    mouseOnTimeDownTime: null,
    extendEndOriginal: null,
  }),
  watch: {
    isModifiedAppointmentDialogOpen(vake) {
      this.$log.info(vake);
    },
  },
  beforeCreate() {
    // add current  orgalendar to local storage
    /* CalendarService.getCalendarBySlug(this.$route.params.slug)
 .then(response => {
   const payload = response.data
   this.$store.dispatch('setCalendar', payload.data)
   if (!this.isUserSelected()) this.fetchAllUser()
 })
 .catch(e => {
   this.$log.error(e)
   this.$router.push({
     name: 'Start',
   })
 })
 */
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    fetchAllUser() {
      //  const calendar = this.$store.getters.calendar
      /* UserService.getCalendarUsers(calendar.id)
   .then(response => {
     const payload = response.data
     this.users = []
     payload.data.forEach(element => {
       this.users.push(element)
     })
   })
   .catch(e => {
     this.$log.error(e)
     this.$router.push({
       name: 'Start',
     })
   })
   */
    },
    isUserSelected() {
      const user = this.$store.getters.user;
      const calendar = this.$store.getters.calendar;
      if (user.calendarId !== calendar.id) {
        this.$router.push({
          name: "ChooseUser",
          params: { slug: this.$router.currentRoute.params.slug },
        });
        return false;
      }
      return true;
    },
    intervalFormat(interval) {
      return interval.time;
    },
    jumpToDayView({ date }) {
      this.calendarDate = date;
      this.viewType = "day";
    },
    getAppointmentDay(event) {
      return event.color;
    },
    setToday() {
      this.calendarDate = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    isClick(time) {
      return new Date() - time <= 150;
    },
    isDrag(time) {
      return new Date() - time > 150;
    },
    onChange(timeRange) {
      this.$emit("onDateRangeChange", timeRange);
    },
    clearAll() {
      this.$log.info();
      this.dragTime = null;

      this.draggedAppointment = null;
      this.createdAppointment = null;
      this.extendedAppointment = null;
      this.extendEndOriginal = null;
      this.extendStart = null;
    },
    onAppointmentClick(data) {
      this.$log.info();
      this.draggedAppointment = null;

      this.selectedAppointment = data.event;

      data.nativeEvent.preventDefault();
      data.nativeEvent.stopPropagation();

      const dataOut = {
        appointment: data.event,
        x: data.nativeEvent.clientX,
        y: data.nativeEvent.clientY,
      };

      this.$emit("onAppointmentClick", dataOut);
    },
    onAppointmentMouseDown(data) {
      // grab and move appointment
      this.$log.info();
      this.mouseOnAppointmentDownTime = new Date(); // cache time for click detection

      if (data.event && data.timed) {
        // startAppointmentDrag
        this.startAppointmentDragAppointment(data.event);
      }
    },
    onAppointmentMouseUp(data) {
      // handle click detection
      this.$log.info();
      if (this.isClick(this.mouseOnAppointmentDownTime)) {
        this.onAppointmentClick(data);
      } else if (this.draggedAppointment) {
        this.endAppointmentDrag();
      } else if (this.extendedAppointment) {
        this.endAppointmentExtend();
      }
    },
    onTimeMouseDown(tms) {
      this.$log.info();
      this.mouseOnTimeDownTime = new Date();
      const timeAtMousePos = this.dateToTime(tms);

      if (this.draggedAppointment && this.dragTime === null) {
        this.startAppointmentDragTime(timeAtMousePos);
      }
    },
    onTimeMouseMove(tms) {
      this.$log.info();
      const timeAtMousePos = this.dateToTime(tms);

      if (
        this.draggedAppointment &&
        this.dragTime !== null &&
        this.isDrag(this.mouseOnAppointmentDownTime)
      ) {
        this.dragAppointment(timeAtMousePos);
      } else if (this.extendedAppointment && this.extendStart !== null) {
        this.extendAppointment(timeAtMousePos);
      }
    },
    onTimeMouseUp(tms) {
      this.$log.info();
      if (this.isClick(this.mouseOnTimeDownTime)) {
        if (this.isEditAppointmentDialogOpen) {
          this.onEditAppointmentCloseFail();
          return;
        }
        this.createAppointment(this.dateToTime(tms));
      }
      if (this.draggedAppointment) {
        this.endAppointmentDrag();
      }
      if (this.extendedAppointment) {
        this.endAppointmentExtend();
      }
    },
    onMouseLeave() {
      if (this.extendedAppointment) {
        if (this.extendEndOriginal) {
          this.extendedAppointment.end = this.extendEndOriginal;
        } else {
          const i = this.appointments.indexOf(this.extendedAppointment);
          if (i !== -1) {
            // TODO: REMOVE APPOIOTUINMENT  this.appointments.splice(i, 1)
          }
        }
      }
      this.clearAll();
    },
    onAppointmentBottomMouseDown(appointment) {
      this.$log.info();
      this.startAppointmentExtend(appointment);
    },
    startAppointmentDragAppointment(appointment) {
      this.$log.info();
      this.draggedAppointment = appointment;
      this.dragTime = null;
      this.extendEndOriginal = null;
    },
    startAppointmentDragTime(timeAtMousePos) {
      this.$log.info();

      const start = this.draggedAppointment.start;
      this.dragTime = timeAtMousePos - start;
    },
    dragAppointment(timeAtMousePos) {
      this.$log.info();
      if (this.isEditAppointmentDialogOpen) {
        this.onEditAppointmentCloseFail();
      }
      // grab existing event end extend const start = this.draggedAppointment.start
      const start = this.draggedAppointment.start;
      const end = this.draggedAppointment.end;
      const duration = end - start;
      const newStartTime = timeAtMousePos - this.dragTime;
      const newStart = this.roundTime(newStartTime);
      const newEnd = newStart + duration;
      this.draggedAppointment.start = newStart;
      this.draggedAppointment.end = newEnd;
    },
    endAppointmentDrag() {
      this.$log.info();
      this.updateAppointment(this.draggedAppointment);
      this.clearAll();
    },
    startAppointmentExtend(appointment) {
      this.$log.info();
      if (this.isEditAppointmentDialogOpen) {
        this.onEditAppointmentCloseFail();
      }
      this.extendedAppointment = appointment;

      this.extendStart = appointment.start;
      this.extendEndOriginal = appointment.end;
    },
    extendAppointment(timeAtMousePos) {
      this.$log.info();
      const mouseRounded = this.roundTime(timeAtMousePos, false);
      const min = Math.min(mouseRounded, this.extendStart);
      const max = Math.max(mouseRounded, this.extendStart);
      this.extendedAppointment.start = min;
      this.extendedAppointment.end = max;
    },
    endAppointmentExtend() {
      this.$log.info();
      this.updateAppointment(this.extendedAppointment);
      this.clearAll();
    },
    roundTime(time, down = true) {
      const roundTo = 15;
      const roundDownTime = roundTo * 60 * 1000;

      return down
        ? time - (time % roundDownTime)
        : time + (roundDownTime - (time % roundDownTime));
    },
    dateToTime(tms) {
      return new Date(
        tms.year,
        tms.month - 1,
        tms.day,
        tms.hour,
        tms.minute
      ).getTime();
    },

    createAppointment(timeAtMousePos) {
      this.$log.info();
      const start = this.roundTime(timeAtMousePos);
      const end = start + this.defaultEventDuration;
      this.$emit("onCreateAppointment", AppointmentHelper.create(start, end));
    },
    updateAppointment(appointment) {
      this.$log.info();
      this.$emit("onUpdateAppointment", appointment);
    },
    deleteAppointment(appointment) {
      this.$log.info();
      this.$emit("onDeleteAppointment", appointment);
    },
    getAppointmentArrayPos(id) {
      for (let i = 0; i < this.appointments.length; i++) {
        if (this.appointments[i].id === id) {
          return i;
        }
      }
      return 0;
    },
  },
};
</script>
<style scoped lang="scss">
.v-event-draggable {
  padding-left: 6px;
}

.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
}

.v-event-drag-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 4px;
  cursor: ns-resize;

  &::after {
    display: none;
    position: absolute;
    left: 50%;
    height: 4px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    width: 16px;
    margin-left: -8px;
    opacity: 0.8;
    content: "";
  }

  &:hover::after {
    display: block;
  }
}
</style>
