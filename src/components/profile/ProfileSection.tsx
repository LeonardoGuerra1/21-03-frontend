import { DEFAULT_PROFILE_IMAGE } from "../../constants";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

function ProfileSection() {
  const username = useAuthStore().username

  return (
    <div className="grow max-profile:w-full max-w-[1400px] rounded max-profile:rounded-t-none border-3 border-white/30">
      <div className="mx-3 min-profile:mx-10 my-6 flex justify-start items-center gap-x-5 min-profile:gap-x-10">
        <img
          src={DEFAULT_PROFILE_IMAGE}
          alt="Profile"
          className="rounded-full w-[100px] min-profile:w-[170px] ring-2 ring-white/50"
        />
        <span className="text-4xl min-profile:text-7xl font-bold italic">
          {username}
        </span>
      </div>

      <hr className="my-7 pl-10 rounded-r border-2 border-white/30" />

      <section className="m-10">
        <Outlet />
      </section>
    </div>
  );
}

export default ProfileSection;