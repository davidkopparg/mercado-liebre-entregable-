const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const {
	promiseImpl
} = require("ejs");
const db = require("../../database/models/index")
const {
	validationResult
} = require("express-validator")

const controller = {
	// Root - Show all products
	index: (req, res) => {
		db.Products.findAll()
			.then(function (products) {

				return res.render('products', {
					products: products
				});
			})
			.catch(function (err) {
				console.log(err)
			})

	},

	// Detail - Detail from one product
	detail: (req, res) => {

		db.Products.findByPk(req.params.id, {

			})
			.then(function (product) {

				return res.render('detail', {
					product: product
				});

			}).catch(function (err) {
				console.log(err)
			})


	},

	// Create - Form to create
	create: (req, res) => {

		let marcas = db.Brands.findAll();
		let categorias = db.Categories.findAll();

		Promise.all([marcas, categorias])
			.then(function ([marcas, categorias]) {
				res.render("product-create-form", {
					marcas,
					categorias,errors:{},body:{}
				})

			})
			.catch(function (err) {
				console.log(err)
			})
	},

	// Create -  Method to store
	store: (req, res) => {

		//validaciones
		let errors = validationResult(req)
		if (errors.isEmpty()) {

			db.Products.create({
					title: req.body.title,
					description: req.body.description,
					photo: "/images/products/" + req.files[0].filename,
					price: req.body.price,
					stock: req.body.stock,
					brand_id: req.body.brand,
					category_id: req.body.category,

				}).then(data => res.redirect("/products/" + data.id))

				.catch(error => console.log(error))


		} else {

			let marcas = db.Brands.findAll();
			let categorias = db.Categories.findAll();
			let body=req.body
						//recordando la categoria y la marca elegida
						//db.Brands.findOne({
						//	where: {
						//		id :req.body.brand
						//	}
						//}).then((resultado) =>{
						//	let recordarMarca= resultado
					//		console.log(recordarMarca)
						//});
						//let recordarCaterogia= db.Categories.findOne({
						//	where: {
						//		id :req.body.category
					//		}
						//}).then((resultado) =>{
						//	return resultado
					//	});
						//////////////////////////////////////////////////
						
						
			Promise.all([marcas, categorias,])
				.then(function ([marcas, categorias]) {
			
					res.render("product-create-form",{marcas,categorias,errors:errors.mapped(),body})
					console.log(body)
					console.log(recordarCategoria)
				})
				.catch(function (err) {
				
				})


				
		}




	},

	// Update - Form to edit
	edit: (req, res) => {
		let editMarcas = db.Brands.findAll();
		let product = db.Products.findByPk(req.params.id, {
			include: ['category']
		});
		Promise.all([editMarcas, product])
			.then(function ([editMarcas, product]) {

				res.render("product-edit-form", {
					editMarcas,
					product
				})

			}).catch(function (err) {
				console.log(err)
			})
	},


	// Update - Method to update
	update: (req, res) => {

		//chequea si hay una foto nueva para cambiar o no 
		let foto;
		db.Products.findByPk(req.params.id, {

			})
			.then(function (product) {
				if (req.files.length == 0) {

					foto = product.photo

				} else {

					foto = "/images/products/" + req.files[0].filename
					console.log(foto)
				}
				db.Products.update({
						title: req.body.title,
						description: req.body.description,
						photo: foto,
						price: req.body.price,
						stock: req.body.stock,

					}, {
						where: {
							id: req.params.id
						}

					}).then(data => res.redirect("/products/" + req.params.id))

					.catch(error => console.log(error))

			}).catch(function (err) {
				console.log(err)
			})
		//  termina el chequeo




	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {

		db.Products.destroy({
				where: {
					id: req.params.id
				}

			})
			.then(data => res.redirect("/products"))

			.catch(error => console.log(error))

	}


};

module.exports = controller;