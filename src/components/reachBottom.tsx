import { View } from '@tarojs/components'

import { AtDivider, AtActivityIndicator } from 'taro-ui'

import styles from './style/reachBottom.module.less'

interface Props {
  hasLoading: boolean
}

export default function (props: Props) {

  return <View className={styles._layout}>
    {
      props.hasLoading ? 
        <View className={styles.loadingBox}>
          <AtActivityIndicator color='#303F9F' mode='center' content='加载中...' />
        </View>
      :
        <View className={styles.boottomBox}>
          <AtDivider content='俺是有底线的' fontColor='#212121' lineColor='#757575' />
        </View>
    }
  </View>
}