<template>
  <div class="hello">
    <md-list class="md-double-line">
      <md-list-item v-for="user in users" :key="user.id">
        <md-avatar>
          <img :src="user.avatar" alt="People">
        </md-avatar>
        <div class="md-list-item-text">
          <span>{{ `${user.first_name} ${user.last_name}` }}</span>
          <span>{{ user.email }}</span>
        </div>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'home',
  computed: {
    ...mapState(['users'])
  }
}
</script>

<style>
.hello {
  display: flex;
  justify-content: center;
}

.md-list.md-double-line .md-list-item-content {
  width: 300px;
}
</style>
