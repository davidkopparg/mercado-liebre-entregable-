const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { promiseImpl } = require("ejs");
const db = require("../../database/models/index")


const controller = {
	// Root - Show all products
	index: (req, res) => {
		db.Products.findAll()
        .then(function(products){
		
			return res.render('products', { products:products});
        })
		.catch(function(err) {
			console.log(err)
		  })  

	},

	// Detail - Detail from one product
	detail: (req, res) => {

		db.Products.findByPk(req.params.id, {
			
		  })
		  .then(function(product){
		   
	return res.render('detail', { product:product});
	  
		  }).catch(function(err) {
		console.log(err)
		  })  
			
		
	},

	// Create - Form to create
	create: (req, res) => {
		let marcas = db.Brands.findAll();
		let categorias= db.Categories.findAll();

		Promise.all([marcas,categorias])
		.then(function([marcas,categorias]){
				res.render("product-create-form",{marcas,categorias})

		})
	  .catch(function(err){
		  console.log(err)
	  })
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		db.Products.findByPk(req.params.id, {
			include : ['category']
		})
		.then(function(product){
		 
  return res.render('product-edit-form', { product:product});
	
		}).catch(function(err) {
	  console.log(err)
		})  
	},

	
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;