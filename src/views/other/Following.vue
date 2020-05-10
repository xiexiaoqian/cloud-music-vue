<template>
  <v-container>
    <!-- <FollowComp :followers="followings" :type="type"></FollowComp> -->
    <my-list :list="followings" @cancel-follow="unFollow"></my-list>
  </v-container>
</template>

<script>
// import FollowComp from '../../components/FollowComp'
export default {
  name: 'Following',
  components: {
    // FollowComp
  },
  data() {
    return {
      type: 'following',
      followings: []
    }
  },
  created() {
    this.followingsData()
  },
  methods: {
    followingsData() {
      let urlPlus = JSON.parse(localStorage.getItem('user')).following_url
      let url = urlPlus.slice(0, urlPlus.indexOf('{'))
      console.log(url)

      this.axios({
        method: 'get',
        url: url
      }).then((res) => {
        let resFollowings = res.data
        for (let i = 0; i < resFollowings.length; i++) {
          const item = resFollowings[i]
          this.followings.splice(i, 0, {
            login: item.login,
            avatar_url: item.avatar_url
          })
        }
        console.log(this.followings)
      })
    },
    unFollow(index) {
      alert(index)
      this.followings.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped></style>
