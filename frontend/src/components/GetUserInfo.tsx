import { useAppSelector } from "../hooks";
import { usersSelector } from "../features/users/usersSlice";
export default function GetUserInfo({
  _id,
  flag,
}: {
  _id: string;
  flag: string;
}) {
  const users = useAppSelector(usersSelector);
  const isUserExist = users.find((user) => user._id === _id);
  return (
    <>
      {isUserExist && flag === "username"
        ? isUserExist.username
        : isUserExist && flag === "email"
        ? isUserExist.email
        : isUserExist && flag === "role"
        ? isUserExist.role
        : isUserExist && flag === "status"
        ? isUserExist.status
        : ""}
    </>
  );
}
