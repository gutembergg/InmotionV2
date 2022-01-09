import React, { ReactElement, useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import LayoutMobility from "../../../Layout/LayoutMobility";
import thankIcon from "../../../../public/images/icons/thank-you.svg";
import { OrderContent } from "../../../styles/OrderCompleted";
import useTranslation from "next-translate/useTranslation";
import ThankULogo from "../../../../public/images/icons/thankU.svg";
import Image from "next/dist/client/image";
import { getOrder } from "../../../services/woocommerceApi/Orders";
import { GetServerSideProps } from "next";
import { Order } from "../../../interfaces/Order";

export default function CompletedOrder() {
  //translation
  const { t } = useTranslation();
  const CompletedOrderTitle = t("completed-order:CompletedOrderTitle");
  const CompletedOrderthanks = t("completed-order:CompletedOrderthanks");
  const CompletedOrderOrdernumber = t(
    "completed-order:CompletedOrderOrdernumber"
  );
  const CompletedOrderDate = t("completed-order:CompletedOrderDate");
  const CompletedOrderMail = t("completed-order:CompletedOrderMail");
  const CompletedOrderTotal = t("completed-order:CompletedOrderTotal");
  const CompletedOrderPaiementMethod = t(
    "completed-order:CompletedOrderPaiementMethod"
  );
  const CompletedOrderResumeTitle = t(
    "completed-order:CompletedOrderResumeTitle"
  );
  const CompletedOrderProducts = t("completed-order:CompletedOrderProducts");
  const CompletedOrderSousTotal = t("completed-order:CompletedOrderSousTotal");
  const CompletedOrderShipping = t("completed-order:CompletedOrderShipping");
  const CompletedOrderTVA = t("completed-order:CompletedOrderTVA");
  const CompletedOrderShippingAddress = t(
    "completed-order:CompletedOrderShippingAddress"
  );
  const CompletedOrderBillingAddress = t(
    "completed-order:CompletedOrderBillingAddress"
  );
  const signature = t("completed-order:signature");

  const [order, setOrder] = useState<Order>();
  const router = useRouter();
  const orderID = Number(router.query.order);
  console.log(orderID);

  useEffect(() => {
    getOrder(orderID).then((order) => {
      if (order) {
        setOrder(order);
      }
    });
  }, [router]);

  if (order) {
    const orderDate = new Date(order.date_created).toLocaleString("fr-CH");
    console.log("order", order);

    return (
      <OrderContent>
        <h1>{CompletedOrderTitle}</h1>
        <p>{CompletedOrderthanks}</p>
        <div className="orderInfos">
          <h4>{CompletedOrderOrdernumber}</h4>
          <p>{order.id}</p>
          <h4>{CompletedOrderDate}</h4>
          <p>{orderDate}</p>
          <h4>{CompletedOrderMail}</h4>
          <p>{order.billing.email}</p>
          <h4>{CompletedOrderTotal}</h4>
          <p>
            {order.currency} {order.total}
          </p>
          <h4>{CompletedOrderPaiementMethod}</h4>
          <p>{order.payment_method_title}</p>
        </div>
        <div className="orderDetails">
          <h2>{CompletedOrderResumeTitle}</h2>
          <h4>{CompletedOrderProducts}</h4>
          <ul>
            {order.line_items.map((lineItem, index) => {
              return (
                <li key={index}>
                  <p className="productTitle">{lineItem.name}</p>
                  <p className="productQty">{lineItem.quantity}x</p>
                  <p className="productTitle">
                    {order.currency}{" "}
                    {(Number(lineItem.total) + Number(lineItem.total_tax)) /
                      Number(lineItem.quantity)}
                  </p>
                </li>
              );
            })}
          </ul>
          <h4>{CompletedOrderSousTotal}</h4>
          <p>
            {order.currency}{" "}
            {Number(order.total) - Number(order.shipping_total)}
          </p>
          <h4>{CompletedOrderShipping}</h4>
          {/* <p>{order.currency} {order.shipping_total} {order.shipping_lines[0].method_title}</p> */}
          <h4>{CompletedOrderTotal}</h4>
          <p>
            {order.currency} {order.total}
            <span>
              (dont {order.currency} {order.tax_lines[0].tax_total}{" "}
              {CompletedOrderTVA} ({order.tax_lines[0].rate_percent}%)
            </span>
          </p>
        </div>
        <div className="shippingBillingInfo">
          <div className="billing">
            <h4>{CompletedOrderBillingAddress}</h4>
            <address>
              {order.billing.last_name} {order.billing.first_name}
              <br />
              {order.billing.address_1} <br />
              {order.billing.address_2 && order.shipping.address_2}
              {order.billing.address_2 ? <br /> : ""}
              {order.billing.postcode} {order.billing.city} <br />
            </address>
          </div>
          <div className="shipping">
            <h4>{CompletedOrderShippingAddress}</h4>
            <address>
              {order.shipping.last_name} {order.shipping.first_name}
              <br />
              {order.shipping.address_1} <br />
              {order.shipping.address_2 && order.shipping.address_2}
              {order.shipping.address_2 ? <br /> : ""}
              {order.shipping.postcode} {order.shipping.city} <br />
            </address>
          </div>
        </div>
        <div className="imageThank">
          <Image
            src={ThankULogo}
            alt="Picture of the author"
            layout="fill"
            objectFit="contain"
          />
          <p>{signature}</p>
        </div>
      </OrderContent>
    );
  } else {
    return <p>loading...</p>;
  }
}

CompletedOrder.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={thankIcon}>{page}</LayoutMobility>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
