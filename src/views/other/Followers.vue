<template>
  <v-container>
    <FollowComp :followers="followers" :type="type"></FollowComp>
  </v-container>
</template>

<script>
import FollowComp from '../../components/FollowComp'
export default {
  name: 'Followers',
  components: {
    FollowComp
  },
  data() {
    return {
      followers: [],
      type: 'followers'
    }
  },
  created() {
    this.followersData()
  },
  methods: {
    followersData() {
      this.axios({
        method: 'get',
        url: JSON.parse(localStorage.getItem('user')).followers_url
      }).then((res) => {
        let resFollowers = res.data
        for (let i = 0; i < resFollowers.length; i++) {
          const item = resFollowers[i]
          this.followers.splice(i, 0, {
            login: item.login,
            avatar_url: item.avatar_url
          })
        }
        console.log(this.followers)
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
