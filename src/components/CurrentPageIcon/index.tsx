import Image from "next/image";
import { SVGProps } from "react";
import { StyledSingleICon } from "./styles";
interface Props{
  icon:any;
  bgcolor:string;
}

const CurrentPageIcon = ({icon,bgcolor}:Props) => {
  return (
    <StyledSingleICon bgcolor={bgcolor} >
      <div className="imgBox">
        <Image src={icon.src} width={50} height={50} alt="currentPageIcon" />
      </div>
    </StyledSingleICon>
  );
};
export default CurrentPageIcon;
