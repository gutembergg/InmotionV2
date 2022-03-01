import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    @media (max-width:960px){
        justify-content: center;
    margin-top: 1rem;
    }
&.red{color:red}
&.green{color: var(--Green)}
&.orange{color: var(--Orange)}
`