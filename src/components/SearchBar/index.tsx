import { MenuSearchBar } from "./styles";
import Image from "next/image";
import searchIcon from "../../../public/images/icons/search.svg";
import { useState } from "react";

const SearchBar = () => {
const [mobileSearchStatus, setMobileSearchStatus] = useState(false)

  const openMobileSearch = ()=>{
setMobileSearchStatus(!mobileSearchStatus);
  }
  return (
    <>
    <MenuSearchBar>
      <input type="search" />
      <div className="searchICon">
        <Image src={searchIcon} width={30} height={30} alt="search icon" layout="fixed" />
      </div>
    </MenuSearchBar>
    </>
  );
};
export default SearchBar;
