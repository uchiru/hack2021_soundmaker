import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  overflow: hidden;
`;

const MenuItem = styled(Link)<{ inverseRotate?: boolean }>`
  height: 100vh;
  width: 500vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: white;
  text-decoration: none;
  transition: transform 1s;

  &:hover {
    transform: scale(1.4, 1.4) rotate(${(props) => (props.inverseRotate ? '-10deg' : '10deg')});
    z-index: 100;
  }
`;

export function Intro() {
  return (
    <Wrapper>
      <MenuItem to="/player" style={{ background: '#ff6e40' }}>
        Плеер
      </MenuItem>
      <MenuItem inverseRotate to="/scene" style={{ background: '#1e3d59' }}>
        Игра
      </MenuItem>
    </Wrapper>
  );
}
