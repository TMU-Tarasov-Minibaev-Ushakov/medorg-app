import styled from 'styled-components';

import { PropsWithThemeToken } from '../../../../types';

export const StyledAuthLayoutContainer = styled.div<PropsWithThemeToken>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: center;
  background: ${({ $theme }) => $theme.colorBgLayout};
`