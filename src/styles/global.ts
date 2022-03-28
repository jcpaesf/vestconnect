import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    body {
        background: #0E0E0E;
        color: #FFF;
        -webkit-font-smoothing: antialiased;
    }

    body, input, button {
        font-family: 'Roboto slab', serif;
        font-size: 16px;
    }

    h1, h2, h3, h4, h5, h6, strong, p, span {
        font-family: 'Roboto slab', serif;
    }

    button {
        cursor: pointer;
    }
`