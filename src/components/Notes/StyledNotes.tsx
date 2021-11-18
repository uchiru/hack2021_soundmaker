import styled from 'styled-components/macro';

export const StyledNote = styled.div<{
  rowStart: number;
  rowEnd: number;
  columnStart: number;
  columnEnd: number;
  needSolidBorder?: boolean;
  needDarkerBorder?: boolean;
  bg?: string;
}>`
  grid-area: ${({ rowStart, rowEnd, columnStart, columnEnd }) => {
    return `${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}`;
  }};
  --border-right-style: ${({ needSolidBorder }) => (needSolidBorder ? 'solid' : '')};
  --border-right-color: ${({ needDarkerBorder }) => (needDarkerBorder ? 'rgba(0, 0, 0, 0.3)' : '')};
  --border-right-color: ${({ needDarkerBorder }) => (needDarkerBorder ? 'rgba(0, 0, 0, 0.3)' : '')};
  --note-bg: ${({ bg }) => bg};
`;
