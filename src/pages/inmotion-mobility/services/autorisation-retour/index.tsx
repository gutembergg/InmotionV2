import useTranslation from "next-translate/useTranslation";
import React, { ReactElement } from "react";
import ReturnProductForm from "../../../../components/ReturnProductForm";
import LayoutMobility from "../../../../Layout/LayoutMobility";
import {
  DirectivesRetour,
  MainContent,
  Container
} from "../../../../styles/RetourMarchandise";

export default function AutorisationRetour() {
  const { t } = useTranslation();
  const DirectiveTitle = t("services:DirectiveTitle");
  const DirectiveDesc = t("services:DirectiveDesc");
  const ul1 = t("services:ul1");
  const ul2 = t("services:ul2");
  const ul3 = t("services:ul3");
  const ul4 = t("services:ul4");
  const ul5 = t("services:ul5");
  const ul6 = t("services:ul6");
  const ul7 = t("services:ul7");
  const ul8 = t("services:ul8");
  const FormTitle = t("services:FormTitle");
  return (
    <Container>
      <MainContent>
        <DirectivesRetour>
          <h1>{DirectiveTitle}</h1>
          <p>
            <strong>{DirectiveDesc}</strong>
          </p>
          <ul>
            <li>{ul1}</li>
            <li>{ul2}</li>
            <li>{ul3}</li>
            <li>{ul4}</li>
            <li>{ul5}</li>
            <li>{ul6}</li>
            <li>{ul7}</li>
            <li>{ul8}</li>
          </ul>
          <h2 className="squared">{FormTitle}</h2>
        </DirectivesRetour>
        <ReturnProductForm />
      </MainContent>
    </Container>
  );
}

AutorisationRetour.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};
