import axios from "axios";
import qs from "qs";

let http = {}

http.post = (api, params) => {
  return new Promise((resolve, reject) => {
    axios.post(api, params).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

http.get = (api, params) => {
  return new Promise((resolve, reject) => {
    axios.get(api, params).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}