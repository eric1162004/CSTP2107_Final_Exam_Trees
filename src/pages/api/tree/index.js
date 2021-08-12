import connectDB from "../../../backend/mongodb";
import Tree from "../../../backend/models/tree";

const handler = async (req, res) => {
  // Create new
  if (req.method === "POST") {
    const { userName, type, address, days, hours, phone, email, open } = req.body;

    const newTree = new Tree({
      userName,
      type,
      address,
      days,
      hours,
      phone,
      email,
      open,
    });

    try {
      await newTree.save();
      res.json(newTree);
    } catch (e) {
      res.status(400);
      res.send(e);
    }
  }

  // Get all product
  if (req.method === "GET") {
    try {
      var tree = await Tree.find({});
      res.json(tree);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  if (req.method === "DELETE") {
    try {
      const { _id } = req.body;
      var tree = await Tree.findOneAndRemove({ _id });
      res.json(tree);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  // Update a product
  if (req.method === "PUT") {
    try {
      const { _id, userName, type, address, days, hours, phone, email, open } = req.body;
      await Tree.findOne({ _id }, (err, doc) => {
        doc.userName = userName;
        doc.type = type;
        doc.address = address;
        doc.days = days;
        doc.hours = hours;
        doc.phone = phone;
        doc.email = email;
        doc.open = open;
        doc.save();
        res.json(doc);
      });
    } catch (err) {
      res.status(400).send(e);
    }
  }
};

export default connectDB(handler);
