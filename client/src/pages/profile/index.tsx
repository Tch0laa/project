import React, { ChangeEvent, useState } from 'react'
import { ProfileStyled } from './ProfileStyles'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Button, Card, Input, message } from 'antd';
import Title from 'antd/es/typography/Title';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import {Accept, useDropzone} from 'react-dropzone';
import ButtonGroup from 'antd/es/button/button-group';
import { updateProfilePicture, updateUser } from '../../store/authReducer';
import { fileToBase64 } from '../../utils/fileToBase64';

const Profile = () => {
  const dispatch = useAppDispatch();
  const [file,setFile]=useState<any>(null);
  const {authedUser,updateUserLoading}=useAppSelector(state=>state.auth);
  const [img, setImg]=useState<any>(authedUser?.img || '/img/avatar.jpg')
  const [isUploaded, setIsUploaded]=useState(false);
  const [isEditMode, setIsEditMode]=useState(false);
  const [values, setValues]=useState({
    firstName: authedUser?.firstName as string,
    lastName: authedUser?.lastName as string,
    email: authedUser?.email as string
  })
  const {getInputProps, getRootProps} = useDropzone({
    accept: 'image/*' as unknown as Accept,
    onDrop: (acceptedFiles)=>{
          setIsUploaded(true);
         setImg(URL.createObjectURL(acceptedFiles[0]))
         setFile(acceptedFiles[0])
        
    },
    multiple: false
  });

  const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
    setValues(prev=>({...prev,[e.target.name]:e.target.value}))
  }
  return (
   <ProfileStyled>
     <Card extra={isEditMode? <ButtonGroup><Button onClick={()=>{
      dispatch(updateUser({values,onSuccess: (msg: string)=>{
          message.success(msg);
          setIsEditMode(false);
      }}))
     }} loading={updateUserLoading} type='primary'>Save</Button><Button onClick={()=>setIsEditMode(false)}>Cancel</Button></ButtonGroup>: <Button onClick={()=>setIsEditMode(true)}><EditOutlined/></Button>}>
      <Title>General Information</Title>
      <img className='profile-img' src={img} alt="" /><br/>
    {isUploaded ? <ButtonGroup>
         <Button onClick={async()=>{
          dispatch(updateProfilePicture({image: await fileToBase64(file), onSuccess: (msg: string)=>{
            message.success(msg)
            setIsUploaded(false);
          } }))
         }} type='primary' icon={<SaveOutlined/>}>Save</Button>
         <Button onClick={()=>{
          setImg(authedUser?.img || '/img/avatar.jpg');  
          setIsUploaded(false);

         }} icon={<DeleteOutlined/>}>Cancel</Button>
    </ButtonGroup>:  <Button {...getRootProps()} icon={<EditOutlined/>}>Update Profile Picture</Button> } 
      <input {...getInputProps()} type='file' className='input-file'/>
      <div className='info'>
      <div>
      <span>First Name: {isEditMode? <Input name='firstName' onChange={handleChange} value={values.firstName}/>: <strong>{authedUser?.firstName}</strong> }</span>
      </div>
     <div>
     <span>Last Name: {isEditMode ? <Input name='lastName' onChange={handleChange} value={values.lastName}/> :<strong>{authedUser?.lastName}</strong> }</span>
     </div>   
     <div>
     <span>Email: {isEditMode? <Input name='email' onChange={handleChange} value={values.email}/>: <strong>{authedUser?.email}</strong> }</span>
     </div>
        </div>  
     </Card>
   </ProfileStyled>
  )
}

export default Profile