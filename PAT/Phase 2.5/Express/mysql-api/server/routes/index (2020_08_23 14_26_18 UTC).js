const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res, next) => {

  try {
    let results = await db.all(req.body.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

// Pending  

router.get('/pending', async (req, res, next) => {

  try {
    let results = await db.getPending();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

router.put('/pending', async (req, res, next) => {

  try {
    let results = await db.pendingStatus(req.body.id, req.body.status);
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

router.put('/edit', async (req, res, next) => {

  try {
    let results = await db.editNotice(req.body.id, req.body.title, req.body.description);
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

// Groups

router.get('/groups', async (req, res, next) => {

  try {
    let results = await db.groupsShow();
    // console.log(results)
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

router.put('/groups', async (req, res, next) => {

  try {
    let results = await db.groupsEdit(req.body.id, req.body.name);
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

router.delete('/groups', async (req, res, next) => {

  db.groupsDelete(req.body.id, req.body.recursive)
  .then(r => res.end())
  .catch(e => {
    console.log(e);
    res.status(500).send(e);
  });

  // try {
  //   let results = await db.groupsDelete(req.params.id);
  //   res.end();
  // } catch (e) {
  //   console.log(e);
  //   res.sendStatus(500);
  // }
});

// Sections
router.get('/sections', async (req, res, next) => {

  try {
    let results = await db.sectionsShow();
    // console.log(results)
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});


router.get('/u/:id', async (req, res, next) => {

  try {
    let results = await db.userByID(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

router.get('/view-all', async (req, res, next) => {

  try {
    let results = await db.allNotices();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

router.get('/subscriptions/:id', async (req, res, next) => {

  try {
    let results = await db.subsShow(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});

router.get('/subscriptions/:uID/:gID', async (req, res, next) => {

  try {
    let results = await db.subsInsert(req.params.uID, req.params.gID);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});
module.exports = router;