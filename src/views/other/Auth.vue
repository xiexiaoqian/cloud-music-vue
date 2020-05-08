<template>
  <v-app>
    <template>
      <v-card>
        <v-toolbar color="teal" dark flat>
          <v-app-bar-nav-icon to="/login"></v-app-bar-nav-icon>

          <v-toolbar-title>GitHub</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-avatar>
              <v-img :src="avatar"></v-img>
            </v-avatar>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon @click="logout">mdi-dots-vertical</v-icon>
          </v-btn>

          <template v-slot:extension>
            <v-tabs v-model="model" centered slider-color="yellow">
              <v-tab v-for="(item, index) in tabs" :key="index" :to="item.itemPath"> {{ item.tab }} </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
      </v-card>
    </template>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Auth',
  data() {
    return {
      user: null,
      model: 'tab-2',
      avatar: '',
      tabs: [
        {
          tab: 'Repositry',
          itemPath: '/auth/repositry'
        },
        {
          tab: 'Following',
          itemPath: '/auth/following'
        },
        {
          tab: 'Followers',
          itemPath: '/auth/followers'
        }
      ],
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  components: {},
  created() {
    console.log('回调')
    let user = this.$route.query.user
    if (user) {
      this.user = JSON.parse(user)
      localStorage.setItem('token', this.user.id)
      localStorage.setItem('user', user)
    }
    this.avatar = JSON.parse(localStorage.getItem('user')).avatar_url
  },
  mounted() {},
  methods: {
    logout() {
      alert('退出登录')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/login')
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss"></style>
