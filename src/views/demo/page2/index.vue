<template>
  <d2-container>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix guardCard">
        <div class="guardCard__status">
          <span>门禁卡状态</span>
          <div class="search">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="onSubmitStatus"
          ></el-button>
        </div>
      </div>
      <div class="text item">
        <el-button
          type="warning"
          icon="el-icon-plus"
          @click="dialogFormVisible = true"
          >添加</el-button
        >

        <el-table
          border
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            header-align="center"
            align="center"
            type="selection"
            width="25"
          >
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="序列号"
            width="50"
          >
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="id"
            width="50"
          >
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="name"
            label="居民姓名"
            width="35"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="身份证号"
            width="120"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="证件照片"
            width="35"
          >
            <template slot-scope="scope">
              <el-popover placement="top-start" title="" trigger="hover">
                <img src="./2.jpg" alt="" style="width: 150px; height: 150px" />
                <img
                  slot="reference"
                  src="./2.jpg"
                  style="width: 30px; height: 30px"
                />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="证件照片"
            width="35"
          >
            <template slot-scope="scope">
              <el-popover placement="top-start" title="" trigger="hover">
                <img src="./1.jpg" alt="" style="width: 150px; height: 150px" />
                <img
                  slot="reference"
                  src="./1.jpg"
                  style="width: 30px; height: 30px"
                />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="性别"
            width="35"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.gender == 0">女</span>
              <span v-if="scope.row.gender == 1">男</span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="checkStatus"
            label="审核状态"
            width="35"
          >
          </el-table-column>
          <el-table-column
            min-width="200"
            header-align="center"
            align="center"
            label="操作"
            width="210"
          >
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="danger"
                size="mini"
                style="margin: 0"
                icon="el-icon-delete"
                >删除</el-button
              >
              <el-button
                style="margin: 0"
                type="primary"
                size="mini"
                icon="el-icon-edit"
                >修改</el-button
              >
              <el-button
                style="margin: 0"
                type="primary"
                size="mini"
                icon="el-icon-edit"
                >绑定房屋</el-button
              >
              <el-button
                style="margin: 0"
                type="primary"
                size="mini"
                icon="el-icon-edit"
                >解绑</el-button
              >
              <el-button
                style="margin: 0"
                type="danger"
                size="mini"
                icon="el-icon-delete"
                >迁出</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 弹出区域 -->
    <el-dialog width="50%" title="新增人员" :visible.sync="dialogFormVisible">
      <el-form ref="addMembersForm" :inline="true" :model="addMembersForm">
        <el-form-item prop="name" label="姓名" :label-width="formLabelWidth">
          <el-input
            maxlength="4"
            v-model="addMembersForm.name"
            placeholder="请输入"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="选择性别" :label-width="formLabelWidth">
          <el-radio-group v-model="addMembersForm.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="手机号码"
          :label-width="formLabelWidth"
          prop="phoneNumber"
          :rules="[
            { required: true, message: '手机号码不能为空' },
            { type: 'number', message: '手机号码必须为数字值' },
          ]"
        >
          <el-input
            type="phoneNumber"
            maxlength="11"
            v-model.number="addMembersForm.phoneNumber"
            placeholder="请输入"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="身份证号码" :label-width="formLabelWidth">
          <el-input
            maxlength="11"
            v-model="addMembersForm.address"
            placeholder="请输入"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitaMembersForm('addMembersForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import log from "@/plugin/log";
import { v4 as uuidv4 } from 'uuid'
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "无效",
        },
        {
          value: "选项2",
          label: "有效",
        },
      ],
      value: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      addMembersForm: {
        name: "",
        phoneNumber: null,
        address: null,
        gender: 1,
      },
      formLabelWidth: "120px",
      multipleSelection: [],
    };
  },
  computed:{
     tableData(){
       return this.$store.state.users.data
     }
  },

  methods: {
    onSubmitStatus() {
      console.log("提交:", this.value);
    },
    // 新增人员信息弹窗的提交
    submitaMembersForm(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          console.log('数据',this.addMembersForm);
          const id = uuidv4().replace(/\-/g,'')
          this.addMembersForm.id = id;
          this.$store.commit('users/changeData',this.addMembersForm)
          this.dialogFormVisible = false;
        } else {
          console.log("erro");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin: 0 0 20px 0;
}

.guardCard {
  width: 100%;
  &__status {
    padding: 0 50px;
    display: flex;
    align-items: center;
    .search {
      padding: 0 20px;
    }
  }
}
</style>
