import React from 'react'
import styled from 'styled-components'

export const BodyWrapper = styled.div<{ disabled?: boolean }>`
  position: relative;
  max-width: 420px;
  width: 100%;
  background: ${({ theme }) => theme.bg1};
  // box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
  //   0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 30px;
  padding: 1rem;
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
  pointer-events: ${({ disabled }) => disabled && 'none'};
`

const StyledLineContainer = styled.div`
width: 386px;
height: 500px;
position: absolute;
right: 67px;
z-index: -1;
top: -33px;
  @media (max-width: 550px) {
    display:none
  }

  @media (max-width:450px) {
    display:none;
  }
`
const StyledLine = styled.div`
  width: 100%;
  height: 100%;
  position:relative;
  
  &::before {
    content:"";
    top:0;
    left:0;
    right:0;
    bottom:0;
    position:absolute;
    z-index:-1;
    padding: 2px;
    border-radius: 35px;
    background: linear-gradient(180deg, #0BCDF5 0%, #FFFFFF 100%);; 
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children, disabled }: { children: React.ReactNode; disabled?: boolean }) {
  return <BodyWrapper disabled={disabled}>
    <StyledLineContainer>
      <StyledLine/>
    </StyledLineContainer>
    {children}</BodyWrapper>
}
