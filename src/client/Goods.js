import React, { Component } from 'react';
import ProductCard from './ProductCard';
import ReactPaginate from 'react-paginate';

const compareFunc = {
  title: (a, b) => a['title'].localeCompare(b['title']),
	priceLowToHigh: (a, b) => a['price'] - b['price'],
	priceHighToLow: (a, b) => b['price'] - a['price'],
  discount: (a, b) => a['oldPrice'] - b['oldPrice'],
};

const filtersFunc = {
	'От': (data, minPrice) => data.filter(({ price }) => price >= minPrice),
	'До': (data, maxPrice) => data.filter(({ price }) => price <= maxPrice),
	'Название': (data, search) => data.filter(({ title, id }) => 
		Number(search) === Number(search) ? id === search : title.toLowerCase().includes(search)),
};

const sort = [['Title', 'title'], ['Price: Low to High', 'priceLowToHigh'], ['Price: High to Low', 'priceHighToLow'], ['Discount', 'discount']];

export default class Goods extends Component {
	constructor(props) {
    super(props);
    this.state = {
			originData: [],
			editedData: [],
			offset: 0,
			perPage: 5,
			selectedPage: 0,
		};
	}

	loadData() {
		fetch('/api/getListOfGoods')
      .then(res => res.json())
      .then(goods => this.setState({ originData: goods }))
	}

  componentDidMount() {
   	this.loadData();
  }

  componentDidUpdate(prevProps) {
  	const { originData, editedData } = this.state;
   	const { checkboxes, filters, sortBy, submit } = this.props;
		const inputFilters = Object.keys(filters).filter(key => filters[key] !== '');
		const getDataWithInputs = (data, inputs) =>  inputs.reduce((acc, name) => {
  		const newAcc = filtersFunc[name](acc, filters[name]);
  		return newAcc;
  	}, data);
  	const inputCheckboxes = Object.keys(checkboxes).filter(key => checkboxes[key]);
  	const getDataWithCheckboxes = data =>
    	data.filter(({ title }) => inputCheckboxes.some(key =>
    		title.toLowerCase().includes(key)));
    const amountOfFilters = inputFilters.length;
    const amountOfCheckboxes = inputCheckboxes.length;

  	if (this.props.submit !== prevProps.submit) {
  		this.setState({
  			offset: 0,
  			selectedPage: 0,
  		});
  		if (!submit) {
  			this.setState({
  				originData: sortBy.length > 0 ? originData.sort(compareFunc[sortBy]) : originData,
  				editedData: [],
  			});
  		}
  		if (amountOfCheckboxes === 0 && amountOfFilters !== 0) {
  			const data = editedData.length === 0
  				? getDataWithInputs(originData, inputFilters) : getDataWithInputs(editedData, inputFilters);
  			this.setState({	editedData: data });
  		}
  		if (amountOfCheckboxes !== 0 && amountOfFilters === 0) {
    		const data = editedData.length === 0
    			? getDataWithCheckboxes(originData) : getDataWithCheckboxes(editedData);
    		this.setState({	editedData: data });
  		}
  		if (amountOfCheckboxes !== 0 && amountOfFilters !== 0) {
  			const data = editedData.length === 0
					? getDataWithInputs(getDataWithCheckboxes(originData), inputFilters) : getDataWithInputs(getDataWithCheckboxes(editedData), inputFilters);
				this.setState({	editedData: data });
  		}
  	}
  	if (this.props.sortBy !== prevProps.sortBy) {
  		this.setState({
  			originData: editedData.length === 0 ? originData.sort(compareFunc[sortBy]) : originData,
  			editedData: editedData.length === 0 ? [] : editedData.sort(compareFunc[sortBy]),
  		});
  	}
  }

  handlePageClick = (data) => {
  	const { perPage } = this.state;
  	const { selected } = data;
  	const offset = Math.ceil(selected * perPage);
  	this.setState({
  		offset: offset,
  		selectedPage: selected,
  	});
  }

  nothingRender() {
  	return (
      <div className="col-12 align-items-center">
    	  <div className="alert alert-secondary" role="alert">
  			  <h2>По вашему запросу ничего не найдено</h2>
			  </div>
      </div>
    );
  }

  productsRender() {
  	const { originData, editedData, offset, perPage } = this.state;
  	const { filters } = this.props;
  	const end = offset + perPage;
   	if (editedData.length === 0) {
   		const data = originData.slice(offset, end).map(product => <ProductCard key={product.id} product={product} />);
    	return (
        <div className="col-12">
    		  {data}
    		  {this.paginationRender()}
        </div>
    	);
    }
    const data = editedData.slice(offset, end).map(product => <ProductCard key={product.id} search={filters['Название']} product={product} />);
    return (
      <div className="col-12">
        {data}
    	  {editedData.length === 1 ? null : this.paginationRender()}
      </div>
    );
  }

  paginationRender() {
  	const { originData, editedData, perPage, selectedPage } = this.state;
  	const pageCount = editedData.length > 0
  		? Math.ceil(editedData.length / perPage) : Math.ceil(originData.length / perPage);
  	return (
  		<ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={0}
        onPageChange={this.handlePageClick}
        forcePage={selectedPage}
        activeClassName={'bg-secondary'}
        activeLinkClassName={'bg-secondary text-light'}
        containerClassName={'Page navigation pagination text-monospace'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousLabel={'назад'}
        nextLabel={'вперед'}
        previousClassName={'page-item'}
        nextClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'} />
    );
  }

  render() {
  	const { submit } = this.props;
  	const { editedData } = this.state;
  	return (
      <div className="row">
      	{submit && editedData.length === 0 ?
      		this.nothingRender() : this.productsRender()
        }
      </div>
  	);
  }
}