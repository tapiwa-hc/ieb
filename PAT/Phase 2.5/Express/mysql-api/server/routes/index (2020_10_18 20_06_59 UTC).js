const express = require("express");
const db = require("../db");
const jwt = require("jsonwebtoken");

const router = express.Router();

/*
 * The next four methods verify the tokens of admins, staff members, or students accessing a route and
 *  allow HTTP request to proceed if token valid, or
 *  otherwise send an error 401 (Unauthorised)
 * @param {Request} [req] represents a resource request
 * @param {Response} [res] represents the response to a request
 * @param {NextFunction} [next] executes the middleware succeeding the current middleware
 * @returns {any}
 */
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

/*
 * All methods below have similar signatures, each eventually calling methods of the "db" class and
 *  using the HTTP methods of:
 *   post, read, put, and delete
 *   which are somewhat analogous to the respective CRUD operations
 * @param: {PathParams} [path] path to request to
 * @param: {...handlers: RequestHandler<ParamsDictionary, any, any, qs.ParsedQs>[]}
 */

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
    let results = await db.setNoticeStatus(req.body.id, req.body.status);
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Groups

router.get("/groups", verifyStaff, async (req, res) => {
  try {
    let results = await db.getGroups();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.put("/groups", verifyAdmin, async (req, res) => {
  try {
    let results = await db.setGroupName(req.body.id, req.body.name);
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete("/groups/:id/:recursive", verifyAdmin, async (req, res) => {
  try {
    let results = await db.deleteGroup(
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
    let results = await db.newGroup(req.body.section, req.body.name);
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Sections

router.get("/sections", verifyMobile, async (req, res) => {
  try {
    let results = await db.getSections();
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
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// router.post("/tag/:id/:students", verifyStaff, async (req, res) => {
//   try {
//     let results = await db.tagStudents(req.params.id, req.params.students);
//     res.end();
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(500);
//   }
// });

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

router.get("/subs/:id", verifyMobile, async (req, res) => {
  try {
    let results = await db.getSubGroups(req.params.id);
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
    let results = await db.deleteSubs(req.params.id, req.params.remove);
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

// General

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
