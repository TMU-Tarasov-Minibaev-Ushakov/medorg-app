import styled from "styled-components";

export const StyledContent = styled.div`
    flex-grow: 1;
    padding: ${({ theme }) => theme.paddingSM}px;
    display: flex;
    justify-content: center;
`;