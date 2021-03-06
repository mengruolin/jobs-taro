import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIndexes } from 'taro-ui'
import { connect } from '@tarojs/redux'

import styles from './index.module.less'

import http from '../../service/api'

import { set_city } from '../../actions/global_actions'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  global_reducer: {
    city: string
  }
}

type PageDispatchProps = {
  setCity: (cityName: string) => void
}

type PageOwnProps = {}

type PageState = {
  cityList: []
  cityHot: []
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

@connect(({ global_reducer }) => ({
  global_reducer
}), (dispatch) => ({
  setCity (cityName) {
    dispatch(set_city(cityName))
  }
}))

class Index extends Component<IProps, PageState> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
  */
  config: Config = {
    navigationBarTitleText: '城市列表'
  }

  constructor(props) {
    super(props)
    this.state = {
      cityList: [],
      cityHot: []
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.initPage()
  }

  componentDidHide () { }

  /**
   * 
   * @param item 
   */

  async initPage() {
    let res = await Promise.all([await http.get('/city/hot'), http.get('/cityList')])

    if (res[0].data[0]) {
      console.log(res[0].data);
      
      this.setState({cityHot: res[0].data, cityList: res[1].data})
    }
    
  }

  handleChooseCity (cityName) {
    this.props.setCity(cityName.name)
    Taro.switchTab({url: '/pages/home/index'})
  }

  render () {
    const {cityList, cityHot} = this.state
    return (
      <View className={styles._layout}>
        <AtIndexes
          list={cityList}
          isVibrate={false}
          animation
          onClick={this.handleChooseCity.bind(this)}
          >
          <View className={styles.hotListBox}>
            <View className={styles.hotListTitle}>热门城市</View>
            {cityHot.map((item: any) => (
              <Text className={styles.hotListItem} key={item.id}>
                {item.name}
              </Text>
            ))}
          </View>
        </AtIndexes>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
