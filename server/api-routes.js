// api-routes.js
// Initialize express router
let router = require("express").Router();
// Set default API response
router.get("/", function(req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to RESTHub crafted with love!"
  });
});
// Import contact controller
var contactController = require("./controllers/contactController");
var jokeController = require("./controllers/jokeController");
// Contact routes
router
  .route("/contacts")
  .get(contactController.index)
  .post(contactController.new);

router
  .route("/contacts/:contact_id")
  .get(contactController.view)
  .patch(contactController.update)
  .put(contactController.update)
  .delete(contactController.delete);

router
  .route("/jokes")
  .get(jokeController.index)
  .post(jokeController.new);
router
  .route("/jokes/:joke_id")
  .get(jokeController.view)
  .put(jokeController.update)
  .delete(jokeController.delete);
router.route("/jokes/delete").post(jokeController.deleteSelected);

// Export API routes
module.exports = router;
