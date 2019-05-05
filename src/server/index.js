const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.static('dist'));

app.get('/api/getListOfGoods', (req, res) => {
	const data = fs.readFileSync(path.resolve(__dirname, 'shop.json'));
	const rawGoods = JSON.parse(data);
	const { goods } = rawGoods;
	const listOfGoods = goods.reduce((acc, item) => {
		const { data } = item;
		return [...acc, data];
	}, []);		
	res.send(listOfGoods);
});

app.listen(8080, () => console.log('Listening on port 8080!'));
