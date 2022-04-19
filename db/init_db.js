const {
  client,
  // declare your model imports here
  // for example, User
} = require("./");

async function buildTables() {
  try {
    client.connect();
    // drop tables in correct order

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    console.log("Starting to create products...");

    const products = [
      {
        title: "ECHEVERIA",
        price: "23.00",
        description:
          "This succulent resembles a rose with its spiral of pointed leaves that come in various shades of green, pink and burgundy. It''s low-growing and can be planted in ground or in containers, but it also does well indoors in a sunny window.",
        isActive: true,
        inStockQuantity: 100,
        photoLinkHref:
          "https://purewows3.imgix.net/images/articles/2021_05/Best_Succulents_You_Can_Grow_Echeveria.jpg?auto=format,compress&cs=strip",
        photoLinkBody: "",
      },
      {
        title: "STRING OF PEARLS",
        price: "16.00",
        description:
          "This darling plant has tiny round leaves that dangle on a long stem, resembling a beaded necklace. Find your brightest window and then leave it be; the stems can reach several feet long but break easily when moved. If a piece does fall off, push it into damp soil to create a new plant. This plant''s relative, string of bananas, is equally fetching and looks like — you guessed it— a string of tiny bananas!",
        isActive: true,
        inStockQuantity: 75,
        photoLinkHref:
          "https://purewows3.imgix.net/images/articles/2021_05/Best_Succulents_You_Can_Grow_String_of_Pearls.jpg?auto=format,compress&cs=strip",
        photoLinkBody: "",
      },
      {
        title: "SNAKE PLANT",
        price: "24.00",
        description:
          "Yes, this old favorite is a type of succulent, and it''s tough-as-nails. You''ll find upright forms with sword-like or cylindrical foliage, and dwarf varieties, which have a more clumping appearance. It''s one of the easiest succulents to grow and will live for decades with the right conditions. In some parts of the country, it can be grown outdoors (though it should be placed in a pot sunk in the ground, because it can become invasive in warm climates).",
        isActive: true,
        inStockQuantity: 55,
        photoLinkHref:
          "https://purewows3.imgix.net/images/articles/2021_05/Best_Succulents_You_Can_Grow_Snake_Plant.jpg?auto=format,compress&cs=strip",
        photoLinkBody: "",
      },
      {
        title: "TOMATOES",
        price: "16.00",
        description:
          "Tomato plants are tender warm-season crops that love the sun and cannot bear frost. It''s important not to put plants in the ground too early. In most regions, the soil is not warm enough to plant tomatoes outdoors until late spring and early summer except in zone 10, where they are a fall and winter crop.",
        isActive: true,
        inStockQuantity: 100,
        photoLinkHref:
          "https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg",
        photoLinkBody: "",
      },
      {
        title: "ALOE VERA",
        price: "21.00",
        description:
          "This succulent, with plump leaves fanning out from a central base, lives for years indoors. It also can grow outdoors in warm climates. Because the gel-like sap inside each leaf has anti-inflammatory properties, you can break off an outer leaf and use the substance on minor sunburns or poison ivy rashes. It likes bright, but not direct, sunlight.",
        isActive: true,
        inStockQuantity: 32,
        photoLinkHref:
          "https://purewows3.imgix.net/images/articles/2021_05/Best_Succulents_You_Can_GrowAloe_Vera.jpg?auto=format,compress&cs=strip",
        photoLinkBody: "",
      },
      {
        title: "CORN",
        price: "20.00",
        description:
          "Corn is a tall annual cereal grass (Zea mays) that is widely grown for its large elongated ears of starchy seeds. The seeds, which are also known as corn, are used as food for humans and livestock and as a source of biofuel and can be processed into a wide range of useful chemicals.",
        isActive: true,
        inStockQuantity: 32,
        photoLinkHref:
          "https://www.plantgrower.org/uploads/6/5/5/4/65545169/croppedimage570400-19690129-lsweetcorn_orig.jpg",
        photoLinkBody: "",
      },
    ];

    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
