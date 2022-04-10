<script>
// Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'CalendarView',

    metaInfo: { title: 'Calendar' },

    extends: View,

    mixins: [LoadSections(['calendar'])],

    props: {
      id: {
        type: String,
        default: 'Calendar',
      },
    },
  }
</script>
