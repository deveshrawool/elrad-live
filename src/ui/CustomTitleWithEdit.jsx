import styled from '@emotion/styled'
import { Title } from '@mantine/core'
import React from 'react'
import Edit from '../assets/svgs/edit.svg'

const TitleAndEditIcon = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1 rem;
    margin-bottom: 10px;
`

function CustomTitleWithEdit({title,editIconClick}) {
  return (
    <TitleAndEditIcon >
        <Title size={'h6'}>{title}</Title>
        <img src={Edit} onClick={()=>editIconClick()} alt='Edit' width={'20px'} height={'20px'} />
    </TitleAndEditIcon>
  )
}

export default CustomTitleWithEdit