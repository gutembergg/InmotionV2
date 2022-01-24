import { ChangeEvent, useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import axios from "axios";
import { IProduct } from "../../interfaces/IProducts";
import { FiSearch } from "react-icons/fi";

import useSWR from "swr";

import {
  Container,
  MenuSearchBar,
  SearchProductsList,
  ProductName,
} from "./styles";
import { useRouter } from "next/router";

const SearchBar = () => {
  const router = useRouter();
  const [mobileSearchStatus, setMobileSearchStatus] = useState(false);
  //const [productsList, setProductsList] = useState<IProduct[]>([]);
  const [searchValue, setSearchValue] = useState<IProduct[] | undefined>([]);

  const { t } = useTranslation();
  const search = t("headerMobility:search");

  const openMobileSearch = () => {
    setMobileSearchStatus(!mobileSearchStatus);
  };

  const address = "http://localhost:3000/api/products-swr/search-products";
  const fetcher = async (url: string) =>
    await axios.get<IProduct[]>(url).then((res) => res.data);
  const { data: productsList, error } = useSWR(address, fetcher);

  /*   useEffect(() => {
    axios
      .get("http://localhost:3000/api/products-swr/search-products")
      .then((response) => {
        setProductsList(response.data);
      });
  }, []); */

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;

    if (e.target.value.length === 0) {
      setSearchValue([]);
      return;
    }

    const items = productsList?.filter((item) =>
      item.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );

    setSearchValue(items);
  };

  const selectProduct = (slug: string) => {
    setSearchValue([]);

    router.replace(`http://localhost:3000/inmotion-mobility/produit/${slug}`);
  };

  return (
    <Container>
      <MenuSearchBar>
        <input
          type="search"
          placeholder={search}
          onChange={handleChange}
          disabled={!productsList}
        />
        <div className="searchICon">
          <FiSearch />
        </div>
      </MenuSearchBar>

      {searchValue !== undefined && searchValue.length > 0 ? (
        <SearchProductsList>
          {searchValue &&
            searchValue.map((product) => {
              return (
                <ProductName
                  key={product.id}
                  onClick={() => selectProduct(product.slug)}
                >
                  {product?.name}
                </ProductName>
              );
            })}
        </SearchProductsList>
      ) : null}
    </Container>
  );
};
export default SearchBar;
