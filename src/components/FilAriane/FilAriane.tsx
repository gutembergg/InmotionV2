
import { StyledFilAriane } from "./styles";
import Breadcrumbs from 'nextjs-breadcrumbs';


const FilAriane = () =>{

    return(
        <StyledFilAriane>
        <Breadcrumbs useDefaultStyle omitRootLabel  />
      </StyledFilAriane>
    )
}
export default FilAriane;