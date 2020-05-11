import { View } from '@tarojs/components'

import styles from './Card.module.less'

interface IProps {
  children: ChildNode
  onClick: any
}

export default function (props: IProps) {
  return (
    <View className={styles._layout} onClick={this.props.onClick}>
      {props.children}
    </View>
  )
}