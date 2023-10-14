const { Deal } = require("../../models/deal");
const { ctrlWrapper } = require("../../helpers");

const getAllDeals = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const deals = await Deal.find({
    skip,
    limit,
  });
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: deals,
    },
  });
};

module.exports = {
  getAllDeals: ctrlWrapper(getAllDeals),
};
