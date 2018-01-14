<template>
  <div class="card">
    <div class="card-body text-center">
      <p class="card-text">Made with <font-awesome-icon :icon="heartIcon" style="color:pink"></font-awesome-icon> by Luke Brown, check out my <a class="text-secondary" href="https://github.com/Dynamic-Gravity"><font-awesome-icon :icon="githubIcon"></font-awesome-icon></a></p>
      <p class="card-text">This project is licensed under the <a class="text-secondary" href="https://opensource.org/licenses/MIT"> MIT License</a></p>
      <p class="card-text"><span class="">dinosaur skull</span> <font-awesome-icon :icon="ccIcon"></font-awesome-icon> by Erik Kuroow from the Noun Project</p>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faHeart } from '@fortawesome/fontawesome-free-solid'
import { faGithub, faCreativeCommons } from '@fortawesome/fontawesome-free-brands'
export default {
  components: {
    FontAwesomeIcon
  },
  computed: {
    heartIcon () {
      return faHeart
    },
    githubIcon () {
      return faGithub
    },
    ccIcon () {
      return faCreativeCommons
    }
  }
}
</script>
