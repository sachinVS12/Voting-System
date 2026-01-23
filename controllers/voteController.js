const Vote = require("../models/Vote");
const Party = require("../models/Party");
const User = require("../models/User");

exports.castVote = async (req, res) => {
  try {
    const { partyId } = req.body;
    const userId = req.user._id;

    // Check if user has already voted
    if (req.user.hasVoted) {
      return res.status(400).json({ message: "You have already voted" });
    }

    // Check if party exists and is active
    const party = await Party.findById(partyId);
    if (!party || !party.isActive) {
      return res.status(404).json({ message: "Party not found or inactive" });
    }

    // Start transaction
    const session = await Party.startSession();
    session.startTransaction();

    try {
      // Create vote
      const vote = await Vote.create(
        [
          {
            user: userId,
            party: partyId,
            ipAddress: req.ip,
            userAgent: req.get("User-Agent"),
          },
        ],
        { session },
      );

      // Update party vote count
      await Party.findByIdAndUpdate(
        partyId,
        { $inc: { votes: 1 } },
        { session },
      );

      // Mark user as voted
      await User.findByIdAndUpdate(userId, { hasVoted: true }, { session });

      await session.commitTransaction();
      session.endSession();

      res.json({
        message: "Vote cast successfully",
        vote: vote[0],
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVoteHistory = async (req, res) => {
  try {
    const votes = await Vote.find({ user: req.user._id })
      .populate("party", "name symbol")
      .sort({ votedAt: -1 });

    res.json(votes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllVotes = async (req, res) => {
  try {
    const votes = await Vote.find()
      .populate("user", "name email")
      .populate("party", "name symbol")
      .sort({ votedAt: -1 });

    res.json(votes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
