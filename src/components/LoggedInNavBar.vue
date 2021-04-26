<template>
    <b-navbar style="background-color:#131313" :transparent="true">
        <template #brand>
            <b-navbar-item class="logo" tag="router-link" :to="{ path: '/' }">
                Cast
            </b-navbar-item>
        </template>

        <template #end>
            <b-navbar-item tag="router-link" :to="{ path: '/dashboard' }" class="nav-items">
                Dashboard
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/movies' }" class="nav-items">
                Movies
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/actors' }" class="nav-items">
                Actors
            </b-navbar-item>
            <b-navbar-item tag="div">
                <b-dropdown :triggers="['hover']" aria-role="list">
                    <template #trigger>
                        <b-button
                            class="button"
                            type="is-primary"
                            :label="name" 
                            />
                    </template>


                    <b-dropdown-item aria-role="listitem" @click="logout()">Logout</b-dropdown-item>
                </b-dropdown>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
    export default {
        name: 'LoggedInNavBar',
        components: {
        },
        methods: {
            // Log the user out
            logout() {
                this.$auth.logout({
                    returnTo: window.location.origin
                });
            },
            login() {
                this.$auth.loginWithRedirect();
            }
        },
        computed: {
            name() {
                let user = JSON.parse(localStorage.getItem('user'))
                return user.name
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Seaweed+Script&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap');
    .logo {
        font-family: 'Seaweed Script', cursive;
        font-style: normal;
        font-weight: normal;
        font-size: 36px;
        color: #FFB733;
    }
    .button {
        /* background: #FFB733; */
        border-radius: 8px;
        color: #131313;
        font-family: 'Noto Serif', serif;
        font-style: normal;
        font-weight: 900;
        font-size: 16px;
    }

    .nav-items {
        color: #FFFFFF;
        font-family: Noto Serif;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
    }

    nav.navbar.is-fixed-top {
        background: transparent;
    }

</style>