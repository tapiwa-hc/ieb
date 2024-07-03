const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', async (req, res) => {

  try {
    let results = await db.all(req.body.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

// Pending

router.get('/pending', verifyAdmin, async (req, res) => {

  try {
    let results = await db.getPending();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

router.put('/pending', async (req, res) => {

  try {
    let results = await db.pendingStatus(req.body.id, req.body.status);
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

router.put('/edit', async (req, res) => {

  try {
    let results = await db.editNotice(req.body.id, req.body.title, req.body.description);
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

// Groups

router.get('/groups', async (req, res) => {

  try {
    let results = await db.groupsShow();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

router.put('/groups', async (req, res) => {

  try {
    let results = await db.groupsEdit(req.body.id, req.body.name);
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

router.delete('/groups/:id/:recursive', async (req, res) => {

  try {
    let results = await db.groupsDelete(req.params.id, (req.params.recursive === "true"));
    res.end();
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }

});

router.post('/groups', async (req, res) => {

  try {
    let results = await db.groupsNew(req.body.section, req.body.name);
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  
});

// Sections

router.get('/sections', async (req, res) => {

  try {
    let results = await db.sectionsShow();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

// New

router.get('/students', async (req, res) => {
  
  try {
    let results = await db.getStudents();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});
//  Seperate Staff and Admin shundies
router.post('/new', async (req, res) => {
  
  try {
    let results = await db.newNotice(req.body.uID, req.body.date, req.body.gID, req.body.title, req.body.description);
        
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

router.post('/tag/:id/:students', async (req, res) => {
  
  try {
    let results = await db.tagStudents(req.params.id, req.params.students);
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

// Export

router.get('/export/:date/:sections', async (req, res) => {
 
  try {
    let results = await db.exportNotices(req.params.date, req.params.sections);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

// Feed

router.get('/feed/:id', async (req, res) => {
  
  try {
    let results = await db.getMyNotices(req.params.id);
    res.json(results)
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

router.get('/subs/:id', async (req, res) => {
  
  try {
    let results = await db.getSubscriptions(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

router.post('/subs/:id/:add', async (req, res) => {
  
  try {
    let results = await db.addSubs(req.params.id, req.params.add);
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

router.delete('/subs/:id/:remove', async (req, res) => {
  
  try {
    let results = await db.unSub(req.params.id, req.params.remove);
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

// All

router.get('/all', async (req, res) => {

  try {
      let results = await db.getAll();
      res.json(results);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }

});

router.get('/u/:id', async (req, res) => {

  try {
    let results = await db.userByID(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

// Subscriptions

router.get('/subscriptions/:id', async (req, res) => {

  try {
    let results = await db.subsShow(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

router.get('/subscriptions/:uID/:gID', async (req, res) => {

  try {
    let results = await db.subsInsert(req.params.uID, req.params.gID);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

// Authentication

router.post('/login', async (req, res) => {

  try {
    let results = await db.login(req.body.username, req.body.password);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.status(401).send(e);
  }

})

function verifyAdmin(req, res, next) {
  if (!req.headers.authorization) {
    return res.sendStatus(401);
  }
  let token = req.headers.authorization.split(' ')[1];
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
    next()
  }
  catch {
    return res.sendStatus(401);
  }
}

module.exports = router;