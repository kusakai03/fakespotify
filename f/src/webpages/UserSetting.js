import React, { useState } from "react";
import {Row, Col} from "react-bootstrap";
import Navpinkpink from "../child/Navbar";
import ProfileSetting from "../child/UserProfileSetting";
import ChangePassword from "../child/UserChangePassword";

export default function UserSetting(){
      const [tab, setTab] = useState('profileSetting');
      return (
        <>
        <Navpinkpink/>
        <Row>
            <Col className="col-xl-2 col-12">
              <div className="sidebar pt-4 card">
                <h4 className="ms-3">Cài đặt</h4>
              <div className="lin ms-3 mb-3" onClick={e=>setTab('profileSetting')}>
                Thiết lập trang cá nhân</div>
                <div className="lin ms-3 mb-3" onClick={e=>setTab('changePassword')}>
                Đổi mật khẩu</div>
          </div>
            </Col>
            <Col className="col-xl-10">
                {
                  tab === 'profileSetting' && <ProfileSetting/>
                }
                {
                  tab === 'changePassword' && <ChangePassword/>
                }
            </Col>
        </Row>

        </>
      );
    };