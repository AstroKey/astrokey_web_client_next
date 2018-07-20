<template>
  <transition-group name="list" tag='div' class="container-fluid">
    <div class="row" v-for="each in collection" v-bind:key="each.id">
      <NotificationChild :item="each"/>
    </div>
  </transition-group>
</template>

<!-- // // // //  -->

<script>
import { mapGetters } from 'vuex'
import NotificationChild from './notificationChild'

export default {
  computed: mapGetters({
    collection: 'notification/collection'
  }),
  components: {
    NotificationChild
  }
}
</script>

<style lang='sass'>
   // @import '../../../sass/app.sass'

   .list-enter-active, .list-leave-active
     transition: opacity .5s

   .list-enter, .list-leave-to
     opacity: 0

</style>
