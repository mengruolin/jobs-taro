import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import {
  AtAvatar,
  AtList,
  AtListItem,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtButton } from 'taro-ui'

import { connect } from '@tarojs/redux'

import { set_userInfo } from '../../actions/global_actions'

import styles from './index.module.less'

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
    userInfo: any
  }
}

type PageDispatchProps = {
  setUserInfo: (userDate: object) => void
}

type PageOwnProps = {}

type PageState = {
  loginModal: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

// interface Index {
//   props: IProps;
// }

@connect(({ global_reducer }) => ({
  global_reducer
}), (dispatch) => ({
  setUserInfo (userDate) {
    dispatch(set_userInfo(userDate))
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
    navigationBarTitleText: '用户中心'
  }

  constructor(props) {
    super(props)
    this.state = {
      loginModal: false
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  async showLoginModal() {
    this.setState({
      loginModal: true
    })
  }

  handleGetUserInfo (info) {
    if (info.detail.errMsg === "getUserInfo:ok") {
      this.setState({
        loginModal: false,
      })
      this.props.setUserInfo(info.detail.userInfo)
    }
  }

  async handleSingOut() {
    let res = await Taro.getWeRunData({})

    console.log(res);
    
    this.props.setUserInfo({})
  }

  render () {
    const { loginModal } = this.state
    const { userInfo } = this.props.global_reducer

    return (
      <View className={styles._layout}>
        <View className={styles.header}>
          <AtAvatar image={userInfo.avatarUrl} size='large' circle text='未登录' />
          <View className={styles.userInfo}>
            {
              !userInfo.nickName ?
              <Text onClick={this.showLoginModal.bind(this)}>未登录,点击登录</Text>
              :
              <Text>{userInfo.nickName}</Text>
            }
            
          </View>
        </View>
        <View className={styles.userMenu}>
          <AtList>
            <AtListItem title='简历' iconInfo={{ value: 'file-generic' }} arrow='right' />
            <AtListItem title='投递记录' iconInfo={{ value: 'clock' }} arrow='right' />
            <AtListItem title='职位收藏' iconInfo={{ value: 'star' }} arrow='right' />
            <AtListItem title='意见反馈' iconInfo={{ value: 'message' }} arrow='right' />
            <AtListItem title='隐私设置' iconInfo={{ value: 'lock' }} arrow='right' />
          </AtList>
          <View className={styles.logOut}>
          {
            userInfo.nickName && <Text onClick={this.handleSingOut.bind(this)}>退出登录</Text>
          }
          </View>
        </View>
        <AtModal isOpened={loginModal}>
          <AtModalHeader>用户登录</AtModalHeader>
          <AtModalContent>
          <Button 
            openType='getUserInfo'
            onGetUserInfo={this.handleGetUserInfo}>微信登录</Button>
          </AtModalContent>
          <AtModalAction><Button>取消</Button></AtModalAction>
        </AtModal>
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
