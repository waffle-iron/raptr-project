<template>
  <div class="d-inline-flex">
    <div class="alert alert-danger text-center">
      <span><font-awesome-icon :icon="icon"></font-awesome-icon> error{{error}}</span>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faExclamationTriangle } from '@fortawesome/fontawesome-free-solid'
export default {
  components: {
    FontAwesomeIcon
  },
  computed: {
    // ...mapState(['hasError','error']),
    icon () {
      return faExclamationTriangle
    }
  }
}
</script>
