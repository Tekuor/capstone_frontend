<template>
    <div class="columns is-multiline is-centered">
        <div class="column has-text-centered is-12 header-text"  style="margin-top: 10px;">
            <div>Cinemas are looking up to you</div>
        </div>
        <div class="column has-text-centered is-12 description-text">
            <div>No actors added yet</div>
        </div>
        <div class="column has-text-centered is-12" v-if="canAddActor">
            <a class="button is-primary" @click="addActor()">
                Add new actor
            </a>
        </div>
        <div class="column has-text-centered is-12" style="margin-top: 50px;">
            <img  src="../assets/no_actors.svg" style="height: 100%"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NoMoviePlaceholder',
        props: {
            canAddActor: {
                default: false,
                required: true
            }
        },
        components: {
        },
        methods: {
            addActor(){
                this.$router.push('/add-actor')
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap');
    .header-text {
        font-family: Noto Serif;
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 33px;
        text-align: center;
        color: #FFFFFF;
    }

    .description-text {
        font-family: Noto Serif;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        text-align: center;
        color: #C2C2C2;
    }

    .button {
        font-family: Noto Serif;
        font-style: normal;
        font-weight: 900;
        font-size: 16px;
        line-height: 22px;
        color: #131313;
    }
</style>