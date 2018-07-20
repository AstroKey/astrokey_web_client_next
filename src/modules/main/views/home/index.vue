<template lang='pug'>
  .row.h-100.align-items-center
    .col-lg-12

      .row.my-4
        .col-lg-12.text-center
          img.welcome-logo(src='@/assets/icon_white.svg')

      .row.my-4
        .col-lg-12.text-center
          p.welcome-text WELCOME

      .row.my-4
        .col-lg-12.text-center
          p.lead
            a(href='https://github.com/AstroKey', target='_blank')  AstroKey
            |  is an open-source platform for automating keyboard workflows.

      .row.py-2
        .col-lg-12.text-center
          p.lead Drag and drop keyboard keys to construct your desired workflow - AstroKey does the rest.
</template>

<script>
  export default {
    name: 'main_home'
  }
</script>

<style lang="sass">
  img.welcome-logo
    height: 4rem
    width: 4rem

  .welcome-text
    letter-spacing: .6rem
    font-weight: 300
    font-size: 2rem
</style>
