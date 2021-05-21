// 复制方法
export const copyToken = (tokenAddress: string) => {
  const dom = document.createElement('input')
  dom.setAttribute('value', tokenAddress)
  document.body.appendChild(dom)
  dom.select()
  document.execCommand('copy')
  document.body.removeChild(dom)
}
