<template>
  <v-container>
    <!-- <div v-for=""> -->
    <RepositryComp :repositries="repos" @cancel-follow="splice($event, index)"></RepositryComp>
    <!-- </div> -->
  </v-container>
</template>

<script>
import RepositryComp from '../../components/RepositryComp'
export default {
  name: 'Repositry',
  components: {
    RepositryComp
  },
  data() {
    return {
      repos: []
    }
  },
  created() {
    this.reposData()
  },
  mounted() {},
  methods: {
    reposData() {
      this.axios({
        method: 'get',
        url: 'https://api.github.com/users/xiexiaoqian/repos'
      }).then((res) => {
        let resRepos = res.data
        for (let i = 0; i < resRepos.length; i++) {
          const item = resRepos[i]
          this.repos.splice(i, 0, {
            name: item.name,
            description: item.description,
            pushed_at: item.pushed_at,
            language: item.language,
            updated_at: item.updated_at
          })
        }
        console.log(this.repos)
      })
    },
    splice(event, index) {
      alert(index)
      this.repos.splice(index, 1)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss"></style>
