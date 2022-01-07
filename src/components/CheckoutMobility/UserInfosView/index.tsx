import { OrderValidation } from "../../../interfaces/OrderValidation";
import { Container } from "./styles";

interface Props {
  _billingShippingData?: OrderValidation;
}

const UserInfosView = ({ _billingShippingData }: Props) => {
  return (
    <Container>
      <div className="billing">
        <div className="title">Adresse de livraison</div>
        <div>
          <ul>
            <li>{_billingShippingData?.billing?.address_1}</li>
            <li>{_billingShippingData?.billing?.address_2}</li>
            <li>{_billingShippingData?.billing?.first_name}</li>
            <li>{_billingShippingData?.billing?.last_name}</li>
            <li>{_billingShippingData?.billing?.email}</li>
            <li>{_billingShippingData?.billing?.city}</li>
            <li>{_billingShippingData?.billing?.state}</li>
            <li>{_billingShippingData?.billing?.country}</li>
            <li>{_billingShippingData?.billing?.postcode}</li>
            <li>{_billingShippingData?.billing?.phone}</li>
          </ul>
        </div>
      </div>
      <div className="shipping">
        <div>
          <div className="title">Adresse de facturation</div>
          <div>
            <ul>
              <li>{_billingShippingData?.shipping?.address_1}</li>
              <li>{_billingShippingData?.shipping?.address_2}</li>
              <li>{_billingShippingData?.shipping?.first_name}</li>
              <li>{_billingShippingData?.shipping?.last_name}</li>
              <li>{_billingShippingData?.shipping?.city}</li>
              <li>{_billingShippingData?.shipping?.state}</li>
              <li>{_billingShippingData?.shipping?.country}</li>
              <li>{_billingShippingData?.shipping?.postcode}</li>
              <li>{_billingShippingData?.shipping?.phone}</li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserInfosView;
