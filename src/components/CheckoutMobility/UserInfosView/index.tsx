import { OrderValidation } from "../../../interfaces/OrderValidation";
import { Container } from "./styles";

interface Props {
  _billingShippingData?: OrderValidation;
  userShippingBilling?: any;
}

const UserInfosView = ({
  _billingShippingData,
  userShippingBilling,
}: Props) => {
  console.log(
    "userShippingBilling:View ",
    userShippingBilling.billing_info.address_1
  );
  return (
    <Container>
      <div className="billing">
        <div className="title">Adresse de livraison</div>
        <div>
          <ul>
            <li>
              {!!userShippingBilling.billing_info.address_1
                ? userShippingBilling.billing_info.address_1
                : _billingShippingData?.billing?.address_1}
            </li>
            <li>
              {!!userShippingBilling.billing_info.address_2
                ? userShippingBilling.billing_info.address_2
                : _billingShippingData?.billing?.address_2}
            </li>
            <li>
              {!!userShippingBilling.billing_info.first_name
                ? userShippingBilling.billing_info.first_name
                : _billingShippingData?.billing?.first_name}
            </li>
            <li>
              {!!userShippingBilling.billing_info.last_name
                ? userShippingBilling.billing_info.last_name
                : _billingShippingData?.billing?.last_name}
            </li>
            <li>
              {!!userShippingBilling.billing_info.email
                ? userShippingBilling.billing_info.email
                : _billingShippingData?.billing?.email}
            </li>
            <li>
              {!!userShippingBilling.billing_info.city
                ? userShippingBilling.billing_info.city
                : _billingShippingData?.billing?.city}
            </li>
            <li>
              {!!userShippingBilling.billing_info.state
                ? userShippingBilling.billing_info.state
                : _billingShippingData?.billing?.state}
            </li>
            <li>
              {!!userShippingBilling.billing_info.country
                ? userShippingBilling.billing_info.country
                : _billingShippingData?.billing?.country}
            </li>
            <li>
              {!!userShippingBilling.billing_info.postcode
                ? userShippingBilling.billing_info.postcode
                : _billingShippingData?.billing?.postcode}
            </li>
            <li>
              {!!userShippingBilling.billing_info.phone
                ? userShippingBilling.billing_info.phone
                : _billingShippingData?.billing?.phone}
            </li>
          </ul>
        </div>
      </div>
      <div className="shipping">
        {!!_billingShippingData?.shipping?.address_1 && (
          <div>
            <div className="title">Adresse de facturation</div>

            <div>
              <ul>
                <li>
                  {!!userShippingBilling.shipping_info.address_1
                    ? userShippingBilling.shipping_info.address_1
                    : _billingShippingData?.shipping?.address_1}
                </li>
                <li>
                  {!!userShippingBilling.shipping_info.address_2
                    ? userShippingBilling.shipping_info.address_2
                    : _billingShippingData?.shipping?.address_2}
                </li>
                <li>
                  {!!userShippingBilling.shipping_info.first_name
                    ? userShippingBilling.shipping_info.first_name
                    : _billingShippingData?.shipping?.first_name}
                </li>
                <li>
                  {!!userShippingBilling.shipping_info.last_name
                    ? userShippingBilling.shipping_info.last_name
                    : _billingShippingData?.shipping?.last_name}
                </li>
                <li>
                  {!!userShippingBilling.shipping_info.city
                    ? userShippingBilling.shipping_info.city
                    : _billingShippingData?.shipping?.city}
                </li>
                <li>
                  {!!userShippingBilling.shipping_info.state
                    ? userShippingBilling.shipping_info.state
                    : _billingShippingData?.shipping?.state}
                </li>
                <li>
                  {!!userShippingBilling.shipping_info.country
                    ? userShippingBilling.shipping_info.country
                    : _billingShippingData?.shipping?.country}
                </li>
                <li>
                  {!!userShippingBilling.shipping_info.postcode
                    ? userShippingBilling.shipping_info.postcode
                    : _billingShippingData?.shipping?.postcode}
                </li>
                <li>
                  {!!userShippingBilling.shipping_info.phone
                    ? userShippingBilling.shipping_info.phone
                    : _billingShippingData?.shipping?.phone}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default UserInfosView;
