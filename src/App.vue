<template>
  <div id="app" class="g">
    <app-nav class="g-navbar"/>
    <div class="g-alert">
      <app-error/>
      <app-loader/>
    </div>
    <router-view class="g-body"/>
    <app-footer class="g-footer"/>
  </div>
</template>

<script>
import Navbar from './components/AppNav.vue'
import Footer from './components/AppFooter.vue'
import Error from './components/common/Error.vue'
import Loader from './components/common/Loader.vue'
export default {
  name: 'app',
  components: {
    'app-nav': Navbar,
    'app-error': Error,
    'app-loader': Loader,
    'app-footer': Footer
  },
  data () {
    return {};
  }
};
</script>

<style>
.g {
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(1fr, 3);
  grid-template-areas:
    'nav nav nav'
    'alert alert alert'
    'body body body'
    'footer footer footer';
}

.g > .g-navbar {
  grid-area: nav;
}

.g > .g-alert {
  grid-area: alert;
}

.g > .g-body {
  grid-area: body;
}

.g > .g-footer {
  grid-area: footer;
}</style>
