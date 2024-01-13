import {Button, Form, message } from 'antd';
import { FormContainer } from './AuthStyles';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../../components/shared/FormInput';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { loginUser } from '../../store/authReducer';
import { LoginValues } from '../../types/auth';
import { EMAIL_REGEX } from '../../utils/constants';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loginLoading }= useAppSelector(state=>state.auth);
  const loginUserHandler= async(values: LoginValues)=>{
    if(!values.email.match(EMAIL_REGEX)) {
      message.error('Invalid E-mail');
      return;
    }
    await dispatch(loginUser({values, onSuccess:()=>{
        navigate('/');
    }}))
  }
  return (
    <FormContainer>
        <Form onFinish={async(values)=>{
          await loginUserHandler(values);
        }}>
    <FormInput label='E-mail'  name='email' message='required field' placeholder='email@example.com' required/>
    <FormInput isPass label='Password' name='password' message='required field' placeholder='*****' required/>
    <p className="link">Don&apos;t have an account? <Link to='/signup'>Sign Up</Link></p>
    <Form.Item>
        <Button loading={loginLoading} htmlType='submit' type="primary" size='large'>Sign In</Button>
    </Form.Item>
   </Form>
    </FormContainer>

  )
}

export default Login;