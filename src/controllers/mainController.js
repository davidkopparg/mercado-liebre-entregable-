const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const db = require("../../database/models/index")


const controller = {
	index: (req, res) => {
		
		db.Products.findAll()
        .then(function(products){
		
			return res.render('index', { products:products});
			
		  
  
        })
		.catch(function(err) {
			console.log(err)
		  })  



	},
	search: (req, res) => {
		res.render('results')
	},
};

module.exports = controller;
