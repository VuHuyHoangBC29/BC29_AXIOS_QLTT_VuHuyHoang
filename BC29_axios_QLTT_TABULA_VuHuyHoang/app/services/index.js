function Services() {
  this.getUserListByApi = function () {
    return axios({
      url: "https://628b995f667aea3a3e32d1a4.mockapi.io/api/QuanLyNguoiDung",
      method: "GET",
    });
  };

  this.deleteUserApi = function (id) {
    return axios ({
      url: `https://628b995f667aea3a3e32d1a4.mockapi.io/api/QuanLyNguoiDung/${id}`,
      method: "DELETE",
    })
  }

  this.addUserApi = function (nguoiDung) {
    return axios ({
      url: "https://628b995f667aea3a3e32d1a4.mockapi.io/api/QuanLyNguoiDung",
      method: "POST",
      data: nguoiDung,
    })
  }

  this.getUserApi = function (id) {
    return axios ({
      url: `https://628b995f667aea3a3e32d1a4.mockapi.io/api/QuanLyNguoiDung/${id}`,
      method: "GET",
    })
  }

  this.updateUserApi = function (nguoiDung) {
    return axios ({
      url: `https://628b995f667aea3a3e32d1a4.mockapi.io/api/QuanLyNguoiDung/${nguoiDung.id}`,
      method: "PUT",
      data: nguoiDung,
    })
  }
}
