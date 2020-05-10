//引入
import MyButton from '../components/MyButton.vue'
import MyList from '../components/MyList.vue'

function plugins(Vue) {
  //注册
  Vue.component('MyButton', MyButton)
  Vue.component('MyList', MyList)
}
export default plugins
