const state = {
  // 门禁Access control
  data: [{
    id: 1,
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    gender:1,
    status:0,
    accessControl: {
      name: 'yu'
    }
  }, {
    id: 2,
    date: '2016-05-04',
    name: '张小花',
    address: '上海市普陀区金沙江路 1517 弄',
    gender:0,
    status:0,
    accessControl: { name: 'yu', entrance: [] }
  }, {
    id: 3,
    date: '2016-05-01',
    name: '李小璐',
    gender:0,
    status:0,
    address: '上海市普陀区金沙江路 1519 弄',
    accessControl: { name: 'yu', entrance: [] }
  }, {
    id: 4,
    date: '2016-05-03',
    name: '王晓飞',
    gender:1,
    status:1,
    address: '上海市普陀区金沙江路 1516 弄',
    accessControl: { entrance: [], name: 'yu', key: false, numbering: '9527' }
  }],
  // 后台约定数据
  address: {
    // 楼栋单元
    unit2: {
      1: '一栋一单元',
      2: '一栋二单元',
      3: '一栋三单元',
      4: '一栋四单元'
    },
    // 出入口
    entrance: {
      1: '出口',
      2: '入口'
    }
  }
  // newAddress:{
  //   unit: [],
  //   entrance: []
  // }
}
const getters = {
  // 门禁表格渲染数据
  newData (state) {
    const data = []
    state.data.forEach(res => {
      if (res.accessControl) {
        res.accessControl.name = res.name
        res.accessControl.date = res.date
        data.push(res.accessControl)
      }
    })
    return data
  },
  //
  nameS (state) {
    const names = []
    state.data.forEach(res => {
      names.push({ name: res.name, id: res.id })
    })
    return names
  }
  // userAddress(){

  // }
}
const mutations = {
  // 添加当前居民信息
  changeData (state, val) {
    state.data.push(val)
  },
  // 删除当前居民信息
  delete (state, val) {
    state.data.splice(val, 1)
    console.log(state.data)
  },
  // 添加编号
  addNumbering (state, val) {
    // console.log(state.data.indexOf(val.value), 'vuex')
    // indexOf
    state.data.forEach(res => {
      if (res.id === val.id) {
        res.accessControl.numbering = val.cardNumber
        res.accessControl.cardType = val.cardType
      }
    })
  },
  // 添加楼栋出入口授权信息
  authorizationForm (state, val) {
    console.log(state, val.unit2, val.entrance, val.id,val.region, 'vuex')
    state.data.forEach(res => {
      if (res.id === val.id) {
        res.accessControl.unit = val.unit2
        res.accessControl.entrance = val.entrance
        res.accessControl.region = val.region
      }
    })
    console.log(state.data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
