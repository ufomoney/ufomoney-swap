import React, { Suspense } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import Header from '../components/Header'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import AddLiquidity from './AddLiquidity'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity
} from './AddLiquidity/redirects'
import MigrateV1 from './MigrateV1'
import MigrateV1Exchange from './MigrateV1/MigrateV1Exchange'
import RemoveV1Exchange from './MigrateV1/RemoveV1Exchange'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import Swap from './Swap'
import { RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'

const AppWrapper = styled.div`
  min-height: 99vh;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 160px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  overflow: unset;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding: 16px;
  `};

  z-index: 1;

  @media (max-width:501px) {
    margin-top: 10px;
  }
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {
  return (
    <Suspense fallback={null}>
      <HashRouter>
        <Route component={GoogleAnalyticsReporter} />
        <Route component={DarkModeQueryParamReader} />
        <AppWrapper>
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <BodyWrapper>
            <Popups />
            <Web3ReactManager>
              <Switch>
                <Route exact strict path="/swap" component={Swap} />
                <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
                <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
                <Route exact strict path="/find" component={PoolFinder} />
                <Route exact strict path="/pool" component={Pool} />
                <Route exact strict path="/create" component={RedirectToAddLiquidity} />
                <Route exact path="/add" component={AddLiquidity} />
                <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                <Route exact strict path="/remove/v1/:address" component={RemoveV1Exchange} />
                <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
                <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                <Route exact strict path="/migrate/v1" component={MigrateV1} />
                <Route exact strict path="/migrate/v1/:address" component={MigrateV1Exchange} />
                <Route component={RedirectPathToSwapOnly} />
              </Switch>
            </Web3ReactManager>
          </BodyWrapper>
          <Footer>
            <StyledFooterLine/>
            <StyledNav>
              <StyledLink target="_blank" href="https://t.me/ufomoneydefi">
                Telegram
              </StyledLink>
              <StyledLink target="_blank" href="https://github.com/ufomoney">
                Github
              </StyledLink>
              <StyledLink target="_blank" href="https://twitter.com/ufo_money">
                Twitter
              </StyledLink>
            </StyledNav>
          </Footer>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}

const StyledFooterLine = styled.div`
  width: 40%;
  // margin: 25px auto 0 auto;
  height: 2px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1.74%,
   #FFFFFF 51.03%, rgba(255, 255, 255, 0.02) 98.7%);
   margin-bottom: 10px;
   @media (max-width: 600px) {
    margin: 0;
    margin-bottom: 14px;
  }
`

const Footer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;
  margin-top: 10px;
  @media (max-width: 600px) {
    margin-bottom: 0;
    padding: 0;
  }
}
`

const StyledNav = styled.nav`
  align-items: center;
  width: 50%;
  justify-content: center;
  display: flex;
`

const StyledLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-family: 'Helvetica';
  font-weight: bold;
  &:hover {

    color: #6affd6;
  }
  margin-right: 30px;
  margin-left: 20px;
`