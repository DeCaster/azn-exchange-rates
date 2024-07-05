import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Body = styled.body`
  margin: 0;
  font-family: Arial, sans-serif;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

`;

const Container = styled.div`
  width: 90%;
  max-width: 400px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: rgb(68, 76, 119);
  box-sizing: border-box;
`;

const Form = styled.form`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 50px;
  margin: 8px 0;
  border-radius: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 12px 30px;
  margin-top: 20px;
  border: none;
  border-radius: 20px;
  background-color: #8add8b;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #03510c;
  }
`;

const OrSection = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const OrSectionSpan = styled.span`
  margin-top: 20px;
  margin-bottom: 20px;
  flex-grow: 1;
  height: 1px;
  background-color: #ddd;
  position: relative;

  &:before {
    content: "OR";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 0 10px;
    color: #444c77;
  }
`;

const ForgotPasswordLink = styled(Link)`
  display: block;
  margin-top: 10px;
  color: #444c77;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const SignupSection = styled.div`
  margin-top: 20px;
`;
const Logo = styled.div`
  font-size: 50px;
  color: #8add8b;;
`;

const SignupSectionSpan = styled.span`
  color: #444c77;
  font-size: 14px;
`;

const SignupLink = styled(Link)`
  color: #444c77;
  text-decoration: none;
  font-weight: bold;
  margin-left: 5px;

  &:hover {
    text-decoration: underline;
  }
`;
export{Logo,SignupLink,SignupSectionSpan,SignupSection,ForgotPasswordLink,OrSection,OrSectionSpan,Button,Input,Form,Container,Body};