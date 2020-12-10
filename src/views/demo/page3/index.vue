<template>
  <d2-container>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">智慧安防</a></el-breadcrumb-item>
        <el-breadcrumb-item>智能门禁</el-breadcrumb-item>
        <el-breadcrumb-item>门禁授权</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix guardCard">
        <div class="guardCard__status">
          <span>居民</span>
          <div class="search">
            <el-select v-model="residentValue" placeholder="请选择居民">
              <el-option
                v-for="item in residentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <span>授权方式</span>
          <div class="search">
            <el-select v-model="authorizationValue" placeholder="请选择">
              <el-option
                v-for="item in authorizationOptions"
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
          >授权</el-button
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
            width="55"
          >
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="序列号"
            width="55"
          >
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="name"
            label="居民姓名"
            width="55"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="身份证号"
            width="150"
            header-align="center"
            align="center"
          >
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="gender"
            label="性别"
            width="55"
          >
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="checkStatus"
            label="审核状态"
            width="55"
          >
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="操作"
            width="80"
          >
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="danger"
                size="mini"
                style="margin:0"
                icon="el-icon-delete"
                >删除</el-button
              >
              <el-button
                style="margin:0"
                type="primary"
                size="mini"
                icon="el-icon-edit"
                >修改</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 弹出区域 -->
    <el-dialog width="50%" title="授权" :visible.sync="dialogFormVisible">
      <el-form :inline="true" :model="form">
        <el-form-item label="居民" :label-width="formLabelWidth">
          <el-select v-model="residentValue" placeholder="请选择居民">
            <el-option
              v-for="item in residentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="授权方式" :label-width="formLabelWidth">
          <el-radio-group v-model="radio">
            <el-radio :label="3">人脸</el-radio>
            <el-radio :label="6">门禁卡</el-radio>
            <el-radio :label="9">门禁卡+人脸</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="卡编号" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-button type="primary">读取</el-button>
        </el-form-item>

        <el-form-item label="出入口门禁" :label-width="formLabelWidth">
          <el-select v-model="residentValue" placeholder="请选择">
            <el-option
              v-for="item in residentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="单元门禁" :label-width="formLabelWidth">
          <el-select v-model="residentValue" placeholder="请选择">
            <el-option
              v-for="item in residentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import log from "@/plugin/log";
export default {
  data() {
    return {
      radio: 3,
      // 居民选项的值
      residentValue: "",
      residentOptions: [
        {
          value: "选项1",
          label: "王二狗"
        },
        {
          value: "选项2",
          label: "张小花"
        }
      ],
      // 授权选项的值
      authorizationValue: "",
      authorizationOptions: [
        {
          value: "选项1",
          label: "人脸"
        },
        {
          value: "选项2",
          label: "门禁卡"
        },
        {
          value: "选项2",
          label: "门禁卡+人脸"
        }
      ],

      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          gender: "男"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          gender: "男"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          gender: "男"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          gender: "男"
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",

      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          gender: "男",
          checkStatus: "已通过审核"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          gender: "男",
          checkStatus: "已通过审核"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          gender: "男",
          checkStatus: "已通过审核"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          gender: "男",
          checkStatus: "已通过审核"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          checkStatus: "已通过审核"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          checkStatus: "已通过审核"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          checkStatus: "已通过审核"
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    onSubmitStatus() {
      console.log("提交:", this.value);
    }
  }
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
