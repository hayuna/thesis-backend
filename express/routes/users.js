const router = require("express-promise-router")();

const Controller = require("../controllers/users");
const {
  validateParam,
  validateBody,
  schemas
} = require("../helpers/routeHelpers");

router
  .route("/")
  .get(Controller.index)
  .post(validateBody(schemas.user.post), Controller.post);

router
  .route("/:id")
  .get(validateParam(schemas.idSchema, "id"), Controller.get)
  .patch(
    [validateParam(schemas.idSchema, "id"), validateBody(schemas.user.patch)],
    Controller.update
  )
  .delete(validateParam(schemas.idSchema, "id"), Controller.delete);
module.exports = router;
