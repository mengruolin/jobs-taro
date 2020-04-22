import { View } from '@tarojs/components'

import styles from './Card.module.less'
import { PropsWithChildren } from '@tarojs/taro'

interface IProps {
  children: PropsWithChildren<null>
}

export default function (props: IProps) {
  return (
    <View className={styles._layout}>
      {props.children}
    </View>
  )
}