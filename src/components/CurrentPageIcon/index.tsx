import Image from "next/image";
import { SVGProps } from "react";
import { StyledSingleICon } from "./styles";
interface Props {
  icon: any;
}

const CurrentPageIcon = ({ icon }: Props) => {
  return (
    <StyledSingleICon>
      <div className="imgBox">
        <Image src={icon.src} width={50} height={50} alt="currentPageIcon" />
      </div>
    </StyledSingleICon>
  );
};
export default CurrentPageIcon;
