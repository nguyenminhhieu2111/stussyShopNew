import { useEffect } from "react";
import { deleteOrder, getOrder } from "../../redux/apiCall";
import {useDispatch,useSelector} from "react-redux"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { DeleteOutline } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
export default function OrderProduct(){
    const dispatch=useDispatch()
    const mail = useSelector((state) => state.order.orders);
    useEffect(() => {
        getOrder(dispatch);
      }, [dispatch]);
    const handleDelete = (id) => {
        deleteOrder(id,dispatch)
        toast.success("deleted order")
       };
    const columns = [
        { field: "_id", headerName: "ID", width: 90 },
        
        { field: "userId", headerName: "ID Customer", width: 200 },
        {
          field: "total",
          headerName: "Total Money",
          width: 120,
        },
        {
          field: "quantity",
          headerName: "item number",
          width: 170,
        },
        {
           field:"createdAt",
           headerName:"Date",
           width: 200,
        },
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <>     
            <Link to={"/order/" + params.row._id}>
              <button className="productListEdit">Show</button>
            </Link>         
                <DeleteOutline
                  className="userListDelete"
                  onClick={() => handleDelete(params.row._id)}
                />
              </>
            );
          },
        },
      ];
    
      return (
        <div className="userList">
          <DataGrid
            rows={mail}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            getRowId={(row) => row._id}
            checkboxSelection
          />
        </div>
      );
    }

