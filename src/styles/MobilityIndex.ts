import styled from "styled-components";

export const Container = styled.div`

`;
export const MainContent = styled.div`
.title{
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    margin-bottom: 40px;
    margin-top: 30px;


}
`;
export const MobilitySlider = styled.div`
display: flex;
filter: drop-shadow(-1px 6px 3px rgba(0, 0, 0, 0.5));
position: relative;

`;

export const PromotedProducts = styled.section`
min-height: 290px;
align-items: center;
display: flex;
flex-direction:column;
justify-content: center;
`;

export const PromotedSection = styled.section`
position: relative;
width:100%;
.clipPathShadow{
    filter: drop-shadow(-1px 6px 3px rgba(0, 0, 0, 0.5));
    z-index: 3;
    position: absolute;
    left: 0;
    width: 40%;
    margin-top: -9px;
    .promotedSectionImage{
        clip-path: polygon(0 0, 90% 0, 100% 100%, 0% 100%);  
        width: 100%;     
        position: relative;
        height: 380px;
    }
}
.content {
    background:var(--BgGrayGradient);
    flex: 1 0 50vw;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 10px 4vw 10px 45%;
    height: 360px;
    box-shadow: -1px 6px 5px rgb(0 0 0 / 23%);


    h2{
        color: var(--TxtRed)
    }
    p{
        color: var(--Black);
    }
    a{
        color: var(--White);
        background-color: var(--Blue);
        padding:  10px 20px;
        margin-top: 20px;
        text-decoration: none;
        transition: all ease-in 0.1s ;

        &:hover {
            background-color: var(--BlueHover);
            transition: all ease-in 0.1s ;
        }

    }
}
    `;

export const RentalSection = styled.section`
    box-shadow: -1px 6px 5px rgb(0 0 0 / 23%);
display: flex;
.content{
    background: var(--BgGrayGradient);
    flex: 1 1 40%;
    padding: 20px;
position: relative;
display: flex;
flex-direction:column;
align-items: flex-start;
h2{
        color: var(--TxtRed)
    }
    a{
        color: var(--White);
        background-color: var(--Blue);
        padding:  10px 20px;
        margin-top: 20px;
        text-decoration: none;
        transition: all ease-in 0.1s ;

        &:hover {
            background-color: var(--BlueHover);
            transition: all ease-in 0.1s ;
        }

    }
}
.rentalImg{
    flex: 0 0  auto;
  position: relative;
  height: auto;
  width: 40vh;

}
`;


export const HelpSection = styled.section`
display: flex;
margin-top:50px;
justify-content: center;
align-items: center;
.content{
    flex: 0 1 50%;
    display: flex;
    flex-direction: column;
    align-items:flex-start;
 
 
    a{
        color: var(--White);
        background-color: var(--Blue);
        padding:  10px 20px;
        margin-top: 20px;
        text-decoration: none;
        transition: all ease-in 0.1s ;
        
        &:hover {
            background-color: var(--BlueHover);
            transition: all ease-in 0.1s ;
        }
        
    }
}
`;

export const InfoSection = styled.section`

`;

export const NewProducts = styled.section`
min-height: 290px;
align-items: center;
display: flex;
flex-direction:column;
justify-content: center;
`;

