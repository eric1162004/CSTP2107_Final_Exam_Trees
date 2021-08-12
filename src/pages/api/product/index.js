import connectDB from "../../../backend/mongodb";
import Product from "../../../backend/models/product";

const handler = async (req, res) => {
  // Create new product
  if (req.method === "POST") {
    const { name, price, description} = req.body;

    const newProduct = new Product({
      name,
      price,
      description
    });

    try {
      await newProduct.save();
      res.json(newProduct);
    } catch (e) {
      res.status(400);
      res.send(e);
    }
  }

  // Get all product
  if (req.method === "GET") {
    try {
      var product = await Product.find({});
      res.json(product);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  if (req.method === "DELETE") {
    try {
      const { _id } = req.body;
      var product = await Product.findOneAndRemove({_id});
      res.json(product);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  // Update a product
  if (req.method === "PUT"){
    try{
      const { _id, name, description, price } = req.body;
      await Product.findOne({_id}, (err, doc)=>{
        doc.name = name;
        doc.description = description;
        doc.price = price;
        doc.save();
        res.json(doc);
      });
    }catch(err){
      res.status(400).send(e);
    }
  }
};

export default connectDB(handler);
