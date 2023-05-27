import { Close, MailOutline, Send } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  height: 70vh;
  background-color: #ff6fb5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;
const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
`;

const Layout = styled.div`
  width: 50%;
  height: 300px;
  background-color: whitesmoke;
  position: relative;
  border-radius: 10px;
`;
const Input = styled.input`
  width: 100%;
  height: 30px;
  margin-top: 10px;
`;
const Button = styled.button``;
const Outliner = styled.form`
  width: 50%;
  margin: 10px auto;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 10px;
`;

const Letter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const [showButton, setShowButton] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/api/mail/send", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        reset({
          email: "",
          topic: "",
          content: "",
        });
        toast.success("Email sent successfully");
      }, 3000);
    });
  };

  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from your favourite products</Description>
      {showButton && (
        <MailOutline
          sx={{ fontSize: 50, cursor: "pointer", marginLeft: "2px" }}
          onClick={() => setShowMessage(true)}
        />
      )}
      <CSSTransition
        in={showMessage}
        timeout={300}
        classNames="alert"
        unmountOnExit
        onEnter={() => setShowButton(false)}
        onExited={() => setShowButton(true)}
      >
        <Layout className="alert">
          <Close
            sx={{
              fontSize: 40,
              cursor: "pointer",
              position: "absolute",
              right: "0",
            }}
            onClick={() => setShowMessage(false)}
          />

          <Outliner onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="email"
              placeholder="Please your email"
              {...register("email", { required: "Required" })}
            />
            <Input
              placeholder="Please your Topic"
              {...register("topic", { required: "Required" })}
            />
            <TextArea
              placeholder="Please your content"
              {...register("content", { required: "Required" })}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Send
                  sx={{
                    fontSize: 40,
                    cursor: "pointer",
                    color: "blue",
                    transition: "3s ease-in-out",
                    marginLeft: "340px",
                  }}
                />
              ) : (
                <Send sx={{ fontSize: 40, cursor: "pointer", color: "blue" }} />
              )}
            </Button>
          </Outliner>
        </Layout>
      </CSSTransition>
      <ToastContainer />
    </Container>
  );
};

export default Letter;
