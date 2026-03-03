import {
  Navbar as HeroUiNavbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@heroui/react";
import { Link } from "react-router-dom";
import { authContext } from "./../contexts/authContext";
import { useContext } from "react";
import route from "../assets/route.jpg";
export default function Navbar() {
  const { setUserToken } = useContext(authContext);
  const { UserData } = useContext(authContext);
  const { setIsLoading } = useContext(authContext);
  console.log(UserData);

  function logout() {
    localStorage.removeItem("token");
    setUserToken(null);
    setIsLoading(null);
  }

  return (
    <HeroUiNavbar>
      <NavbarBrand>
        <Link to={"/"} className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-md overflow-hidden">
            <img src={route} alt="" className="w-full" />
          </div>
          <p className="font-bold text-inherit text-xl">Route Posts</p>
        </Link>
      </NavbarBrand>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="flex items-center gap-2  cursor-pointer px-3 py-2  rounded-3xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <Avatar
                isBordered
                color="secondary"
                size="sm"
                name={UserData?.name}
                src={UserData?.photo}
              />

              <div className="flex flex-col text-left">
                <span className="font-semibold text-sm text-gray-800 dark:text-white">
                  {UserData?.name}
                </span>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={15}
                height={15}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu text-slate-500"
                aria-hidden="true"
              >
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </svg>
            </div>
          </DropdownTrigger>

          <DropdownMenu aria-label="Profile Actions" variant="flat" className="text-slate-700 text-sm ">
            <DropdownItem key="profile">
              <Link className="flex items-center gap-2" to="/profile">
                <svg fill="#314158" width="18px" height="18px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path d="M12,11A5,5,0,1,0,7,6,5.006,5.006,0,0,0,12,11Zm0-8A3,3,0,1,1,9,6,3,3,0,0,1,12,3ZM3,22V18a5.006,5.006,0,0,1,5-5h8a5.006,5.006,0,0,1,5,5v4a1,1,0,0,1-2,0V18a3,3,0,0,0-3-3H8a3,3,0,0,0-3,3v4a1,1,0,0,1-2,0Z" /></g></svg>
                <p>Profile</p>
              </Link>
              
            </DropdownItem>
            <DropdownItem key="setting">
              <Link to={"/setting"} className=" flex gap-2 items-cente">
                <svg width="18px" height="18px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#314158" stroke="#314158">
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} /> <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/> <g id="SVGRepo_iconCarrier">
                    <title>ionicons-v5-q</title>
                    <path d="M262.29,192.31a64,64,0,1,0,57.4,57.4A64.13,64.13,0,0,0,262.29,192.31ZM416.39,256a154.34,154.34,0,0,1-1.53,20.79l45.21,35.46A10.81,10.81,0,0,1,462.52,326l-42.77,74a10.81,10.81,0,0,1-13.14,4.59l-44.9-18.08a16.11,16.11,0,0,0-15.17,1.75A164.48,164.48,0,0,1,325,400.8a15.94,15.94,0,0,0-8.82,12.14l-6.73,47.89A11.08,11.08,0,0,1,298.77,470H213.23a11.11,11.11,0,0,1-10.69-8.87l-6.72-47.82a16.07,16.07,0,0,0-9-12.22,155.3,155.3,0,0,1-21.46-12.57,16,16,0,0,0-15.11-1.71l-44.89,18.07a10.81,10.81,0,0,1-13.14-4.58l-42.77-74a10.8,10.8,0,0,1,2.45-13.75l38.21-30a16.05,16.05,0,0,0,6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16,16,0,0,0-6.07-13.94l-38.19-30A10.81,10.81,0,0,1,49.48,186l42.77-74a10.81,10.81,0,0,1,13.14-4.59l44.9,18.08a16.11,16.11,0,0,0,15.17-1.75A164.48,164.48,0,0,1,187,111.2a15.94,15.94,0,0,0,8.82-12.14l6.73-47.89A11.08,11.08,0,0,1,213.23,42h85.54a11.11,11.11,0,0,1,10.69,8.87l6.72,47.82a16.07,16.07,0,0,0,9,12.22,155.3,155.3,0,0,1,21.46,12.57,16,16,0,0,0,15.11,1.71l44.89-18.07a10.81,10.81,0,0,1,13.14,4.58l42.77,74a10.8,10.8,0,0,1-2.45,13.75l-38.21,30a16.05,16.05,0,0,0-6.05,14.08C416.17,247.67,416.39,251.83,416.39,256Z"
                      style={{ fill: "none", stroke: "#314158",strokeLinecap: "round",strokeLinejoin: "round",strokeWidth: 32,}}/>
                  </g>
                </svg> 
                
                <p>Setting</p>
              </Link>
            </DropdownItem>
            <DropdownItem className="border-0 border-t-1 rounded-t-none m-1 border-slate-400 p-0"></DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={logout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </HeroUiNavbar>
  );
}
