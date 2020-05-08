import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { AtTabs, AtTabsPane, AtTag } from 'taro-ui'

import { connect } from '@tarojs/redux'

import styles from './index.module.less'

import http from '../../service/api'

import Card from './_parts/Card'

import { set_job } from '../../actions/global_actions'

type PageStateProps = {
  global_reducer: {
    job: string
  }
}

type PageDispatchProps = {
  setJob: (jobName: string) => void
}

type PageOwnProps = {}

type PageState = { }

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface IPstate {
  current: number
  industrys: []
  jobTags: []
}

interface Index {
  props: IProps
  state: IPstate
}

@connect(({ global_reducer }) => ({
  global_reducer
}), (dispatch) => ({
  setJob (jobName) {
    dispatch(set_job(jobName))
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
    navigationBarTitleText: '选择职业'
  }

  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      industrys: [],
      jobTags: []
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  async componentDidShow () {
    await this.initRequest()
    this.getJobsTags()
  }

  componentDidHide () { }


  /**
   * 
   * @param value 
   */
  async initRequest () {
    let res = await http.get('/jobList')

    if (res.data[0]) {
      this.setState({industrys: res.data})
    }
  }

  async getJobsTags () {
    let res = await http.get(`/jobList/?${this.state.current}`)

    if (res.data[0]) {
      this.setState({jobTags: res.data})
    }
  }

  handleClick (value) {
    this.setState({
      current: value
    }, () => {
      this.getJobsTags()
    })
  }

  handleClickCard (jobName) {
    this.props.setJob(jobName)
  }

  render () {
    const { jobTags, industrys } = this.state
    return (
      <View className={styles._layout}>
        <AtTabs
          current={this.state.current}
          scroll
          height='100%'
          tabDirection='vertical'
          tabList={this.state.industrys}
          onClick={this.handleClick.bind(this)}>
          {industrys.map((item: any, index: number) => (
            <AtTabsPane tabDirection='vertical' current={this.state.current} index={index} key={item.id}>
              <View className={styles.atTabsPane}>
                {
                  jobTags.map((jobItem: any) => (
                    <Card key={jobItem.id}>
                      {jobItem.title}
                    </Card>
                  ))
                }
              </View>
            </AtTabsPane>
          ))}
        </AtTabs>
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
