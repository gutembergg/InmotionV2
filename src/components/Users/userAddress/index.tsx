import useTranslation from "next-translate/useTranslation";
import { Report } from "notiflix";
import { ChangeEvent, useCallback, useState } from "react";
import useUser from "../../../hooks/useUser";
import { User } from "../../../interfaces/User";
import { updateUsersPassword } from "../../../services/wordpressApi/users";
import RecaptchaDisplay from "../../RecaptchaDisplay";
import UserForm from "../userForm";

interface Props {
  currentyUser: User;
}

import { Container, PasswordConfig, InputBlock } from "./styles";

interface IPassword {
  newPassword: string;
  password: string;
  token: string;
}

const UserAddress = ({ currentyUser }: Props) => {
  const { user } = useUser();
  const [_password, _setPassword] = useState<IPassword>({} as IPassword);

  const { t } = useTranslation();
  const changePassword = t("userAccount:changePassword");
  const newPassword = t("userAccount:newPassword");
  const confirmPassword = t("userAccount:confirmPassword");
  const register = t("userAccount:register");
  const wrongPasswordTitle = t("userAccount:wrongPasswordTitle");
  const wrongPasswordTxt = t("userAccount:wrongPasswordTxt");
  const GoodPasswordTitle = t("userAccount:GoodPasswordTitle");
  const GoodPasswordTxt = t("userAccount:GoodPasswordTxt");
  const ChangeErrorTitle = t("userAccount:ChangeErrorTitle");
  const ChangeErrorTxt = t("userAccount:ChangeErrorTxt");

  const onChangePassword = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      _setPassword({
        ..._password,
        [e.target.name]: e.target.value,
        token: user.token,
      });
    },
    [user.token, _password]
  );

  const onSubmitPassword = useCallback(async () => {
    if (_password.newPassword !== _password.password) {
      Report.failure(`${wrongPasswordTitle}`, `${wrongPasswordTxt}`, "Okay");
      return;
    }

    const UpdateResp = await updateUsersPassword(_password);

    if (UpdateResp && UpdateResp?.ID && UpdateResp?.user_pass) {
      Report.success(`${GoodPasswordTitle}`, `${GoodPasswordTxt}`, "Okay");
    } else {
      Report.failure(`${ChangeErrorTitle}`, `${ChangeErrorTxt}`, "Okay");
    }
    
  }, [_password,ChangeErrorTitle,ChangeErrorTxt,GoodPasswordTitle,GoodPasswordTxt,wrongPasswordTitle,wrongPasswordTxt]);

  return (
    <Container>
      <UserForm currentyUser={currentyUser} />
      <RecaptchaDisplay />
      <PasswordConfig>
        <h4>{changePassword}</h4>
        <InputBlock>
          <input
            type="password"
            name="newPassword"
            onChange={onChangePassword}
            placeholder={newPassword}
            />
          <div>
            <input
              type="password"
              name="password"
              onChange={onChangePassword}
              placeholder={confirmPassword}
              />
            <button type="button" onClick={onSubmitPassword}>
              {register}
            </button>
          </div>
        </InputBlock>
      </PasswordConfig>
    </Container>
  );
};

export default UserAddress;
