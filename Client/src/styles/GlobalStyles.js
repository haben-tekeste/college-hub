import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    :root{
    --primary: #7941f5;
    --secondary: #e0ddfc;
    --darkgrey: #d9d9d9;
    --lightgrey: #f6f6f6;
    --red: 	tomato

}
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    body{
        background-color: var(--lightgrey);
        font-family: 'Lato', sans-serif;
    }
    h1{
        font-size: 2rem;
    }
    h4, h5{
        font-size: 1rem;
        font-weight: normal;
    }
    h6{
        color: var(--primary);
    }
    span{
        color: var(--primary);
    }
    p{
        color: grey;
    }
    button, input, textarea{
        cursor: pointer;
        font-family: inherit;
        background-color: var(--lightgrey);
        padding: 0.75rem 1rem;
        border-radius: 10px;
        border: none;
        font-size: 1rem;
    }
    img{
        display: block;
        max-width: 100%;
    }
    .flex, .flex-col{
        display: flex;
        gap: 1rem;
        align-items: center;
    }
    .flex-col{
        flex-direction: column;
        align-items: flex-start;
    }
    .centered{
        height: 100vh;
        width: 100%;
        display: grid;
        place-content: center;
    }
    .container{
          background-color: white;
            color: black;
            border-radius: 1rem;
            padding: 2rem;
            height: 55vh;
        overflow-y: scroll;
        ::-webkit-scrollbar {
            width: 7px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
            border-radius: 5px;
            background-color: var(--secondary);
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: var(--primary);
            border-radius: 10px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            background: var(--secondary);
        }
    }
    .App{
        align-items: flex-start;
    }
    .tag-btn{
        background-color: var(--darkgrey);
        border-radius: 10px;
        padding: 0.5rem 0.75rem;
    }
    .purple-btn, .light-btn, .red-btn{
        border-radius: 10px;
        padding: 0.75rem 1rem;
        color: white;
        background-color: var(--primary);
        border: 2px solid transparent;
        cursor: pointer;
        transition: background 0.3s ease;
    }
    .purple-btn:hover{
        background-color: var(--secondary);
        border: 2px solid var(--primary);
        color: var(--primary);
    }
    .red-btn{
        background-color: var(--lightgrey);
        background-color: var(--lightgrey);
        border: 2px solid var(--red);
        color: var(--red);
        &:hover{
            background-color: var(--red);
            color: white;
        }
    }
    .light-btn{
        background-color: var(--secondary);
        border: 2px solid var(--primary);
        color: var(--primary);
        &:hover{
            background-color: var(--lightgrey);
        }
    }
`;
