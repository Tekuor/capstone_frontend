<template>
  <div class="h-full">
    <LoggedInNavBar />

    <div class="container h-full pt-4">
      <div class="flex flex-row">
        <h3 class="heading">Movies</h3>
        <div class="w-full" v-if="movies.length">
          <a
            @click="goToAddMovie()"
            class="float-right pr-6"
            style="color: #ffb733"
            >Add Movies</a
          >
        </div>
      </div>

      <div v-if="loading" class="h-full flex justify-center items-center">
        <LoaderComponent />
      </div>

      <div class="flex flex-col items-center" v-else>
        <div
          class="columns is-multiline"
          style="padding-top:40px"
          v-if="movies.length"
        >
          <div
            class="is-2 mr-8"
            v-for="(movie, index) in movies"
            :key="index"
            @click="editdMovie(movie.id)"
          >
            <b-tooltip
              :label="movie.description"
              multilined
              size="is-large"
              position="is-bottom"
            >
              <div
                class="movie-card"
                :style="{ 'background-image': 'url(' + movie.image_url + ')' }"
              ></div>
            </b-tooltip>
            <p class="pt-4 title">{{ movie.title }}</p>
            <p class="pb-6 movie-date">{{ formatDate(movie.release_date) }}</p>
          </div>
        </div>

        <div class="h-auto" v-else>
          <NoMoviePlaceholder :canAddMovie="canAddMovie" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
import LoggedInNavBar from "../components/LoggedInNavBar";
import NoMoviePlaceholder from "../components/NoMoviesPlaceholder";
import LoaderComponent from "../components/LoaderComponent";
import axios from "axios";
import { can } from "../auth";

export default {
  name: "Movie",
  components: {
    LoggedInNavBar,
    NoMoviePlaceholder,
    LoaderComponent,
  },
  data() {
    return {
      movies: [],
      loading: false,
    };
  },
  async mounted() {
    await this.getMovies();
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
      this.$router.push("/add-movie");
    },
    editdMovie(id) {
      this.canEditMovie ? this.$router.push(`/edit-movie/${id}`) : "";
    },
    async getMovies() {
      try {
        this.loading = true;

        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          "https://casting-agency-pro.herokuapp.com/movies",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.movies = data.movies;
      } finally {
        this.loading = false;
      }
    },
    confirm(id) {
      this.$buefy.dialog.confirm({
        message: "Are you sure you want to delete this movie?",
        onConfirm: () => this.deleteMovie(id),
      });
    },
    async deleteMovie(id) {
      axios
        .delete("https://casting-agency-pro.herokuapp.com/movies/" + id)
        .then(() => {
          this.getMovies();
        });
    },
    formatDate(date) {
      return format(new Date(date), "dd MMM, YYY");
    },
  },
  computed: {
    canAddMovie() {
      return can("post:movies");
    },
    canEditMovie() {
      return can("patch:movies");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap");

.heading {
  font-family: Noto Serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
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
