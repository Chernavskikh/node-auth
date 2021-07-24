<template>
  <div class="home">
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue';
// NEW - import EventService
// eslint-disable-next-line import/extensions
import EventService from '@/services/EventService.js';

export default {
  name: 'Home',
  data() {
    // NEW - initialize the event object
    return {
      events: [],
    };
  },
  created() {
    this.getEventsData(); // NEW - call getEventData() when the instance is created
  },
  // NEW
  methods: {
    async getEventsData() {
      // NEW - Use the eventService to call the getEvents() method
      EventService.getEvents()
        .then(
          ((events) => {
            this.$set(this, 'events', events);
          }),
        );
    },
  },
};
</script>
