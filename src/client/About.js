import React, { Component } from 'react';

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  	return (
  		<div className="container about">
  			<div className="row">
  				<div className="col-12 col-md-3">
  						<h2>Магазин одежды "Веселый ценник"</h2>
  				</div>
          <div className="col-12 col-md-3">
  					<p>
  						Наш магазин расположен на территории Апраксиного двора,
  						рядом с лавкой сухофруктов и брендового Бутика "Abibas"
  						ждем Вас с утра до вечера семь дней в неделю.
  					</p>
  					<p>Наши контакты:</p>
  					<p><i className="fas fa-phone-square"></i> +7-999-999-99-99</p>
            <a href="#"><i className="fab fa-vk"></i></a> 
            <a href="#"><i className="fab fa-twitter-square"></i></a> 
            <a href="#"><i className="fab fa-instagram"></i></a>
  				</div>
  				<div className="col-12 col-md-6"> 
  					<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad5d59691bc58b7e0ee538ccc520252c3f473babd36f53ab90b3c72ab9cef578f&amp;source=constructor"
  						width="360"
  						height="625"
  						frameBorder="0">
  					</iframe>
  				</div>
  			</div>	
  		</div>	
  	);
  }
}