<template>
  <div id="rights">
    <breadcrumb :path="['权限管理', '权限列表']"></breadcrumb>
    <el-card class="box-card">
      <el-table :data="rightList" style="width: 100%" height="550" border >
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="权限等级" sortable>
          <template v-slot="score">
              <el-tag v-if="score.row.level=='0'">一级</el-tag>
              <el-tag v-if="score.row.level=='1'" type="success">二级</el-tag>
              <el-tag v-if="score.row.level=='2'" type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>


<script>
import breadcrumb from "./component/breadcrumb";

export default {
  data() {
    return {
      rightList: [],
    };
  },
  methods: {
    async getRightList(type = "list") {
      const { data: res } = await this.$http.get(`rights/${type}`);
      this.rightList = res.data;
    },
    
  },
  components: {
    breadcrumb,
  },
  created() {
    this.getRightList();
  },
};
</script>

<style lang="less" scoped>

</style>