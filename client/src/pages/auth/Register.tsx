import {Button, Form, message } from 'antd';
import { FormContainer } from './AuthStyles';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../../components/shared/FormInput';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { registerUser } from '../../store/authReducer';
import { RegisterValues } from '../../types/auth';
import { EMAIL_REGEX } from '../../utils/constants';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {registerLoading} = useAppSelector(state=>state.auth);
  const registerUserHandler=async(values: RegisterValues)=>{
    if(!values.email.match(EMAIL_REGEX)) {
      message.error('Provide Valid E-mail!');
      return;
    }
    if(values.password !==values.confirmPassword) {
      message.error('Passwords must match');
      return;
    }
      dispatch(registerUser({values, onSuccess: (msg: string)=>{
        message.success(msg);
        setTimeout(()=>{
          navigate('/signin')
        },2000);       
      }}));
  };
  return (
    <FormContainer>
        <Form initialValues={{email:'', password: '', confirmPassword:''}} name="register" onFinish={(values)=>registerUserHandler(values)}>
        <FormInput  label='First Name' name='firstName' message='Required Field'  required />
        <FormInput  label='Last Name' name='lastName' message='Required Field' required  />
        <FormInput  label='E-mail' name='email' message='Required Field' placeholder='email@example.com' required />
        <FormInput isPass  label='Password' name='password' message='Required field' placeholder='New Password' required/>
        <FormInput isPass label='Confirm Password' name='confirmPassword' message='Required field' placeholder='***********' required/>
    <p className="link">Already a member? <Link to='/signin'>Sign In</Link></p>
    <Form.Item>
        <Button loading={registerLoading} htmlType='submit' type="primary" size='large'>Sign Up</Button>
    </Form.Item>
   </Form>
    </FormContainer>

  )
}

export default Register;