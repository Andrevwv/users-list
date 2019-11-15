<template>
  <div v-if="currentPage <= totalPages" id="app" class="app">
    <router-view/>

    <div class="pagination">
      <router-link :to="`/${prevPage}`" v-if="isPrevPageExist">
        <md-button class="md-raised">Prev</md-button>
      </router-link>
      <md-button v-else class="md-raised" disabled>
        Prev
      </md-button>

      <router-link
        v-for="page in totalPages"
        :to="`/${page}`"
        :key="page"
        :disabled="page === currentPage"
      >
        <md-button
          class="md-raised"
          :class="{ 'md-primary' : page === currentPage }"
        >
          {{ page }}
        </md-button>
      </router-link>

      <router-link :to="`/${nextPage}`" v-if="isNextPageExist">
        <md-button class="md-raised">Next</md-button>
      </router-link>
      <md-button v-else class="md-raised" disabled>
        Next
      </md-button>
    </div>
  </div>

  <div class="no-page" v-else>
    <h2>This page doesn't exist</h2>
    <router-link  to="/1">
      <md-button class="md-raised" @click="getUsers(1)">
        Go to the first page
      </md-button>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  created () {
    const path = this.$router.currentRoute.path.slice(1)
    const isPositiveNumber = !isNaN(path) && +path > 0
    if (isPositiveNumber) this.getUsers(+path)
  },
  methods: {
    ...mapActions(['getUsers'])
  },
  computed: {
    ...mapState(['currentPage', 'totalPages']),
    prevPage () {
      return this.currentPage - 1
    },
    isPrevPageExist () {
      return this.prevPage > 0
    },
    nextPage () {
      return this.currentPage + 1
    },
    isNextPageExist () {
      return this.nextPage <= this.totalPages
    }
  },
  watch: {
    '$route' (to, from) {
      this.getUsers(to.path.slice(1))
    }
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
  justify-content: center;
  margin-top: 20px;
}

.no-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
