import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
    margin-left: 1.5rem;
    font-size: 2.2em;
    @media (max-width: 640px){
      font-size:1.7em;
    }
    @media (max-width: 460px){
      font-size:1.3em;
    }
    @media (max-width: 380px){
      font-size:1.1em;
    }
  }
`;

export const Main = styled.div`
  flex-direction: row;



  @media (max-width: 1072px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

`;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-direction: row;
  gap:2rem;
  padding: 3rem 10rem 0 10rem;
  @media (max-width: 1280px){
    padding: 3rem 6rem 0 6rem;
    
  }
  @media (max-width: 1024px){
    padding: 0rem 3rem 0 3rem;
    
  }
  @media (max-width: 560px){
    padding: 0rem 1rem 0 1rem;
    
  }
  @media (max-width: 960px){
    flex-direction: column;
    gap: 0rem;
    
  }
`;

export const ProductCard = styled.div`
  height:auto;
  width: 20%;
  @media (max-width:960px){
    height: auto;
    width: 50%;
    margin: 0 auto;
  }
  @media (max-width:640px){
    height: auto;
    width: 80%;
    margin: 0 auto;
  }
`;

export const ImageBlock = styled.div`
  width: 100%;
  height: 260px;
  position: relative;
  min-width:200px;
  margin: 0 auto;
  `;

export const ProductDetaiil = styled.div`

  .priceBox {
    font-weight: 600;
    display: flex;
    p{
      color: var(--TxtRed);
      font-size:1.5em;
    }
    
    .price {
      display: flex;
      margin-bottom: 10px ;
      div{
        font-size:1.5em;
        color: var(--Blue);
      }
    }
    
    .regular_price {
      font-size:1.5em;
      text-decoration: line-through;
      opacity: 0.4;
      margin-right: 10px ;
    }
    
    .sale_price {
      font-size:1.5em;
      color: var(--Green);
    }
  }
`;

export const PriceQuantity = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100%;

  input {
    width: 50px;
    height: 3rem;
    padding: 5px;

    background: transparent;
    border: 1px solid var(--DarkGray);
  }
`;

export const Button = styled.button`
  height: 3rem;
  width: 200px;
  background: var(--Blue);
  text-align: center;
  margin-left: 20px;
  margin-top: 1.3rem;

  color: #fff;
  border: none;
`;

export const StockProduct = styled.div`
  margin-top: 0.5rem;
  padding: 3px;
`;

export const ProductInfos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  background: linear-gradient(180deg,rgba(250,250,250,0) 0%,rgba(250,250,250,0.7) 76px,rgba(250,250,250,1) 127px,rgba(250,250,250,1) 86%,rgba(250,250,250,0) 100%);  
  div.first_description {
    margin-top: 1rem;
    width: 100%;
  }
  .bgcity{
    width: 100vw;
    height: 280px;
    position: relative;
    margin-top: 2rem;
    @media (max-width: 960px){
      height: 200px;
    }
    .sectionTitle{
      width:100%;
    margin: 20px auto 0px auto;
    padding:0px;
    top: -10px;
    text-align: center;
    position: absolute;

    p{
      font-size: 2.3em;
      font-weight:bold;
      color: var(--DarkGray);    
      @media (max-width: 760px) {
        font-size: 1.8em;
  }
      @media (max-width: 480px) {
        font-size: 1.3em;
  }
    }
  }
  }
`;

export const VariationProducts = styled.div`
margin-top:20px;
.variation{
  margin:10px 0;
  display: flex;
  
  p{
    font-weight:600 ;
    margin-right: 10px;
  }
}
`;
export const ProductLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  @media (max-width: 960px){
    align-items: center;
  }
  span.logo_product {
    width: auto;
  }

  span {
    div.product_category {
      color: var(--DarkGray);
      font-weight: 600;
    }
  }

  span.product_sku {
    width: 100%;
    max-width: 300px;
    color: var(--Red);
    font-weight: 900;
    font-size: 6vw;
    line-height: 0.8;
    transform: skew(-12deg);
  }
`;

export const Video = styled.div`
  margin-top: 1.4rem;
  margin: 1.4rem auto 2.4rem auto;
  width: 80%;
  height: 650px;
  background: var(--Blue);
  padding:1%;
  @media (max-width: 1280px) {
height: 500px;
  }
  @media (max-width: 960px) {
height: 400px;
  }
  @media (max-width: 760px) {
    margin-top: 0;
    height:300px;
    margin: 1rem auto;
    width: calc(100% - 2rem);
  }
`;

export const DescriptionProduct = styled.div`
  display: flex;
  flex-direction: column;
  gap: 27px;
  margin-top: 2rem;
  width: 100%;
`;

const title_description = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
};


export const Sections = styled.div`
padding: 0 12rem;
@media (max-width: 1280px){
    padding: 6rem 3rem;    
  }
  @media (max-width: 1024px){
    padding: 1rem 2rem;
  }
  @media (max-width: 560px){
    padding: 1rem;
  }

h3 {
    font-size: 1.8em;
    color: var(--TxtRed);
    @media (max-width: 760px) {
      text-align: center;
    }
    @media (max-width: 760px) {
      font-size: 1.3em;
    }
}
  div.section1 {
    display: flex;
    .title_description {
      display: ${title_description.display};
      flex-direction: ${title_description.flexDirection};
      width: ${title_description.width};
      padding: 2rem;
      text-align: right;
    }
    
    .image_section {
      width: 100%;
      max-width: 500px;
      position: relative;
      margin-bottom: 120px;
      min-height: 300px;
    }
  }
  div.section2 {
    display: flex;
    .image_section {
      width: 100%;
      max-width: 500px;
      order: -1;
      position: relative;
      margin-bottom: 120px;
      min-height: 300px;
    }
    
    .title_description {
      display: ${title_description.display};
      flex-direction: ${title_description.flexDirection};
      width: ${title_description.width};
      padding: 2rem;
      @media (max-width: 960px){
        padding: 1rem;
    }
    }
  }

  @media (max-width: 760px) {
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    div.section2 {
      .image_section {
        width: 100%;
        max-width: 320px;
        order: 1;
        
      }
    }
  }
`;

export const RelatedProduct = styled.section`
  width: 100%;
  h2{
  text-align: center;
}
`;

export const SameCatProduct = styled.section`
  width: 100%;
`;

export const Caracteristiques = styled.section`
width: 100%;
padding: 0 3rem;
margin-top: 50px ;
margin-bottom: 50px ;
@media (max-width: 960px) {
  padding: 0 1rem;
}

table {
  box-shadow: 0 0 12px 0px #00000047;
  background-color: var(--White) ;
  width: 80%;
  border-collapse: collapse;
  transform: skew(-7deg);
  margin: 0 auto;
  @media (max-width: 560px) {
    transform: skew(0deg);
    width: 100%;
  }
  caption {
    background-color: var(--Red);
    width: initial;
    height: 30px;
    padding: 23px;
    line-height: 0px;
    text-transform: uppercase;
    font-weight: 900;
    color: var(--White); 
      width: 100%;
    text-align: center;
    border-collapse: collapse;    
  }
}
    
}
  tbody{
    width: 100%;
    tr{
      &:nth-child(even){
        background-color: #b5b5b5;
        border-collapse: collapse;

      }
      
      td{
        transform: skew(7deg);
        @media (max-width: 560px) {
    transform: skew(0deg)
  }        
  @media (max-width:480px){
          display: flex;
    flex-direction: column;
    width:100%;
    
        }
    border-collapse: collapse;
    width: 50%;
    padding: 10px;
    &:nth-child(odd){
        font-weight: bold
      }
  }
    }

  }
}
`;
