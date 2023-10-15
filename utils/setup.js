// const User = require('../models/userPG');
const Deal = require("../models/deal");
// const deals = require("./../deals.json");

Deal.sync();

// const createFirstUser = async () => {
//     const user = await User.create({
//         email: 'asdf@.com',
//         password: '11223344',
//         token: '123123',
//         verify: 'false',
//         verificationToken: 'sdsdcjsjoisdcj',
//     });

//     console.log(user);
// }

// createFirstUser();

const createDeal = async () => {
  await Deal.create({
    name: "Al Yaqoub Tower",
    price: "6 500 000 Dhs",
    ticket: "60 000 Dhs",
    yield: "9.25%",
    daysLeft: "150",
    sold: "75%",
    preview:
      "https://res.cloudinary.com/du82kgttw/image/upload/v1697306516/Rectangle_2743_aiec2e.jpg",
  });
};

createDeal();

// [{ deal1 }, { deal2 }].forEach(createDeal);
