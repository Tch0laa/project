import styled from "styled-components";



const DetailsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin: 80px 120px;
    gap:100px;
    align-items: center;

    img {
        width:500px;
    }

    .product-info {
        display:flex;
        flex-direction: column;
        gap:15px;
        align-items: center;

        .desc {
            line-height: 40px;
        }
    }
`

export { DetailsContainer }