<template>
  <div>
    <breadcrumb :path="['商品管理', '添加商品']"></breadcrumb>
    <el-card>
      <el-alert
        title="添加商品信息"
        type="info"
        :closable="false"
        show-icon
        center
      >
      </el-alert>
      <el-steps
        :space="200"
        :active="activeSteps - 0"
        align-center
        finish-status="success"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form
        :model="addForm"
        ref="addForm"
        :rules="addFormRules"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          tab-position="left"
          v-model="activeSteps"
          :before-leave="handleTabChanges"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name" width="100"></el-input>
            </el-form-item>

            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="cateList"
                :props="cateProps"
                @change="handleCateChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              :label="item.attr_name"
              v-for="(item, index) in attrsMany"
              :key="index"
            >
              <el-checkbox-group v-model="checkList">
                <el-checkbox
                  border
                  :label="cheackItem"
                  v-for="(cheackItem, index) in item.attr_vals"
                  :key="index"
                  checked
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              :label="item.attr_name"
              v-for="(item, index) in attrsOnly"
              :key="index"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              class="upload-demo"
              action="http://127.0.0.1:8888/api/private/v1/upload"
              :on-preview="handleImgPreview"
              :on-remove="handleImgRemove"
              :on-success="handleUploadSuccess"
              :headers="headers"
              list-type="picture"
              drag
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor
              ref="myTextEditor"
              v-model="addForm.goods_introduce"
              :options="editorOption"
            ></quill-editor>
              <el-button type="primary" @click="add">添加商品</el-button>
            
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <el-dialog :visible.sync="imgDialogVisible" width="80%" top="20px">
      <el-image :src="imgUrl" fit="fill" :lazy="true" width="100%" ></el-image>
      
       </el-dialog>
  </div>
</template>

<script>
import breadcrumb from "../component/breadcrumb";
export default {
  data() {
    return {
      activeSteps: 0,
      addForm: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
        goods_cat: [1, 3, 6],
        pics: [],
        goods_introduce: "",
      },
      attrsMany: [],
      attrsOnly: [],
      checkList: [],
      cateList: [],
      cateProps: {
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      attrList: [],
      addFormRules: {
        goods_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
        ],
        goods_cat: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
        ],
      },
      headers: { Authorization: window.sessionStorage.getItem("token") },
      imgUrl: "",
      imgDialogVisible: false,
      editorOption: {
        placeholder: "编辑文章内容",
      },
    };
  },
  methods: {
    async getCategoryList() {
      const { data: res } = await this.$http.get("/categories");
      this.cateList = res.data;
    },
    handleCateChange() {
      console.log(this.addForm);
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = [];
        this.$message.error("请选择三级分类");
      }
    },
    async getAttrListMany() {
      const { data: res } = await this.$http.get(
        `categories/${this.cateId}/attributes`,
        {
          params: { sel: "many" },
        }
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.attrsMany = res.data;
      this.attrsMany.forEach((item) => {
        item.attr_vals = item.attr_vals.split(" ");
        console.log(item.attr_vals);
      });
      // console.log(this.attrs);
    },
    async getAttrListOnly() {
      const { data: res } = await this.$http.get(
        `categories/${this.cateId}/attributes`,
        {
          params: {
            sel: "only",
          },
        }
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.attrsOnly = res.data;
    },
    handleTabChanges(activeName, oldActiveName) {
      if (oldActiveName == 0 && this.addForm.goods_cat.length !== 3) {
        this.$message.error("请选择商品分类");
        return false;
      }
      if (activeName == 1) {
        this.getAttrListMany();
      }
      if (activeName == 2) {
        this.getAttrListOnly();
      }
    },

    handleImgPreview(file) {
      this.imgUrl = file.response.data.url;
      this.imgDialogVisible = true;
    },
    handleImgRemove(file) {
      console.log(file.response.data.tmp_path);
      const deleteIndex = this.addForm.pics.findIndex(
        (item) => item.pic == file.response.data.tmp_path
      );
      this.addForm.pics.splice(deleteIndex, 1);
      console.log(this.addForm.pics);
    },
    handleUploadSuccess(response) {
      this.addForm.pics.push({ pic: response.data.tmp_path });
      console.log(this.addForm.pics);
    },
    onEditorReady(quill) {
      console.log(this.$refs.myTextEditor.quill.getText());
    },
    add(){
      this.addForm.goods_cat.join(',')
      console.log(this.addForm)
      console.log(this.checkList)
    }
  },
  created() {
    this.getCategoryList();
    this.getAttrListMany();
    this.getAttrListOnly();
  },
  computed: {
    cateId() {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2];
      }
      return null;
    },
  },
  components: {
    breadcrumb,
  },
};
</script>

<style lang="less" scoped>
.el-steps {
  font-size: 14px;
}
.el-card {
  text-align: left;
}
.el-cascader {
  width: 250px;
}
.el-checkbox {
  margin: 0 15px 0 0 !important;
}
/deep/ .ql-editor{
  min-height: 300px !important;
}
.el-button{
  margin-top: 15px;
}
</style>
