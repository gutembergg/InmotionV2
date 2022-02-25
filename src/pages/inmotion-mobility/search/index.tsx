import axios from "axios";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FiSearch, FiX } from "react-icons/fi";
import MobileCard from "../../../components/ProductCard/MobileCard";
import ProductSmallCard from "../../../components/ProductCard/ProductSmallCard";
import { IProduct } from "../../../interfaces/IProducts";
import LayoutMobility from "../../../Layout/LayoutMobility";
import wcApi from "../../../services/woocommerceApi/wcAxiosConfig";

import {
  Container,
  InputBlock,
  ResultBlock,
  MenuSearchBar,
  SearchProductsList,
  ListEmpyt,
  ResultBlockMobile,
  SearchProductsListMobile,
} from "../../../styles/SearchPage";

export default function Search() {
  const router = useRouter();
  const { t } = useTranslation();
  const title = t("searchPage:search");
  const resultsText = t("searchPage:results");
  const inputPlaceholder = t("searchPage:inputPlaceholder");
  const noProduct = t("searchPage:noProduct");

  const [searchValue, setSearchValue] = useState<IProduct[] | undefined>([]);
  const [_search, _setSearch] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

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
    _setSearch(searchText);

    if (e.target.value.length === 0) {
      setSearchValue([]);
      return;
    }

    _setSearch(searchText);
  };

  const cancelSearch = () => {
    setSearchValue([]);
    _setSearch("");
    setSearchLoading(false);
  };

  return (
    <Container>
      <InputBlock>
        <h1>{title}</h1>
        <MenuSearchBar>
          <input
            type="text"
            value={_search !== null ? _search : ""}
            placeholder={inputPlaceholder}
            onChange={handleChange}
          />
          {searchLoading && <p>Loading...</p>}
          <span>
            <FiX onClick={cancelSearch} size={22} />
          </span>
          <div className="searchICon">
            <FiSearch size={22} />
          </div>
        </MenuSearchBar>
      </InputBlock>

      <ResultBlockMobile>
        {searchValue !== undefined && searchValue.length > 0 ? (
          <>
            <h2>
              {resultsText}: {searchValue.length}{" "}
            </h2>

            <SearchProductsListMobile>
              {searchValue &&
                searchValue.map((product) => {
                  return <MobileCard key={product.id} product={product} />;
                })}
            </SearchProductsListMobile>
          </>
        ) : (
          <ListEmpyt>{noProduct}</ListEmpyt>
        )}
      </ResultBlockMobile>

      <ResultBlock>
        {searchValue !== undefined && searchValue.length > 0 ? (
          <>
            <h2>
              {resultsText}: {searchValue.length}{" "}
            </h2>

            <SearchProductsList>
              {searchValue &&
                searchValue.map((product) => {
                  return (
                    <ProductSmallCard key={product.id} product={product} />
                  );
                })}
            </SearchProductsList>
          </>
        ) : (
          <ListEmpyt>{noProduct}</ListEmpyt>
        )}
      </ResultBlock>
    </Container>
  );
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
