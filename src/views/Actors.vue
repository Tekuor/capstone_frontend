<template>
  <div class="h-full">
    <LoggedInNavBar />

    <div class="container h-full pt-4">
      <div class="flex flex-row">
        <h3 class="heading">Actors</h3>
        <div class="w-full" v-if="actors.length">
          <a
            @click="goToAddMovie()"
            class="float-right pr-6"
            style="color: #ffb733"
            >Add Actors</a
          >
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4">
        <b-field>
          <b-input
            placeholder="Search..."
            type="search"
            icon="magnify"
            icon-clickable
            @icon-click="search"
            @input="search"
            v-model="searchTerm"
          >
          </b-input>
        </b-field>
      </div>

      <div v-if="loading" class="h-full flex justify-center items-center">
        <LoaderComponent />
      </div>

      <div class="flex flex-col items-center lg:items-start" v-else>
        <div
          class="columns is-multiline"
          style="padding-top:40px"
          v-if="actors.length"
        >
          <div
            class="is-2 mr-8"
            v-for="(actor, index) in actors"
            :key="index"
            @click="editActor(actor.id)"
          >
            <b-tooltip
              :label="actor.about"
              multilined
              size="is-large"
              position="is-bottom"
            >
              <div
                class="movie-card"
                :style="{
                  'background-image': `url(${
                    actor.image_url
                      ? actor.image_url
                      : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'
                  })`,
                }"
              ></div>
            </b-tooltip>
            <p class="pt-4 title">{{ actor.name }}</p>
            <p class="pb-6 movie-date">{{ actor.age }} years</p>
          </div>
        </div>
      </div>
      <div
        class="h-auto flex justify-center items-center"
        v-if="!actors.length"
      >
        <NoActorPlaceholder :canAddActor="canAddActor" />
      </div>
    </div>
  </div>
</template>

<script>
import LoggedInNavBar from "../components/LoggedInNavBar";
import NoActorPlaceholder from "../components/NoActorsPlaceholder";
import axios from "axios";
import { can } from "../auth";
import LoaderComponent from "../components/LoaderComponent";

export default {
  name: "Movie",
  components: {
    LoggedInNavBar,
    NoActorPlaceholder,
    LoaderComponent,
  },
  data() {
    return {
      actors: [],
      loading: false,
      searchTerm: "",
    };
  },
  async mounted() {
    await this.getActors();
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
    goToAddMovie() {
      this.$router.push("/add-actor");
    },
    editActor(id) {
      this.canEditActor ? this.$router.push(`/edit-actor/${id}`) : "";
    },
    async getActors() {
      try {
        this.loading = true;
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          "https://casting-agency-pro.herokuapp.com/actors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.actors = data.actors;
      } finally {
        this.loading = false;
      }
    },
    async search() {
      if (this.searchTerm.length >= 3) {
        const token = localStorage.getItem("token");

        const { data } = await axios.post(
          "https://casting-agency-pro.herokuapp.com/actors/search",
          { searchTerm: this.searchTerm },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.actors = data.actors;
      } else if (!this.searchTerm.length) {
        await this.getActors();
      }
    },
    confirm(id) {
      this.$buefy.dialog.confirm({
        message: "Are you sure you want to delete this actor?",
        onConfirm: () => this.deleteActor(id),
      });
    },
    async deleteActor(id) {
      axios
        .delete("https://casting-agency-pro.herokuapp.com/" + id)
        .then(() => {
          this.getActors();
        });
    },
  },
  computed: {
    canAddActor() {
      return can("post:actors");
    },
    canEditActor() {
      return can("patch:actors");
    },
  },
};
</script>

<style scoped>
.heading {
  font-family: Noto Serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 40px;
  letter-spacing: 0.1em;
  color: #ffffff;
}

.movie-card {
  box-shadow: 0px 8px 25px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 160px;
  height: 200px;
  background-size: auto;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.movie-card:hover {
  border: 1px solid #ffb733;
  cursor: pointer;
}

.title:hover {
  color: #ffb733;
  cursor: pointer;
}

.movie-date:hover {
  color: #ffedcc;
  cursor: pointer;
}

.title {
  font-family: Noto Serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #c2c2c2;
}

.movie-date {
  font-family: Noto Serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #5c5c5c;
}
</style>
