function ShortnerService () {
  var self = this;
  self.shortid = require('shortid');
}

function getUidObject(ourDomainUrl, externalurl, id) {
  var self = this;
  return  {
    link: externalurl,
    id: ourDomainUrl + id
  };
}

function getUid () {
  var self = this;
  return self.shortid.generate();
}


ShortnerService.prototype = {
  getUidObject: getUidObject,
  getUid: getUid
};  

var shortnerService = new ShortnerService();

module.exports = shortnerService;
