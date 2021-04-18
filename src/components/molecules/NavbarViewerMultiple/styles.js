import styled, { css } from 'styled-components'

import IconButton from 'components/atoms/IconButton'
import SVG from 'components/atoms/SVG'
import Button from 'components/atoms/Button'

export const Container = styled.div`
  width: 100%;
  height: 47px;

  position: sticky;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.blueGray['200']};
  opacity: .95;

  z-index: 3;
`

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-left: 1rem;
`

export const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-right: 1rem;
`

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const ButtonGroup = styled.div`
  margin-left: 2rem;
`

export const NavbarArrow = styled(IconButton)`
  color: ${props => props.theme.colors.blueGray['400']};

  font-size: 1rem;
  padding-right: 0.5rem;
  margin: 0;

  transition: color .15s ease, background .15s ease;

  &:hover {
    color: ${props => props.theme.colors.blueGray['600']};
    background: none;
  }
`

export const NavbarIcon = styled(IconButton)`
  color: ${props => props.theme.colors.blueGray['400']};

  font-size: 1rem;
  padding: 0.5rem 0.5rem;
  margin: 0 0.5rem;

  transition: color .15s ease, background .15s ease;

  ${props => props.withText && css`
    margin: 0;
    padding: 0;
    padding-right: 0.25rem;
  `}

  &:hover {
    color: ${props => props.theme.colors.blueGray['600']};
    background: none;
  }
`

export const SVGIcon = styled(SVG)`
  & > svg {
    fill: ${props => props.theme.colors.blueGray['400']};
  }

  padding: 0;
  height: 22px;
`

export const IconContainer = styled.div`
  color: ${props => props.theme.colors.blueGray['600']};

  font-size: 1.15rem;
  padding: 0.5rem 0.5rem;
  margin: 0 0.5rem;

  transition: color .15s ease, background .15s ease;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: none;

    ${SVGIcon} {
      & > svg {
        fill: ${props => props.theme.colors.blueGray['600']};
      }
    }
  }
`

export const HeaderButton = styled(Button)`
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};

  display: inline-flex;
  color: ${props => props.theme.colors.blueGray['400']};

  margin: 0 5px;

  &:hover {
    color: ${props => props.theme.colors.blueGray['500']};
  }
`

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const CloseTab = styled(IconButton)`
  background: ${props => props.theme.colors.blueGray['200']};
  color: ${props => props.theme.colors.blueGray['400']};

  position: absolute;
  right: -4px;
  top: -4px;
  opacity: 0;

  border-radius: 50%;
  font-size: 11px;
  display: inline-flex;

  margin-left: 8px;
  min-height: 20px;
  min-width: 20px;

  padding: 0;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  transition: border .15s ease-in-out,
              background .15s ease-in-out,
              opacity .15s ease-in-out;

  &:hover {
    color: ${props => props.theme.colors.blueGray['700']};
    background: ${props => props.theme.colors.blueGray['300']};
  }
`

export const TabContainer = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};
  color: ${props => props.theme.colors.blueGray['400']};

  position: relative;

  user-select: none;

  max-width: 230px;
  white-space: nowrap;

  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 6px;

  &:hover {
    background: ${props => props.theme.colors.blueGray['100']};
    color: ${props => props.theme.colors.blueGray['500']};

    ${CloseTab} {
      opacity: 1;
    }
  }

  &:last-child {
    border-right: none;
  }
`

export const AddTab = styled(IconButton)`
  background: ${props => props.theme.colors.blueGray['100']};
  padding: 5px 10px;
  border-radius: 6px;

  font-size: 14px;

  margin-left: 10px;

  color: ${props => props.theme.colors.blueGray['400']};
`
