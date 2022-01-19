import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import LayoutMobility from "../../../../Layout/LayoutMobility";
import thankIcon from "../../../../../public/images/icons/thank-you.svg";
import useTranslation from "next-translate/useTranslation";
import { getOrder } from "../../../../services/woocommerceApi/Orders";
import { Order } from "../../../../interfaces/Order";
import useUser from "../../../../hooks/useUser";
import Notiflix from "notiflix";

import {
  Container,
  Content,
  OrderInfos,
  OrderItem,
  ResumeWrapper,
  OrderResume,
  OrderShipping,
} from "../../../../styles/UserCommandesStyles";

export default function UserOrder() {
  const router = useRouter();
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);
  const [order, setOrder] = useState<Order>({} as Order);
  const [orderDate, setOrderDate] = useState("");
  const [orderResponse, setOrderResponse] = useState(false);

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
  const TVATxt = t("completed-order:TVATxt");
  const IncludeTxt = t("completed-order:IncludeTxt");
  const TvaWarningTxt = t("completed-order:TvaWarningTxt");
  const CompletedOrderShippingAddress = t(
    "completed-order:CompletedOrderShippingAddress"
  );
  const CompletedOrderBillingAddress = t(
    "completed-order:CompletedOrderBillingAddress"
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    getOrder(Number(router.query.orderId))
      .then((response) => {
        setOrder(response);
        const orderDate = new Date(response.date_created).toLocaleString(
          "fr-CH"
        );
        setOrderDate(orderDate);
        setOrderResponse(true);
      })
      .catch((error) => console.log("Error: ", error));
  }, [router.query.orderId]);

  useEffect(() => {
    Notiflix.Loading.init({
      svgColor: "var(--Blue)",
      svgSize: "100px",
      messageColor: "var(--Red)",
      messageFontSize: "17px",
      backgroundColor: "rgba(234, 234, 234, 0.856)",
    });

    const handleStart = () => {
      Notiflix.Loading.standard("Loading...");
    };
    const handleStop = () => {
      Notiflix.Loading.remove();
    };
    if (Object.keys(user).length === 0) {
      handleStart();
      router.push("/inmotion-mobility").then((res) => handleStop());
    }
  }, [user, router]);

  if (orderResponse) {
    return <div>Loading...</div>;
  }

  return (
    mounted && (
      <Container>
        <h1>Commande</h1>
        <Content>
          <OrderInfos>
            <OrderItem>
              <h4>{CompletedOrderOrdernumber}</h4>
              <p>{order.id}</p>
            </OrderItem>
            <OrderItem>
              <h4>{CompletedOrderDate}</h4>
              <p>{orderDate}</p>
            </OrderItem>
            <OrderItem>
              <h4>{CompletedOrderMail}</h4>
              <p>{order.billing?.email}</p>
            </OrderItem>
            <OrderItem>
              <h4>{CompletedOrderTotal}</h4>
              <p>
                {order.currency} {order.total}
              </p>
            </OrderItem>
            <OrderItem>
              <h4>{CompletedOrderPaiementMethod}</h4>
              <p>{order.payment_method_title}</p>
            </OrderItem>
          </OrderInfos>
          <ResumeWrapper>
            <OrderResume>
              <h2>{CompletedOrderResumeTitle}</h2>
              <h4>{CompletedOrderProducts}</h4>
              <ul className="product_list">
                {order &&
                  order.line_items?.map((lineItem, index) => {
                    return (
                      <li key={index}>
                        <p className="productTitle">{lineItem.name}</p>
                        <p className="productQty">{lineItem.quantity}x</p>
                        <p className="productTitle">
                          {order.currency}{" "}
                          {(Number(lineItem.total) +
                            Number(lineItem.total_tax)) /
                            Number(lineItem.quantity)}
                        </p>
                      </li>
                    );
                  })}
              </ul>
              <OrderItem>
                <h4>{CompletedOrderSousTotal}</h4>
                <p>
                  {order?.currency}{" "}
                  {Number(order?.total) - Number(order?.shipping_total)}
                </p>
              </OrderItem>
              <OrderItem>
                <h4>{CompletedOrderShipping}</h4>
                <p>
                  {order?.currency} {order?.shipping_total}{" "}
                  {order?.shipping_lines[0].method_title}
                </p>
              </OrderItem>

              <OrderItem>
                <h4>{CompletedOrderTotal}</h4>
                <p>
                  {order?.currency} {order?.total}
                  {order?.tax_lines.length !== 0 ? (
                    <span>
                      ({IncludeTxt} {order?.currency}{" "}
                      {order?.tax_lines[0].tax_total} {CompletedOrderTVA} (
                      {order?.tax_lines[0].rate_percent}%)
                    </span>
                  ) : (
                    <>
                      <br />
                      <span>
                        ({TVATxt} {order?.currency} 0.- , {TvaWarningTxt})
                      </span>
                    </>
                  )}
                </p>
              </OrderItem>
            </OrderResume>
            <OrderShipping>
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
            </OrderShipping>
          </ResumeWrapper>
        </Content>
      </Container>
    )
  );
}

UserOrder.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={thankIcon}>{page}</LayoutMobility>;
};
