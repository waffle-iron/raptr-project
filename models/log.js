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
const mongoose = require('mongoose');

const ChecklistSchema = new mongoose.Schema({
  isGoodRepair: {
    type: Boolean,
    default: true
  },
  isSecured: {
    type: Boolean,
    default: true
  },
  doesMatchPaperwork: {
    type: Boolean,
    default: true
  },
  isAccepted: {
    type: Boolean,
    default: true
  }
});

const LogSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  // status is either inbound or outbound, so we shall use a boolean value here.
  // true = inbound
  // false = outbound
  status: {
    type: Boolean,
    default: true
  },
  carrier: String,
  tractorNumber: String,
  trailerNumberIn: String,
  trailerNumberOut: String,
  trailerSealNumber: String,
  loadNumber: String,
  timeIn: {
    type: Date,
    default: Date.now
  },
  timeOut: {
    type: Date
  },
  checklist: ChecklistSchema,
  signedInBy: String,
  signedOutBy: String,
  driver: String,
  routeNumber: String
});

const Log = mongoose.model('log', LogSchema);

module.exports = Log;
