import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

//import { AtList, AtListItem } from 'taro-ui'
import ListItem from './_parts/listItem'

import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import styles from './index.module.less'

import ReachBottom from '../../components/reachBottom'

import http from '../../service/api'

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
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface IState {
  jobList: any[]  //职位列表
  page: number  //页码
  hasNextPage: boolean  //是否是最后一页
}

interface Index {
  props: IProps
  state: IState
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
  */
  config: Config = {
    navigationBarTitleText: '',
    navigationBarBackgroundColor: '#03a9f4',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark'
  }

  constructor(props) {
    super(props)
    this.state = {
      jobList: [],
      page: 0,
      hasNextPage: true,
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () {
  }

  componentDidShow () {
    this.restPage()
  }

  componentDidHide () { }

  async onPullDownRefresh() {
    await this.restPage()
    Taro.stopPullDownRefresh()
  }

  onReachBottom() {
    this.state.hasNextPage && this.requestJobList()
  }
  
  /**
   * 
   * 
   */
  async requestJobList () {
    let res = await http.get(`/books?_page=${this.state.page}&_limit=20`)
    if (res.data[0]) {
      this.setState((state: IState) => ({jobList: [...state.jobList, ...res.data], page: ++state.page}))
    } else {
      this.setState({hasNextPage: false})
    }
  }

  /**
   * 
   */
  restPage () {
    this.setState(() => ({jobList: [], page: 0, hasNextPage: true}), () => {
      this.requestJobList ()
    })
  }
  
  /**
   * 
   */
  handleChangeJobs () {
    Taro.navigateTo({url: '/pages/jobItem/index'})
  }

  render () {
    return (
      <View className={styles._layout}>
        <View className={styles.header}>
          <View className={styles.header_top}>
            <Text className={styles.header_title} onClick={() => this.handleChangeJobs()}>找工作啦！</Text>
            <Text className={styles.header_title} onClick={() => {Taro.navigateTo({url: '/pages/cityList/index'})}}>[北京]</Text>
          </View>
          <View className={styles.search_box}>
            <View className={styles.search_input}>工作\t/公司\t/\t行业</View>
          </View>
        </View>
        
        {this.state.jobList.map((item: any, key: number) =>
          <ListItem
            key={item.id}
            {...item}
          />
        )}
        <ReachBottom hasLoading={this.state.hasNextPage}></ReachBottom>
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
