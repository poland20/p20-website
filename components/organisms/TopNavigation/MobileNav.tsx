import React from 'react';
import styled from '@emotion/styled';
import { css } from 'emotion';
import Link from 'next/link';
import {colors, breakpointMin, breakpointMax} from '../../variables';
import { MenuItem } from '.';
import {Anchor, rhythm} from '../../typography';
import { NavButton } from '../../atoms/Button';

const transition = '200ms cubic-bezier(0.77, 0, 0.175, 1)';
const iconWidth = 28;
const iconHeight = 20;

const button = css({
  outline: 'none',
  cursor: 'pointer',
  WebkitAppearance: 'none',
  border: 'none',
  background: 'none',
  padding: `${rhythm(1)} 0`,
  margin: 0,
  position: 'relative',
  height: rhythm(3),
  width: rhythm(3),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const bar = css({
  display: 'block',
  position: 'absolute',
  top: 0,
  backgroundColor: `${colors.white}`,
  width: iconWidth,
  height: 2,
  transformOrigin: 'left',
  transform: 'scale(1)',
  transition: `transform ${transition}, background-color ${transition}`,
  ':nth-of-type(2)': {
    top: (iconHeight - 1) / 2,
  },
  ':nth-of-type(3)': {
    top: iconHeight - 1,
  },
  ':last-of-type': {
    transform: 'scaleX(0.62)',
  },
});

const isOpenClass = css({
  [`& .${bar}`]: {
    backgroundColor: `${colors.white}`,
    ':nth-of-type(1)': {
      transform: `translateX(${(iconWidth - iconHeight) / 2}px) rotate(45deg)`,
    },
    ':nth-of-type(2)': {
      transform: 'scaleX(0)',
    },
    ':nth-of-type(3)': {
      transform: `translateX(${(iconWidth - iconHeight) / 2}px) rotate(-45deg)`,
    },
  },
});

const icon = css({
  width: iconWidth,
  height: iconHeight,
  display: 'block',
  position: 'relative',
  zIndex: 2018,
});

const ItemList = styled('ul')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  listStyle: 'none',
  marginLeft: 0,
  marginBottom: rhythm(0.5),
});

const Item = styled('li')({
  [breakpointMax('mobile')]: {
    flexBasis: '35%',
  },
  flexBasis: '27%',
  textAlign: 'center',
  [Anchor as any]: {
    margin: 0,
    width: '100%',
    padding: `${rhythm(0.25)} 0`,
  },
});

const Menu = styled('nav')<{ open: boolean }>(props => ({
  width: '100%',
  maxHeight: props.open ? rhythm(9) : 0,
  paddingTop: 0,
  overflow: 'hidden',
  transition: 'all 200ms ease-in-out',
  [breakpointMin('tabletLarge')]: {
    display: 'none !important',
  },
}));

export const MobileNavIcon = ({ isOpen }) => (
  <div className={`${icon} ${isOpen && isOpenClass}`}>
    <span className={bar} />
    <span className={bar} />
    <span className={bar} />
  </div>
);

interface HamburgerProps {
  onClick: () => void;
  navName: string;
  isOpen: boolean;
}

export const MobileNavButton = ({ onClick, navName, isOpen }: HamburgerProps) => (
  <button
    aria-controls={navName}
    onClick={onClick}
    className={button}
    type="button"
  >
    <MobileNavIcon isOpen={isOpen} />
  </button>
);

interface NavProps {
  items: MenuItem[];
  open: boolean;
  requestClose: () => void;
}

export default ({ items, open, requestClose }: NavProps) => (
  <React.Fragment>
    <Menu open={open}>
      <ItemList>
        {items.map((item, index) => (
          item.type === 'button' ? (
            <Item key={index} style={{ flexBasis: '100%' }}>
              <NavButton
                href={item.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {item.title}
              </NavButton>
            </Item>
          ) : (
            <Item key={index}>
              <Link href={item.url}>
                <Anchor bold onClick={requestClose}>
                  {item.title}
                </Anchor>
              </Link>
            </Item>
          )
        ))}
      </ItemList>
    </Menu>
  </React.Fragment>
);
