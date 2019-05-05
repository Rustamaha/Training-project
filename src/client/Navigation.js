import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

export default class Navigation extends Component {
	render() {
		const badge = ['fashion', 'without', 'borders'];
		return (
			<div className="header">
        <div className="topbar">
          <div className="container-fluid">
            <div className="row">
              <div className="welcome col-6">
                <p>Добро пожаловать в наш каталог одежды</p>
              </div>
              <div className="sosmed-icon col-6">
                <p>
                  <i className="fas fa-phone-square"></i> +7-999-999-99-99 
                  <a href="#"><i className="fab fa-vk"></i></a> 
                  <a href="#"><i className="fab fa-twitter-square"></i></a> 
                  <a href="#"><i className="fab fa-instagram"></i></a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-main">
          <nav className="navbar navbar-expand navbar-light bg-dark">
            <NavLink className="navbar-brand d-none d-sm-block" to="/">catalog.ru</NavLink>
            <span className="badge badge-light">
              {badge.map(i => (
                <div key={_.uniqueId()} className="table-cell">{i}</div>
              ))}
            </span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" />
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/">Главная</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/catalog">Каталог</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">О нас</NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div> 
      </div>
    );
  }
}