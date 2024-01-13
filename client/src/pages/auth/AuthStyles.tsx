import styled from 'styled-components';

const FormContainer= styled.div`
    display:flex;
    justify-content: center;
    flex-direction:column;
    align-items: center;
    height:calc(100vh - 80px);

    .ant-form {
        padding:25px;
        border: 1px solid #ececec;
        border-radius:5px;
    }

    .form-item-wrapper {
        color:#898989;
    }
    .ant-input, .ant-input-password {
        width:400px;
        color:black;
    }

    .ant-btn-primary {
        width:100%;
    }

    .link {
        margin-bottom: 10px;
    }
`

export { FormContainer };