import { ComponentClass } from 'react'
import Taro, { Component, Config, hideHomeButton } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon, AtAvatar, AtTag, AtButton } from 'taro-ui'

import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import styles from './index.module.less'

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
  jobInfo: any
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
    navigationBarTitleText: '职位信息'
  }

  constructor(props) {
    super(props)
    this.state = {
      jobInfo: []
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
   */
  async initPage () {
    let { id } = this.$router.params

    let res = await http.get(`/jobInfo?_id=${id}`)

    if (res.data) {
      this.setState({jobInfo: res.data})
    }
  }

  render () {
    const { jobInfo } = this.state

    return (
      <View className={styles._layout}>
        <View className={styles.jobInfo}>
          <View className={styles.jobTitle}>
            { jobInfo.jobName }
          </View>
          <View className={styles.jobRequire}>
            <Text>{`${jobInfo.education}/${jobInfo.experience}/${jobInfo.address}/${jobInfo.jobSate}`}</Text>
            <Text className={styles.jobWages}>{jobInfo.wages}K - {jobInfo.wages * 2}K</Text>
          </View>
          <View className={styles.jobTags}>
            { jobInfo.jobTags && jobInfo.jobTags.map((item: any, k: number) => (
              <AtTag key={k+1}>{item}</AtTag>
            ))}
          </View>
          <View className={styles.jobDescribe}>
            <View className={styles.jobDescribeTitle}>职位描述：</View>
            <Text className={styles.jobDescribeContent}>{jobInfo.jobDescribe}</Text>
          </View>
        </View>
        {/* <View className={styles.publishInof}>
          <View>发布人：</View>
          <View className={styles.publishr}>
            <AtAvatar circle text='凹凸实验室'></AtAvatar>
            <Text>{jobInfo.publishr}</Text>
            <Text>{jobInfo.publishTime}</Text>
          </View>
        </View> */}
        <View className={styles.companyInfo}>
          <View className={styles.imageBox}>
            <Image style={{width: '100%', height: '100%'}} src={jobInfo.companyInfo.companyLogo}></Image>
          </View>
          <View className={styles.companyContent}>
            <View className={styles.companyName}>
              <Text className={styles.companyTitle}>{jobInfo.companyInfo.companyName}</Text>
            </View>
            <View className={styles.companyScale}>
              <Text>{jobInfo.companyInfo.companyScale}</Text>
              <Text style={{marginLeft: '20px'}}>
                {`${jobInfo.companyInfo.crewSize} - ${jobInfo.companyInfo.crewSize * 2}人`}
              </Text>
            </View>
          </View>
        </View>
        <View className={styles.bottomBar}>
          <View className={styles.bottomBarLeft}>
              <View className={`at-icon at-icon-star ${styles.star}`}></View>
              <View className={`at-icon at-icon-share ${styles.star}`}></View>
          </View>
          <View className={styles.bottomBarRight}>
            <AtButton type='primary'>立即申请</AtButton>
          </View>
        </View>
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
