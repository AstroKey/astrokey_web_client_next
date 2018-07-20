<template>

  <div class="row">
    <div class="col-lg-12">
      <OpenDeviceButton :device="device" />
      <CloseDeviceButton :device="device" />
    </div>

    <div class="col-lg-12">
      <div class="row">
        <div class="px-3 py-3 d-flex align-items-center">
          <div class="key--list--wrapper px-3 pb-2 d-flex">
            <small class='pt-3 pl-2 d-flex flex-row align-items-center'>
              <img class="logo" src="@/assets/icon_white.svg"></img>
              AstroKey
            </small>
            <ul class="list-unstyled key--list d-flex">
              <li :class="className(key)" v-for="key in device.keys" :key="key.id" @click="onKeyClick(key)"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<!-- // // // //  -->

<script>
import { mapActions } from 'vuex'
import OpenDeviceButton from '@/components/OpenDeviceButton'
import CloseDeviceButton from '@/components/CloseDeviceButton'

export default {
  props: ['device'],
  components: {
    OpenDeviceButton,
    CloseDeviceButton
  },
  computed: {
    selectedKey () {
      return this.$store.getters['device/selectedKey']
    }
  },
  methods: {
    ...mapActions({
      onKeyClick: 'device/selectKey'
    }),
    className (key) {
      let css = 'btn btn-outline-light key--child d-flex justify-content-center align-items-center mx-2 my-2'
      if (key.selected) { css = css + ' active' }
      return css
    }
  }
}
</script>

<style lang="sass" scoped>

@import '../../../../../sass/vendor.sass'

// AstroKey Selector Styles
$astrokey_child_size: 3rem

.selected-key-detail
  border-left: 1px solid theme-color('light')

.key--list--wrapper
  display: flex
  flex-direction: column
  border: 2px solid theme-color('light')
  border-radius: .25rem

  img.logo
    margin-right: .3rem
    height: 1rem

  ul.list-unstyled.key--list
    justify-content: space-between
    align-items: center
    flex-direction: row
    margin: 0

    li.key--child
      height: $astrokey_child_size
      width: $astrokey_child_size
      cursor: pointer
      border-width: 2px

      span
        font-size: 0.75rem
        position: relative
        bottom: 0
        left: 0

    &.active
      color: $gray-800

</style>


