import { TabCategoryData } from '~/logic/apy2/interface'

const getProps = function() {
  return {
    // 是否是池子，否则为单币
    pool: {
      type: Boolean,
      default () {
        return false
      }
    },
    // 类型
    type: {
      type: String,
      default: () => TabCategoryData.mining,
      validator: function(value: string) {
        // 类型为挖矿与借贷
        return value === TabCategoryData.mining || value === TabCategoryData.lend;
      }
    },
    // 币种为 symbol name, 池子为 id
    value: {
      type: [String, Number],
      required: true,
    },
    // 是否已收藏, 默认为未收藏
    status: {
      type: Boolean,
      default () {
        return false
      }
    }
  }
}

export default getProps
