import styled from "styled-components";

export const Container = styled.div`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;

  h2 {
    text-align: center;
    color: var(--Blue);
    span {
      color: var(--Red);
    }
  }

  h2.title_responsive {
    display: none;
  }

  @media (max-width: 1072px) {
    h2.title_responsive {
      display: block;
      span.marque_product {
        font-size: 12vw;
        color: var(--Blue);
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
    }
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 3rem;

  @media (max-width: 1072px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 600px) {
    padding: 0.7rem;
  }
`;

export const CardWrapper = styled.div`
  flex: 1;
`;

export const ProductCard = styled.div`
  position: fixed;
  top: 20;
  left: 10;

  width: 100%;
  max-width: 400px;

  @media (max-width: 1072px) {
    position: static;
  }
`;

export const Card = styled.div`
  width: 100%;
  max-width: 250px;
`;

export const ImageBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .image {
    position: relative;

    span {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
`;

export const PriceQuantity = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;

  input {
    width: 50px;
    height: 40px;
    padding: 5px;

    background: transparent;
    border: 1px solid var(--DarkGray);
  }
`;

export const Button = styled.button`
  height: 2rem;
  width: 100%;
  background: var(--Blue);
  text-align: center;

  margin-top: 1.3rem;

  color: #fff;
  border: none;
  padding: 0.5rem 0.5rem;
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
  max-width: 860px;

  div.first_description {
    margin-top: 1rem;
    width: 100%;
    max-width: 860px;
  }
`;

export const ProductLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;

  span.marque_product {
    font-size: 10vh;
    color: var(--Blue);
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

  @media (max-width: 1072px) {
    display: none;
  }
`;

export const Video = styled.div`
  margin-top: 1.4rem;
  width: 100%;
  max-width: 860px;
  height: 450px;
`;

export const DescriptionProduct = styled.div`
  display: flex;
  flex-direction: column;
  gap: 27px;
  margin-top: 2rem;
`;

const title_description = {
  display: "flex",
  flexDirection: "column",
  with: "100%",
  maxWidth: "600px",
};

export const Sections = styled.div``;

export const Section = styled.div`
  div {
    display: flex;
    margin-top: 15px;
  }
  div.section1 {
    .title_description {
      display: ${title_description.display};
      flex-direction: ${title_description.flexDirection};
      width: ${title_description.with};
      max-width: ${title_description.maxWidth};
      padding: 2rem;
    }

    .image_section {
      width: 100%;
      max-width: 320px;
    }
  }
  div.section2 {
    .image_section {
      width: 100%;
      max-width: 320px;
      order: -1;
    }

    .title_description {
      display: ${title_description.display};
      flex-direction: ${title_description.flexDirection};
      width: ${title_description.with};
      max-width: ${title_description.maxWidth};
      padding: 2rem;
    }
  }

  @media (max-width: 844px) {
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
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
