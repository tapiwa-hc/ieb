const express = require("express");
const db = require("../db");
const jwt = require("jsonwebtoken");

const router = express.Router();

let verifyAdmin = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.sendStatus(401);
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === null) {
    return res.sendStatus(401);
  }
  try {
    let payload = jwt.verify(token, "placeholderKey");
    req.user = payload.subject;
    let rights = payload.subject.rights;
    if (rights < 3) {
      return res.sendStatus(401);
    }
    next();
  } catch {
    return res.sendStatus(401);
  }
};

let verifyStaff = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.sendStatus(401);
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === null) {
    return res.sendStatus(401);
  }
  try {
    let payload = jwt.verify(token, "placeholderKey");
    req.user = payload.subject;
    let rights = payload.subject.rights;
    if (rights < 2) {
      return res.sendStatus(401);
    }
    next();
  } catch {
    return res.sendStatus(401);
  }
};

let verifyPupil = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.sendStatus(401);
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === null) {
    return res.sendStatus(401);
  }
  try {
    let payload = jwt.verify(token, "placeholderKey");
    req.user = payload.subject;
    let rights = payload.subject.rights;
    if (rights < 1) {
      return res.sendStatus(401);
    }
    next();
  } catch {
    return res.sendStatus(401);
  }
};

let verifyMobile = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.sendStatus(401);
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === null) {
    return res.sendStatus(401);
  }
  try {
    let payload = jwt.verify(token, "placeholderKey");
    req.user = payload.subject;
    next();
  } catch {
    return res.sendStatus(401);
  }
};

// Pending

router.get("/pending", verifyAdmin, async (req, res) => {
  try {
    let results = await db.getPending();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.put("/pending", verifyAdmin, async (req, res) => {
  try {
    let results = await db.pendingStatus(req.body.id, req.body.status);
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.put("/edit", verifyStaff, async (req, res) => {
  try {
    let results = await db.editNotice(
      req.body.id,
      req.body.title,
      req.body.description,
      req.user.rights
    );
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Groups

router.get("/groups", verifyStaff, async (req, res) => {
  try {
    let results = await db.groupsShow();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.put("/groups", verifyAdmin, async (req, res) => {
  try {
    let results = await db.groupsEdit(req.body.id, req.body.name);
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete("/groups/:id/:recursive", verifyAdmin, async (req, res) => {
  try {
    let results = await db.groupsDelete(
      req.params.id,
      req.params.recursive === "true"
    );
    res.end();
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post("/groups", verifyAdmin, async (req, res) => {
  try {
    let results = await db.groupsNew(req.body.section, req.body.name);
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Sections

router.get("/sections", verifyMobile, async (req, res) => {
  try {
    let results = await db.sectionsShow();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// New

router.get("/students", verifyStaff, async (req, res) => {
  try {
    let results = await db.getStudents();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/new", verifyStaff, async (req, res) => {
  try {
    let results = await db.newNotice(
      req.body.uID,
      req.body.display_date,
      req.body.gID,
      req.body.title,
      req.body.description,
      req.user.rights
    );

    if (req.body.tags) {
      let nID = await db.getLastNoticeID();
      console.log(nID);
      results = db.tagStudents(nID, req.body.tags);
    }
    // Concern: Multiple Users and Congestion
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/tag/:id/:students", verifyStaff, async (req, res) => {
  try {
    let results = await db.tagStudents(req.params.id, req.params.students);
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Export

router.get("/export/:date/:sections", verifyStaff, async (req, res) => {
  try {
    let results = await db.exportNotices(req.params.date, req.params.sections);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Feed

router.get("/feed/:id", verifyPupil, async (req, res) => {
  try {
    let results = await db.getMyNotices(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/mobile/feed", verifyMobile, async (req, res) => {
  try {
    let results = await db.getMyNotices(req.user.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/subs/:id", verifyPupil, async (req, res) => {
  try {
    let results = await db.getSubscriptions(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/subs/:id/:add", verifyPupil, async (req, res) => {
  try {
    let results = await db.addSubs(req.params.id, req.params.add);
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete("/subs/:id/:remove", verifyPupil, async (req, res) => {
  try {
    let results = await db.unSub(req.params.id, req.params.remove);
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// All

router.get("/all", verifyPupil, async (req, res) => {
  try {
    let results = await db.getAll();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Authentication

router.post("/login", async (req, res) => {
  try {
    let results = await db.login(req.body.username, req.body.password);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.status(401).send(e);
  }
});

router.post("/mobile/login", async (req, res) => {
  try {
    let results = await db.mobileLogin(req.body.adminNo);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.status(401).send(e);
  }
});

router.get("/user", verifyPupil, async (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    rights: req.user.rights,
    firstname: req.user.first_name,
    surname: req.user.surname,
  });
});

router.post("/password", verifyPupil, async (req, res) => {
  try {
    let results = await db.changePassword(
      req.user.username,
      req.body.oldPass,
      req.body.newPass
    );
    res.end();
  } catch (e) {
    console.log(e);
    res.status(401).send(e);
  }
});

module.exports = router;
