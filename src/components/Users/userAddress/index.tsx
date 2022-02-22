import { ChangeEvent, useCallback, useState } from "react";
import useUser from "../../../hooks/useUser";
import { User } from "../../../interfaces/User";
import { updateUsersPassword } from "../../../services/wordpressApi/users";
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
      alert("Not correct password");
      return;
    }
    console.log("_password: ", _password);
    alert("Correct Password !!!!");
    //await updateUsersPassword(_password);
  }, [_password]);

  return (
    <Container>
      <UserForm currentyUser={currentyUser} />

      <PasswordConfig>
        <h4>Changer mot de passe</h4>
        <InputBlock>
          <input
            type="password"
            name="newPassword"
            onChange={onChangePassword}
            placeholder="nouveau mot de passe"
          />
          <div>
            <input
              type="password"
              name="password"
              onChange={onChangePassword}
              placeholder="confirmez mot de passe"
            />
            <button type="button" onClick={onSubmitPassword}>
              Valider
            </button>
          </div>
        </InputBlock>
      </PasswordConfig>
    </Container>
  );
};

export default UserAddress;
