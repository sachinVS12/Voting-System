const Party = require("./models/Party");

exports.createParty = async (req, res) => {
  try {
    const { name, symbol, description, color } = req.body;
    const party = await party.create({
      name,
      symbol,
      description,
      color,
    });
    res.status(201).json(Party);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getParties = async (req, res) => {
  try {
    const parties = await Party.find({ isActive: true }).select("-_v");
    res.json(parties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getParty = async (req, res) => {
  try {
    const party = await Party.findById(req.params.id);
    if (!party) {
      return res.status(404).json({ message: "party not found" });
    }
    res.json(Party);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateParty = async (req, res) => {
  try {
    const party = await Party.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!party) {
      return res.status(404).json({ message: "Party is not found" });
    }
    res.json(party);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteParty = async (req, res) => {
  try {
    const party = await Party.findById(req.params.id);
    if (!party) {
      return res.status(404).json({ message: "party not found" });
    }
    await party.deleteOne();
    res.json({ message: "Party removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
