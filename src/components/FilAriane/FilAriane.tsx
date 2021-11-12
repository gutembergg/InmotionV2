import Image from "next/image";
import arianeHome from "../../../public/images/icons/arrianeHome.svg";
import { StyledFilAriane } from "./styles";
import Breadcrumbs from 'nextjs-breadcrumbs';


const FilAriane = () =>{

    return(
        <StyledFilAriane>
        <Image src={arianeHome} alt="homeIcon"/><Breadcrumbs useDefaultStyle omitRootLabel />
      </StyledFilAriane>
    )
}
export default FilAriane;