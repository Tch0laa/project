import styled from 'styled-components';




const OverlayContainer = styled.div`
    position: absolute;
    top:80px;
    right: 100px;
    width: 300px;
    max-height: 400px;
    background:white;
    border: 1px solid #ececec;
    padding:15px;
    overflow-y:auto;

    .total {
        text-align: right;
    }
`

export { OverlayContainer }