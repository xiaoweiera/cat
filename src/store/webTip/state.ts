import { ref } from 'vue'
const version = 5
export const webVersionCn=ref(version)
export const webVersionEn=ref(version)
// 是否展示
export const isShow=(lang:string)=>{
    const webVersion=lang==='cn'?'webVersionCn':'webVersionEn'
    const value=lang==='cn'?webVersionCn.value.toString():webVersionEn.value.toString()
    const version=localStorage.getItem(webVersion)
    if(!version){
        localStorage.setItem(webVersion,value)
        return true
    }else if(version && version!==value){
        localStorage.setItem(webVersion,value)
        return true
    }
    return false
}
