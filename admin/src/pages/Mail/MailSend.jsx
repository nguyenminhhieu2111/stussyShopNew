import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteMail, getMail } from "../../redux/apiCall";
import 'react-toastify/dist/ReactToastify.css';

export default function MailSend(){
    const dispatch=useDispatch()
    const mail = useSelector((state) => state.mail.mails);
    useEffect(() => {
        getMail(dispatch);
      }, [dispatch]);
    const handleDelete = (id) => {
        deleteMail(id,dispatch)
        toast.success("deleted email")
       };
    const columns = [
        { field: "_id", headerName: "ID", width: 90 },
        
        { field: "email", headerName: "Email", width: 200 },
        {
          field: "topic",
          headerName: "Topic",
          width: 120,
        },
        {
          field: "content",
          headerName: "Content",
          width: 300,
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
