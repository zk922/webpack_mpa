function getType(x){
  return Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
}


module.exports = {
  getType
};
