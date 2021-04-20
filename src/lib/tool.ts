export const numberFormat=(value:any)=> {
    if(value===null){
        return null;
    }
    let k = 10000,
        sizes = ["", "万", "亿", "万亿"],
        i;
    if (value < k) {
        return parseFloat(value).toFixed(2)
    }
    i = Math.floor(Math.log(value) / Math.log(k));
        let values=parseFloat((value / Math.pow(k, i)).toFixed(2))
       let  unit= sizes[i]
    return values+unit
}
//保留两位
export const numberTwo=(value:any)=>{
    if(!value){
        return ''
    }else{
      return   value.toFixed(2)+'%'
    }
}
