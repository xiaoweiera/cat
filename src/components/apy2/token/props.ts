const Props = function() {
  return {
    // 币种名称
    symbol: {
      type: String,
      required: true
    },
    // 池子类型
    type: {
      type: String,
      required: true
    },
    projectType:{
      type:String
    }
  }
}

export default Props
