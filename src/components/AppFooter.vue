<template>
  <div class="card">
    <div class="card-body text-center">
      <p class="card-text">Made with <font-awesome-icon :icon="heartIcon" style="color:pink"></font-awesome-icon> by Luke Brown, check out my <a href="https://gitlab.com/Dynamic-Gravity"><font-awesome-icon :icon="gitlabIcon"></font-awesome-icon></a> or <a href="https://github.com/Dynamic-Gravity"><font-awesome-icon :icon="githubIcon"></font-awesome-icon></a>.</p>
      <p class="card-text">This project is licensed under the <a href="https://opensource.org/licenses/MIT"> MIT License</a>.</p>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faHeart } from '@fortawesome/fontawesome-free-solid'
import { faGitlab, faGithub } from '@fortawesome/fontawesome-free-brands'
export default {
  components: {
    FontAwesomeIcon
  },
  computed: {
    heartIcon () {
      return faHeart
    },
    gitlabIcon () {
      return faGitlab
    },
    githubIcon () {
      return faGithub
    }
  }
}
</script>
