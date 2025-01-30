// 封装本地存储数据与读取数据的方法

// 本地存醋存储数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}

// 本地存醋获取数据
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}
