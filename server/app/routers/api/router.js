const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const itemsRouter = require("./items/router");

router.use("/items", itemsRouter);

/* ************************************************************************* */
const tasksRouter = require("./tasks/router");

router.use("/tasks", tasksRouter);

module.exports = router;
