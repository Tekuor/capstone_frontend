<template>
    <div>
        <LoggedInNavBar/>

        <div class="container" >
            <div class="heading" style="padding-left:90px">Movies</div>

            <div class="columns is-multiline" style="padding-left:90px; padding-top:40px">
                <div class="is-2 mr-4" v-for="(movie, index) in movies" :key="index"  @click="editdMovie(movie.id)">
                    <div class="movie-card" :style="{ background: 'url(' + movie.image_url + ')'}">
                    </div>
                    <p class="pt-4 title">{{movie.title}}</p>
                    <p class="pb-6 movie-date">{{formatDate(movie.release_date)}}</p>
                </div>
            </div>
            <NoMoviePlaceholder :canAddMovie="canAddMovie" v-if="!movies.length"/>
        </div>
    </div>
</template>

<script>
    import { format } from 'date-fns'
    import LoggedInNavBar from "../components/LoggedInNavBar";
    import NoMoviePlaceholder from "../components/NoMoviesPlaceholder";
    import axios from "axios";
    import { can } from "../auth";

    export default {
        name: 'Movie',
        components: {
            LoggedInNavBar,
            NoMoviePlaceholder
        },
        data(){
            return {
                movies: []
            }
        },
        async mounted(){
            await this.getMovies()
        },
        methods: {
            logout() {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                this.$auth.logout({
                    returnTo: window.location.origin
                });
            },
            goToAddMovie(){
                this.$router.push('/add-movie')
            },
            editdMovie(id){
               this.canEditMovie ? this.$router.push(`/edit-movie/${id}`) : ""
            },
            async getMovies() {
                    const token = localStorage.getItem('token')

                    const { data } = await axios.get("http://127.0.0.1:5000/movies", {
                        headers: {
                        Authorization: `Bearer ${token}`
                        }
                    });
                    
                    this.movies = data.movies;
            },
            confirm(id) {
                this.$buefy.dialog.confirm({
                    message: 'Are you sure you want to delete this movie?',
                    onConfirm: () => this.deleteMovie(id)
                })
            },
            async deleteMovie(id) {
                axios.delete('http://127.0.0.1:5000/movies/' + id)
                .then(() => {
                    this.getMovies()
                });
            },
            formatDate(date){
                return format(new Date(date), "dd MMM, YYY")
            }
        },
        computed: {
            canAddMovie(){
                return can('post:movies')
            },
            canEditMovie(){
                return can('patch:movies')
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap');

    .heading {
        font-family: Noto Serif;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 40px;
        letter-spacing: 0.1em;
        color: #FFFFFF;
    }

    .movie-card {
        box-shadow: 0px 8px 25px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        width: 160px;
        height: 200px;
    }

    .movie-card:hover {
        border: 1px solid #FFB733;
        cursor: pointer;
    }

    .title:hover {
        color: #FFB733;
        cursor: pointer;
    }

    .movie-date:hover {
        color: #FFEDCC;
        cursor: pointer;
    }

    .title {
        font-family: Noto Serif;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        color: #C2C2C2;
    }

    .movie-date {
        font-family: Noto Serif;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        color: #5C5C5C;
    }
</style>