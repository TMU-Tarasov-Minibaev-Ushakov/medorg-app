import styled from "styled-components";

type SimpleDividerProps = {
    marginTop?: string;
    marginBottom?: string;
}

export const SimpleDivider = styled.div<SimpleDividerProps>`
    height: 1px;
    width: 100%;
    background-color: ${({ theme }) => theme.colorBorderSecondary};
    margin-top: ${({ marginTop }) => marginTop ?? '0'}px;
    margin-bottom: ${({ marginBottom }) => marginBottom ?? '0'}px;
`;