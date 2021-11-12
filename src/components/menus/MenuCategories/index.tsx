import { useCallback, useState } from "react";
import { ICategories } from "../../../interfaces/ICategories";

import {
  Container,
  CategoriesList,
  CategoryItem,
  CategoryName,
  CategoryNameLi,
} from "./styles";

interface IProps {
  categories: ICategories[];
  menu_order: ICategories[];
  productsByCategories: (id: number) => void;
  displayAllProducts: () => void;
}

const MenuCategories = ({
  categories,
  productsByCategories,
  menu_order,
  displayAllProducts,
}: IProps) => {
  const [activedIndex, setActivedIndex] = useState(0);
  const [activeTitle, setActiveTitle] = useState(true);

  const mainCategories = categories.filter(
    (category) => category.parent === 80
  );

  mainCategories.sort((a, b) => {
    return a.menu_order - b.menu_order;
  });

  const subCategories = categories.filter((category) => category.parent !== 0);

  const selectAllProducts = useCallback(() => {
    displayAllProducts();
    setActiveTitle(true);
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <CategoriesList>
        <div className="article_block">
          <div className="articles_title"></div>
          <div className="title">Articles</div>
        </div>

        <div
          className={
            activeTitle ? "all_articles_title active" : "all_articles_title"
          }
          onClick={selectAllProducts}
        >
          Tous les articles
        </div>

        {mainCategories.length > 0 &&
          mainCategories.map((category, index) => {
            return (
              <CategoryItem
                key={category.id}
                onClick={() => {
                  productsByCategories(category.id);
                  setActivedIndex(index);
                  setActiveTitle(false);
                }}
              >
                <div>
                  <CategoryName>
                    {" "}
                    <span
                      className={
                        activedIndex === index && activeTitle === false
                          ? "active"
                          : ""
                      }
                    >
                      {category.name}
                    </span>
                    {subCategories.map((item) => {
                      if (item.parent === category.id) {
                        return (
                          <CategoryNameLi key={item.id}>
                            {item.name}
                          </CategoryNameLi>
                        );
                      }
                    })}
                  </CategoryName>
                </div>
              </CategoryItem>
            );
          })}
      </CategoriesList>
    </Container>
  );
};

export default MenuCategories;
