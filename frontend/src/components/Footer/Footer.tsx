import React from 'react'
import { APP_NAME, ORGANIZATION_NAME } from '../../constants'
import { Flex } from 'antd'


export const Footer = () => {
  return (
    <Flex justify={'center'} align={'center'} gap={'middle'}>{`${APP_NAME} ©2023 Created by ${ORGANIZATION_NAME}`}</Flex>
  )
}
