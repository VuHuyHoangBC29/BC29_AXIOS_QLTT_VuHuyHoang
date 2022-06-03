var service = new Services();
var validation = new Validation();
var danhSachND = [];

function getEle(id) {
  return document.getElementById(id);
}

function getUserList() {
  service
    .getUserListByApi()
    .then(function (result) {
      renderUserList(result.data);
      danhSachND = result.data;
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

  getEle("tbTK").innerHTML = "";
  getEle("tbHoTen").innerHTML = "";
  getEle("tbMatKhau").innerHTML = "";
  getEle("tbEmail").innerHTML = "";
  getEle("tbHinhAnh").innerHTML = "";
  getEle("tbND").innerHTML = "";
  getEle("tbNgonNgu").innerHTML = "";
  getEle("tbMoTa").innerHTML = "";

  getEle("TaiKhoan").disabled = false;
}

getEle("btnThemNguoiDung").onclick = function () {
  defaultStatus();
};

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
function layThongTinND(isAdd) {
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
  if (isAdd) {
    isValid &=
      validation.kiemTraRong(taiKhoan, "tbTK", "Vui lòng nhập tài khoản") &&
      validation.kiemTraTKTonTai(
        taiKhoan,
        "tbTK",
        "Tài khoản đã tồn tại",
        danhSachND
      );
  }

  //hoTen
  isValid &=
    validation.kiemTraRong(hoTen, "tbHoTen", "Vui lòng nhập họ tên") &&
    validation.kiemTraChuoiKiTu(
      hoTen,
      "tbHoTen",
      "Vui lòng nhập đúng chuỗi kí tự"
    );

  //matKhau
  isValid &=
    validation.kiemTraRong(matKhau, "tbMatKhau", "Vui lòng nhập mật khẩu") &&
    validation.kiemTraMatKhau(
      matKhau,
      "tbMatKhau",
      "Mật khẩu phải chứa 6-8 ký tự, có ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
    ) &&
    validation.kiemTraDoDaiKiTu(
      matKhau,
      "tbMatKhau",
      6,
      8,
      "Mật khẩu phải chứa 6-8 ký tự, có ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
    );

  //email
  isValid &=
    validation.kiemTraRong(email, "tbEmail", "Vui lòng nhập email") &&
    validation.kiemTraEmail(
      email,
      "tbEmail",
      "Vui lòng nhập đúng định dạng email"
    );

  //hinhAnh
  isValid &= validation.kiemTraRong(
    hinhAnh,
    "tbHinhAnh",
    "Vui lòng nhập hình ảnh"
  );

  //loaiND
  isValid &= validation.kiemTraChon(
    "loaiNguoiDung",
    "tbND",
    "Vui lòng chọn loại người dùng"
  );

  //loaiND
  isValid &= validation.kiemTraChon(
    "loaiNgonNgu",
    "tbNgonNgu",
    "Vui lòng chọn ngôn ngữ"
  );

  //moTa
  isValid &=
    validation.kiemTraRong(moTa, "tbMoTa", "Vui lòng nhập mô tả") &&
    validation.kiemTraDoDaiKiTu(
      moTa,
      "tbMoTa",
      0,
      60,
      "Mô tả không được vượt quá 60 kí tự"
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
  var nguoiDung = layThongTinND(true);
  console.log(nguoiDung);
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
    .getUserApi(id)
    .then(function (result) {
      getEle("TaiKhoan").value = result.data.taiKhoan;
      getEle("HoTen").value = result.data.hoTen;
      getEle("MatKhau").value = result.data.matKhau;
      getEle("Email").value = result.data.email;
      getEle("HinhAnh").value = result.data.hinhAnh;
      getEle("loaiNguoiDung").value = result.data.loaiND;
      getEle("loaiNgonNgu").value = result.data.ngonNgu;
      getEle("MoTa").value = result.data.moTa;

      // console.log(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  getEle("TaiKhoan").disabled = "true";
}

/**
 * Cập nhật người dùng
 */
function updateUser(id) {
  var nguoiDung = layThongTinND(false);

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
