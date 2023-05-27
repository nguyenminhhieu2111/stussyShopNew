import React from 'react';
import { useLocation } from 'react-router-dom';

const Succes = () => {
    const location=useLocation()
    return (
        <div style={{backgroundColor:"teal",height:"100vh",width:"100wh"}}>
            <h2 style={{textAlign:"center",paddingTop:"300px"}}>Thanh toán thành công !!</h2>
        </div>
    );
};

export default Succes;