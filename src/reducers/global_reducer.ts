import { SET_USERINFO, SET_CITYNAME, SET_JOBS } from '../constants/global_const'

interface IState {
  userInfo: any
  city: string
  job: string
}

const GLOBAL_STATE: IState = {
  userInfo: {},
  city: '全国',
  job: 'WEB前端'
}

export default function counter (state = GLOBAL_STATE, action) {
  switch (action.type) {
    case SET_USERINFO:
      return {...state, userInfo: action.userInfo}
    case SET_CITYNAME:
      return {...state, city: action.cityName}
    case SET_JOBS:
      return {...state, job: action.jobName}
    default:
      return state
  }
}
