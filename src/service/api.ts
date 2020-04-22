import Taro, { request } from "@tarojs/taro";
import BASE_URL from "./config";
//import interceptors from "./interceptors";

//interceptors.forEach(i => Taro.addInterceptor(i));

interface IParams {
  url: string
  data?: any
  contentType?: string
}

export default {
  baseOptions(params: IParams, method: any = 'GET') {
    const { url, data, contentType } = params
    const option: request.Option = {
      url: url.indexOf("https") !== -1 ? url : BASE_URL + url,
      data: data,
      method: method,
      header: {
        "content-type": contentType || 'application/json'
        // Authorization: Taro.getStorageSync("Authorization")
      }
    };
    return Taro.request(option);
  },
  get(url, data: any = {}) {
    let params: IParams = { url, data };
    return this.baseOptions(params);
  },
  post: function(url: string, data: any = {}, contentType: string) {
    let params: IParams = { url, data, contentType };
    return this.baseOptions(params, "POST");
  },
  put(url: string, data: any = {}) {
    let params: IParams = { url, data };
    return this.baseOptions(params, "PUT");
  },
  delete(url, data: any = {}) {
    let params: IParams = { url, data };
    return this.baseOptions(params, "DELETE");
  }
};