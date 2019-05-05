import React, { Component } from 'react';

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
  }

  cardRender() {
    const { title, base_url, price, oldPrice, id } = this.props.product || {};
    const { search } = this.props;
    if (Number(search) === Number(id)) {
      return (
        <div className="card 350px mt-2 ml-3">
          <img src={base_url} className="card-img-top border" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">Артикул: {id}</p>
            <p className="card-text">Цена: {price} руб.</p>
            <p className="card-text">Цена со скидкой: {oldPrice} руб.</p>
          </div>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-4">
          <img src={base_url} className="h-160px w-auto border" alt="..." />
        </div>
        <div className="col-8 border-top">
          <p className="card-title">{title}</p>
          <p className="card-text">Артикул: {id}</p>
          <p className="card-text">Цена: {price} руб.</p>
          <p className="card-text">Цена со скидкой: {oldPrice} руб.</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          {this.cardRender()}
        </div>
      </div>
    );
  }
}