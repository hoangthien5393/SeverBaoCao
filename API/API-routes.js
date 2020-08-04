// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
        res.json({
                status: 'API Its Working',
                message: 'Welcome to Tan Phat TPE',
        });
});
// Import contact controller
var contactController = require('./contactController');
// user
router.route('/User/:Mode/:Data/:IDProject')
        .get(contactController.UserView)

router.route('/Data/:DateF/:DateT/')
        .get(contactController.DataView)

// Export API routes
module.exports = router;