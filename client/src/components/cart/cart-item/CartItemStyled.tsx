import styled from 'styled-components';


const CartItemStyled = styled.div`
    margin-top:5px;
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap:20px;

    img {
        width: 150px;
        height: 150px;
    }

    .actions {
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        justify-self: end;
        .action {
            border: 1px solid #ececec;
            padding: 10px;
            display:flex;
            justify-content: center;
            align-items:center;
            cursor:pointer;
        }

        .quantity {
            align-self: center;
        }
    }
`

export { CartItemStyled }
