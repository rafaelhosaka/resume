import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { User } from "@prisma/client";
import { UserPersonalDataService } from "../../../service/userService";
import css from "./detail.module.scss";
import { getUserImage } from "../../../models/UserEntity";
import { isAuthenticatedRequest } from "../../../utils/securityUtils";
import { REDIRECT_REQUEST_LOGOUT } from "../../logout/index";
import UserResume from "../../../components/UserResume/UserResume";
import { useUserContext } from "../../../context/userContext";
import getAxios from "../../../utils/getAxios";

interface UserDetailProps {
  user: User | null;
  imageUrl: string;
}

const UserDetail = ({ user, imageUrl }: UserDetailProps) => {
  const { user: currentUser } = useUserContext();
  const [userState, setUser] = useState(user);

  if (!userState) return <div>No user!</div>;

  const handleSave = async (data: any) => {
    const res = await getAxios().put(`/users/${userState.id}`, data);
    setUser(res.data);
  };

  return (
    <div className={css["detail__container"]}>
      <UserResume
        user={userState}
        imageUrl={imageUrl}
        editable={currentUser?.id === userState.id}
        onSave={handleSave}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<UserDetailProps> = async (
  context
) => {
  if (!isAuthenticatedRequest(context.req)) {
    return REDIRECT_REQUEST_LOGOUT;
  }

  const id = context.query.id as string;
  const user = await UserPersonalDataService.findById(id);
  const imageUrl = await getUserImage(user);
  return { props: { user, imageUrl } };
};

export default UserDetail;
