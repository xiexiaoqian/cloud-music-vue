<template>
  <div style="padding-top:10px;">
    <span v-for="(item, index) in menus" :key="index" class="gutter">
      <mu-button :color="item.icon">{{ item.title }}</mu-button>
    </span>
    <v-card>
      <v-card-title>
        歌单管理
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-card-title>

      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="musicList"
        :single-select="singleSelect"
        item-key="name"
        show-select
        class="elevation-1"
      >
        <template v-slot:top> </template>
      </v-data-table>
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
      url: this.GLOBAL.baseUrl + '/songList/page',
      data: {
        currentPage: 1,
        pageSize: 10
      }
    }).then((res) => {
      this.musicList = res.data.data
      console.log(this.musicList)
    })
  },
  methods: {}
}
</script>

<style scoped lang="scss"></style>
