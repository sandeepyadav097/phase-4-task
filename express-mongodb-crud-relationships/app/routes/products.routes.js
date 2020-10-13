module.exports = function(app) {
    var products = require('../controllers/products.controller.js');
	
	app.get('/api/products', products.findAll);
			
	// Find a single Product by Name
    app.get('/api/products/:productName', products.findByName);
	
	// Find all Products of a Company
    app.get('/api/products/company/:companyId', products.findByCompanyId);

    //put products
    app.put("/api/products", products.update);

    // add products for a company

    app.get('/api/products/id/:id', products.findById);
    
    // create products
    app.post("/api/products", products.create)

    //delete product
    app.delete("/api/products/:id", products.delete);
}