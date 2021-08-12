/**
 * @file APY 2.0 接口
 */

// 币种列表
export const tokenList = async function(): Promise<any[]> {
  const value = {
    id: 'mdx',
    name: 'MDX',
    icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/4/999fa597ae6a15e25de58105f52168dd_4W1S3jM.png'
  }
  return new Array(100).fill(value)
}
