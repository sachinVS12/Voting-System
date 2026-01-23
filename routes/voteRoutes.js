const express = require("express");
const router = express.Router();
const {
  castVote,
  getVoteHistory,
  getAllVotes,
} = require("../controllers/voteController");
const { protect, admin } = require("../middleware/auth");

router.post("/cast", protect, castVote);
router.get("/my-votes", protect, getVoteHistory);
router.get("/all", protect, admin, getAllVotes);

module.exports = router;
