import styled from 'styled-components';

const Body = styled.div`
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
  padding: 12px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 20px;
  background-color: rgba(19, 50, 255, 0.8);
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: rgba(24, 0, 183, 0.9);
  }
`;

export{Button,Input,Form,Container,Body};
