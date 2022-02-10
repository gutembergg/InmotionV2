import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import useCart from "../../../hooks/useCart";
import { IProduct } from "../../../interfaces/IProducts";
import {
  Container,
  ProductBlock,
  ProductInfo,
  IconFleche,
  BtnDetail,
  BtnAddToCart,
} from "./styles";

interface Props {
  product: IProduct;
}

const MobileCard = ({ product }: Props) => {
  const { cartItem, addToCart } = useCart();
  const { t } = useTranslation();
  const btnAddToCart = t("productDetail:addToCart");

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
      <ProductBlock>
        <div className="image">
          <Image
            width={50}
            height={50}
            src={product.images[0].src}
            placeholder="blur"
            blurDataURL={product?.images[0].src}
            alt={product.name}
          />
        </div>

        <ProductInfo className="prod_info">
          <h4>{product.name}</h4>
          <BtnAddToCart onClick={() => handleAddToCart(product)}>
            {btnAddToCart}
          </BtnAddToCart>
        </ProductInfo>
      </ProductBlock>

      <BtnDetail>
        <Link href={`/inmotion-mobility/produit/${product.slug}`}>
          <a>
            <IconFleche />
          </a>
        </Link>
      </BtnDetail>
    </Container>
  );
};

export default MobileCard;
