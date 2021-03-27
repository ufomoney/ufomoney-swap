import React from 'react'
import { Text } from 'rebass'
import styled from 'styled-components'
import { RowFixed } from '../Row'

import arrow_up from '../../assets/images/arrow_up.png'
import arrow_down from '../../assets/images/arrow_down.png'

export const FilterWrapper = styled(RowFixed)`
  padding: 8px;
  // background-color: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text1};
  border-radius: 8px;
  user-select: none;
  & > * {
    user-select: none;
  }
  :hover {
    cursor: pointer;
    border: 1px solid grey;
  }
`

export default function SortButton({
  toggleSortOrder,
  ascending
}: {
  toggleSortOrder: () => void
  ascending: boolean
}) {
  return (
    <FilterWrapper onClick={toggleSortOrder}>
      {ascending ? <img src={arrow_up}/>  : <img src={arrow_down}/>}
      {/* <Text fontSize={14} fontWeight={500}>
      </Text> */}
    </FilterWrapper>
  )
}
