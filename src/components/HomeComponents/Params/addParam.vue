<template>
  <div>
    <el-dialog
      :title="'添加' + tabName"
      :visible.sync="addDialogVisible"
      width="500px"
      :before-close="handleClose"
    >
      <el-form
        :model="form"
        ref="inputForm"
        :rules="rules"
        :inline="false"
        size="normal"
      >
        <el-form-item :label="tabName" prop="inputValue">
          <el-input v-model="form.inputValue" ></el-input>
        </el-form-item>

      <el-form-item>
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        inputValue: "",
      },
      rules: {
        inputValue: [
          { required: true, message: "请输入内容", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    activeTab: "",
    addDialogVisible: false,
    cateId:'',
  },
  methods: {
    handleClose() {
      this.$refs.inputForm.resetFields();
      this.$emit("closeAddDialog");
    },
    handleConfirm() {
      this.$refs.inputForm.validate( async(valid) => {
        if (!valid) {
          return valid
        }
        const {data:res}=await this.$http.post(`categories/${this.cateId}/attributes`,{ 
          attr_name:this.form.inputValue,
          attr_sel:this.activeTab,
          
        })
        console.log(res);
        this.$emit("getAttrList")
        this.handleClose()
      });
    },
  },
  computed: {
    tabName() {
      if (this.activeTab === "many") {
        return "动态参数";
      }
      return "静态属性";
    },
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 70%;
}
</style>