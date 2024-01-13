import styled from 'styled-components';


const NavbarContainer = styled.div`
    height: 80px;
    border-bottom: 1px solid #ececec;
    display:flex;
    justify-content: space-between;
    padding: 0 80px;
    align-items: center;
    gap:30px;
    position:sticky;
    top:0;
    z-index:100;
    background-color: white;

    .logo {
        font-family: 'Long Cang', cursive;
        text-decoration:none;
        color:inherit;
    }

    .ant-input-search {
        width:30%;
    }

    .avatar-img  {
        width: 60px;
        height:60px;
        border-radius: 50%;
        cursor:pointer;
    }

    .right {
        display:flex;
        align-items: center;
        gap:10px;
    }

    .cart-wrap {
        position: relative;
        cursor:pointer;
    }
    .cart {
        width:40px;
        height:40px;
    }

    .cart-count {
        position:absolute;
        top:0;
        right:-5px;
        width:20px;
        height:20px;
        border-radius: 50%;
        background: #8c8cee;
        color:white;
        font-weight:bold;
        display:flex;
        justify-content: center;
        align-items:center;
    }
`

export { NavbarContainer };