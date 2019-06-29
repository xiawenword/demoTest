<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import axios from "axios";
import { log } from "util";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 6, message: "请输入4~6个字符串", trigger: "change" },
          { min: 4, max: 6, message: "请输入4~6个字符串", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 18, message: "请输入5~18个字符串", trigger: "change" },
          { min: 5, max: 18, message: "请输入5~18个字符串", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios({
            url: "http://localhost:8888/api/private/v1/login",
            method: "post",
            data: this.form
          }).then(({ data: { data, meta } }) => {
            console.log(1);
            if (meta.status == 200) {
              console.log(2);
              localStorage.setItem("token", data.token);
              this.$router.push("/index");
            }
          });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
.row-bg.el-row.is-justify-center.is-align-middle.el-row--flex {
  height: 100%;
  background-color: #2d3c4e;
}
.el-col.el-col-24.el-col-xs-14.el-col-sm-12.el-col-md-10.el-col-lg-8.el-col-xl-6 {
  border-radius: 10px;
  background-color: #fff;
  padding: 40px 40px 20px 10px;
}
</style>

