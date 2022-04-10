<script>
// Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'HomeView',

    metaInfo: { title: 'Home' },

    extends: View,

    mixins: [LoadSections(['hero', 'features'])],

    props: {
      id: {
        type: String,
        default: 'home',
      },
    },
  }
</script>
