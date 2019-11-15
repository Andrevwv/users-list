<template>
  <div v-if="currentPage <= totalPages" id="app" class="app">
    <router-view/>
    <div class="pagination">
      <router-link
        v-for="page in totalPages"
        :to="`/${page}`"
        :key="page"
        :disabled="page === currentPage"
      >
        <md-button
          :md-ripple="false"
          class="md-raised"
          :class="{ 'md-primary' : page === currentPage }"
          @click="getUsers(page)"
        >
          {{ page }}
        </md-button>
      </router-link>
    </div>
  </div>
  <div class="no-page" v-else>
    <h2>This page doesn't exist</h2>
    <router-link  to="/1">
      <md-button
        class="md-raised"
        @click="getUsers(1)"
      >
        Go to the first page
      </md-button>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      path: this.$router.currentRoute.path.slice(1)
    }
  },
  created () {
    if (!isNaN(this.path)) this.getUsers(+this.path)
  },
  methods: {
    ...mapActions(['getUsers'])
  },
  computed: {
    ...mapState(['currentPage', 'totalPages'])
  }
}

</script>
<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
}

.pagination {
  display: flex;
  flex-wrap: wrap;
}

.no-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
