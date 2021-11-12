import styled, {css} from "styled-components";

interface Props{
    bgcolor:string;
}

export const StyledSingleICon = styled.div<Props>`
	width:90px;
	height:80px;
	background:var(--Red);
	transform:skew(-20deg);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
    margin-top: -1px;
    .imgBox{
        transform:skew(25deg) translateX(-2px);
        width:45%;
        
    }

    ${props=>
    props.bgcolor ==="blue" && css`
    background:var(--Blue);
    `
}
`;
