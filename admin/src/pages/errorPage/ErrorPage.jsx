import React from 'react';
import './errorPage.css'
import logo from '../../components/kisspng-stssy-logo-clothing-brand-t-shirt-5b17432b1ee1c8.6129583415282511791265.png'
import { VpnKey } from '@material-ui/icons';
import { Link } from 'react-router-dom';


const ErrorPage = () => {
    return (
        <div className='full'>
            
        <div className='container'>
            <img className='logoss' src={logo} alt="" />
        </div>
        <div className="content">
            <span>404 WARNING !!</span>
            <p>Bạn không có quyền hạn truy cập vào máy chủ</p>
            
            <Link to="/login">
                <h5>Vui lòng đăng nhập...</h5>
            </Link>
            <VpnKey/>
           
        </div>
        </div>
    );
};

export default ErrorPage;