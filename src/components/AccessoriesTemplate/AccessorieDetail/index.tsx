import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import useCart from "../../../hooks/useCart";
import { ICategories } from "../../../interfaces/ICategories";
import { IProduct } from "../../../interfaces/IProducts";
import ButtonSkew from "../../ButtonSkew";
import ColorButtonSkew from "../../ColorButttonSkew";

import {
  Container,
  Content,
  AccessoryImage,
  AccessoryInfos,
  ButtonsBox,
  ButtonProduct,
  LinkProduct,
  MobileTemplate,
  MobileImageBox,
  MobileInfos,
  MobileButtons,
} from "./styles";

interface Props {
  products: IProduct[];
  productIndex: number;
  subCategoryActived: ICategories;
}

const AccessoriesDetail = ({
  products,
  productIndex,
  subCategoryActived,
}: Props) => {
  const { cartItem, addToCart } = useCart();

  // Traductions texts ///////////////////////////////////
  const { t } = useTranslation();
  const btnAddToCart = t("productDetail:addToCart");
  const linkShowDetails = t("productDetail:showDetails");

  const handleAddToCart = (product: IProduct) => {
    const productExist = cartItem.find((item) => item.id === product.id);

    if (productExist) {
      const newCart = [...cartItem];

      const cart = newCart.map((item) =>
        item.id === product.id
          ? { ...productExist, qty: productExist.qty + 1 }
          : item
      );

      addToCart(cart);
    } else {
      addToCart([...cartItem, { ...product, qty: 1 }]);
    }
  };

  return (
    <Container>
      <MobileTemplate>
        <MobileImageBox>
          <Image
            src={products[productIndex]?.images[0].src}
            width={300}
            height={300}
            alt={products[productIndex]?.images[0].name}
          />
        </MobileImageBox>
        <MobileInfos>
          <div className="prod_category_name">
            {!!subCategoryActived.name
              ? subCategoryActived.name
              : products[productIndex].categories[0].name}
          </div>
          <div className="prod_name">{products[productIndex].name}</div>

          <div className="price_block">
            <span
              className={
                products[productIndex].on_sale === true ? "regular_price" : ""
              }
            >
              CHF {products[productIndex].regular_price}
            </span>
            {!!products[productIndex].sale_price && (
              <span>CHF {products[productIndex].sale_price}</span>
            )}
          </div>
        </MobileInfos>
        <MobileButtons onClick={() => handleAddToCart(products[productIndex])}>
          panier
        </MobileButtons>
      </MobileTemplate>
      <Content>
        <AccessoryImage>
          <Image
            src={products[productIndex]?.images[0].src}
            width={300}
            height={300}
            alt={products[productIndex]?.images[0].name}
          />
        </AccessoryImage>
        <AccessoryInfos>
          {products[productIndex]?.on_sale && <ButtonSkew text="Promotion!" />}
          <div className="prod_category_name">
            {!!subCategoryActived.name
              ? subCategoryActived.name
              : products[productIndex].categories[0].name}
          </div>
          <div className="prod_name">{products[productIndex].name}</div>
          {/*   <div className="color">
            <span>couleurs:</span> <ColorButtonSkew color="red" />
          </div> */}

          <div className="price_block">
            <span
              className={
                products[productIndex].on_sale === true ? "regular_price" : ""
              }
            >
              CHF {products[productIndex].regular_price}
            </span>
            {!!products[productIndex].sale_price && (
              <span>CHF {products[productIndex].sale_price}</span>
            )}
          </div>

          <ButtonsBox>
            <ButtonProduct
              onClick={() => handleAddToCart(products[productIndex])}
            >
              {btnAddToCart}
            </ButtonProduct>
            <LinkProduct>
              <Link
                href={`/inmotion-mobility/produit/${products[productIndex].slug}`}
              >
                <a className="link">{linkShowDetails}</a>
              </Link>
            </LinkProduct>
          </ButtonsBox>
        </AccessoryInfos>
      </Content>
    </Container>
  );
};

export default AccessoriesDetail;
