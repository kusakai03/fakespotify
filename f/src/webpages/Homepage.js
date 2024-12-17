import React, { useState } from "react";
import Navbar from "../child/Navbar";
import Sidebar from "../child/Sidebar";
import '../style/musicplayerstyle.css';
import { Card, Col, Row } from "react-bootstrap";
import HpageMain from "../child/HomepageMain";

export default function Homepage(){

    return(
        <><Navbar />
        <Row>
            <Col className="col-xl-2 col-12">
            <Sidebar />
            </Col>
            <Col className="col-xl-10">
                <div className="bg-light bg-opacity-50 rounded mt-3 me-3">
                    <HpageMain/>
                </div>
            </Col>
        </Row>
        </>
    );
}