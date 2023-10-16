const { Deal } = require("../../models/deal");
const { ctrlWrapper } = require("../../helpers");

const getAllDeals = async (req, res) => {
  // const { page = 1, limit = 20 } = req.query;
  // const skip = (page - 1) * limit;
  // const deals = await Deal.find({
  //   skip,
  //   limit,
  // });
  const deals = await Deal.findAll();

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: deals,
    },
  });
};

const addDeal = async (req, res) => {
  const result = await Deal.create({ ...req.body });
  console.log("adding deal");
  res.status(201).json({
    status: "success",
    code: 201,
    message: "Deal added successfully",
    data: {
      result,
    },
  });
};

module.exports = {
  getAllDeals: ctrlWrapper(getAllDeals),
  addDeal: ctrlWrapper(addDeal),
};
