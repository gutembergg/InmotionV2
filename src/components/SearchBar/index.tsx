import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import axios from "axios";
import { IProduct } from "../../interfaces/IProducts";
import { FiSearch } from "react-icons/fi";
import wcApi from "../../services/woocommerceApi/wcAxiosConfig";

import {
  Container,
  MenuSearchBar,
  SearchProductsList,
  ProductName,
} from "./styles";

const SearchBar = () => {
  const router = useRouter();
  const [mobileSearchStatus, setMobileSearchStatus] = useState(false);
  const [searchValue, setSearchValue] = useState<IProduct[] | undefined>([]);
  const [_search, _setSearch] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const { t } = useTranslation();
  const search = t(
    "headerMobility:search",
    { count: 1 },
    {
      fallback: "Search",
    }
  );

  const openMobileSearch = () => {
    setMobileSearchStatus(!mobileSearchStatus);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (_search) {
      setSearchLoading(true);
      wcApi
        .get("products", {
          params: {
            per_page: 10,
            search: _search,
            lang: router.locale,
          },
          cancelToken: source.token,
        })
        .then((response) => {
          setSearchValue(response.data);
          setSearchLoading(false);
        })
        .catch((error) => {
          if (axios.isCancel(error)) return;
        });
    }

    return () => source.cancel();
  }, [_search, router.locale]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;

    if (e.target.value.length === 0) {
      setSearchValue([]);
      return;
    }

    _setSearch(searchText);
  };

  const selectProduct = (slug: string) => {
    setSearchValue([]);

    router.push(`/inmotion-mobility/produit/${slug}`);
  };

  return (
    <Container>
      <MenuSearchBar>
        <input type="search" placeholder={search} onChange={handleChange} />
        {searchLoading && <p>Loading...</p>}
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
