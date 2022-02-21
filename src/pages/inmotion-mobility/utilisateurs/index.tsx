import Image from "next/image";
import { ReactElement, useCallback, useEffect, useState } from "react";
import LayoutMobility from "../../../Layout/LayoutMobility";
import { useRouter } from "next/router";
import Notiflix from "notiflix";
import { FaDropbox, FaUserEdit } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { RiLogoutBoxRFill } from "react-icons/ri";

import useUser from "../../../hooks/useUser";
import { getOrdersByUserId } from "../../../services/woocommerceApi/Orders";
import { Order } from "../../../interfaces/Order";
import { getUserById } from "../../../services/wordpressApi/users";
import { User } from "../../../interfaces/User";
import UserAddress from "../../../components/Users/userAddress";
import UserOrders from "../../../components/Users/userOrders";

import {
  Container,
  Welcome,
  Content,
  UserComponents,
  SideBarMenuMobile,
  MenuListMobile,
  BtnMobile,
  SideBarMenu,
  MenuList,
  ListItem,
} from "../../../styles/UsersStyles";
import useTranslation from "next-translate/useTranslation";

export default function UsersPage() {
  const router = useRouter();
  const { user, logout } = useUser();
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState<Order[] | undefined>(undefined);
  const [currentyUser, setCurrentyUser] = useState<User>({} as User);
  const [sideMenuItem, setSideMenuItem] = useState({ id: 1, index: 0 });
  const [openMenuMobile, setOpenMenuMobile] = useState(false);

  // Traductions ///////////////////////////////////////////////////
  const { t } = useTranslation();
  const myOrders = t("userAccount:myOrders");
  const address = t("userAccount:address");
  const myInformations = t("userAccount:myInformations");
  const signOut = t("userAccount:signOut");

  const sideMenu = [
    {
      id: 1,
      name: myOrders,
      icon: <FaDropbox size={25} />,
    },
    {
      id: 2,
      name: myInformations,
      icon: <FaUserEdit size={25} />,
    },
    {
      id: 3,
      name: signOut,
      icon: <RiLogoutBoxRFill size={25} />,
    },
  ];

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
      getUserById(user.profile.id).then((_user) => setCurrentyUser(_user));
    }
  }, [user, router]);

  const selectSideMenuItem = useCallback(
    (id: number, index: number) => {
      if (id === 3) {
        if (typeof window !== undefined) {
          logout();
          router.push("/inmotion-mobility");
        }
        return;
      }
      setSideMenuItem({ id, index });
      setOpenMenuMobile(false);
    },
    // eslint-disable-next-line
    [router]
  );

  const toggleMobileMenu = useCallback(() => {
    setOpenMenuMobile(!openMenuMobile);
  }, [openMenuMobile]);

  return (
    mounted && (
      <Container>
        <Welcome>
          <h1>Bienvenue {currentyUser.first_name}</h1>
        </Welcome>
        <Content>
          <SideBarMenuMobile>
            <BtnMobile onClick={toggleMobileMenu}>
              <IoIosArrowDown />
              <span>Menu</span>
            </BtnMobile>
            <MenuListMobile>
              {openMenuMobile && (
                <MenuList>
                  {sideMenu.map((item, index) => {
                    return (
                      <ListItem mobilePadding="0.8rem" key={item.name}>
                        <div
                          className={
                            sideMenuItem.index === index
                              ? "icon_menu_bar menu_selected"
                              : "icon_menu_bar"
                          }
                        >
                          {item.icon}

                          <p onClick={() => selectSideMenuItem(item.id, index)}>
                            {item.name}
                          </p>
                        </div>
                      </ListItem>
                    );
                  })}
                </MenuList>
              )}
            </MenuListMobile>
          </SideBarMenuMobile>
          <SideBarMenu>
            <MenuList>
              {sideMenu.map((item, index) => {
                return (
                  <ListItem key={item.name}>
                    <div
                      className={
                        sideMenuItem.index === index
                          ? "icon_menu_bar menu_selected"
                          : "icon_menu_bar"
                      }
                    >
                      {item.icon}

                      <p onClick={() => selectSideMenuItem(item.id, index)}>
                        {item.name}
                      </p>
                    </div>
                  </ListItem>
                );
              })}
            </MenuList>
          </SideBarMenu>

          <UserComponents>
            {sideMenuItem.id === 1 ? (
              <UserOrders orders={orders ? orders : undefined} />
            ) : (
              sideMenuItem.id === 2 && (
                <UserAddress currentyUser={currentyUser} />
              )
            )}
          </UserComponents>
        </Content>
      </Container>
    )
  );
}

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};
