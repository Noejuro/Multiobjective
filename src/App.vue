<template>
  <v-app>
    <v-col align="start" style="position: absolute; top: 0px; left: 0px; height: 100%;" md="12" lg="12" xl="12" cols="12" class="mt-0 pt-0 pb-0 mb-0">
      <v-row justify="center" style="width: 100vw; height: 100%" class="py-0 my-0">
        <router-view></router-view> 
      </v-row>
    </v-col>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
