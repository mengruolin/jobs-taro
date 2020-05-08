import {
  SET_USERINFO,
  SET_CITYNAME,
  SET_JOBS
} from '../constants/global_const'


export const set_userInfo = (userInfo: object) => ({
  type: SET_USERINFO,
  userInfo
})
/**
 * 改变城市名
 * @param jobName string
 */
export const set_job = (jobName: string) => ({
  type: SET_JOBS,
  jobName
})
/**
 * 改变城市名
 * @param cityName string
 */

export const set_city = (cityName: string) => ({
  type: SET_CITYNAME,
  cityName
})
