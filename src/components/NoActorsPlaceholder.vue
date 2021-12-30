<template>
  <div class="flex flex-col items-center">
    <p class="header-text">Cinemas are looking up to you</p>
    <p class="description-text my-4">No actors added yet</p>
    <a class="button is-primary" @click="addActor()" v-if="canAddActor">
      Add new actor
    </a>
    <div class="mt-6">
      <img class="mx-auto" src="../assets/no_actors.svg" style="height: 100%" />
    </div>
  </div>
</template>

<script>
export default {
  name: "NoMoviePlaceholder",
  props: {
    canAddActor: {
      default: false,
      required: true,
    },
  },
  components: {},
  methods: {
    addActor() {
      this.$router.push("/add-actor");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap");
.header-text {
  font-family: Noto Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  text-align: center;
  color: #ffffff;
}

.description-text {
  font-family: Noto Serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #c2c2c2;
}

.button {
  font-family: Noto Serif;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 22px;
  color: #131313;
}
</style>
