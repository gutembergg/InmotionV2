import { useRouter } from "next/router";
import Link from "next/link";

import { MainMenu } from "./styles";
import { useCallback, useEffect, useState } from "react";
import { getCategories } from "../../../services/woocommerceApi/Categories";
import { ICategories } from "../../../interfaces/ICategories";

const MenuMainAdmin = () => {
  const router = useRouter();

  const [categories, setCategories] = useState<ICategories[]>([]);

  const _getCategories = useCallback(async () => {
    const  data  = await getCategories();

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
          <Link href="/admin">
            <a className={router.pathname === "/admin" ? "active" : ""}>admin</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/caisse">
            <a className={router.pathname === "/admin/caisse" ? "active" : ""}>
              Caisse
            </a>
          </Link>
        </li>
        <li>
          <Link href="/admin/commandes">
            <a className={router.pathname === "/admin/commandes" ? "active" : ""}>
              Commandes
            </a>
          </Link>
        </li>
        <li>
          <Link href="/admin/clients">
            <a className={router.pathname === "/admin/clients" ? "active" : ""}>
              Clients
            </a>
          </Link>
        </li>
        <li>
          <Link href="/admin/products-editor">
            <a className={router.pathname === "/admin/products-editor" ? "active" : ""}>
              gestion
            </a>
          </Link>
        </li>
        
      </MainMenu>
    </>
  );
};
export default MenuMainAdmin;
