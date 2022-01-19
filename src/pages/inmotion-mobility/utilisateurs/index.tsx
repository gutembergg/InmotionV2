import { ReactElement, useCallback, useEffect, useState } from "react";
import LayoutMobility from "../../../Layout/LayoutMobility";
import thankIcon from "../../../../public/images/icons/thank-you.svg";
import useUser from "../../../hooks/useUser";
import { getOrdersByUserId } from "../../../services/woocommerceApi/Orders";
import { Order } from "../../../interfaces/Order";
import { useRouter } from "next/router";
import Notiflix from "notiflix";
import { getUserById } from "../../../services/wordpressApi/users";
import UserForm from "../../../components/Users/userForm";
import { User } from "../../../interfaces/User";

import {
  Container,
  Welcome,
  MyOrders,
  FormContainer,
  OrdersList,
  OrderItem,
} from "../../../styles/UsersStyles";

export default function UsersPage() {
  const router = useRouter();
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentyUser, setCurrentyUser] = useState<User>({} as User);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    } else {
      getOrdersByUserId(user.profile.id).then((response) =>
        setOrders(response)
      );
      getUserById(91).then((_user) => setCurrentyUser(_user));
    }
  }, [user, router]);

  const selectOrder = useCallback(
    (orderId: number) => {
      router.push(`/inmotion-mobility/utilisateurs/commandes/${orderId}`);
    },
    [router]
  );

  return (
    mounted && (
      <Container>
        <Welcome>Bienvenue {currentyUser.first_name}</Welcome>
        <MyOrders>
          <div>Mes commandes</div>
          <OrdersList>
            {orders.length > 0 ? (
              orders.map((order) => {
                return (
                  <OrderItem
                    key={order.id}
                    onClick={() => selectOrder(order.id)}
                  >
                    {order.id}
                  </OrderItem>
                );
              })
            ) : (
              <div>Loading...</div>
            )}
          </OrdersList>
        </MyOrders>
        <FormContainer></FormContainer>
        <UserForm currentyUser={currentyUser} />
      </Container>
    )
  );
}

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={thankIcon}>{page}</LayoutMobility>;
};
