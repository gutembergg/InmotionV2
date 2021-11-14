import React from "react";
import { ICategories } from "../../../interfaces/ICategories";
import ButtonSkew from "../../ButtonSkew";
import CustomSlider from "./customSlider";
import { Container, MenuCategoriesResponsive, MenuCategories } from "./styles";

interface Props {
  subCategories: ICategories[];
  activedMenuIndex: number;
  selectCategory: (categorySlug: string, categoryIndex: number) => void;
  _categoryBySlug: ICategories;
}

const SideMenuCategories = ({
  subCategories,
  activedMenuIndex,
  selectCategory,
  _categoryBySlug,
}: Props) => {
  return (
    <Container>
      <MenuCategoriesResponsive>
        <div className="menu_block">
          {/*  <CustomSlider subCategories={subCategories} /> */}
          {subCategories.map((category, index) => {
            return (
              <div
                className={
                  activedMenuIndex === index
                    ? "menu_buttons active_menu"
                    : "menu_buttons"
                }
                key={category.id}
                onClick={() => selectCategory(category.slug, index)}
              >
                {category.name}
              </div>
            );
          })}
        </div>
      </MenuCategoriesResponsive>
      <MenuCategories>
        <span className="skew">
          <ButtonSkew text={_categoryBySlug.name} />
        </span>

        <div className="prod_model_marque">
          <ul>
            {subCategories.map((category, index) => {
              return (
                <li
                  className={
                    activedMenuIndex === index
                      ? "prod_model_item menu_buttons active_menu"
                      : "prod_model_item menu_buttons"
                  }
                  key={category.id}
                  onClick={() => selectCategory(category.slug, index)}
                >
                  {category.name}
                </li>
              );
            })}
          </ul>
        </div>
      </MenuCategories>
    </Container>
  );
};

export default SideMenuCategories;
