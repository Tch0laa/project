import { Card } from "antd";
import styled from "styled-components";

const ProductStyled = styled(Card)`
        width:400px;
        position: relative;
        display:flex;
        flex-direction: column;
        align-items:center;
        height:370px;

        img {
        width:300px;
        height: 200px;
        z-index:1;
        margin:auto;
        }
`

export { ProductStyled }