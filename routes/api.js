/* MIT License
*
*  Copyright (c) 2017 Luke Brown
*  
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the "Software"), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*  
*  The above copyright notice and this permission notice shall be included in all
*  copies or substantial portions of the Software.
*  
*  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
*  SOFTWARE.
*/
const express = require('express');
const cors = require('cors');
const router = express.Router();
const Logs = require('../models/log');

const whitelist = [
  // 'http://localhost:8080',
  'https://raptr-project.herokuapp.com/'
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}

// Catch Errors HOF
// returns new function with chained .catch method
const catchErrors = (fn) => (req, res, next) => fn(req, res, next).catch(next);

// Create new Log
const newLog = async (req, res, next) => {
  const new_log = await Logs.create(req.body);
  res.send(new_log);
};

// Retrieve all Logs
const allLogs = async (req, res, next) => {
  const logs = await Logs.find({}).sort({ _id: -1 })
  res.send(logs);
};

// Retrieve specific Log
const aLog = async (req, res, next) => {
  const log = await Logs.findById({ _id: req.params.id })
  res.send(log);
};

// Update specific Log
const updatedLog = async (req, res, next) => {
  const update_log = await Logs.findByIdAndUpdate({ _id: req.params.id }, req.body);
  const updated_log = await Logs.findById({ _id: req.params.id });
  res.send(updated_log);
};

// Delete specific Log
const deletedLog = async (req, res, next) => {
  const deleted_log = await Log.findByIdAndRemove({ _id: req.params.id });
  res.send(deleted_log);
};

// API Endpoints
router.post("/logs", cors(corsOptions), catchErrors(newLog));
router.get("/logs",cors(corsOptions), catchErrors(allLogs));
router.get("/logs/:id", cors(corsOptions), catchErrors(aLog));
router.put("/logs/:id", cors(corsOptions), catchErrors(updatedLog));
router.delete("/logs/:id", cors(corsOptions), catchErrors(deletedLog));

module.exports = router;
