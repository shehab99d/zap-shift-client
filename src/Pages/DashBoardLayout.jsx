import React from 'react';
import { NavLink, Outlet } from 'react-router';
import ProFastLogo from './Shared/ProFastLogo/ProFastLogo';
import { FaHistory, FaBox, FaUserCheck, FaUserClock, FaSearchLocation, FaUserShield, FaUser } from 'react-icons/fa';

const DashBoardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center">
                {/* Page content here */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">Dashboard</div>
                </div>
                {/* Page content here */}
                <Outlet>

                </Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <ProFastLogo />

                    <li>
                        <NavLink to='/dashboard/paymentHistory'>
                            <FaHistory className="mr-2" />
                            Payment history
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/myParcels'>
                            <FaBox className="mr-2" />
                            My Parcels
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/track'>
                            <FaSearchLocation className="mr-2" />
                            Track a Package
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/profile'>
                            <FaUser className="mr-2" />
                            Profile
                        </NavLink>
                    </li>

                    {/* ✅ New links below */}
                    <li>
                        <NavLink to='/dashboard/activeRiders'>
                            <FaUserCheck className="mr-2" />
                            Active Riders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/pendingRiders'>
                            <FaUserClock className="mr-2" />
                            Pending Riders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/makeAdmin"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white bg-indigo-600 px-4 py-2 rounded-lg flex items-center gap-2"
                                    : "px-4 py-2 block hover:bg- rounded flex items-center gap-2"
                            }
                        >
                            <FaUserShield />
                            Make Admin
                        </NavLink>
                    </li>
                </ul>

            </div>
        </div>
    );
};

export default DashBoardLayout;