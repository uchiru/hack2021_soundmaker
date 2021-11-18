import styled from 'styled-components/macro';

export const StyledNote = styled.div<{
  rowStart: number | undefined;
  rowEnd: number | undefined;
  columnStart: number | undefined;
  columnEnd: number | undefined;
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

export const StyledNotesBoard = styled.div<{
  columnCount: number;
}>`
  grid-template-columns: ${({ columnCount }) => {
    return Array(columnCount).fill(' 1fr').concat();
  }};
`;
