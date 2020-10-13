module.exports = function(app) {

	var companies = require('../controllers/companies.controller.js')
	
	app.get('/api/companies/init', companies.init);
	app.get('/api/companies', companies.findAll);
	app.put('/api/companies', companies.update)
	app.post('/api/companies', companies.create)
	 //delete product
	app.get("/api/companies/id/:id", companies.findById);
	app.delete("/api/companies/:id", companies.delete);

	app.get('/api/selectCompanies', companies.select);
}