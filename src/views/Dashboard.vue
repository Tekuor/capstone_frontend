<template>
  <div class="home w-full h-full">
    <LoggedInNavBar />

    <div class="py-12">
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-0 p-4 max-w-4xl mx-auto first-div rounded-md"
      >
        <div class="rounded-md mx-auto p-4">
          <img src="../assets/first_image.svg" />
        </div>

        <div class="flex flex-row items-center ">
          <div class="md:pt-16 h-full">
            <h2 id="casting">Casting made easy</h2>
            <h3 id="">
              Easily manage actors and movies and assign roles to the actors!
            </h3>
          </div>
        </div>

        <div class="rounded-md mx-auto">
          <img src="../assets/second_image.svg" class="float-right" />
        </div>
      </div>

      <div
        class="card grid grid-cols-1 md:grid-cols-3 gap-0 max-w-4xl mx-auto second-div rounded-md mt-6"
      >
        <div>
          <img src="../assets/third_image.svg" class="w-full h-full" />
        </div>

        <div class="flex flex-row items-center col-span-2">
          <div class="md:pt-16 h-full pl-6">
            <h2 class="title-text">
              Movie list -
              {{ canAddMovie ? `add movies` : `view movies` }}
            </h2>
            <h3 class="description-text pb-4">
              {{
                canAddMovie
                  ? `Add movies to assign roles to actors`
                  : `View the list of movies added`
              }}
            </h3>
            <a class="add-text" @click="movies()">{{
              canAddMovie ? `Add Movies` : `View Movies`
            }}</a>
          </div>
        </div>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-4xl mx-auto second-div rounded-md mt-6"
      >
        <div>
          <img src="../assets/fourth_image.svg" class="w-full h-full" />
        </div>

        <div class="flex flex-row items-center col-span-2">
          <div class="md:pt-16 h-full pl-6">
            <h2 class="title-text">
              Actors list -
              {{ canAddActor ? `add actors` : `view actors` }}
            </h2>
            <h3 class="description-text pb-4">
              {{
                canAddActor
                  ? `Add actors to assign their dream movie roles to them`
                  : `View the list of actors added`
              }}
            </h3>
            <a class="add-text" @click="actors()">{{
              canAddActor ? `Add Actors` : `View Actors`
            }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoggedInNavBar from "../components/LoggedInNavBar";
import { can } from "../auth";

export default {
  name: "Home",
  components: {
    LoggedInNavBar,
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    movies() {
      this.canAddMovie
        ? this.$router.push("/add-movie")
        : this.$router.push("/movies");
    },
    actors() {
      this.canAddActor
        ? this.$router.push("/add-actor")
        : this.$router.push("/actors");
    },
  },
  computed: {
    canAddMovie() {
      return can("post:movies");
    },
    canAddActor() {
      console.log("helloo", can("post:actors"));
      return can("post:actors");
    },
  },
};
</script>

<style scoped>
.card {
  min-height: 270px;
  box-shadow: 0px 10px 50px rgba(4, 4, 4, 0.5);
}

.first-div {
  background: #ffedcc;
}

.second-div {
  background: rgba(255, 255, 255, 0.1);
}

.third-div {
  background: rgba(255, 255, 255, 0.1);
}

.column {
  padding: 0px;
}

.title-text {
  font-family: Noto Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: #ffffff;
}

.description-text {
  font-family: Noto Serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: #c2c2c2;
  padding-right: 40px;
  padding-top: 20px;
}

.add-text {
  font-family: Noto Serif;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 22px;
  color: #ffb733;
  padding-top: 20px;
}

#casting {
  font-family: Noto Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  color: #131313;
}

#casting-description {
  font-family: Noto Serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  text-align: center;
  color: #131313;
}
</style>
