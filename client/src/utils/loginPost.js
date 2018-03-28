import axios from 'axios';


export function loginPost(url, json_data, success_callback, error_callback) {
  console.log(JSON.stringify(json_data))
  return axios({
    method: 'post',
    url: url,
    data: JSON.stringify(json_data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    // body: JSON.stringify(json_data)
  }).then(res => {
    console.log(res)
    if (success_callback)
      success_callback(res)
  }).catch(error => {
    if (error_callback)
      error_callback(error)
  })
}
