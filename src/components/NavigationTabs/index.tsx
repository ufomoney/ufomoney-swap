import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import { NavLink, Link as HistoryLink } from 'react-router-dom'

import { ArrowLeft } from 'react-feather'
import { RowBetween } from '../Row'
import QuestionHelper from '../QuestionHelper'

const Tabs = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  color: #9a9494;
  font-size: 20px;
  width: 210px;
  background: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 50px;
  position: absolute;
  z-index: 1;
  left: 85px;
  &.${activeClassName} {
    z-index: 2;
    background: linear-gradient(90deg, #007ED9 16.36%, 
      rgba(0, 223, 252, 0.94) 106.83%);
    font-weight: 500;
    // color: ${({ theme }) => theme.text1};
    color: #fff;
    @media (max-width:445px) {
      width: 130px;
    }
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }

  @media (max-width:445px) {
    width: 130px;
  }
`

const StyledNavLinkOther = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  // color: ${({ theme }) => theme.text3};
  color: #9a9494;
  font-size: 20px;
  width: 210px;
  background: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 50px;
  position: absolute;
  right: 85px;
  z-index: 1;
  &.${activeClassName} {
    z-index: 2;
    background: linear-gradient(90deg, #007ED9 16.36%, 
      rgba(0, 223, 252, 0.94) 106.83%);
    font-weight: 500;
    // color: ${({ theme }) => theme.text1};
    color: #fff;
    @media (max-width:445px) {
      width: 130px;
    }
    
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }

  @media (max-width:445px) {
    width: 130px;
  }
`

const StyledMask = styled.div`
  position: relative;
  z-index: 1;
  width: 210px;
  height: 48px;
`

const ActiveText = styled.div`
  font-weight: 500;
  font-size: 20px;
`

const StyledArrowLeft = styled(ArrowLeft)`
  color: ${({ theme }) => theme.text1};
`

export function SwapPoolTabs({ active }: { active: 'swap' | 'pool' }) {
  const { t } = useTranslation()
  return (
    <Tabs style={{ marginBottom: '20px' }}>
      <StyledMask>
        <StyledNavLinkOther id={`swap-nav-link`} to={'/swap'} isActive={() => active === 'swap'}>
          {t('swap')}
        </StyledNavLinkOther>
        <StyledNavLink id={`pool-nav-link`} to={'/pool'} isActive={() => active === 'pool'}>
          {t('pool')}
        </StyledNavLink>
      </StyledMask>
    </Tabs>
  )
}

export function FindPoolTabs() {
  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>Import Pool</ActiveText>
        <QuestionHelper text={"Use this tool to find pairs that don't automatically appear in the interface."} />
      </RowBetween>
    </Tabs>
  )
}

export function AddRemoveTabs({ adding }: { adding: boolean }) {
  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>{adding ? 'Add' : 'Remove'} Liquidity</ActiveText>
        <QuestionHelper
          text={
            adding
              ? 'When you add liquidity, you are given pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.'
              : 'Removing pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.'
          }
        />
      </RowBetween>
    </Tabs>
  )
}
