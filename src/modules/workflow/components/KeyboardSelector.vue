
<template>
  <div class="row">
    <div class="col-lg-12">

      <!-- Select Keyboard -->
      <div class="row justify-content-center mt-4">
        <div class="col-lg-8 d-flex justify-content-center">
          <button :class="className(nav)" @click="onClick(nav)" v-for="nav in navItems" :key="nav.order" :item="nav">
            {{ nav.text }}
          </button>
        </div>
      </div>

      <!-- Display Selected Keyboard -->
      <div class="row d-flex justify-content-center mt-4">

        <div class="col-lg-8" v-if=" keyboard_id === 'keyboard' ">

          <ul class="list-unstyled mb-0 keyboard--row w-100" v-for="(keys, row) in keyboardRows(keyboard_id)" :key="row">

            <li class="btn btn-outline-light keyboard--key" :class="keyItem.css" @click="onKeyClick(keyItem)" v-for="keyItem in keys" :key="keyItem.id">
              <i class="fa fa-fw" :class="keyItem.icon" v-if="!!keyItem.icon"></i>

              <div class="shift" v-if=" keyItem.key && keyItem.shift_key && !keyItem.alpha ">
                {{ keyItem.shift_key }}
              </div>
              <div class="plain" v-if=" keyItem.key && keyItem.shift_key && !keyItem.alpha ">
                {{ keyItem.key }}
              </div>

              <div class="plain" v-else-if=" keyItem.alpha ">
                {{ keyItem.label || keyItem.shift_key }}
              </div>

              <div class="plain" v-else>
                {{ keyItem.label || keyItem.key }}
              </div>
            </li>
          </ul>
        </div>

        <div class="col-lg-12 text-center" v-else>
          {{ keyboard_id }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: ['macro'],
  data () {
    let navItems = [
      { order: 1, icon: 'fa-keyboard-o', text: 'Keyboard', trigger: 'keyboard', selected: true },
      { order: 2, icon: 'fa-file-text-o', text: 'Numpad', trigger: 'numpad' },
      { order: 3, icon: 'fa-caret-square-o-up', text: 'Function', trigger: 'function' },
      { order: 4, icon: 'fa-asterisk', text: 'Media', trigger: 'media' },
      { order: 5, icon: 'fa-asterisk', text: 'Navigation', trigger: 'nav' }
      // { icon: 'fa-universal-access', text: 'Unicode', trigger: 'unicode' }
    ]

    return { navItems: navItems, keyboard_id: 'keyboard' }
  },
  methods: {
    onClick (selected) {
      // Selects the clicked navItem
      this.navItems = _.map(this.navItems, (item) => {
        if (item.trigger === selected.trigger) {
          item.selected = true
          this._data.keyboard_id = item.trigger
        } else {
          item.selected = false
        }
        return item
      })
    },
    onKeyClick (keyItem) {
      this.$store.commit('workflow/addMacroKey', { macro: this.macro, key: keyItem })
    },
    className (item) {
      let css = ['selector-btn', 'btn', 'btn-outline-secondary', 'btn-sm', 'mx-3'] // TODO - build into base styles
      if (item.selected) { css.push('active') }
      return css.join(' ')
    },
    keyboardRows (keyboard_id) {
      let keys = this.$store.getters['workflow/keys']

      // TODO - change this for each distinct keyboard
      // TODO - pull this from a Vuex getter
      if (keyboard_id === 'keyboard') {
        return {
          r4: _.filter(keys, (k) => { return k.row === 'r4' }),
          r3: _.filter(keys, (k) => { return k.row === 'r3' }),
          r2: _.filter(keys, (k) => { return k.row === 'r2' }),
          r1: _.filter(keys, (k) => { return k.row === 'r1' }),
          r0: _.filter(keys, (k) => { return k.row === 'r0' })
        }
      }

      // Numpad
      if (keyboard_id === 'numpad') {
        return {
          r0: _.filter(keys, (k) => { return k.row === 'num_r0' }),
          r1: _.filter(keys, (k) => { return k.row === 'num_r1' }),
          r2: _.filter(keys, (k) => { return k.row === 'num_r2' }),
          r3: _.filter(keys, (k) => { return k.row === 'num_r3' }),
          r4: _.filter(keys, (k) => { return k.row === 'num_r4' }),
          col: _.filter(keys, (k) => { return k.row === 'num_col' })
        }
      }

      // function
      if (keyboard_id === 'function') {
        return {
          r4: _.filter(keys, (k) => { return k.row === 'r4' }),
          r3: _.filter(keys, (k) => { return k.row === 'r3' }),
          r2: _.filter(keys, (k) => { return k.row === 'r2' }),
          r1: _.filter(keys, (k) => { return k.row === 'r1' }),
          r0: _.filter(keys, (k) => { return k.row === 'r0' })
        }
      }

      // nav
      if (keyboard_id === 'nav') {
        return {
          r4: _.filter(keys, (k) => { return k.row === 'r4' }),
          r3: _.filter(keys, (k) => { return k.row === 'r3' }),
          r2: _.filter(keys, (k) => { return k.row === 'r2' }),
          r1: _.filter(keys, (k) => { return k.row === 'r1' }),
          r0: _.filter(keys, (k) => { return k.row === 'r0' })
        }
      }
    }
  }
}
</script>

<style lang='sass' scoped>

  button.selector-btn
    display: flex
    flex-grow: 1
    justify-content: center

  // Keyboard Row Styles
  .keyboard--row
    display: flex
    justify-content: space-between
    width: 100%

  // Key Selector Styles
  $keyboard_key_child_size: 2.5rem
  $keyboard_key_margin: 0.25rem

  .keyboard--key
    display: flex
    flex-direction: column
    font-size: 50%
    width: $keyboard_key_child_size
    height: $keyboard_key_child_size
    margin: $keyboard_key_margin
    justify-content: center
    align-items: center

    &:hover
      color: theme-color('dark')

    .shift
      display: flex
      flex-direction: row
      margin-bottom: 0.5rem

    .plain
      display: flex
      flex-direction: row

    &.w1_25
      width: 1.25*$keyboard_key_child_size

    &.w1_5
      width: 1.5*$keyboard_key_child_size

    &.w1_75
      width: 1.75*$keyboard_key_child_size

    &.w2_0
      width: 2*$keyboard_key_child_size

    &.w2_25
      width: 2.25*$keyboard_key_child_size

    &.w2_75
      width: 2.75*$keyboard_key_child_size

    &.space
      width: 6.25*$keyboard_key_child_size

    &.h2_0
      height: 2.15*$keyboard_key_child_size

</style>
