import { View } from '@tarojs/components'

import styles from './Card.module.less'

interface IProps {
  children: ChildNode
}

export default function (props: IProps) {
  return (
    <View className={styles._layout}>
      {props.children}
    </View>
  )
}