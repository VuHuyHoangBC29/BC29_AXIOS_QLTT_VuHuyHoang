var service = new Services();
var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

function getUserList() {
  service
    .getUserListByApi()
    .then(function (result) {
      renderUserList(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getUserList();

function renderUserList(data) {
  var contentHTML = "";

  data.forEach(function (user, index) {
    contentHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.taiKhoan}</td>
                <td>${user.matKhau}</td>
                <td>${user.hoTen}</td>
                <td>${user.email}</td>
                <td>${user.ngonNgu}</td>
                <td>${user.loaiND}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal"
                    data-target="#myModal" onclick="editUser(${
                      user.id
                    })">Sửa</button> 
                    <button class="btn btn-danger" onclick="deleteUser(${
                      user.id
                    })">Xóa</button> 
                </td>
            </tr>
        `;
  });

  getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;
}

function defaultStatus() {
  getEle("TaiKhoan").value = "";
  getEle("HoTen").value = "";
  getEle("MatKhau").value = "";
  getEle("Email").value = "";
  getEle("HinhAnh").value = "";
  getEle("loaiNguoiDung").value = "Chọn loại người dùng";
  getEle("loaiNgonNgu").value = "Chọn ngôn ngữ";
  getEle("MoTa").value = "";
}
/**
 * Xóa người dùng
 */
function deleteUser(id) {
  // console.log(id);
  service
    .deleteUserApi(id)
    .then(function () {
      getUserList();
    })
    .catch(function (error) {
      console.log(error);
    });
}

getEle("btnThemNguoiDung").onclick = function () {
  defaultStatus();
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Thêm nguời dùng";

  var footer = `<button class="btn btn-success" onclick="addUser()">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
};

/**
 * Lấy thông tin người dùng
 */
function layThongTinND() {
  getUserList();

  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  //Check validation
  var isValid = true;

  //taiKhoan
  isValid &=
    validation.kiemTraRong(taiKhoan, "tbTK", "Vui lòng nhập tài khoản") &&
    validation.kiemTraTKTonTai(
      taiKhoan,
      "tbTK",
      "Tài khoản đã tồn tại",
      
    );

  if (!isValid) return;

  //new User
  var nguoiDung = new NguoiDung(
    "",
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );

  return nguoiDung;
}

/**
 * Thêm người dùng
 */
function addUser() {
  // var taiKhoan = getEle("TaiKhoan").value;
  // var hoTen = getEle("HoTen").value;
  // var matKhau = getEle("MatKhau").value;
  // var email = getEle("Email").value;
  // var hinhAnh = getEle("HinhAnh").value;
  // var loaiND = getEle("loaiNguoiDung").value;
  // var ngonNgu = getEle("loaiNgonNgu").value;
  // var moTa = getEle("MoTa").value;

  // //new User
  // var nguoiDung = new NguoiDung(
  //   "",
  //   taiKhoan,
  //   hoTen,
  //   matKhau,
  //   email,
  //   loaiND,
  //   ngonNgu,
  //   moTa,
  //   hinhAnh
  // );
  var nguoiDung = layThongTinND();
  if (nguoiDung) {
    service
      .addUserApi(nguoiDung)
      .then(function () {
        getUserList();
        document.getElementsByClassName("close")[0].click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

/**
 * Sửa người dùng
 */
function editUser(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Sửa nguời dùng";

  var footer = `<button class="btn btn-success" onclick="updateUser(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
  // console.log(123);
  service
    .editUserApi(id)
    .then(function (result) {
      getEle("TaiKhoan").value = result.data.taiKhoan;
      getEle("HoTen").value = result.data.hoTen;
      getEle("MatKhau").value = result.data.matKhau;
      getEle("Email").value = result.data.email;
      getEle("HinhAnh").value = result.data.hinhAnh;
      getEle("loaiNguoiDung").value = result.data.loaiND;
      getEle("loaiNgonNgu").value = result.data.ngonNgu;
      getEle("MoTa").value = result.data.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Cập nhật người dùng
 */
function updateUser(id) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  var nguoiDung = new NguoiDung(
    id,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );

  service
    .updateUserApi(nguoiDung)
    .then(function () {
      getUserList();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
