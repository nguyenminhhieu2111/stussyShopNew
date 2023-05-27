import { Link, useHistory, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { Publish } from "@material-ui/icons";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../RequestMethod";
import { updateProduct } from "../../redux/apiCall";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../fireBase";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";

export default function Product() {
   
  const [inputs, setInputs] = useState({});
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  
  const handleClick=(e,id) =>{
    e.preventDefault()   
      const productX = { ...inputs, categories: cat };
      updateProduct(id,productX,dispatch);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
          toast.success('Update successfuly', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }, 3000);
      });
  }


//end
  
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [pStats, setPStats] = useState([]);
  
    const product = useSelector((state) =>
      state.product.products.find((product) => product._id === productId),
      );
      console.log(product)
    
    const MONTHS = useMemo(
        () => [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        []
      );

      useEffect(() => {
        const getStats = async () => {
          try {
            const res = await userRequest.get("orders/income?pid=" + productId);
            const list = res.data.sort((a,b)=>{
                return a._id - b._id
            })
            list.map((item) =>
              setPStats((prev) => [
                ...prev,
                { name: MONTHS[item._id - 1], Sales: item.total },
              ])
            );
          } catch (err) {
            console.log(err);
          }
        };
        getStats();
      }, [productId, MONTHS]);

   
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product?.img} alt="" className="productInfoImg" />
                  <span className="productName">{product?.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product?._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                  </div>
            
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{product?.inStock}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" name="title" placeholder={product?.title} onChange={handleChange}/>
                  <label>Product categories</label>
                  <input type="text" name="categories" placeholder={product?.categories} onChange={handleCat}/>
                  <label>Product Desc</label>
                  <input type="text" name="desk" placeholder="other..." onChange={handleChange} />
                  <label>Price</label>
                  <input type="text" name="price" placeholder={product?.price} onChange={handleChange}/>
                  <label>In Stock</label>
                  <select name="inStock" id="idStock" onChange={handleChange}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>
                
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={product?.img} alt="" className="productUploadImg" />
                     
                  </div>
                  <button className="productButton" onClick={(e)=>handleClick(e,product?._id)}>Update</button>
              </div>
          </form>
      </div>
      <ToastContainer/>
    </div>

  );
}
