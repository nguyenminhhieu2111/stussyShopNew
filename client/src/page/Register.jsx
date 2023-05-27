import styled from "styled-components";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import { toast, ToastContainer } from 'react-toastify';
import {useForm} from "react-hook-form";
import { useEffect, useState } from "react";
import Spiner from '@mui/material/CircularProgress'
import {registers} from '../../redux/apiCalls'


import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../src/fireBase";
import axios from "axios";
import { Link } from "react-router-dom";

const ErrorMess=styled.p`
 color: red;
`
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://cdn.wallpapersafari.com/92/6/HZJVUW.png")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 70%;
  margin: 10px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;

`;


const schema=yup.object({
  username:yup.string().required("Please enter your username"),
  fullName:yup.string().required("Please enter your fullname"),
  email:yup.string().email("Please enter valid email address").required("Please Enter your mail"),
  phoneNumber:yup.number().positive().integer("Malformed").required("Please your NumberPhone"),
  address:yup.string().required("Please your address"),
  password: yup.string()
  .min(8, "Your password must be at least 8 characters or greater")
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    {
      message:
        "Your password must have at least 1 uppercase, 1 lowercase, 1 number character",
    }
  ),
  confirmPassword:yup.string().oneOf([yup.ref("password"),null]) .required("Please Enter your password"),
  img:yup.mixed().required('File is required'),
  })
const Register = () => {  
  const [file, setFile] = useState(null);
  const {
    register,
    control,
    formState:{errors,isValid,isSubmitting},
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch
}=useForm({ 
    resolver: yupResolver(schema),
    mode:"onChange"
});
    console.log(register)
    const submitForm=(values)=>{
      console.log(values)
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
            const user = { ...values, img: downloadURL};   
            axios
           .post('http://localhost:5000/api/auth/register',user,
            
        )
        .then(response => {console.log(response.user)})
        .catch(error => {console.log(error.user)});     
          }); 
          toast.success("register succesfully")      
        }
        
      );
  
      if(!isValid) return;
        return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              reset({
                username: "",
                email: "",
                fullName:"",
                password: "",
                confirmPassword: "",
                address: "",
                img: false,
              });
            }, 5000);
          });
          
   
    }
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit(submitForm)}  >
          <Input name="username" id="username" placeholder="username" {...register('username')} control={control}/>
          {errors.username && (<ErrorMess>{errors.username.message}</ErrorMess>)}
          <Input name="fullName" id="fullname" placeholder="fullName" {...register('fullName')} control={control}/>
          {errors.fullName && (<ErrorMess>{errors.fullName.message}</ErrorMess>)}
          <Input name="email" placeholder="email"  {...register('email')} control={control}/>
          {errors.email && (<ErrorMess>{errors.email.message}</ErrorMess>)}
          <Input name="phoneNumber" placeholder="phoneNumber"  {...register('phoneNumber')} control={control}/>
          {errors.phoneNumber && (<ErrorMess>{errors.phoneNumber.message}</ErrorMess>)}
          <Input name="address" placeholder="Address"  {...register('address')} control={control}/>
           {errors.address && (<ErrorMess>{errors.address.message}</ErrorMess>)}
          <Input name="password" type="password" placeholder="Password"  {...register('password')} control={control}/>
          {errors.password && (<ErrorMess>{errors.password.message}</ErrorMess>)}
       
          <Input name="confirmPassword" type="password" placeholder="confirm password"  {...register('confirmPassword')} control={control} />
          <ErrorMess>{errors.confirmPassword && "Passwords Should Match!"}</ErrorMess>
          <Input name="img" placeholder="avatar" type="file"  {...register('img')}   onChange={e => setFile(e.target.files[0])}/>
           {errors.img && (<ErrorMess>{errors.img.message}</ErrorMess>)}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button
           type="submit"
           disabled={isSubmitting}
          > {isSubmitting ? (<Spiner color="inherit"/>):("Đăng Ký")} </Button>
          <Link to="/login">
          <Button style={{backgroundColor:"brown",marginLeft:"100px",width:"250px"}}>Bạn đã có tài khoản?</Button>
          </Link>
        </Form>
      </Wrapper>
      <ToastContainer/>
    </Container>
  );
};

export default Register;