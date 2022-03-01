import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    text-align: left;
    color: var(--Blue)
  }
`;

export const Main = styled.div`
  flex-direction: row;

  @media (max-width: 1024px) {
    padding-top:3rem;

  }
  @media (max-width: 960px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top:3rem;
  }
  @media (max-width: 640px) {
    padding-top:2rem;
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: row;
  gap: 2rem;
  padding: 3rem 5rem 0 5rem;
  @media (max-width: 1280px) {
    padding: 3rem 6rem 0 4rem;
  }
  @media (max-width: 1024px) {
    padding: 0rem 3rem 0 3rem;
  }
  @media (max-width: 560px) {
    padding: 0rem 1rem 0 1rem;
  }
  @media (max-width: 960px) {
    flex-direction: column;
    gap: 0rem;
    align-items: center;
  }
`;

export const ProductCard = styled.div`
  width: 100%;
  max-width: 400px;

  @media (max-width: 1072px) {
    position: static;
  }
`;

export const ImageBlock = styled.div`
     width: 100%;
    height: 340px;
    position: relative;
    min-width: 250px;
    margin: 0 auto;
    @media (max-width: 960px) {
      height: 280px;
  }
    @media (max-width: 640px) {
      height: 200px;
  }
`;

export const ProductDetaiil = styled.div`
  .priceBox {
    font-weight: 600;
    display: flex;
    p {
      color: var(--TxtRed);
      font-size: 1.2em;
      margin-left:5px;
    }

    .price {
      display: flex;
      margin-bottom: 10px;
      div {
        font-size: 1.2em;
        color: var(--Price);
      }
    }

    .regular_price {
      font-size: 1.2em;
      text-decoration: line-through;
      opacity: 0.4;
      margin-right: 10px;
    }

    .sale_price {
      font-size: 1.5em;
      color: var(--Green);
    }
  }
`;

export const PriceQuantity = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100%;
@media screen and (max-width:960px){
  justify-content: center;
}

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

  &.disabled{
    background-color: var(--LightGray)
  }
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

  div.first_description {
    margin-top: 1rem;
    width: 100%;
  }
  .bgcity {
    width: 100vw;
    height: 276px;
    position: absolute;
    margin-top: 2rem;
    transform: translateY(-76px);
    z-index: -1;
    opacity: 0.5;
    @media (max-width: 960px) {
      height: 200px;
    }
   
  }
`;

export const VariationProducts = styled.div`
  margin-top: 20px;
  .variation {
    margin: 10px 0;
    display: flex;

    p {
      font-weight: 600;
      margin-right: 10px;
    }
  }
`;
export const ProductLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  @media (max-width: 960px) {
    align-items: center;
    margin-top: 20px;
  }
  span.logo_product {
    width: auto;
  }
h1{
  @media (max-width:960px){
    font-size: 1.80em;
    &::before {
      width: 24px;
    height: 31px;
    transform: skew(-20deg) translateX(-11px);
    }
  }
  @media (max-width:960px){
    font-size: 1.40em;
    &::before {
      width: 24px;
    height: 26px;
    transform: skew(-20deg) translateX(-11px);
    }
  }
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
  width: calc(100% - 6rem);
  height: 650px;
  background: var(--Blue);
  padding: 1%;
  @media (max-width: 1280px) {
    height: 500px;
  }
  @media (max-width: 1024px) {
    height: 400px;
    width: calc(100% - 4rem);
  }
  @media (max-width: 960px) {
    height: 400px;
    width: calc(100% - 4rem);
  }
  @media (max-width: 960px) {
    margin-top: 0;
    height: 300px;
    margin: 1rem auto;
    width: calc(100% - 2rem);
  }
`;

export const DescriptionProduct = styled.div`
  display: flex;
  flex-direction: column;
  gap: 27px;
  width: 100%;
  margin-top: 4rem;
  .sectionTitle {
      width: 100%;
      padding: 0px;
      text-align: center;

      h2 {
        font-weight: bold;
        color: var(--Blue);
        margin-bottom: 5rem;
        margin-top: 3em;

      @media (max-width:960px){
        margin-bottom: 0;
      }
      }
    }
`;

const title_description = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
};

  export const Variations = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-top:10px;
  margin-bottom:20px;
  `;
  export const SelectedVariation = styled.div`
  display: flex;

  h4{
    color: var(--Blue);
  }

  .price{
    color: var(--Price);
    font-weight:bold ;
  }
  `;
  
  export const VariationDisplay = styled.button`
  display:flex;
  border: 1px solid var(--Blue);
  border-radius:5px;
  padding:5px;

  background-color: transparent;
  
  &:hover{
    background-color: var(--LightGray)
  }

  &.active{
    background-color: var(--Blue);
  }
  `;

export const VariationImage = styled.div`
div{
  position: relative;
  width: 150px;
  height: 150px;
}
`;

export const VariationData = styled.div`
display: flex;
flex-direction: column;
`;

export const Sections = styled.div`
  padding: 0 6rem;
  @media (max-width: 1280px) {
    padding: 0rem 3rem;
  }
  @media (max-width: 1024px) {
    padding: 1rem 2rem;
  }
  @media (max-width: 560px) {
    padding: 1rem;
  }

  h3 {
    font-size: 1.5em;
    color: var(--TxtRed);
    @media (max-width: 960px) {
      text-align: center;
      font-size: 1.1em;
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
      /* max-width: 400px; */
      position: relative;
      margin-bottom: 120px;
      min-height: 259px;
      @media (max-width: 960px) {
        margin-bottom: 65px;
      }
    }
  }
  div.section2 {
    display: flex;
    .image_section {
      order: -1;
      width: 100%;
      /* max-width: 400px; */
      position: relative;
      margin-bottom: 120px;
      min-height: 30vh;
      @media (max-width: 960px) {
        margin-bottom: 65px;
      }
    }
    
    .title_description {
      display: ${title_description.display};
      flex-direction: ${title_description.flexDirection};
      width: ${title_description.width};
      padding: 2rem;
      @media (max-width: 960px) {
        padding: 1rem;
      }
    }
  }

  @media (max-width: 960px) {
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
        order: 1;
      }
    }
  }
`;

export const RelatedProduct = styled.section`
  width: 100%;
  h2 {
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
@media (max-width: 1024px) {
  padding: 0 2rem;
}
@media (max-width: 960px) {
  padding: 0 1rem;
}

table {
  box-shadow: 0 0 12px 0px #00000047;
  background-color: var(--White) ;
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  @media (max-width: 560px) {
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
        @media (max-width: 560px) {
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
`;
