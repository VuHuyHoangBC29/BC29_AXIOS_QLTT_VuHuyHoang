function Validation() {
  this.kiemTraRong = function (value, errorId, mess) {
    if (value === "") {
      getEle(errorId).innerHTML = mess;
      getEle(errorId).style.display = "block";
      return false;
    }
    getEle(errorId).innerHTML = "";
    getEle(errorId).style.display = "none";
    return true;
  };

  this.kiemTraTKTonTai = function (value, errorId, mess, arr) {
    var isStatus = true;

    arr.forEach(function (item) {
      if (item.id === value) {
        isStatus = false;
      }
    });

    if (isStatus) {
      getEle(errorId).innerHTML = "";
      getEle(errorId).style.display = "none";
      return true;
    }
    getEle(errorId).innerHTML = mess;
    getEle(errorId).style.display = "block";
    return false;
  };
}
