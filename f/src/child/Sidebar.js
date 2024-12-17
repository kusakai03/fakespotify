import React from "react";
import { Button, Figure, FigureCaption, Image, Nav, NavItem, NavLink } from "react-bootstrap";
import { Link } from 'react-router-dom';
import useFetchAccount from "../static/fetchAccount";

export default function Sidebar(){
    const {acc, err} = useFetchAccount();
    return(
        <div className="sidebar pt-5 card">
            <div className="lin ms-3 mb-3">Trang chủ</div>
            {
                acc&&(
                    <>
                    <Link className="lin ms-3 mb-3" to={'/upload'}>Tải lên</Link>
                    <Link className="lin ms-3 mb-3" to={''}>Thư viện</Link>
                    </>
                )
            }       
            <Figure className="m-2">
                <FigureCaption className="blockquote-footer d-none d-sm-inline">
                    ©2024 Kusagame | All Rights Reserved.
                </FigureCaption>
            </Figure>
            
        </div>
    );
}