<template>
    <v-col align="center" style=" height: 100%;"  md="12" lg="12" xl="12" cols="12" class="py-0 my-0">
        <v-row justify="center" align="center" style="background-color: #E3C268; height: 100%;">
            <transition name="slide-fade" appear>
                <v-img src="@/assets/resources/logo.png" max-width="250px"></v-img>
            </transition>
        </v-row>
    </v-col>
</template>

<script>
export default {
    mounted() {
        setTimeout(() => {  this.$router.push({ name: 'map'}); }, 2500);
    }
}
</script>

<style scoped>
    .slide-fade-enter-active {
    transition: all 1s ease;
    }
    .slide-fade-leave-active {
    transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(100px);
    opacity: 0;
    }

</style>