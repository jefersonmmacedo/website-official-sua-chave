import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {IoPersonCircleOutline, IoPersonOutline, IoHeartOutline, IoNotificationsOutline, IoLogOutOutline, IoChatboxEllipsesOutline, IoHomeOutline, IoSpeedometerOutline, IoCalendarOutline } from 'react-icons/io5';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  li {
    padding: 18px 10px;
    font-weight: 500;
    font-size: 14px;
  }
  li a{
    text-decoration: none;
    color: var(--Description)
    font-weight: 500;
  }
  li a:hover{
    color: var(--Primary);
  }
  button {
    display: none;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    background-color: var(--Primary);
    border-radius: 6px;
    margin: 5px 0;
    color: var(--White);
    border: none;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;

  }

  button:hover{
    background-color: var(--ButtonHover);
    color: var(--White);
  }
  .btn {
    display: none;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    background-color: rgba(237, 50, 55, 0.95);
    border-radius: 6px;
    margin: 5px 0;
    color: var(--White);
    border: none;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;

  }

  btn:hover{
    background-color: var(--Blue);
  }


  @media (max-width: 930px) {
    flex-flow: column nowrap;
    background: rgba(237, 50, 55, 0.95);
    backdrop-filter: blur(4px);
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    li {
      padding: 5px;
      margin: 10px;
    }
    li a {
      color: var(--White);
    }
    li a:hover {
      color: var(--Magenta);
    }

    button{
      display: block;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background-color: var(--White);
      color: var(--Primary);
      margin-left: 10px;
      margin-right: 10px;
      padding: 10px 0;
    }
    button svg {
      margin-right: 1px;
    }

    button:hover{
      background-color: var(--ButtonHover);
    }
    .btn{
      display: block;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background-color:  rgba(237, 50, 55, 0.1);
      margin-left: 10px;
      margin-right: 10px;
      padding: 10px 0;
    }
    .btn svg {
      margin-right: 1px;
    }

    .btn:hover{
      background-color: var(--Blue);
    }
  }

  }
`;




const RightNav = ({ open }) => {
  const { logout } = useContext(AuthContext);
  const Local = localStorage.getItem("suachave");
  const user = JSON.parse(Local);



  function handleLogOut() {
    logout()
  }


  function HandleOpenLink(data) {
    window.open(`${data}`, "_self")
  }
  
  return (
    <Ul open={open}>
       <li className='nav-item'>
            <a href={`/imoveis`}>
            Imóveis
            </a>
          </li>
          {/* <li className='nav-item'>
            <a href={
              user === null ? "/imoveis/Venda" 
              :
              `/imoveis/Venda?city=${user?.city}&uf=${user?.uf}`
              }>
            Comprar
            </a>
          </li> */}
       {/* <li className='nav-item'>
            <a href={
              user === null ? "/imoveis/Aluguel" 
              :
              `/imoveis/Aluguel?city=${user?.city}&uf=${user?.uf}`
              }>
            Alugar
            </a>
          </li> */}
          <li className='nav-item'>
            <a href='/imobiliarias' >
            Imobiliárias e corretores
            </a>
          </li>
          <li className='nav-item'>
            <a href='/anunciar' >
            Para seu negócio
            </a>
          </li>
          <li className='nav-item'>
            <a href='/financiamento' >
            Financiamento
            </a>
          </li>
          <li className='nav-item'>
            <a href='/planos' >
            Planos
            </a>
          </li>
          {/* <li className='nav-item'>
            <a href='#' >
            Blog
            </a>
          </li> */}
          {user === "" || user === null || user === undefined ? 
            <>
            <button onClick={() => HandleOpenLink("/sobre")}>
            Anunciar
            </button>
            <button className='btn' onClick={() => HandleOpenLink("/entrar")}>
            Entrar
            </button>
            </>
          :
          <>
          {user.type === "Imobiliária" && user !== null && user !== undefined && user !== "" ?
          <>
                    <button className='btn' onClick={() => HandleOpenLink("/painel/novoimovel")}>
            <IoHomeOutline /> &nbsp; Imóveis
          </button>
          <button className='btn' onClick={() => HandleOpenLink("/painel/chat")}>
            <IoChatboxEllipsesOutline /> &nbsp; Mensagens
          </button>
          <button className='btn' onClick={() => HandleOpenLink("/painel/notificacoes")}>
            <IoNotificationsOutline /> &nbsp; Notificações
          </button>
          <button className='btn' onClick={() => HandleOpenLink("/painel")}>
            <IoSpeedometerOutline /> &nbsp; Painel
          </button> 
          <button onClick={handleLogOut}>
            <IoLogOutOutline /> &nbsp; Sair
          </button>
          </>
          :
          <>
                    <button className='btn' onClick={() => HandleOpenLink("/mensagens")}>
            <IoChatboxEllipsesOutline /> &nbsp; Chat
          </button>
                    <button className='btn' onClick={() => HandleOpenLink("/agendamentos")}>
            <IoCalendarOutline /> &nbsp; Agenda
          </button>
          <button className='btn' onClick={() => HandleOpenLink("/notificacoes")}>
            <IoNotificationsOutline /> &nbsp; Notificações
          </button>
          <button className='btn' onClick={() => HandleOpenLink("/favoritos")}>
            <IoHeartOutline /> &nbsp; Favoritos
          </button>
          <button className='btn' onClick={() => HandleOpenLink("/minhaconta")}>
            <IoPersonOutline /> &nbsp; Minha conta
          </button> 
          <button onClick={handleLogOut}>
            <IoLogOutOutline /> &nbsp; Sair
          </button>
          </>
          }
          </>}

         
    </Ul>
  )
}

export default RightNav
