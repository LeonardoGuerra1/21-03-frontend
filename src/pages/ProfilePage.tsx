import ProfileSection from "../components/profile/ProfileSection";
import ProfileOptions from "../components/profile/ProfileOptions";

function ProfilePage() {

  return (
    <div className="max-w-page mx-auto mt-10 flex max-profile:flex-col justify-center max-profile:items-center items-start">
      <ProfileOptions />
      <ProfileSection />
    </div>
  );
}

export default ProfilePage;