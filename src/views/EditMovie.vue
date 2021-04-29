<template>
    <div>
        <LoggedInNavBar/>
        <div class="container columns pt-6">
            <div class="column is-4 is-offset-1">
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <div class="side-nav">
                            <div class="pb-6 pl-5 py-5">
                                <div :class="{ active: activeTab === 'details', inactive: activeTab !== 'details' }">
                                1. Movie Details
                                </div>
                            </div>
                            <div class="pb-6 pl-5">
                                <div :class="{ active: activeTab === 'roles', inactive: activeTab !== 'roles' }">
                                2. Actors & roles
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="column is-12" v-if="activeTab === 'roles'">
                        <div id="movie-display" class="column is-4 offset-1">
                            <div id="image-div" class="mx-4 mt-4" :style="{ background: 'url(' + form.image_url + ')'}">
                            </div>
                            <div id="movie-content" class="px-4 pt-6">
                                <div>
                                    <div class="movie-headings">Title</div>
                                    <div class="movie-text pb-4">{{form.title}}</div>

                                    <div class="movie-headings">Release Date</div>
                                    <div class="movie-text pb-4">{{form.release_date}}</div>

                                    <div class="movie-headings">Description</div>
                                    <div class="movie-text">{{form.description}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
            <div class="column is-8" v-if="activeTab === 'details'">
                <div class="px-4 column is-8">
                <b-field horizontal label="Title" class="pb-6">
                    <b-input v-model="form.title"></b-input>
                </b-field>

                <b-field horizontal label="Image Url" class="pb-6">
                    <b-input v-model="form.image_url"></b-input>
                </b-field>

                <b-field horizontal label="Release Date" class="pb-5" >
                    <b-datetimepicker
                        v-model="form.release_date"
                        placeholder="Type or select a date..."
                        icon="calendar-today"
                        :locale="undefined"
                        editable>
                    </b-datetimepicker>
                </b-field>

                <b-field horizontal label="Description">
                    <b-input v-model="form.description" maxlength="200" type="textarea"></b-input>
                </b-field>

                <b-button @click="next()" type="is-primary" class=" is-pulled-right button">Next</b-button>
                </div>
            </div>

            <div class="column is-6" v-if="activeTab === 'roles'">
                <div class="columns pb-3" v-for="(role, index) in form.roles" :key="index">
                    <b-field horizontal label="Actor:" class="column is-6">
                        <b-select placeholder="Select an actor" v-model="form.roles[index].actor_id">
                            <option
                                v-for="option in actors"
                                :value="option.id"
                                :key="option.id">
                                {{ option.name }}
                            </option>
                        </b-select>
                    </b-field>

                    <b-field horizontal label="Role:" class="column is-6 ">
                        <b-input v-model="form.roles[index].role"></b-input>
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
                    <b-button icon-left="plus" type="is-add" @click="addRole()" class="add-button">Add</b-button>
                </div>

                <div class="columns pt-6">
                    <div class="column is-12">
                        <a class="is-pulled-left" @click="back()">Back</a>
                        <b-button @click="addMovie()" type="is-primary" class="is-pulled-right button">Save</b-button>
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
        name: 'EditMovie',
        components: {
            LoggedInNavBar
        },
        mounted(){
            this.getActor()
            this.getActors()
        },
        data(){
            return {
                form: {
                    title: '',
                    image_url: '',
                    release_date: new Date(),
                    description:"",
                    roles: [{actor_id:"", role:""}]
                },
                activeTab: "details",
                actors: []
            }
        },
        methods: {
            async getActor() {
                const token = localStorage.getItem('token')
                const id = this.$route.params.id

                const { data } = await axios.get(`http://127.0.0.1:5000/movies/${id}`, {
                    headers: {
                    Authorization: `Bearer ${token}`
                    }
                });
                    
                this.form = data.movie;
                this.form.release_date = new Date(this.form.release_date)
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
            logout() {
                this.$auth.logout({
                    returnTo: window.location.origin
                });
                localStorage.removeItem('token')
            },
            next(){
                this.activeTab = 'roles'
            },
            back(){
                this.activeTab = 'details'
            },
            async addMovie() {
                try{
                    const token = localStorage.getItem('token')

                    await axios.post("http://127.0.0.1:5000/movies", this.form, {
                        headers: {
                        Authorization: `Bearer ${token}`
                        }
                    });

                    this.$router.push('/movies')
                }catch(e){
                    console.log(e)
                }
            },
            addRole(){
                const data = {
                    actor_id: "",
                    role: ""
                }

                this.form.roles.push(data)
            },
            deleteRole(index){
                this.form.roles.splice(index, 1);
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap');
    .side-nav {
        width: 270px;
        height: 145px;
        left: 0px;
        top: 0px;
        background: #000000;
        border-radius: 8px
    }

    .active {
        width: 209px;
        left: 20px;
        border-bottom: 2px solid #FFB733;
        color: #FFB733;
    }

    .inactive {
        font-family: Noto Serif;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        color: #8F8F8F;
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
        color: #FFB733 !important;
        font-family: Noto Serif;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
    }

    select.is-empty select {
        color: #FFFFFF !important;
    }

    .select select option {
        color: #FFFFFF !important;
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
        color: #8F8F8F;
    }

    .movie-text {
        font-family: Noto Serif;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        color: #C2C2C2;
    }

</style>