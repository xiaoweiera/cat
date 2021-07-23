import { ref } from 'vue'
export const webVersion=ref(2)
// 是否展示
export const isShow=()=>{
    const version=localStorage.getItem('webVersion')
    console.log(!!version,version,webVersion.toString(),version!==webVersion.toString(),(version && version!==webVersion.value.toString()))
    if(!version){
        localStorage.setItem('webVersion',webVersion.value.toString())
        return true
    }else if(version && version!==webVersion.value.toString()){
        localStorage.setItem('webVersion',webVersion.value.toString())
        return true
    }
    return false
}