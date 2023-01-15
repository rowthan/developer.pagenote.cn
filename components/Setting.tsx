import useSettings from "../hooks/useSettings";
import OutLink from "../assets/svg/outlink.svg";
import UserCard from "./account/UserCard";
import DataBackup from "./backup/DataBackup";
import SettingHome from "./setting/SettingHome";
import {NavLink, Outlet, Route, Routes} from "react-router-dom";
import BackSvg from 'assets/svg/back.svg'
import React from "react";
import SettingDetail from "./setting/SettingDetail";
import LightSetting from "./setting/LightSetting";



export default function Setting() {


    return (
        <div className={'mx-6 my-4 '}>
            <div className={'mb-4'}>
                <UserCard />
            </div>

            <div className="">
                <Routes>
                    <Route index element={<SettingHome/>}/>
                    <Route path={'/light'} element={<LightSetting/>}/>
                    <Route path={'/data'} element={<DataBackup/>}/>
                    <Route path={"*"} element={<SettingHome />} />
                </Routes>
            </div>
        </div>
    )
}
