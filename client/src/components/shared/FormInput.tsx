import { Form, Input } from 'antd';

interface IFormInputProps {
    label: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    message?: string;
    isPass?: boolean;
}

const FormInput = ({label, name, placeholder, required = false, message, isPass = false}: IFormInputProps) => {
  return (
    <div className='form-item-wrapper'>
      <label>{label}</label>
      <Form.Item name={name} rules={[{required,message}]}>
       {isPass ? <Input.Password size='large' placeholder={placeholder}/>: <Input placeholder={placeholder} size='large'/> }
         
    </Form.Item>
    </div>
  )
}

export default FormInput;