<template>
  <div style="background-color: #f8f8f8; min-height: 100vh">
    <div>
      <!--头部-->
      <div class="front-header">
        <div class="front-header-left">
          <img src="@/assets/imgs/logo1.png" alt="">
          <div class="title">二手交易平台</div>
        </div>
        <div class="front-header-center">
          <div @click="$router.push(item.path)" class="menu" v-for="item in menus" :key="item.path"
               :class="{'menu-active' : item.path === $route.path }">{{ item.text }}</div>
        </div>
        <div class="front-header-right">
          <div v-if="!user.username">
            <el-button @click="$router.push('/login')">登录</el-button>
            <el-button @click="$router.push('/register')">注册</el-button>
          </div>
          <div v-else>
            <el-dropdown>
              <div class="front-header-dropdown">
                <img :src="user.avatar" alt="" style="border-radius: 50%">
                <div style="margin-left: 10px; color: #eee; cursor: pointer">
                  <span>{{ user.name }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
                </div>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <div @click="$router.push('/front/person')">个人信息</div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div @click="$router.push('/front/collect')">我的收藏</div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div style="text-decoration: none" @click="logout">退出登录</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
      <!--主体-->
      <div class="main-body">
        <router-view ref="child" @update:user="updateUser" />
      </div>
    </div>
    <Footer></Footer>
  </div>

</template>

<script>
import Footer from "@/components/Footer.vue";
export default {
  name: "FrontLayout",
  components: {
    Footer
  },

  data () {
    return {
      notice: [],
      user: JSON.parse(localStorage.getItem("xm-user") || '{}'),
      menus: [
        { text: '热卖专区', path: '/front/home' },
        { text: '社区广场', path: '/front/posts' },
        { text: '求购专区', path: '/front/helpView' },
        { text: '系统公告', path: '/front/notice' },
        { text: '留言反馈', path: '/front/feedback' },
      ],
    }
  },

  mounted() {
    this.loadNotice()
  },
  methods: {
    loadNotice() {
      this.$request.get('/notice/selectAll').then(res => {
        this.notice = res.data
        let i = 0
        if (this.notice && this.notice.length) {
          this.top = this.notice[0].content
          setInterval(() => {
            this.top = this.notice[i].content
            i++
            if (i === this.notice.length) {
              i = 0
            }
          }, 2500)
        }
      })
    },
    updateUser() {
      this.user = JSON.parse(localStorage.getItem('xm-user') || '{}')   // 重新获取下用户的最新信息
    },
    // 退出登录
    logout() {
      const loading = this.$loading({
        lock: true,
        text: '正在退出...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      setTimeout(() => {
        localStorage.removeItem("xm-user");
        loading.close();  // 关闭加载效果
        this.$router.push("/login");
        this.$message.success('退出登录成功')
      }, 1000);  // 延迟 0.3 秒后执行退出操作
    },
  }

}
</script>

<style scoped>
  @import "@/assets/css/front.css";

  .menu {
    color: #eeeeee;
    font-size: 16px;
    padding: 0 20px;
    cursor: pointer;
  }
  .menu:hover {
    color: orange;
  }
  .menu-active {
    color: orange;
  }
</style>