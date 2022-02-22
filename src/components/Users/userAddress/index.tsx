import { User } from "../../../interfaces/User";
import UserForm from "../userForm";

interface Props {
  currentyUser: User;
}

import { Container, PasswordConfig } from "./styles";

const UserAddress = ({ currentyUser }: Props) => {
  console.log("currentyUser: ", currentyUser);
  return (
    <Container>
      <UserForm currentyUser={currentyUser} />

      <PasswordConfig>
        <h4>Votre mot de passe</h4>
        <div>
          <input type="password" placeholder="password" />
          <button>Changer password</button>
        </div>
      </PasswordConfig>
    </Container>
  );
};

export default UserAddress;
