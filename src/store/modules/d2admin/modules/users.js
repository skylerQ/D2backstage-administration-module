const state = {


    // 门禁Access control
    data: [{
      id: 1,
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
      accessControl: {},
      gender:0,
    }, {
      id: 2,
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄',
      accessControl: {},
      gender:1,
    }, {
      id: 3,
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄',
      accessControl: {},
      gender:0,
    }, {
      id: 4,
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄',
      accessControl: { name: 'yu', key: false, numbering: '9527' },
      gender:0,
    }],
    // 后台约定数据
    address: {
      // 楼栋单元
      unit: [
        { name: '一栋一单元', id: 1 },
        { name: '一栋二单元', id: 2 },
        { name: '一栋三单元', id: 3 },
        { name: '一栋四单元', id: 4 }
      ],
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
          res.accessControl = {
            numbering: val.numbering
          }
        }
      })
    },
    // 添加楼栋出入口授权信息
    address (state, val) {
      console.log(state, val.unit, val.entrance, 'vuex')
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    mutations
  }
  