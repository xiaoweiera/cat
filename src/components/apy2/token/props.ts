const Props = function() {
  return {
    // 币种名称
    symbol: {
      type: String,
      required: true
    },
    // 币种ID
    id: {
      type: String,
      required: true
    },
    // 池子类型
    type: {
      type: String,
      required: true
    },
  }
}

export default Props
