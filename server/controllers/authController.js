const db = require("../config/dbConfig");
const bcrypt = require("bcrypt");

const getUserFromUsername = async (username) => {
  return await db.query(`SELECT * FROM game_users WHERE username= $1`, [
    username,
  ]);
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userCheck = await getUserFromUsername(username);
    if (userCheck.rowCount !== 1) {
      return res.json({
        message: "Incorrect Username or Password",
        success: false,
      });
    }
    if (await bcrypt.compare(password, userCheck.rows[0]["password"])) {
      return res.json({ user: { ...userCheck.rows[0] }, success: true });
    }
    return res.json({
      message: "Incorrect Username or Password",
      success: false,
    });
  } catch (ex) {
    next(ex);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if ((await getUserFromUsername(username)).rowCount === 1) {
      return res.json({ message: "Username already exists", success: false });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const sqlquery = db.query(
      `INSERT INTO game_users (username,email,password)
        VALUES($1,$2,$3)
        RETURNING id, password`,
      [username, email, encryptedPassword]
    );
    return res.json({ user: { ...(await sqlquery).rows[0] }, success: true });
  } catch (ex) {
    next(ex);
  }
};

exports.user = async (req, res, next) => {
  try {
    return res
      .status(200)
      .send((await getUserFromUsername(req.params.name)).rows);
  } catch (ex) {
    next(ex);
  }
};
