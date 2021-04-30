<template>
    <div>
        <LoggedInNavBar/>

        <div class="container" >
            <div class="heading" style="padding-left:90px">Actors</div>

            <div class="columns is-multiline" style="padding-left:90px; padding-top:40px" v-if="actors.length">
                <div class="is-2 mr-4" v-for="(actor, index) in actors" :key="index"  @click="editActor(actor.id)">
                    <div class="movie-card" :style="{ background: 'url(' + actor.image_url + ')'}">
                    </div>
                    <p class="pt-4 title">{{actor.name}}</p>
                    <p class="pb-6 movie-date">{{actor.age}} years</p>
                </div>
            </div>
            <NoActorPlaceholder :canAddActor="canAddActor" v-else/>
        </div>
    </div>
</template>

<script>
    import LoggedInNavBar from "../components/LoggedInNavBar";
    import NoActorPlaceholder from "../components/NoActorsPlaceholder";
    import axios from "axios";
    import { can } from "../auth";

    export default {
        name: 'Movie',
        components: {
            LoggedInNavBar,
            NoActorPlaceholder
        },
        data(){
            return {
                actors: []
            }
        },
        async mounted(){
            await this.getActors()
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
                this.$router.push('/add-actor')
            },
            editActor(id){
               this.canEditActor ? this.$router.push(`/edit-actor/${id}`) : ""
            },
            async getActors() {
                    const token = localStorage.getItem('token')

                    const { data } = await axios.get("https://casting-agency-pro.herokuapp.com/actors", {
                        headers: {
                        Authorization: `Bearer ${token}`
                        }
                    });
                    this.actors = data.actors;
            },
            confirm(id) {
                this.$buefy.dialog.confirm({
                    message: 'Are you sure you want to delete this actor?',
                    onConfirm: () => this.deleteActor(id)
                })
            },
            async deleteActor(id) {
                axios.delete('https://casting-agency-pro.herokuapp.com/' + id)
                .then(() => {
                    this.getActors()
                });
            },
        },
        computed: {
            canAddActor(){
                return can('post:actors')
            },
            canEditActor(){
                return can('patch:actors')
            }
        }
    }
</script>

<style scoped>
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