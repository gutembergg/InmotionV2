import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import {
  Container
} from "./styles";

const SearchBar = () => {

  return (
    <Container>
      <Link  href="/inmotion-mobility/search">
      <a>
       <div className="searchICon">
          <FiSearch />
        </div>
        </a>
      </Link>
    </Container>
  );
};
export default SearchBar;
