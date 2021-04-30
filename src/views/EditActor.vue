<template>
    <div>
        <LoggedInNavBar/>
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

                    <b-field horizontal label="Image Url" class="pb-6">
                        <b-input v-model="form.image_url"></b-input>
                    </b-field>

                    <b-button @click="editActor()" type="is-primary" class=" is-pulled-right button">Save</b-button>
                    <b-button v-if="canDeleteActor" @click="deleteActor()" type="is-danger" class=" is-pulled-right button mx-4">Delete</b-button>
                </div>
            </div>
            <div class="column">
                <div style="padding-left:100px">
                    <img  src="../assets/fifth_image.svg" style="height: 100%"/>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
    import LoggedInNavBar from "../components/LoggedInNavBar";
    import axios from "axios";
    import { can } from "../auth";
    
    export default {
        name: 'AddMovie',
        components: {
            LoggedInNavBar
        },
        mounted(){
            this.getActor()
        },
        data(){
            return {
                form: {
                    name: '',
                    image_url: '',
                    gender: '',
                    age:""
                }
            }
        },
        methods: {
            async getActor() {
                const token = localStorage.getItem('token')
                const id = this.$route.params.id

                const { data } = await axios.get(`http://127.0.0.1:5000/actors/${id}`, {
                    headers: {
                    Authorization: `Bearer ${token}`
                    }
                });
                    
                this.form = data.actor;
            },
            async editActor() {
                try{
                    const token = localStorage.getItem('token')
                    const id = this.$route.params.id
                    await axios.patch(`http://127.0.0.1:5000/actors/${id}`, this.form, {
                        headers: {
                        Authorization: `Bearer ${token}`
                        }
                    });

                    this.$router.push('/actors')
                }catch(e){
                    console.log(e)
                }
            },
            async deleteActor() {
                try{
                    const token = localStorage.getItem('token')
                    const id = this.$route.params.id
                    await axios.delete(`http://127.0.0.1:5000/actors/${id}`, {
                        headers: {
                        Authorization: `Bearer ${token}`
                        }
                    });

                    this.$router.push('/actors')
                }catch(e){
                    console.log(e)
                }
            },
        },
        computed: {
            canDeleteActor(){
                return can('delete:actors')
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