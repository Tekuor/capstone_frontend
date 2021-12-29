<template>
  <div class="h-full">
    <LoggedInNavBar />

    <div v-if="loading" class="h-full flex justify-center items-center">
      <LoaderComponent />
    </div>

    <div v-else>
      <div class="container columns pt-6">
        <div class="column is-12 flex flex-col items-center">
          <div class="px-4 column is-8">
            <b-field horizontal label="Title" class="pb-6">
              <b-input v-model="form.title"></b-input>
            </b-field>

            <b-field horizontal label="Image Url" class="pb-6">
              <b-input v-model="form.image_url"></b-input>
            </b-field>

            <b-field horizontal label="Release Date" class="pb-5">
              <b-datetimepicker
                v-model="form.release_date"
                placeholder="Type or select a date..."
                icon="calendar-today"
                :locale="undefined"
                editable
              >
              </b-datetimepicker>
            </b-field>

            <b-field horizontal label="Description">
              <b-input
                v-model="form.description"
                maxlength="200"
                type="textarea"
              ></b-input>
            </b-field>

            <div
              class="columns pb-3"
              v-for="(role, index) in roles"
              :key="index"
            >
              <b-field horizontal label="Actor:" class="column is-6">
                <b-select
                  placeholder="Select an actor"
                  v-model="roles[index].actor_id"
                >
                  <option
                    v-for="option in actors"
                    :value="option.id"
                    :key="option.id"
                  >
                    {{ option.name }}
                  </option>
                </b-select>
              </b-field>

              <b-field horizontal label="Role:" class="column is-6 ">
                <b-input v-model="roles[index].role"></b-input>
              </b-field>

              <div class="column is-2 mr-6 mt-3">
                <a @click="deleteRole(index)">
                  <b-icon
                    pack="fas"
                    icon="trash"
                    size="is-small"
                    type="is-light"
                  ></b-icon>
                </a>
              </div>
            </div>

            <div class="columns is-centered">
              <b-button
                icon-left="plus"
                type="is-add"
                @click="addRole()"
                class="add-button"
                >Add</b-button
              >
            </div>

            <b-button
              @click="editMovie()"
              type="is-primary"
              class=" is-pulled-right button"
              >Save</b-button
            >
            <b-button
              v-if="canDeleteMovie"
              @click="deleteMovie()"
              type="is-danger"
              class=" is-pulled-right button mx-4"
              >Delete</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoggedInNavBar from "../components/LoggedInNavBar";
import LoaderComponent from "../components/LoaderComponent";
import axios from "axios";
import { can } from "../auth";
import objectDifference from "../mixins/objectDifference";
import { cloneDeep } from "lodash";

export default {
  name: "EditMovie",
  components: {
    LoggedInNavBar,
    LoaderComponent,
  },
  mixins: [objectDifference],
  mounted() {
    this.getMovie();
    this.getActors();
  },
  data() {
    return {
      form: {
        title: "",
        image_url: "",
        release_date: new Date(),
        description: "",
      },
      actors: [],
      loading: false,
      roles: [],
      initialData: {},
    };
  },
  methods: {
    async getMovie() {
      try {
        this.loading = true;
        const token = localStorage.getItem("token");
        const id = this.$route.params.id;

        const { data } = await axios.get(
          `https://casting-agency-pro.herokuapp.com/movies/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.form = data.movie;
        this.initialData = cloneDeep(data);
        this.roles = data.roles;
        this.form.release_date = new Date(this.form.release_date);
      } finally {
        this.loading = false;
      }
    },
    addRole() {
      const data = {
        actor_id: "",
        role: "",
      };

      this.roles.push(data);
    },
    async getActors() {
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
    },
    async editMovie() {
      try {
        this.loading = true;
        const editedData = {
          movie: this.form,
          roles: this.roles,
        };
        console.log(this.objectDifference(this.initialData, editedData));
        const formDifference = this.objectDifference(
          this.initialData.movie,
          this.form
        );
        const rolesDifference = this.objectDifference(
          this.initialData.roles,
          this.roles
        );

        const updatedObject = {
          ...formDifference,
          ...(rolesDifference.length && { roles: this.roles }),
        };
        const token = localStorage.getItem("token");
        const id = this.$route.params.id;
        await axios.patch(
          `https://casting-agency-pro.herokuapp.com/movies/${id}`,
          updatedObject,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.$router.push("/movies");
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    async deleteMovie() {
      try {
        try {
          this.loading = true;

          const token = localStorage.getItem("token");
          const id = this.$route.params.id;
          await axios.delete(
            `https://casting-agency-pro.herokuapp.com/movies/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          this.$router.push("/movies");
        } finally {
          this.loading = false;
        }
      } catch (e) {
        console.log(e);
      }
    },
    deleteRole(index) {
      this.roles.splice(index, 1);
    },
    // checkRoles() {
    //   this.initialRoles.forEach((role) => {
    //     const findRole = this.roles.find(
    //       (editedRole) =>
    //         editedRole.role == role.role && editedRole.actor_id == role.actor_id
    //     );
    //   });
    // },
  },
  computed: {
    canDeleteMovie() {
      return can("delete:movies");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap");
.side-nav {
  width: 270px;
  height: 145px;
  left: 0px;
  top: 0px;
  background: #000000;
  border-radius: 8px;
}

.active {
  width: 209px;
  left: 20px;
  border-bottom: 2px solid #ffb733;
  color: #ffb733;
}

.inactive {
  font-family: Noto Serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: #8f8f8f;
}

.button {
  font-family: Noto Serif;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 22px;
  color: #131313;
}

.add-button {
  width: 100px;
  height: 32px;
  border-radius: 8px;
  color: #ffb733 !important;
  font-family: Noto Serif;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
}

select.is-empty select {
  color: #ffffff !important;
}

.select select option {
  color: #ffffff !important;
}

#movie-display {
  width: 270px;
  height: 465px;
  left: 0px;
  top: 172px;

  background: #000000;
  border-radius: 8px;
}

#image-div {
  width: 216px;
  height: 200px;
  border-radius: 8px;
}

.movie-headings {
  font-family: Noto Serif;
  font-style: normal;
  font-weight: 300;
  font-size: 8px;
  line-height: 11px;
  color: #8f8f8f;
}

.movie-text {
  font-family: Noto Serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #c2c2c2;
}
</style>
