import React, { useState } from "react";
import { Link, redirect } from "react-router-dom";
import { useAuth } from "./Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../data/Logo Transparent BG 3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function NavBare() {
  const Auth = useAuth();
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      const response = await axios.delete("http://localhost:8080/logo", {
        data: { accessToken: Auth.jwt },
        headers: {
          Authorization: `Bearer ${Auth.jwt}`,
        },
      });
      Auth.logout();
      localStorage.removeItem("jwt");
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange=(val)=> {
    Auth.setFilter(val)
  }

  return (
    <>
      <div className="w-full bg-[#F2F2F2] flex justify-between items-center py-4 px-8 sticky top-0 z-[100]">
        <div className="flex content-center">
          <div>
            <Link to="/" className="text-white font-bold text-lg">
              <img className="w-[180px]" src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="w-[450px] ml-10 relative">
            <FontAwesomeIcon className="absolute top-[13px] left-[7px]" icon={faMagnifyingGlass} />
            <input
            onChange={(e)=> handleChange(e.target.value)}
            onFocus={()=>{navigate("/searchProduct")}}
              className="px-8 py-2 rounded-2xl w-full focus:outline-none"
              placeholder="Search Anything..."
              type="text"
            />
          </div>
        </div>

        {!Auth.info.auth && (
          <div>
            <Link to="/login" className="font-bold text-lg mr-2">
              Sign in
            </Link>
          </div>
        )}

        {Auth.info.auth && (
          <>
          <div className="flex">
            {Auth.info.role === "craftsMan" ? (
              <>
                <Link to="/CraftsmanProfile" className="font-bold text-lg mr-4">
                <div className="flex items-center mr-8">
                <FontAwesomeIcon className="text-xl" icon={faUser} />
              </div>
                </Link>
              </>
            ) : Auth.info.role === "client" ? (
              <>
                <Link to="/ClientProfile" className=" font-bold text-lg mr-4">
                <div className="flex items-center mr-8">
                <FontAwesomeIcon className="text-xl" icon={faUser} />
              </div>
                </Link>
              </>
            ) : (
              <>
                <Link to="/AdminProfile" className=" font-bold text-lg mr-4">
                <div className="flex items-center mr-8">
                <FontAwesomeIcon className="text-xl" icon={faUser} />
              </div>
                </Link>
              </>
            )}

            
              {/* <div className="flex items-center mr-8">
                <FontAwesomeIcon className="text-xl" icon={faUser} />
              </div> */}
              <button
                className="text-black font-bold text-lg mr-4 flex items-end"
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default NavBare;
