import "./newUser.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../fireBase";
import { useDispatch } from "react-redux";
import { addUsers } from "../../redux/apiCall";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useHistory} from 'react-router-dom'

export default function NewUser() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch=useDispatch()
  const history=useHistory()
  const handleChange=(e)=>{
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    })
  }
 
 
  const handleClick=async(e) =>{
    e.preventDefault()
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        toast.error("Warning 404")
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const user = { ...inputs, img: downloadURL};
          console.log(inputs)
          addUsers(user, dispatch);
        });
        history.push("/users")        
      }
      
    );
    
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input name="username" type="text" placeholder="john" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input name="fullName" type="text" placeholder="John Smith" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input name="email" type="email" placeholder="john@gmail.com" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input name="password" type="password" placeholder="password" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input name="phoneNumber" type="text" placeholder="+1 123 456 78" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input name="address" type="text" placeholder="New York | USA" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" onChange={handleChange}/>
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" onChange={handleChange}/>
            <label htmlFor="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" onChange={handleChange}/>
            <label htmlFor="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Admin</label>
          <select className="newUserSelect" name="isAdmin" id="active" onChange={handleChange}>
            <option value="yes">true</option>
            <option value="no">false</option>
          </select>
        </div>
        <div className="newUserItem">
          <label>Image</label>
          <input name="img" type="file" id="file" onChange={e => setFile(e.target.files[0])} />
        </div>
        <button onClick={handleClick} className="newUserButton">Create</button>
      </form>
      <ToastContainer/>
    </div>
  );
}
