import { useRouter } from "next/router";
import Link from "next/link";

import { MainMenu } from "./styles";
import { useCallback, useEffect, useState } from "react";
import { getCategories } from "../../../services/woocommerceApi/Categories";
import { ICategories } from "../../../interfaces/ICategories";

const MenuMainPrinter = () => {
  const router = useRouter();

  const [categories, setCategories] = useState<ICategories[]>([]);

  const _getCategories = useCallback(async () => {
    const { data } = await getCategories();

    const categories: ICategories[] = data;

    const mainCategories = categories.filter(
      (category: ICategories) =>
        category.parent === 0 &&
        category.slug !== "non-classe" &&
        category.slug !== "occasions"
    );

    mainCategories.sort((a, b) => {
      return a.menu_order - b.menu_order;
    });

    setCategories(mainCategories);
  }, []);

  useEffect(() => {
    _getCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <MainMenu>
        <li>
          <Link href="/inmotion-print">
            <a className={router.pathname === "/inmotion-print" ? "active" : ""}>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/inmotion-print/boutique">
            <a className={router.pathname === "/inmotion-print/boutique" ? "active" : ""}>
              Boutique
            </a>
          </Link>
          <ul>
            {categories?.map((category) => {
              return (
                <li key={category.id}>
                  <Link href="/boutique">
                    <a
                      className={
                        router.pathname === "/boutique" ? "active" : ""
                      }
                    >
                      {category.name}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
        <li>
          <Link href="/inmotion-print/services">
            <a className={router.pathname === "/inmotion-print/services" ? "active" : ""}>
              Services
            </a>
          </Link>
          <ul>
            <li>
              <Link href="/inmotion-print/services/modelisation">
                <a>Modélisation</a>
              </Link>
            </li>
            <li>
              <Link href="/inmotion-print/services/impression-3d">
                <a>Impression 3D</a>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/inmotion-print/contact">
            <a className={router.pathname === "/inmotion-print/contact" ? "active" : ""}>
              Contact
            </a>
          </Link>
        </li>
      </MainMenu>
    </>
  );
};
export default MenuMainPrinter;
