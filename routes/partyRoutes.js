const express = require("express");
const router = express.Router();
const {
  createParty,
  getParties,
  getParty,
  updateParty,
  deleteParty,
  getResults,
} = require("../controllers/partyController");
const { protect, admin } = require("../middleware/auth");

router.route("/").post(protect, admin, createParty).get(getParties);

router.route("/results").get(getResults);

router
  .route("/:id")
  .get(getParty)
  .put(protect, admin, updateParty)
  .delete(protect, admin, deleteParty);

module.exports = router;
