import helperMixin from '../../../js/backend/mixins/helperMixin'

export default {
  mixins: [helperMixin],

  data: () => ({
  }),

  methods: {
    getSettingsSchedule () {
      let weekSchedule = this.$root.settings.weekSchedule
      let weekDayList = []

      // set week schedule from settings
      weekSchedule.forEach(function (weekDay, index) {
        let timeOutList = []

        // set breaks
        weekDay.breaks.forEach(function (breakItem) {
          timeOutList.push({
            id: null,
            startTime: breakItem.time[0] + ':00',
            endTime: breakItem.time[1] + ':00'
          })
        })

        // set periods
        let periodList = []

        if (weekDay.time[0] !== null && weekDay.time[1] !== null) {
          // check if periods exist in settings
          if (!('periods' in weekDay)) {
            periodList.push({
              id: null,
              startTime: weekDay.time[0] + ':00',
              endTime: weekDay.time[1] + ':00',
              serviceIds: [],
              periodServiceList: [],
              savedPeriodServiceList: []
            })
          } else {
            weekDay.periods.forEach(function (periodItem) {
              periodList.push({
                id: null,
                startTime: periodItem.time[0] + ':00',
                endTime: periodItem.time[1] + ':00',
                serviceIds: [],
                periodServiceList: [],
                savedPeriodServiceList: []
              })
            })
          }
        }

        if (weekDay.time[0] && weekDay.time[1]) {
          weekDayList.push(
            {
              dayIndex: index + 1,
              id: null,
              startTime: weekDay.time[0] + ':00',
              endTime: weekDay.time[1] + ':00',
              periodList: periodList,
              timeOutList: timeOutList
            }
          )
        }
      })

      return weekDayList
    },

    getInitEntitySettings (type) {
      let entitySettings = {
        general: {
          minimumTimeRequirementPriorToCanceling: null,
          redirectUrlAfterAppointment: null
        },
        payments: {
          onSite: this.$root.settings.payments.onSite,
          wc: {
            productId: this.$root.settings.payments.wc.productId
          },
          payPal: {
            enabled: this.$root.settings.payments.payPal.enabled
          },
          stripe: {
            enabled: this.$root.settings.payments.stripe.enabled
          }
        },
        zoom: {
          enabled: this.$root.settings.zoom.enabled
        }
      }

      switch (type) {
        case ('service'):
          entitySettings.general.defaultAppointmentStatus = null
          entitySettings.general.numberOfDaysAvailableForBooking = 0
          entitySettings.general.minimumTimeRequirementPriorToBooking = null

          break
        case ('event'):

          break
      }

      return entitySettings
    },

    setEntitySettings (entity, type) {
      entity.settings = entity.settings !== null ? JSON.parse(entity.settings) : this.getInitEntitySettings(type)

      this.addMissingObjectProperties(entity.settings, this.getInitEntitySettings(type))
    },

    updateSettings (entitySettingsJson) {
      if (this.$root.clonedSettings.payments.onSite && !this.$root.clonedSettings.payments.stripe.enabled && !this.$root.clonedSettings.payments.payPal.enabled && !this.$root.clonedSettings.payments.wc.enabled) {
        return
      }

      if (this.$root.clonedSettings.payments.wc.enabled === false && entitySettingsJson !== null) {
        let entitySettings = JSON.parse(entitySettingsJson)

        entitySettings.payments.wc = this.$root.clonedSettings.payments.wc

        if (!this.$root.clonedSettings.payments.onSite) {
          entitySettings.payments.onSite = this.$root.clonedSettings.payments.onSite
        }

        if (!this.$root.clonedSettings.payments.payPal.enabled) {
          entitySettings.payments.payPal = this.$root.clonedSettings.payments.payPal
        }

        if (!this.$root.clonedSettings.payments.stripe.enabled) {
          entitySettings.payments.stripe = this.$root.clonedSettings.payments.stripe
        }

        if (!entitySettings.payments.onSite && !entitySettings.payments.payPal.enabled && !entitySettings.payments.stripe.enabled) {
          entitySettings.payments = this.$root.clonedSettings.payments
        }

        entitySettingsJson = JSON.stringify(entitySettings)
      }

      if (this.$root.clonedSettings.payments.wc.enabled === true && entitySettingsJson !== null) {
        let entitySettings = JSON.parse(entitySettingsJson)

        if (!('payments' in entitySettings)) {
          entitySettings.payments = {}
        }

        entitySettings.payments.onSite = this.$root.clonedSettings.payments.onSite
        entitySettings.payments.stripe = this.$root.clonedSettings.payments.stripe
        entitySettings.payments.payPal = this.$root.clonedSettings.payments.payPal

        entitySettingsJson = JSON.stringify(entitySettings)
      }

      this.replaceExistingObjectProperties(this.$root.settings, entitySettingsJson !== null ? JSON.parse(entitySettingsJson) : this.$root.clonedSettings)
    },

    prepareEntitySettingsForSave (service) {
      let serviceSettings = JSON.parse(JSON.stringify(service.settings))

      if (serviceSettings.payments.wc.productId === this.$root.settings.payments.wc.productId) {
        delete serviceSettings.payments.wc
      }

      if ('general' in serviceSettings) {
        if (!serviceSettings.general.redirectUrlAfterAppointment) {
          delete serviceSettings.general.redirectUrlAfterAppointment
        }

        if (!serviceSettings.general.defaultAppointmentStatus) {
          delete serviceSettings.general.defaultAppointmentStatus
        }

        if (!serviceSettings.general.minimumTimeRequirementPriorToBooking && !this.$root.settings.general.minimumTimeRequirementPriorToBooking) {
          delete serviceSettings.general.minimumTimeRequirementPriorToBooking
        } else if (!serviceSettings.general.minimumTimeRequirementPriorToBooking) {
          serviceSettings.general.minimumTimeRequirementPriorToBooking = 0
        }

        if (!serviceSettings.general.minimumTimeRequirementPriorToCanceling && !this.$root.settings.general.minimumTimeRequirementPriorToCanceling) {
          delete serviceSettings.general.minimumTimeRequirementPriorToCanceling
        } else if (!serviceSettings.general.minimumTimeRequirementPriorToCanceling) {
          serviceSettings.general.minimumTimeRequirementPriorToCanceling = 0
        }

        if (!serviceSettings.general.numberOfDaysAvailableForBooking) {
          delete serviceSettings.general.numberOfDaysAvailableForBooking
        }

        if (Object.keys(serviceSettings.general).length === 0) {
          delete serviceSettings.general
        }
      }

      if (Object.keys(serviceSettings).length === 0) {
        serviceSettings = null
      }

      return serviceSettings
    }
  },

  computed: {
  }

}
