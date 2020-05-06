<template>
  <div style="padding-top:10px;">
    <span v-for="(item, index) in menus" :key="index" class="gutter">
      <mu-button :color="item.icon" @click="handleClick(item.title)">{{ item.title }}</mu-button>
    </span>
    <v-card>
      <v-card-title>
        歌单管理
        <v-spacer></v-spacer>
        <v-text-field :v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-card-title>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">songListId</th>
              <th class="text-left">songListName</th>
              <th class="text-left">songCount</th>
              <th class="text-left">playCounts</th>
              <th class="text-left">likeCount</th>
              <th class="text-left">commentCount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in musicList" :key="item.name">
              <td>{{ item.songListId }}</td>
              <td>{{ item.songListName }}</td>
              <td>{{ item.songCount }}</td>
              <td>{{ item.playCounts }}</td>
              <td>{{ item.likeCount }}</td>
              <td>{{ item.commentCount }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Music',
  data() {
    return {
      singleSelect: false,
      search: '',
      menus: [],
      selected: [],
      headers: [
        {
          text: 'songListId',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'songListName', value: 'calories' },
        { text: 'songCount', value: 'fat' },
        { text: 'playCounts', value: 'carbs' },
        { text: 'likeCount', value: 'protein' },
        { text: 'commentCount', value: 'iron' }
      ],
      musicList: []
    }
  },
  created() {
    //拿到按钮
    let index = this.$route.query.index
    let index1 = this.$route.query.index1
    console.log(index, index1)
    this.menus = JSON.parse(localStorage.getItem('menuList'))[index].subMenus[index1].subMenus
    console.log(this.menus)
    this.axios({
      method: 'post',
      url: '/songList/page',
      data: {
        currentPage: 1,
        pageSize: 10
      }
    }).then((res) => {
      this.musicList = res.data.data
      console.log(this.musicList)
    })
  },
  methods: {
    handleClick(title) {
      if (title === '查询') {
        this.search()
      }
      if (title === '导出') {
        this.export()
      }
      if (title === '删除') {
        this.delete()
      }
    },
    export() {
      this.axios.get('/songList/export').then((res) => {
        if (res.data.code === 1) {
          alert('导出成功')
        }
      })
    }
  },
  computed: {
    songList() {
      return this.items.filter((item) => item.songListName.indexOf(this.keywords) >= 0)
    }
  }
}
</script>

<style scoped lang="scss"></style>
