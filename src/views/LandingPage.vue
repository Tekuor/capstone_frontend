<template>
  <div class="home">
    <NavBar />
    <FirstSection />
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import FirstSection from "../components/FirstSection";

export default {
  name: "Home",
  components: {
    NavBar,
    FirstSection,
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
  },
};
</script>

<style scoped></style>
