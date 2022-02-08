import { User } from "../../../interfaces/User";
import UserForm from "../userForm";

interface Props {
  currentyUser: User;
}

const UserAddress = ({ currentyUser }: Props) => {
  return (
    <div>
      <UserForm currentyUser={currentyUser} />
    </div>
  );
};

export default UserAddress;
