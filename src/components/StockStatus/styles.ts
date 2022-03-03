import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    @media (max-width:960px){
        justify-content: center;
        margin-top: 1rem;
    }
    @media (max-width:600px){
    gap: 3px;
        margin-top: 0.5rem;
        justify-content: flex-start;
    }
&.red{color:red}
&.green{color: var(--Green)}
&.orange{color: var(--Orange)}
`