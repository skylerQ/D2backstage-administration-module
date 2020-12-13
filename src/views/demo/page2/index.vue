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
          size="small"
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
            width="35"
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
            width="100"
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
            label="性别"
            width="25"
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
            prop="status"
            label="标签"
            width="100"
            :filters="[
              { text: '有效', value: 1 },
              { text: '无效', value: 0 }
            ]"
            :filter-method="filterStatus"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.tag === '家' ? 'primary' : 'success'"
                disable-transitions
                > {{`${scope.row.status>0?'有效':'无效'}`}} </el-tag
              >
            </template>
          </el-table-column>

          <!-- 门禁卡状态 -->
          <el-table-column
            min-width="55"
            header-align="center"
            align="center"
            label="门禁"
            width="55"
          >
            <template slot-scope="scope">
              <el-popover placement="top" width="200" v-model="cardVisible">
                <div>
                  <el-input
                    style="margin-bottom: 15px"
                    v-model="cardForm.cardNumber"
                    placeholder="门禁卡编号"
                  ></el-input>
                  <el-select
                    style="margin-bottom: 15px"
                    v-model="cardForm.cardType"
                    placeholder="请选择卡种"
                  >
                    <el-option
                      v-for="item in cardOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>

                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="btn"
                    >取消</el-button
                  >
                  <el-button
                    type="primary"
                    size="mini"
                    @click="cardVisible = false"
                    >确定</el-button
                  >
                </div>
                <el-button @click="handleDoor(scope.row.id)" slot="reference"
                  >删除</el-button
                >
                <!-- <el-button @click="handleDoor(scope.row.id)" slot="reference" type="success" plain size="mini"
                  >添加1</el-button
                > -->
                <!-- <el-button slot="reference" type="success" plain size="mini"
                  >修改</el-button
                > -->
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column
            min-width="180"
            header-align="center"
            align="center"
            label="操作"
            width="180"
          >
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="danger"
                size="mini"
                icon="el-icon-delete"
                >删除</el-button
              >
              <el-button type="primary" size="mini" icon="el-icon-edit"
                >修改</el-button
              >
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="authorizationBtn"
                >授权</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 弹出区域 -->
    <el-dialog width="50%" title="新增人员" :visible.sync="dialogFormVisible">
      <el-form
        ref="addMembersForm"
        :rules="rule"
        :inline="true"
        :model="addMembersForm"
      >
        <el-form-item prop="name" label="姓名" :label-width="formLabelWidth">
          <el-input
            maxlength="5"
            v-model="addMembersForm.name"
            placeholder="请输入姓名"
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
        >
          <el-input
            type="phoneNumber"
            maxlength="11"
            v-model.number="addMembersForm.phoneNumber"
            placeholder="请输入"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="身份证号码"
          :label-width="formLabelWidth"
          prop="idNumber"
        >
          <el-input
            maxlength="18"
            v-model="addMembersForm.idNumber"
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

    <!-- 授权弹出区域 -->
    <el-dialog
      width="50%"
      title="授权"
      :visible.sync="authorizationFormVisible"
    >
      <el-form :inline="true" :model="authorizationForm">
        <el-form-item label="居民" :label-width="formLabelWidth">
          <el-select v-model="authorizationForm.id" placeholder="请选择居民">
            <el-option
              v-for="item in tableData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="授权方式" :label-width="formLabelWidth">
          <el-radio-group v-model="authorizationForm.region">
            <el-radio :label="1">人脸</el-radio>
            <el-radio :label="2">门禁卡</el-radio>
            <el-radio :label="3">门禁卡+人脸</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="出入口门禁" :label-width="formLabelWidth">
          <el-select
            clearable
            multiple
            v-model="authorizationForm.entrance"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in address.entrance"
              :key="index"
              :label="item"
              :value="index"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="单元门禁" :label-width="formLabelWidth">
          <el-select
            v-model="authorizationForm.unit2"
            clearable
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in address.unit2"
              :key="index"
              :label="item"
              :value="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="authorizationFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAuthorizationForm"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import log from "@/plugin/log";
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      // 表单验证
      rule: {
        name: [
          { required: true, message: "请输入姓名" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符"
          },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: "姓名不支持特殊字符"
          }
        ],
        phoneNumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            required: true,
            pattern: /^((13|14|15|16|17|18)[0-9]{1}\d{8})|((166|199|198)[0-9]{1}\d{7})$/,
            message: "请输入正确的手机号码"
          }
        ],
        idNumber: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { min: 15, max: 18, message: "请填写18位号码" },
          {
            required: true,
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: "请输入正确的身份证号码"
          }
        ]
      },

      // cardVisible: false,
      // 门禁卡信息
      cardForm: {
        id: "",
        cardNumber: "",
        cardType: ""
      },
      cardValue: "",
      cardOptions: [
        {
          value: "1",
          label: "IC卡1"
        },
        {
          value: "2",
          label: "IC卡2"
        },
        {
          value: "3",
          label: "IC卡3"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "无效"
        },
        {
          value: "选项2",
          label: "有效"
        }
      ],
      value: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      authorizationFormVisible: false,
      addMembersForm: {
        name: "",
        phoneNumber: null,
        address: null,
        gender: 1,
        idNumber: ""
      },
      formLabelWidth: "120px",
      multipleSelection: [],
      authorizationForm: {
        id: "",
        name: "",
        region: 1,
        entrance: [],
        unit2: []
      }
    };
  },
  computed: {
    tableData() {
      return this.$store.state.users.data;
    },
    address() {
      return this.$store.state.users.address;
    }
  },

  methods: {
    //表格中筛选门禁状态
    filterStatus(value, row) {
        return row.status === value;
      },
    btn() {
      // console.log(this.cardVisible = false);
      this.$nextTick(res => {
        this.cardVisible = false;
      });
    },
    // submitCard(){
    //     this.cardVisible = false
    //     this.$store.commit('users/addNummbering',this.cardForm)
    // },
    handleDoor(id) {
      console.log(555);
      // this.cardVisible = true
      console.log(this.cardVisible);
      // this.visible = true;
      this.cardForm.id = id;
    },
    // 表格多选发生变化
    handleSelectionChange() {},

    //提交授权
    submitAuthorizationForm() {
      this.authorizationFormVisible = false;
      console.log(this.authorizationForm);
      this.$store.commit("users/authorizationForm", this.authorizationForm);
      this.authorizationForm = {};
    },

    // 点击了修改门禁
    handleDoorClick(data) {
      console.log(data);
    },

    //表格 - 操作 -授权按钮
    authorizationBtn() {
      this.authorizationFormVisible = true;
    },
    onSubmitStatus() {
      console.log("提交:", this.value);
    },
    // 新增人员信息弹窗的提交
    submitaMembersForm(formData) {
      this.$refs[formData].validate(valid => {
        if (valid) {
          console.log("数据", this.addMembersForm);
          const id = uuidv4().replace(/\-/g, "");
          this.addMembersForm.id = id;
          this.$store.commit("users/changeData", this.addMembersForm);
          this.dialogFormVisible = false;
        } else {
          console.log("erro");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-select .el-input {
  width: 100px;
}
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
