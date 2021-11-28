import React, { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import LayoutMobility from "../../../Layout/LayoutMobility";
import thankIcon from "../../../../public/images/icons/thank-you.svg";
import { completOrder } from "../../../services/woocommerceApi/Orders";

export default function CompletedOrder() {
  const router = useRouter();

  console.log("router: ", router.query?.orderId);

  const completedOrder = async () => {
    const id = router.query?.orderId;

    await completOrder(parseInt(id as string, 10));
  };

  /*   useEffect(() => {
    completedOrder();
    // eslint-disable-next-line
  }, []); */
  return <p>CompletedOrder</p>;
}

CompletedOrder.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={thankIcon}>{page}</LayoutMobility>;
};
