<template>
  <d2-container>
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
        ><div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
        ><div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
    </el-row>

    <el-popover placement="top" width="160" v-model="visible1">
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
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible1 = false"
          >取消</el-button
        >
        <el-button type="primary" size="mini" @click="visible1 = false"
          >确定</el-button
        >
      </div>
      <el-button @click="btn" slot="reference">删除</el-button>
    </el-popover>
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      visible1: false,
      // 门禁卡信息
      cardForm: {
        id: "",
        cardNumber: "",
        cardType: "",
      },
      cardValue: "",
      cardOptions: [
        {
          value: "1",
          label: "IC卡1",
        },
        {
          value: "2",
          label: "IC卡2",
        },
        {
          value: "3",
          label: "IC卡3",
        },
      ],
    };
  },
  methods: {
    btn() {
      console.log(this.visible1);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
