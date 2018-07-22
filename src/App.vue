
<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <!-- <Notifications/> -->
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
// import Notifications from '@/modules/notification/components/Notifications'

export default {
  name: 'app',
  components: {
    Navbar
    // Notifications,
  },
  metaInfo: {
    title: 'Loading...',
    titleTemplate: 'AstroKey - %s',
    htmlAttrs: {
      lang: 'en'
    }
  }

}
</script>

<style lang="sass">
  @import "./sass/vendor.sass"

  html
    height: 100%

  body
    height: 100%

  // TODO - remove this.
  .container-fluid
    height: 100%
    padding-top: 3.5rem

  #app
    height: 100%
    width: 100%

</style>
