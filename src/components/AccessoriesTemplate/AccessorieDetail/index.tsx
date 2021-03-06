import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import useCart from "../../../hooks/useCart";
import { ICategories } from "../../../interfaces/ICategories";
import { IProduct } from "../../../interfaces/IProducts";
import ButtonSkew from "../../ButtonSkew";
import CartIcon from "../../../../public/images/icons/cartWhite.svg";

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
  BtnProductWhitVariation,
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
          {products[productIndex]?.images[0].src && (
            <Image
              src={products[productIndex]?.images[0].src}
              width={300}
              height={300}
              alt={products[productIndex]?.images[0].name}
              placeholder="blur"
              blurDataURL={products[productIndex]?.images[0].src}
            />
          )}
        </MobileImageBox>
        <MobileInfos>
          <div className="prod_category_name">
            {!!subCategoryActived.name
              ? subCategoryActived.name
              : products[productIndex].categories[0].name}
          </div>
          <div className="prod_name">{products[productIndex]?.name}</div>

          <div className="price_block">
            <span
              className={
                products[productIndex]?.on_sale === true ? "regular_price" : ""
              }
            >
              CHF {products[productIndex]?.regular_price}
            </span>
            {!!products[productIndex]?.sale_price && (
              <span>CHF {products[productIndex]?.sale_price}</span>
            )}
          </div>
        </MobileInfos>
        <MobileButtons>
          <button onClick={() => handleAddToCart(products[productIndex])}>
            <Image src={CartIcon} alt="photo" width={27} height={27} />
          </button>
          <Link
            href={`/inmotion-mobility/produit/${products[productIndex]?.slug}`}
          >
            <a>Detail</a>
          </Link>
        </MobileButtons>
      </MobileTemplate>
      <Content>
        <AccessoryImage>
          {products[productIndex]?.images[0].src && (
            <Image
              src={products[productIndex]?.images[0].src}
              width={300}
              height={300}
              alt={products[productIndex]?.images[0].name}
              placeholder="blur"
              blurDataURL={products[productIndex]?.images[0].src}
            />
          )}
        </AccessoryImage>
        <AccessoryInfos>
          {products[productIndex]?.on_sale && <ButtonSkew text="Promotion!" />}
          <div className="prod_category_name">
            {!!subCategoryActived.name
              ? subCategoryActived.name
              : products[productIndex].categories[0].name}
          </div>
          <div className="prod_name">{products[productIndex]?.name}</div>

          <div className="price_block">
            <span
              className={
                products[productIndex]?.on_sale === true ? "regular_price" : ""
              }
            >
              CHF {products[productIndex]?.regular_price}
            </span>
            {!!products[productIndex]?.sale_price && (
              <span>CHF {products[productIndex]?.sale_price}</span>
            )}
          </div>

          <ButtonsBox>
            {products[productIndex].variations.length > 0 ? (
              <BtnProductWhitVariation>
                <Link
                  href={`/inmotion-mobility/produit/${products[productIndex]?.slug}`}
                >
                  <a className="link">{linkShowDetails}</a>
                </Link>
              </BtnProductWhitVariation>
            ) : (
              <>
                <ButtonProduct
                  onClick={() => handleAddToCart(products[productIndex])}
                >
                  {btnAddToCart}
                </ButtonProduct>
                <LinkProduct>
                  <Link
                    href={`/inmotion-mobility/produit/${products[productIndex]?.slug}`}
                  >
                    <a className="link">{linkShowDetails}</a>
                  </Link>
                </LinkProduct>
              </>
            )}
          </ButtonsBox>
        </AccessoryInfos>
      </Content>
    </Container>
  );
};

export default AccessoriesDetail;
