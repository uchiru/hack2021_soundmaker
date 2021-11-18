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

export const StyledLine = styled.div<{
  position: number;
  cellWidth?: number;
}>`
  --line-color: #f95959;
  --size: 22px;
  position: absolute;
  width: 2px;
  height: calc(100% - 60px);
  background-color: var(--line-color);
  cursor: pointer;
  z-index: 1;
  transition: transform 1s linear;

  transform: translateX(var(--line-position));
  --line-position: ${({ position, cellWidth }) => position * (cellWidth ? cellWidth * 2 : 0) + (cellWidth ?? 0) + 'px'};

  &::before {
    content: '';
    width: var(--size);
    height: var(--size);
    background-color: var(--line-color);
    position: absolute;
    top: calc(-1 * var(--size) / 2);
    left: calc(-1 * (var(--size) / 2) + 1px);
    border-radius: 50%;
  }
`;
