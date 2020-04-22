import { View, Image, Text } from '@tarojs/components'

import { AtTag } from 'taro-ui'

import styles from './listItem.module.less'

type IProps = any

export default function (props: IProps) {

  const jumpUrl: string = `/pages/jobInfo/index?id=${props.id}`

  return <View className={styles._layout} onClick={() => {Taro.navigateTo({url: jumpUrl})}}>
    <View className={styles.topBox}>
      <View className={styles.imgBox}>
        <Image style={{width: '100%', height: '100%'}} src={props.companyLogo}></Image>
      </View>
      <View className={styles.contentBox}>
        <View className={styles.contentTop}>
          <Text className={styles.contentText}>{props.jobsName}</Text>
          <Text className={styles.contentTime}>发布：{props.updateTime}</Text>
        </View>
        <View className={styles.contentBottom}>
          <Text className={styles.companyName}>{props.companyName}</Text>
          <Text className={styles.wages}>{props.wages}K-{props.wages * 2}K</Text>
        </View>
      </View>
    </View>
    <View className={styles.bottomBox}>
    {
      props.jobTags && props.jobTags.map((item: string, k: number) => (
          <AtTag key={k+1}>{item}</AtTag>
      ))
    }
    </View>
  </View>
}