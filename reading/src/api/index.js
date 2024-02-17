import axios from 'axios'

const VUE_APP_BASE_API = 'http://47.99.166.157:3000'

export function home() {
  return axios({
    method: 'GET',
    url: `${VUE_APP_BASE_API}/book/home`
  })
}

export function detail(fileName) {
  return axios({
    method: 'get',
    url: `${VUE_APP_BASE_API}/book/detail`,
    params: {
      fileName: fileName
    }
  })
}

export function list() {
  return axios({
    method: 'get',
    url: `${VUE_APP_BASE_API}/book/list`
  })
}