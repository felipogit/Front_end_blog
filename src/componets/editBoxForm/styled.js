import styled from "styled-components";

export const StyledFormEdit = styled.form`
position: relative;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
max-width: 320px;
height: 500px;
background-color: #D2EEF9;
gap: 20px;
padding: 10px;
border-radius: 10px;

.close{
    position: absolute; /* Alterado para fixed */
    top: 10px;
    right: 10px;
    background-color: #121214;
    color: #D2EEF9;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

label{
    color: #121214;
}

input{
    border: 1px solid #000;
    width: 100%;
    height: 40px;
    background-color: #f0f0f0;
    border-radius: 5px;
    padding: 10px;
    
}

.input{
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;

}

input:focus {
    outline: none; /* Substitua pela cor desejada em hexadecimal, RGB, ou nome da cor */
}

button{
    background-color: #121214;
    color: #D2EEF9;
    width: 100%;
    height: 40px;
}


`