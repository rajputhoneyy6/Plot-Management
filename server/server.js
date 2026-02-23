require("dotenv").config({ path: "./config.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Plot = require("./models/plot");

const app = express();

app.use(express.json());
app.use(cors());

//MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("DB Error:", err));


//JWT Middleware
const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header)
    return res.status(401).json("No token provided");

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json("Invalid Token");
  }
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== 1)
      return res.status(403).json("Admin only access");

    next();
  });
};


// Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "User Registered ✅" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Login API
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
      name: user.name
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/create-plots", async (req, res) => {
  try {
    const blocks = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    for (let block of blocks) {
      for (let i = 1; i <= 100; i++) {
        await Plot.create({
          block,
          plotNumber: i
        });
      }
    }

    res.json({ message: "All plots created successfully ✅" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/api/plots/:block", async (req, res) => {
  try {
    const blockName = req.params.block.toUpperCase();

    const plots = await Plot.find({ block: blockName })
      .sort({ plotNumber: 1 });

    res.json(plots);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 

app.get("/clear-plots", async (req, res) => {
  await Plot.deleteMany({});
  res.json({ message: "All plots deleted" });
});


app.put("/api/register-plot/:id", verifyAdmin, async (req, res) => {
  try {
    const updatedPlot = await Plot.findByIdAndUpdate(
      req.params.id,
      {
        status: "registered",
        registeredBy: req.body.name
      },
      { new: true }
    );

    res.json(updatedPlot);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 4090;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
