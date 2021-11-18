import styled from 'styled-components/macro';

export const StyledNote = styled.div<{
  rowStart: number;
  rowEnd: number;
  columnStart: number;
  columnEnd: number;
}>`
  grid-area: ${({ rowStart, rowEnd, columnStart, columnEnd }) =>
    `${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}`};
`;
