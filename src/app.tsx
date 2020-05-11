import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import 'taro-ui/dist/style/index.scss'

import './app.less'

import { set_userInfo } from './actions/global_actions'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      //'pages/jobInfo/index',
      'pages/home/index',
      'pages/index/index',
      'pages/jobItem/index',
      'pages/cityList/index',
      'pages/user/index',
      'pages/jobInfo/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: false
    },
    tabBar: {
      borderStyle: 'black',
      selectedColor: '#03a9f4',
      list: [
        {
          pagePath: 'pages/home/index',
          text: '首页',
          iconPath: 'assets/tapbar/home.png',
          selectedIconPath: 'assets/tapbar/home_hover.png'
        },
        {
          pagePath: 'pages/index/index',
          text: '消息',
          iconPath: 'assets/tapbar/message.png',
          selectedIconPath: 'assets/tapbar/message_hover.png'
        },
        {
          pagePath: 'pages/user/index',
          text: '我',
          iconPath: 'assets/tapbar/me.png',
          selectedIconPath: 'assets/tapbar/me_hover.png'
        }
      ]
    }
  }

  componentDidMount () {}

  async componentDidShow () {
    try {
      let res: any = await Taro.getUserInfo({})
      if (res.errMsg === "getUserInfo:ok") {
        store.dispatch(set_userInfo(res.userInfo))
      }
    } catch (error) {
      
    }
  }

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
