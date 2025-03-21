import express from "express";
import bodyParser from "body-parser";
import path from "path";
import pg from "pg";
import env from "dotenv";
import bcrypt from "bcrypt";
import cors from "cors";
import { fileURLToPath } from "url";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import passport from "passport";
import multer from "multer";
import fs from "fs";

const app = express();
env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads", {
  setHeaders: (res) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS"); // Allow only necessary methods
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }
}));

app.use("/uploads",express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, req.body.clubName + path.extname(file.originalname.split(req.body.clubName)[0])); // Rename file
  },
});

const upload = multer({ storage: storage });

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}


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
    cookies: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: "None",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, cb) => {
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          email,
        ]);
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
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const result = await db.query(
          "SELECT * FROM google_users where id = $1",
          [profile.id]
        );
        if (result.rows.length > 0) return done(null, result.rows[0]);

        const create = await db.query(
          "INSERT INTO google_users(id,email,name) VALUES($1,$2,$3) RETURNING *",
          [profile.id, profile.email, profile.name]
        );

        return done(null, create.rows[0]);
      } catch (err) {}
      return done(null, profile);
    }
  )
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

app.get("/", (req, res) => {
  // Serve static react file
});

app.get("/signup", (req, res) => {
  //Serve react page
});
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await db.query(
      "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *",
      [email, hash]
    );
    res
      .status(201)
      .json({ message: "User registered successfully", user: result.rows[0] }); // Replace with react path
  } catch (err) {
    console.error(`Error during signup: ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/login", (req, res) => {
  //Add react path later
  res.status(200).json({ msg: "Login testing" });
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  (req, res) => {
    if (!req.user)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    res.status(200).json({
      userID: req.user.id,
      success: true,
    });
  }
);

app.post("/logout", (req, res) => {
    // if (error) {
    //   return res.status(500).json({ status: "Logout error", message: error });
    // }
  console.log("Reached");
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).json({ status: "Server side logout error" });
      }

      res.clearCookie("connect.sid");
      return res.status(200).json({status:"Success"});
    });
  }
  );



app.get("/About us", (req, res) => {
  //About us page
});

// app.get("/latest-event-details",async(req,res)=>{
//   let current_date = new Date().toLocaleDateString();
//   const response = await db.query(
//     `SELECT *
//      FROM your_table_name
//      WHERE your_date_column BETWEEN
//            TO_DATE($1, 'DD-MM-YYYY') - INTERVAL '5 days'
//            AND TO_DATE($1, 'DD-MM-YYYY');`,
//     [current_date]
//   );
//   res.status(200).json(response.rows);
// })

app.get("/card-details", async (req, res) => {
  const result = await db.query("SELECT * from clubs");
  res.status(200).json(result.rows);
});

app.post("/register-club",upload.single("logo"), async (req, res) => {
  const data = req.body;
  console.log(data);
  const userId = req.user.id;
  const logoPath = req.file?`/uploads/${req.file.filename}`:null;

  try {
    const result = await db.query(
      "INSERT INTO CLUBS(club_name,president,vice_president,contact_no,club_info,catchy_phrase,picture,nature) values ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id",
      [
        data.clubName,
        data.presidentName,
        data.vp,
        data.contactNo,
        "In progress",
        "In progress",
        logoPath,
        data.nature,
      ]
    );
    await db.query(
      "INSERT INTO registration(club_name,status,userid,id) VALUES ($1,$2,$3,$4)",
      [data.clubName, "pending", userId, result.rows[0].id]
    );
    res.status(200).json({
      status: "Success",
      id: result.rows[0].id,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.patch("/info/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const userId = req.user.id;
  const data = req.body;
  console.log(data);
  try {
    const result = await db.query(
      "UPDATE clubs SET club_info = $1, catchy_phrase = $2 WHERE id = $3",
      [data.club_info, data.catchy_phrase, id]
    );
    const register = await db.query(
      "UPDATE registration SET status = 'completed' WHERE id = $1",
      [id]
    );

    res.status(200).json("Success");
  } catch (err) {
    console.log(err);
    res.status(500).json("Failed");
  }
});

app.patch("/update/:id",upload.single("logo"), async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const logoPath = req.file?`/uploads/${req.file.filename}`:null;
  try {
    const result = await db.query(
      "UPDATE CLUBS SET club_name = $1 , president = $2 , vice_president = $3 , contact_no = $4 , picture = $5 WHERE id = $6 RETURNING id",
      [data.clubName, data.presidentName, data.vp, data.contactNo,logoPath, id]
    );
    console.log(result.rows);
    res.status(200).json({
      status: "Success",
      id: result.rows[0].id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error occured");
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM CLUBS WHERE id = $1", [id]);
  await db.query("DELETE FROM REGISTRATION WHERE id = $1", [id]);
  res.status(200).json("Success");
});

app.get("/achievements", async (req, res) => {
  const result = await db.query("SELECT * from achievements");
  res.status(200).json(result.rows);
});

app.get("/clubs", async (req, res) => {
  const result = await db.query("SELECT * FROM clubs");
  const response = result.rows;
  res.status(200).json(response);
});

app.get(`/club/:id`, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const result = await db.query("SELECT * FROM CLUBS where id = $1", [id]);
    const response = result.rows[0];
    console.log(response);
    res.status(200).json(response);
  } catch {
    res.status(500).send("Error occured");
  }
});

app.get("/adminPage", async (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.user.id;
    const result = await db.query(
      "SELECT * FROM REGISTRATION WHERE userId = $1",
      [id]
    );
    res.status(200).json(result.rows);
  } else res.status(404).json({ status: "failing" });
});

app.get("/search-results/:text", async (req, res) => {
  const { text } = req.params;

  try {
    const searchTerm = `%${text}%`;
    const response = await db.query(
      "SELECT * FROM clubs Where club_name ILIKE $1 OR club_info ILIKE $1",
      [searchTerm]
    );
    const data = response.rows;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Error occured");
    console.log(error);
  }
});

app.get("/authenticate", (req, res) => {
  if (req.isAuthenticated()) res.status(200).json({ status: "success" });
  else res.json({ status: "failed" });
});

app.listen(5000, () => {
  console.log(`Running at port 5000`);
});
