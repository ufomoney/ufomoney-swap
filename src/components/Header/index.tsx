import { ChainId } from '@bscswap/sdk'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'

import styled from 'styled-components'

import Logo from '../../assets/images/logo_new.png'
import LogoDark from '../../assets/images/logo_white.png'
import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances } from '../../state/wallet/hooks'

import { YellowCard } from '../Card'
import Settings from '../Settings'
import Menu from '../Menu'

import { RowBetween } from '../Row'
import Web3Status from '../Web3Status'

import { NavLink } from 'react-router-dom'

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  top: 0;
  position: absolute;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  `};

  > div {
    @media (max-width: 602px) {
      height: 142px;
      flex-direction: column-reverse;
      align-items: center ! Important;
    }
  }
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;

//   ${({ theme }) => theme.mediaWidth.upToSmall`
//     margin-top: 0.5rem;
// `};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  text-decoration: none;
  :hover {
    cursor: pointer;
  }
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  :focus {
    border: 1px solid blue;
  }

  > div {
    media (max-width: 499px) {
      display:block;
    }
  }
`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`

const NetworkCard = styled(YellowCard)`
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px 12px;
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: flex-end;
  `};
  @media (max-width: 600px) {
    flex-direction: row;
    align-items: end;
    width: 100%;
    justify-content: space-evenly;
  }
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  `};
`

const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: null,
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.BSC_MAINNET]: null,
  [ChainId.BSC_TESTNET]: 'Testnet'
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances([account])[account]
  const [isDark] = useDarkModeManager()

  return (
    <HeaderFrame>
      <RowBetween style={{ alignItems: 'center' }} padding="1rem 1rem 0 1rem">
        <StyledLinkContainer>
        <HeaderElement>
          <Title href="." >
            <UniIcon>
              <img style={{ height: 50 }} src={isDark ? LogoDark : Logo} alt="logo" />
            </UniIcon>
            <StyledText>ufo.money</StyledText>
          </Title>
        </HeaderElement>
          <StyledAbsoluteLink href="https://info.ufo.money">About Us</StyledAbsoluteLink>
          <StyledLink exact activeClassName="active" to="/swap">Exchange</StyledLink>
          <StyledAbsoluteLink href="https://ufo.money">Stake</StyledAbsoluteLink>
        </StyledLinkContainer>
        <HeaderControls>
          <HeaderElement>
            <TestnetWrapper>
              {!isMobile && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
            </TestnetWrapper>
            <AccountElement active={!!account} 
            style={{borderRadius: '50px', width: '207px', pointerEvents: 'auto',
             background: 'linear-gradient( 90deg,#bfe4ff 16.36%, rgba(0,223,252,0.94) 106.83%)' }}>
              {account && userEthBalance ? (
                <BalanceText style={{color: '#353030d4', flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(4)} BNB
                </BalanceText>
              ) : null}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
          <HeaderElementWrap>
            <Settings />
            {/* <Menu /> */}
          </HeaderElementWrap>
        </HeaderControls>
      </RowBetween>
    </HeaderFrame>
  )
}
const StyledText = styled.span`
  color: #fff;
  font-family: "Arial Rounded MT Bold", sans-serif;
  font-size: 31px;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin-left: 20px;
  @media (max-width: 770px) {
    display: none;
  }

`

const StyledLinkContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;

`
const StyledLink = styled(NavLink)`
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  font-size: 16px;
  margin-left: 30px;
  &:hover {
    color: #93ff97;
  }

  // &.active {
  //   color: #6affd6;
  // }
  &:first-child {
    @media (max-width: 533px) {
      padding-left: 5px;
      padding-right: 0;
    }
  }

  @media (max-width: 533px) {
    font-size: 14px;
  }
`

const StyledAbsoluteLink = styled.a`
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  font-size: 16px;
  margin-left: 30px;

  @media (max-width: 533px) {
    font-size: 14px;
  }
  @media (max-width: 533px) {
    padding-left: 5px;
    padding-right: 0;
  }

  @media (max-width: 530px) {
    margin-right: 10px;
  }
`