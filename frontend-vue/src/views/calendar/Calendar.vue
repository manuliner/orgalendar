<template>
  <section id="calendar">
    <v-sheet class="px-10">
      <orgalendar
        :repeatation="repeatation"
        :colors="colors"
        :appointments="appointments"
        @onDateRangeChange="onDateRangeChange"
        @onUpdateAppointment="onUpdateAppointment"
        @onCreateAppointment="onCreateAppointment"
        @onAppointmentClick="onAppointmentClick"
      />
      <edit-appointment-dialog
        :x="appointmentX"
        :y="appointmentY"
        :open-dialog="isEditAppointmentDialogOpen"
        :event-data="editAppointment"
        :avail-persons="users"
        @OnDelete="onEditAppointmentDelete"
        @OnCloseSuccess="onEditAppointmentCloseSuccess"
        @OnCloseFail="onEditAppointmentCloseFail"
      />
    </v-sheet>
  </section>
</template>

<script>
  import Orgalendar from '../../components/orgalendar/Orgalendar.vue'
  import EditAppointmentDialog from '../../components/orgalendar/EditAppointmentDialog.vue'
  export default {
    name: 'CalendarView',
    components: { Orgalendar, EditAppointmentDialog },
    data: () => ({
      appointments: [],
      repeatation: ['Einmalig', 'Täglich', 'Wöchentlich', 'Monatlich'],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      isEditAppointmentDialogOpen: false,
      users: [],
      editAppointment: {},
      appointmentX: 0,
      appointmentY: 0,
    }),

    beforeCreate () {},
    mounted () {},
    methods: {
      onDateRangeChange () {
        this.$log.debug()
      },
      onUpdateAppointment (updatedAppointment) {
        this.$log.debug(updatedAppointment)
      },
      onCreateAppointment (newAppointment) {
        this.$log.debug(newAppointment)
        this.appointments.push(newAppointment)
      },
      onAppointmentClick (data) {
        this.$log.debug(data)
        this.editAppointment = data.appointment
        this.appointmentX = data.appointmentX
        this.appointmentY = data.appointmentY
        this.openEditAppointmentDialog()
      },
      onEditAppointmentCloseSuccess () {
        this.$log.info()
        this.updateAppointment(this.selectedAppointment)
        this.closeEditAppointmentDialog()
      },
      onEditAppointmentCloseFail () {
        this.$log.info()
        if (!this.deleteInProgress) {
          this.updateAppointment(this.cachedAppointment, false)
        }
        this.closeEditAppointmentDialog()
      },
      onEditAppointmentDelete () {
        this.deleteAppointment(this.selectedAppointment)
      },
      closeEditAppointmentDialog () {
        this.isEditAppointmentDialogOpen = false
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            this.selectedAppointment = {}
            this.cachedAppointment = {}
          }),
        )
      },
      openEditAppointmentDialog () {
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            this.isEditAppointmentDialogOpen = true
          }),
        )
      },
      onModifiedAppointmentDialogCloseSuccess (which) {
        this.$log.info()
        switch (which) {
          case 'Diesen Termin':
            break
          case 'Alle Termine':
            break
        }
        this.updateAppointment(this.selectedAppointment)
        this.closeModifiedAppointmentDialog()
      },
      onModifiedAppointmentDialogCloseFail () {
        this.$log.info()
        this.updateAppointment(this.cachedAppointment, false, false)
        this.closeModifiedAppointmentDialog()
      },
      closeModifiedAppointmentDialog () {
        this.isModifiedAppointmentDialogOpen = false
      },
      openModifiedAppointmentDialog () {
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            this.isModifiedAppointmentDialogOpen = true
          }),
        )
      },
    },
  }
</script>
<style scoped lang="scss"></style>
