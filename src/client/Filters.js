import React, { Component } from 'react';
import Goods from './Goods';

const sort = [['названию', 'title'], ['цене: по возрастанию', 'priceLowToHigh'], ['цене: по убыванию', 'priceHighToLow'], ['цене со скидкой по возрастанию', 'discount']];

export default class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
			checkboxes: {
				'пуловер': false,
				'платье': false,
				'куртка': false,
				'болеро': false,
				'пальто': false,
				'джинсы': false,
				'термобрюки': false,
				'блузка': false,
				'сорочка': false,
				'футболка': false,
				'фигурки': false,
				'брюки': false,
			},
			checkboxesDisabled: false,
			filters: {
				'От': '',
				'До': '',
				'Название': '',
			},
			searchDisabled: false,
			sortBy: '',
			submit: false,
		};
  }

  handleSortBy = (e) => {
  	e.preventDefault();
  	const { value } = e.target;
  	this.setState({ sortBy: value });
  }

  handleChangeCheckboxes = ({ target }) => {
    const { checkboxes } = this.state;
    const { name } = target;
    const keys = Object.keys(checkboxes).filter(key => key !== name).filter(key => checkboxes[key]);
    const keysChecked = !checkboxes[name] ? [name, ...keys] : keys;
    if (keysChecked.length > 0) {
    	this.setState({
      	searchDisabled: true,
      	checkboxes: { ...checkboxes, [name]: !checkboxes[name] },
      });
    } else {
      this.setState({
      	searchDisabled: false,
      	checkboxes: { ...checkboxes, [name]: !checkboxes[name] },
      });
    }
  }

  handleChangeFilter = ({ target }) => {
  	const { filters } = this.state;
  	const { name } = target;
  	if (target.name === 'Название') {
  		this.setState({
  			checkboxesDisabled: target.value.trim() === '' ? false : true,
  			filters: { ...filters, [name]: target.value.trim() },
  		});
  	} else {
  		this.setState({
  			filters: { ...filters, [name]: target.value.trim() },
  		});
  	}
  }

  handleSubmit = (e) => {
  	const { submit, filters, checkboxes } = this.state;
  	e.preventDefault();
  	const inputFilters = Object.keys(filters).filter(key => filters[key] !== '');
  	const keys = Object.keys(checkboxes).filter(key => checkboxes[key]);
  	if (keys.length === 0 && inputFilters.length === 0) {
  		return;
  	}
  	if (submit) {
  		this.setState({
  			checkboxes: _.mapValues(checkboxes, value => false),
  			searchDisabled: false,
  			checkboxesDisabled: false,
  			filters: _.mapValues(filters, value => ''),
  		});
  	}
  	this.setState({ submit: !submit });
  }

	filtersFormRender() {
  	const { searchDisabled, checkboxesDisabled, checkboxes, filters } = this.state;
  	return (
  		<form onSubmit={this.handleSubmit}>
      	{Object.keys(checkboxes).sort((a, b) => a.localeCompare(b)).map(item => (
      		<div key={_.uniqueId()} className="custom-control custom-checkbox text-monospace text-capitalize d-inline-flex bd-highlight">
  					<input onChange={this.handleChangeCheckboxes} className="custom-control-input" disabled={checkboxesDisabled} name={item} checked={checkboxes[item]} type="checkbox" id={item} />
  					<label className="custom-control-label" htmlFor={item}>{item}</label>
  				</div>
  			))}			
      	<div className="form-row bd-highlight m-1 text-monospace">      		
  				<div className="col-5 mb-1">
    				<input onChange={this.handleChangeFilter} type="text" value={filters['От']} name="От" id="minPrice" className="form-control" placeholder="Цена руб. от" />
    			</div>
    			<div className="col-5">
    				<input onChange={this.handleChangeFilter} type="text" value={filters['До']} name="До" id="maxPrice" className="form-control" placeholder="Цена руб. до" />
    			</div>
    			<div className="col-6">
    				<input onChange={this.handleChangeFilter} disabled={searchDisabled} type="text" value={filters['Название']} name="Название" id="search" className="form-control" placeholder="Название/артикул" />
    			</div>
    			<div className="col-4">
    				<button type="submit" className="btn btn-secondary">Показать</button>
    			</div>	
  			</div>
      </form>
    );
  }

  filtersResultRender() {
  	const { filters, checkboxes, checkboxesDisabled } = this.state;
  	const inputCheckboxes = Object.keys(checkboxes).filter(key => checkboxes[key]);
  	const inputFilters = Object.keys(filters).filter(key => filters[key] !== '');
  	return (
  		<form onSubmit={this.handleSubmit}>
      	<div className="form-row bd-highlight mb-1 text-monospace">
  				<ul className="list-group col-12 m-1">
  					{checkboxesDisabled ? null : inputCheckboxes.map(key => 
  						<li key={_.uniqueId()} className="list-group-item text-capitalize ml-2">{key}</li>
  					)}
  					{inputFilters.map(key => 
  						<li key={_.uniqueId()} className="list-group-item ml-2">
  							{key === 'Название' ? `${key} ${filters[key]}` : `${key} ${filters[key]} руб.`}
  						</li>
  					)}
  				</ul>
  				<div className="col-12 pt-2 ml-3">
    				<button type="submit" className="btn btn-secondary">Отмена</button>
    			</div>
  			</div>
  		</form>
  	);
  }

  selectRender() {
  	return (
  		<div className="form-row col-7">
  			<div className="form-group m-1 p-2 bd-highlight">
  				<label className="text-monospace">Сортировать по</label>
  				<select value={this.state.sortBy} onChange={this.handleSortBy} className="custom-select text-monospace">
  					<option>признакам</option>
  					{sort.map(([name, key]) => (
    					<option key={_.uniqueId()} value={key}>{name}</option>
    				))}
					</select>
    		</div>
    	</div>
  	);
  }

  render() {
  	const { checkboxes, filters, sortBy, submit } = this.state;
  	const params = {
  		checkboxes,
  		filters,
  		sortBy,
  		submit,
  	};
  	return (
  		<div className="container catalog">				
  			<div className="row">
          <div className="col-12 col-md-6 options">
            {submit ? this.filtersResultRender() : this.filtersFormRender()}
            {this.selectRender()}
          </div>
          <div className="col-12 col-md-6">
            <Goods {...params} />
          </div>
    		</div>
      </div>
  	);
  }
}