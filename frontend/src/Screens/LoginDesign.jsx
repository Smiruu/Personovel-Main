import styled from 'styled-components';

export const Container = styled.div`
    background-color: #FCD5CE;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 75%;
    min-height: 400px;
    margin-left: 175px;
`;

export const SignUpContainer = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
    ${props => props.signIn !== true ? `
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
    ` : null}
`;

export const SignInContainer = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
    left: 0;
    width: 50%;
    z-index: 2;
    ${props => (props.signIn !== true ? `transform: translateX(100%);` : null)}
`;

export const OverlayContainer = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
    ${props => props.signIn !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div`
    background: #FFB5A7;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    ${props => (props.signIn !== true ? `transform: translateX(50%);` : null)}
`;

export const OverlayPanel = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
    transform: translateX(-20%);
    ${props => props.signIn !== true ? `transform: translateX(0);` : null}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
    right: 0;
    transform: translateX(0);
    ${props => props.signIn !== true ? `transform: translateX(20%);` : null}
`;

export const Form = styled.form`
    background-color: #FCD5CE;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 100px;
    height: 100%;
    text-align: center;
`;

export const Title = styled.h1`
    font-weight: bold;
    margin: 0;
    margin-bottom: 10px;
`;

export const Input = styled.input`
    background-color: white;
    border: none;
    border-radius: 10px;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
`;

export const Button1 = styled.button`
    border-radius: 20px;
    border: none;
    background-color: maroon;
    color: white;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    &:active{
        transform: scale(0.95);
    }
    &:focus {
        outline: none;
    }
    margin-top: 20px;
`;

export const Button2 = styled.button`
    border-radius: 20px;
    border: none;
    background-color: maroon;
    color: white;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    &:active{
        transform: scale(0.95);
    }
    &:focus {
        outline: none;
    }
  `;

export const GhostButton = styled.button`
border-radius: 20px;
border: none;
background-color: maroon;
color: white;
font-size: 12px;
font-weight: bold;
padding: 12px 45px;
letter-spacing: 1px;
text-transform: uppercase;
`;

export const Anchor = styled.a`
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
`;

export const Paragraph = styled.p`
    font-size: 14px;
    font-weight: 100;
    color: black;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 0px 0 20px;
`;
