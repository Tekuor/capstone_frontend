<template>
    <div>
        <LoggedInNavBar/>

        <div class="container" >
            <div class="heading" style="padding-left:90px">Actors</div>

            <NoActorPlaceholder :canAddMovie="canAddActor" v-if="!actors.length"/>
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
            async getActors() {
                    const token = localStorage.getItem('token')

                    const { data } = await axios.get("http://127.0.0.1:5000/actors", {
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
                axios.delete('http://127.0.0.1:5000/actors/' + id)
                .then(() => {
                    this.getActors()
                });
            },
        },
        computed: {
            canAddActor(){
                return can('post:actors')
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
</style>