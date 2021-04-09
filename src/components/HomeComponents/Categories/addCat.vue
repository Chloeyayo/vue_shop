<template>
  <div>
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      :before-close="hiddeAddDialog"
    >
      <el-form ref="addCateForm" :model="addCateForm" label-width="80px" :rules="rules">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            v-model="selectedKeys"
            :options="parentCategoryList"
            :props="{
              expandTrigger: 'hover',
              value: 'cat_id',
              label: 'cat_name',
              children: 'children',
              checkStrictly: true,
            }"
            @change="handleChange"
            
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hiddeAddDialog">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addCateForm: {
        cat_name: "",
        cat_pid: 0,
        cat_level: 0,
      },
      selectedKeys: [],
      rules: {
        cat_name: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  methods: {
    async submit() {
      this.$refs.addCateForm.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('categories', this.addCateForm)

        if (res.meta.status !== 201) {
          console.log(res);
          return this.$message.error(res.meta.msg)
        }

        this.$message.success('添加分类成功！')
        this.$emit("getCategoryList")
        this.hiddeAddDialog()
      })
    },
    async save(){
      const { data: data}=await this.$http.post('categories',this.addCateForm)
      if(data.meta.status!==201){
        console.log(data.meta.status)
        return data.meta.msg;
      }
    },
    hiddeAddDialog() {
      this.addCateForm.cat_pid =0
      this.addCateForm.cat_name=""
      this.addCateForm.cat_pid= 0
      this.selectedKeys = [];
      this.$emit("hiddeAddDialog");
    },
    handleChange(value) {
      this.selectedKeys = value;
      console.log(this.selectedKeys);
      if (this.selectedKeys.length == 0) {
        this.addCateForm.cat_pid = 0;
        this.addCateForm.cat_level = 0;
      } else if (this.selectedKeys.length == 1) {
        this.addCateForm.cat_pid = this.selectedKeys[0];
        this.addCateForm.cat_level = 1;
      } else {
        this.addCateForm.cat_pid = this.selectedKeys[1];
        this.addCateForm.cat_level = 2;
      }
      console.log(this.addCateForm);
    },
  },
  props: {
    addCateDialogVisible: false,
    parentCategoryList: Array,
  },
};
</script>

<style lang="less" scoped>
.flex-container {
  display: flex;
}
.el-cascader {
  width: 100%;
}
</style>