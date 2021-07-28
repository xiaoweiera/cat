import { ref } from 'vue'
export const webVersionCn=ref(1)
export const webVersionEn=ref(1)
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