import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import LayoutMobility from "../../../Layout/LayoutMobility";
import thankIcon from "../../../../public/images/icons/thank-you.svg";

export default function CompletedOrder() {
  const router = useRouter();

  console.log("router: ", router.query);

  return <p>CompletedOrder</p>;
}

CompletedOrder.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={thankIcon}>{page}</LayoutMobility>;
};
