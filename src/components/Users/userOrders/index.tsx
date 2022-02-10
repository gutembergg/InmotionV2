import { useRouter } from "next/router";
import { useCallback } from "react";
import { Order } from "../../../interfaces/Order";
import { IoIosEye } from "react-icons/io";
import { FaFileInvoice } from "react-icons/fa";

import { MyOrders, BtnTable } from "./styles";

interface Props {
  orders?: Order[];
}

const UserOrders = ({ orders }: Props) => {
  const router = useRouter();

  const selectOrder = useCallback(
    (orderId: number) => {
      router.push(`/inmotion-mobility/utilisateurs/commande/${orderId}`);
    },
    [router]
  );

  const formatDate = useCallback((orderDate: string) => {
    const date = new Date(orderDate);

    const day = date.getDate();
    const mounth = date.getMonth() + 1;
    const year = date.getFullYear();
    const includeZero = mounth < 10 ? "0" : "";
    const dateFormated = `${day}/${includeZero}${mounth}/${year}`;

    return dateFormated;
  }, []);

  return (
    <div>
      <MyOrders>
        <table>
          <thead>
            <tr>
              <th className="head">Commande</th>
              <th className="head">Date</th>
              <th className="head">Etat</th>
              <th className="head">Total</th>
              <th className="head"></th>
              <th className="head"></th>
            </tr>
          </thead>

          {orders ? (
            orders.map((order) => {
              return (
                <tbody key={order.id}>
                  <tr>
                    <td style={{ textAlign: "center" }}>{order.number}</td>
                    <td>{formatDate(order.date_created)}</td>
                    <td>{order.status}</td>
                    <td>{order.total}</td>
                    <td
                      className="btn_table"
                      onClick={() => selectOrder(order.id)}
                    >
                      <IoIosEye color="#0570A6" />
                      <span className="eyesIcon">Aperçu</span>
                    </td>

                    <td className="btn_table_invoice">
                      <BtnTable className="btn_invoice" btnColor="#868686">
                        <FaFileInvoice color="white" />
                        <span className="invoiceIcon">Facture</span>
                      </BtnTable>
                    </td>
                  </tr>
                </tbody>
              );
            })
          ) : (
            <tfoot>
              <tr>
                <td className="footer">Loading...</td>
              </tr>
            </tfoot>
          )}
        </table>
      </MyOrders>
    </div>
  );
};

export default UserOrders;
