<template>
  <div class="row h-100 align-items-center">
      <div class="col-lg-12">
          <div class="row my-4">
              <div class="col-lg-12 text-center"><img class="welcome-logo" src="@/assets/icon_white.svg" /></div>
          </div>
          <div class="row my-4">
              <div class="col-lg-12 text-center">
                  <p class="welcome-text">WELCOME</p>
              </div>
          </div>
          <div class="row my-4">
              <div class="col-lg-12 text-center">
                  <p class="lead"><a href="https://github.com/AstroKey" target="_blank"> AstroKey</a> is an open-source platform for automating keyboard workflows.</p>
              </div>
          </div>
          <div class="row py-2">
              <div class="col-lg-12 text-center">
                  <p class="lead">Drag and drop keyboard keys to construct your desired workflow - AstroKey does the rest.</p>
              </div>
          </div>
      </div>
  </div>
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
