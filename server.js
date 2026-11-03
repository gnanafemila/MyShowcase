const multer = require("multer");
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
const upload = multer({ dest: "uploads/" });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "myachivements"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
  } else {
    console.log("Database connected");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const sql =
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Registration failed");
    } else {
      res.send("Registration successful");
    }
  });
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Login failed");
    } else if (result.length > 0) {
      res.send(result[0].id.toString());
    } else {
      res.send("Invalid email or password");
    }
  });
});
 

app.post("/projects", (req, res) => {
  const { user_id, title, description, project_link } = req.body;

  const sql =
    "INSERT INTO projects (user_id, title, description, project_link) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [user_id, title, description, project_link],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Project save failed");
      } else {
        res.send("Project saved successfully");
      }
    }
  );
});

app.get("/projects/:user_id", (req, res) => {
  const userId = req.params.user_id;

  const sql = "SELECT * FROM projects WHERE user_id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Failed to fetch projects");
    } else {
      res.send(result);
    }
  });
});
app.delete("/projects/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM projects WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Project delete failed");
    } else {
      res.send("Project deleted successfully");
    }
  });
});
// Update existing project
app.put("/projects/:id", (req, res) => {
  const { title, description, project_link, user_id } = req.body;
  const projectId = req.params.id;

  const sql = `
    UPDATE projects
    SET title = ?, description = ?, project_link = ?
    WHERE id = ? AND user_id = ?
  `;

  db.query(
    sql,
    [title, description, project_link, projectId, user_id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Project update failed");
      }

      if (result.affectedRows === 0) {
        return res.status(404).send("Project not found");
      }

      res.send("Project updated successfully");
    }
  );
});

app.post("/profile", upload.single("image"), (req, res) => {
  const { user_id, name, bio, skills, contact, social_link } = req.body;

  const photo = req.file ? req.file.filename : null;

  const checkSql = "SELECT * FROM profile WHERE user_id = ?";

  db.query(checkSql, [user_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Profile save failed");
    }

    if (result.length > 0) {
      let updateSql;
      let values;

      if (photo) {
        updateSql =
          "UPDATE profile SET name = ?, bio = ?, skills = ?, contact = ?, social_link = ?, photo = ? WHERE user_id = ?";

        values = [
          name, bio, skills, contact, social_link, photo, user_id
        ];
      } else {
        updateSql =
          "UPDATE profile SET name = ?, bio = ?, skills = ?, contact = ?, social_link = ? WHERE user_id = ?";

        values = [
          name, bio, skills, contact, social_link, user_id
        ];
      }

      db.query(updateSql, values, (err) => {
        if (err) {
          console.log(err);
          return res.send("Profile update failed");
        }

        res.send("Profile updated successfully");
      });

    } else {
      const insertSql =
        "INSERT INTO profile (user_id, name, bio, skills, contact, social_link, photo) VALUES (?, ?, ?, ?, ?, ?, ?)";

      db.query(
        insertSql,
        [user_id, name, bio, skills, contact, social_link, photo],
        (err) => {
          if (err) {
            console.log(err);
            return res.send("Profile save failed");
          }

          res.send("Profile created successfully");
        }
      );
    }
  });
});

app.get("/profile/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  const sql = "SELECT * FROM profile WHERE user_id = ?";

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Failed to fetch profile");
    }

    if (result.length === 0) {
      return res.status(404).send("Profile not found");
    }

    res.json(result[0]);
  });
});
app.post("/activities", upload.single("image"), (req, res) => {
  const { user_id, title, description, date } = req.body;

  const image = req.file ? req.file.filename : "";

  const sql =
    "INSERT INTO activities (user_id, title, description, date, image) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [user_id, title, description, date, image],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Activity save failed");
      } else {
        res.send("Activity saved successfully");
      }
    }
  );
});
app.get("/activities/:user_id", (req, res) => {
  const userId = req.params.user_id;

  const sql = "SELECT * FROM activities WHERE user_id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Failed to fetch activities");
    } else {
      res.send(result);
    }
  });
});
app.delete("/activities/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM activities WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Activity delete failed");
    } else {
      res.send("Activity deleted successfully");
    }
  });
});
// Update existing activity
app.put("/activities/:id", upload.single("image"), (req, res) => {
  const { title, description, date, user_id } = req.body;
  const activityId = req.params.id;

  const checkSql =
    "SELECT * FROM activities WHERE id = ? AND user_id = ?";

  db.query(checkSql, [activityId, user_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Activity update failed");
    }

    if (result.length === 0) {
      return res.status(404).send("Activity not found");
    }

    const image = req.file
      ? req.file.filename
      : result[0].image;

    const updateSql = `
      UPDATE activities
      SET title = ?, description = ?, date = ?, image = ?
      WHERE id = ? AND user_id = ?
    `;

    db.query(
      updateSql,
      [title, description, date, image, activityId, user_id],
      (err, updateResult) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Activity update failed");
        }

        res.send("Activity updated successfully");
      }
    );
  });
});
app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});