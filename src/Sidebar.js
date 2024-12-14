import { faCalendar, faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import { faBaseball, faCalendarDay, faFaceLaughWink, faFootball, faInstitution, faSprout, faTachographDigital, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/* <!-- Sidebar - Brand --> */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <FontAwesomeIcon icon={faFaceLaughWink} size={"2x"} />
                </div>
                <div className="sidebar-brand-text mx-3">Panel Administrador</div>
            </a>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/* <!-- Nav Item - Dashboard --> */}
            <li className="nav-item active">
                <Link className="nav-link" to="/portal/dashboard">
                    <FontAwesomeIcon icon={faTachographDigital} style={{ marginRight: "0.5rem" }} />
                    <span>Dashboard</span>
                </Link>
            </li>
            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/* <!-- Nav Item - Users --> */}
            <li className="nav-item active">
                <Link className="nav-link" to="/portal/user-list">
                    <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
                    <span>Clientas</span>
                </Link>
            </li>
            {/* <!-- Nav Item - Discipline --> */}
            <li className="nav-item active">
                <Link className="nav-link" to="/portal/discipline-list">
                    <FontAwesomeIcon icon={faFootball} style={{ marginRight: "0.5rem" }} />
                    <span>Disciplina</span>
                </Link>
            </li>
            {/* <!-- Nav Item - Clase --> */}
            <li className="nav-item active">
                <Link className="nav-link" to="/portal/clases-list">
                    <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: "0.5rem" }} />
                    <span>Clases</span>
                </Link>
            </li>
            {/* <!-- Nav Item - Clase --> */}
            <li className="nav-item active">
                <Link className="nav-link" to="/portal/instructores-list">
                    <FontAwesomeIcon icon={faInstitution} style={{ marginRight: "0.5rem" }} />
                    <span>Instructores</span>
                </Link>
            </li>

            {/* <!-- Nav Item - Clase --> */}
            <li className="nav-item active">
                <Link className="nav-link" to="/portal/horario-clase-list">
                    <FontAwesomeIcon icon={faCalendarDay} style={{ marginRight: "0.5rem" }} />
                    <span>Horario de las Clases</span>
                </Link>
            </li>

            {/* <!-- Nav Item - Cantidad de Disciplinas --> */}
            <li className="nav-item active">
                <Link className="nav-link" to="/portal/cant-discipline-list">
                    <FontAwesomeIcon icon={faCalendar} style={{ marginRight: "0.5rem" }} />
                    <span>Cantidad Clases por Disciplina</span>
                </Link>
            </li>
            {/* <!-- Nav Item - Clienta por Disciplina --> */}
            <li className="nav-item active">
                <Link className="nav-link" to="/portal/clienta-disciplina-list">
                    <FontAwesomeIcon icon={faBaseball} style={{ marginRight: "0.5rem" }} />
                    <span>Clienta por Disciplina</span>
                </Link>
            </li>

        </ul>
    )
}

export default Sidebar