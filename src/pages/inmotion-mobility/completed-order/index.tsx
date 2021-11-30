import React, { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import LayoutMobility from "../../../Layout/LayoutMobility";
import thankIcon from "../../../../public/images/icons/thank-you.svg";
import apiPFinance from "../../../services/postFinanceApi/apiPFinance";
import { completOrder } from "../../../services/woocommerceApi/Orders";

export default function CompletedOrder() {
  const router = useRouter();

  console.log("router: ", router.query);

  const getTransactionState = async () => {
    if (Object.keys(router.query).length > 0) {
      console.log("IN ROUTER");
      const { data } = await apiPFinance.get("transaction-completed", {
        params: {
          order: router.query.order,
          pf_ts: router.query.pf_ts,
        },
      });

      if (data) {
        await completOrder(8382);
        console.log("transaction-completed: ", data);
      }
    }
  };

  useEffect(() => {
    getTransactionState();
    // eslint-disable-next-line
  }, [router]);

  return <p>CompletedOrder</p>;
}

CompletedOrder.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={thankIcon}>{page}</LayoutMobility>;
};
