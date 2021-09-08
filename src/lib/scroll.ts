// 计算元素距离 body 的位置
const offsetY = function (dom: HTMLElement, number = 0): number {
    const body = document.querySelector('#right')
    if (dom) {
        const value = number + dom.offsetTop
        const parent = dom.offsetParent
        if (parent === body) {
            return value
        }
        //@ts-ignore
        return offsetY(parent, value)
    }
    return number
}
//锚定点: id 偏移
export const moveScroll = ( key: string,offset:number) => {
    if (key) {
        //@ts-ignore
        const top = offsetY(document.querySelector(`#${key}`),offset)
        //@ts-ignore
        document.scrollingElement.scrollTop = top
    }
}