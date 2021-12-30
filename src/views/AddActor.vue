<template>
  <div>
    <LoggedInNavBar />
    <div class="container pt-6">
      <div class="columns">
        <div class="column">
          <div>
            <b-field horizontal label="Name" class="pb-6">
              <b-input v-model="form.name"></b-input>
            </b-field>

            <b-field horizontal label="Age" class="pb-6">
              <b-input v-model="form.age"></b-input>
            </b-field>

            <b-field horizontal label="Gender" class="pb-6">
              <b-input v-model="form.gender"></b-input>
            </b-field>

            <b-field horizontal label="About">
              <b-input
                v-model="form.about"
                maxlength="200"
                type="textarea"
              ></b-input>
            </b-field>

            <b-field horizontal label="Image Url" class="pb-6">
              <b-input v-model="form.image_url"></b-input>
            </b-field>
            <div class="pl-6">
              <b-button
                class="button-text"
                style="width:100%"
                @click="addActor()"
                type="is-primary"
                >Save</b-button
              >
            </div>
          </div>
        </div>
        <div class="column">
          <div style="padding-left:100px">
            <img src="../assets/fifth_image.svg" style="height: 100%" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoggedInNavBar from "../components/LoggedInNavBar";
import axios from "axios";

export default {
  name: "Movie",
  components: {
    LoggedInNavBar,
  },
  data() {
    return {
      form: {
        name: "",
        image_url: "",
        gender: "",
        age: "",
        about: "",
      },
    };
  },
  methods: {
    async addActor() {
      try {
        const token = localStorage.getItem("token");

        await axios.post(
          "https://casting-agency-pro.herokuapp.com/actors",
          this.form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.$router.push("/actors");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap");
.button-text {
  font-family: Noto Serif;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 22px;
  color: #131313;
}
</style>
