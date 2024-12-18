import express from "express";
import bodyParser from "body-parser";
import path from "path";
import pg from "pg";
import env from "dotenv";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import passport from "passport";

const app = express();
env.config();

app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  database: process.env.DATABASE,
});

db.connect();

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use("local",
  new LocalStrategy({ usernameField: "email", passwordField: "password" },async (email, password, cb) => {

    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
      if (result.rows.length === 0) {
        return cb(null, false, { message: "Incorrect username." });
      }

      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return cb(null, false, { message: "Incorrect password." });
      }

      return cb(null, user);
    } catch (err) {
      console.error("Error during authentication:", err);
      return cb(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return cb(null, false);
    }
    cb(null, result.rows[0]);
  } catch (err) {
    cb(err);
  }
});

app.get("/",(req,res)=>{
  // Serve static react file
})

app.get("/CS",(req,res)=>{
  //Static react path
})
app.get("/IS",(req,res)=>{
  //Static react path
})
app.get("/ECE",(req,res)=>{
  //Static react path
})

app.get("/signup",(req,res)=>{
  //Serve react page
})
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await db.query("INSERT INTO users(email, password) VALUES($1, $2) RETURNING *", [email, hash]);
    res.status(201).json({ message: "User registered successfully", user: result.rows[0] });// Replace with react path
  } catch (err) {
    console.error(`Error during signup: ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/login",(req,res)=>{
  //Add react path later
  res.status(200).json({msg:"Login testing"});
})

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login", // Redirect to login page on failure
    failureMessage: true // Enables setting failure messages in the session
  }),
  (req, res) => {
    // This callback runs if authentication is successful
    res.status(200).json({message:"Successful login"});//add react path later
  }
);

app.get("/About us",(req,res)=>{
  //About us page
});

app.get("/admin",(req,res)=>{
  //
})

app.get("/latest-event-details",async(req,res)=>{
  let current_date = new Date().toLocaleDateString();
  const response = await db.query(
    `SELECT *
     FROM your_table_name
     WHERE your_date_column BETWEEN 
           TO_DATE($1, 'DD-MM-YYYY') - INTERVAL '5 days' 
           AND TO_DATE($1, 'DD-MM-YYYY');`,
    [current_date]
  );
  console.log(current_date);
})

app.listen(5000, () => {
  console.log(`Running at port 5000`);
});
