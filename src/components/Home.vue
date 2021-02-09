<template>
  <el-container class="home-container">
    <el-header class="home-header">
      <div class="header-left">
        <img src="../assets/logo.png" alt="" class="logo" />
        <span @click="goHome">后台管理系统</span>
      </div>
      <div class="hearder-right">
        <el-button @click="logout" class="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle" @click="toggleNav">|||</div>
        <el-menu
          :default-active="this.$route.path"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
         
        >
          <el-submenu
            :index="item.order + ''"
            v-for="item in menuList"
            :key="item.order"
            class="submenu"
          >
            <template slot="title">
              <div class="submenu-title">
                <i :class="iconObj[item.order]" class="title-icon"></i>
                <span>{{ item.authName }}</span>
              </div>
            </template>
            <el-menu-item
              :index="'/'+children.path"
              v-for="(children, index) in item.children"
              :key="index"
            >
              <div class="menu-item">
                <i class="el-icon-folder"></i>
                <span class="item-span">{{ children.authName }}</span>
              </div>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.getMenus();
  },
  data() {
    return {
      defaultActive: "",
      menuList: [],
      iconObj: {
        1: "el-icon-s-custom",
        2: "el-icon-s-promotion",
        3: "el-icon-s-home",
        4: "el-icon-s-flag",
        5: "el-icon-s-platform",
      },
      isCollapse: false,
    };
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem("token");
      this.$message({
        message: "退出成功",
        type: "success",
      });
      this.$router.push("/login");
    },
    goHome() {
      this.$router.push("/login");
    },
    async getMenus() {
      const { data: menuList } = await this.$http.get("menus");
      if (menuList.meta.status !== 200) {
        return this.$message(menuList.data.msg);
      }
      this.menuList = menuList.data;
    },
    toggleNav() {
      this.isCollapse = !this.isCollapse;
    },

  },

};
</script>

<style lang="less" scoped>
.el-header {
  color: #333;
  line-height: 60px;
  border-bottom: 1px solid #dcdfe6;
}

.el-aside {
  color: #909399;
  line-height: 200px;
  .toggle {
    line-height: 28px;
    font-size: 10px;
    text-align: center;
    background-color: rgb(218, 218, 218);
    letter-spacing: 0.2em;
    cursor: pointer;
  }
}
.el-menu {
  border-right: none;
}
.submenu-title {
  span {
    margin-left: 10px;
  }
}

.submenu-title,
.menu-item {
  position: relative;
  left: 15px;
}
.el-menu--collapse {
  .submenu-title,
  .menu-item {
    position: relative;
    left: 0px;
    text-align: center;
  }
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

.el-container {
  height: 100%;
}
.home-header {
  display: flex;
  justify-content: space-between;
  .header-left {
    display: flex;
    align-content: center;
    .logo {
      height: 50px;
      transform: translateY(5px);
    }
  }
}

</style>