const Company = require('../models/company.model.js');
const Product = require('../models/product.model.js');

exports.findAll = (req, res) => {
	
	Product.find().populate('company')
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Find a Products by Name
exports.findByName = (req, res) => {
	Product.findOne({ name: req.params.productName }).populate('company')
	.populate('company')
	.exec(function (err, product) {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Products not found with given name " + req.params.productName
				});                
			}
			return res.status(500).send({
				message: "Error retrieving Products with given Company Id " + req.params.productName
			});
		}
					
		res.send(product);
	});
};

// Find all products by a CompanyId
exports.findByCompanyId = (req, res) => {
    Product.find({ company : req.params.companyId }).populate('company')
	.exec(function (err, products) {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Products not found with given Company Id " + req.params.companyId
				});                
			}
			return res.status(500).send({
				message: "Error retrieving Products with given Company Id " + req.params.companyId
			});
		}
					
		res.send(products);
	});
};


exports.update = (req,res) =>{
	//console.log(req.params)
		Product.update({ _id:req.body.id  }, req.body).then((result) =>{
			console.log(result, "updated")
			res.json(result);
		}).catch((err) => {
			res.status(500).send({
				message: err.message
			});
		})
}

exports.findById = (req,res) =>{
	console.log(req.params)
	Product.findById(req.params.id).populate('company').then((result) =>{
		console.log(result, "updated")
		res.json(result);
	}).catch((err) => {
		console.log(err)
		res.status(500).send({
			message: err.message
		});
	})
}

exports.create = (req,res) =>{

	var product=new Product(req.body);
		product.save(product).then((result)=>{
			res.send(result)
		}).catch((err) => {
			res.status(500).send({
				message: err.message
			});
		})
}

exports.delete = (req, res) => {
	Product.deleteOne({'_id':req.params.id}).
	then((result) => {
		res.json("Deleted");
	}).catch((error) =>{
		res.json(error)
	})
}