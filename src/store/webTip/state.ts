import { ref } from 'vue'
export const webVersion=ref(1)
// 是否展示
export const isShow=()=>{
    const version=localStorage.getItem('webVersion')
    if(!version){
        localStorage.setItem('webVersion',webVersion.value.toString())
        return true
    }else if(version && version!==webVersion.value.toString()){
        localStorage.setItem('webVersion',webVersion.value.toString())
        return true
    }
    return false
}