const timeFormt = (time) => {
  let date = new Date(time)
  let year = date.getFullYear()
  let month = add0(date.getMonth() + 1)
  let day = add0(date.getDate())
  let hours = add0(date.getHours())
  let minutes = add0(date.getMinutes())

  return `${year}-${month}-${day} ${hours}:${minutes}`

  function add0(num) {
    return num > 10 ? num : '0' + num
  }
}

const timeTransform = (time) => {
  time = (Date.now() - new Date(time).getTime()) / 1000
  if (time < 3600) {
    return ~~(time / 60)+'分钟前'
  } else if (time < 86400) {
    return ~~(time / 3600)+'小时前'
  } else if(time < 2592000) {
    return ~~(time / 86400)+'天前'
  } else if(time < 31104000) {
    return ~~(time / 2592000)+'个月前'
  } else {
    return ~~(time / 31104000)+'年前'
  }
}

const storage = {
    set:function (n,c){
        localStorage.setItem(n,JSON.stringify(c));
    },
    get:function (n){
        if(localStorage.getItem(n) == null){
            return null;
        }else{
            return JSON.parse(localStorage.getItem(n));
        }

    },
    remove:function (n){
        localStorage.removeItem(n);
    }
}


export {
  timeFormt,
  timeTransform,
  storage
}
