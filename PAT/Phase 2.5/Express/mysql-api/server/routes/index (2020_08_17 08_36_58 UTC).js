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
    let results = await db.pendingShow();
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

router.patch('/edit', async (req, res, next) => {

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

router.patch('/groups/:id/:name', async (req, res, next) => {

  try {
    let results = await db.groupsEdit(req.params.id, req.params.name);
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