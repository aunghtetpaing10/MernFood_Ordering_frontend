import { useGetMyUser, useUpdateMyUser } from "@/api/UserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { Loader } from "lucide-react";

const UserProfilePage = () => {
  const { currentUser, isLoading } = useGetMyUser();
  const { updateUser, isPending } = useUpdateMyUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin" />;
      </div>
    );
  }

  if (!currentUser) {
    return <p>Unable to load user profile</p>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isPending}
    />
  );
};

export default UserProfilePage;
