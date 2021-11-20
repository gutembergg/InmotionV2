import type { GetStaticProps, NextPage } from "next";
import { ReactElement, useCallback, useState } from "react";
import MenuCategories from "../../../components/menus/MenuCategories";
import { ICategories } from "../../../interfaces/ICategories";
import { IProduct } from "../../../interfaces/IProducts";
import { getCategories } from "../../../services/woocommerceApi/Categories";
import { getProducts } from "../../../services/woocommerceApi/Products";

import LayoutAdmin from "../../../Layout/LayoutAdmin";
import CartAdmin from "../../../components/CartAdmin";
import CaisseProductList from "../../../components/CaisseProductList";

import { Container, MainContent } from "../../../styles/HomeStyles";

export interface Props {
  products: IProduct[];
  categories: ICategories[];
  menu_order: ICategories[];
}

export default function CaisseMagasin({
  products,
  categories,
  menu_order,
}: Props) {
  const [_productByCategory, setProductByCategory] = useState<IProduct[]>([]);
  const [showAllProducts, setShowAllProducts] = useState(true);

  const displayAllProducts = useCallback(() => {
    setShowAllProducts(true);
  }, []);

  const productsByCategories = useCallback(
    (id: number) => {
      let total: IProduct[] = [];

      products.filter((product) =>
        product.categories?.map((item) => {
          if (item.id === id) {
            total.push(product);
            setProductByCategory(total);
          }
        })
      );
      setShowAllProducts(false);
    },
    [products]
  );

  return (
    <Container>
      <MainContent>
        <CaisseProductList
          products={products}
          productByCategory={_productByCategory}
          showAllProducts={showAllProducts}
        />
        <div>
          <MenuCategories
            categories={categories}
            productsByCategories={productsByCategories}
            menu_order={menu_order}
            displayAllProducts={displayAllProducts}
          />
          <CartAdmin />
        </div>
      </MainContent>
    </Container>
  );
}

CaisseMagasin.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await getProducts();

  const response = await getCategories();
  const categories = response;

  return {
    props: {
      products: data,
      categories,
    },
  };
};
