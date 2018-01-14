<template>
  <!-- <div v-show="loading"> -->
  <div class="text-center">
    <span>
      Making <font-awesome-icon :icon="coffeeIcon" style="color:brown"></font-awesome-icon> ...
    </span>
    <font-awesome-icon :icon="syncIcon" spin></font-awesome-icon>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faSyncAlt, faCoffee } from '@fortawesome/fontawesome-free-solid'
export default {
  components: {
    FontAwesomeIcon
  },
  computed: {
    ...mapState(['isLoading']),
    syncIcon () {
      return faSyncAlt
    },
    coffeeIcon () {
      return faCoffee
    }
  }
}
</script>
