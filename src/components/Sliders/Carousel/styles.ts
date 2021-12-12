import styled from "styled-components";

export const CarouselBox = styled.div`
width: 100%;
 user-select: none;

    .swiper {
  width: 100%;
  height: 100%;
  padding: 50px ;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  
  a{
      text-decoration: none;

      .product_name {
    color: var(--Blue);
}
.product_price {
    color: var(--DarkGray);
    font-weight: bold;
}
}
  }
}

`;
