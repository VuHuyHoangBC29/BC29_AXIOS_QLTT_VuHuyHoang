var service = new Services();

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

  data.forEach(function (user) {
    if (user.loaiND === "GV") {
      contentHTML += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card wow animate__animated animate__fadeInLeft">
              <div class="img__top">
                <img class="card-img-top" src="./images/${user.hinhAnh}" alt="" />
              </div>
              <div
                class="card-body d-flex flex-column align-items-center text-center"
              >
                <p class="country">${user.ngonNgu}</p>
                <h3 class="name">${user.hoTen}</h3>
                <p class="description text-center">
                ${user.moTa}
                </p>
              </div>
            </div>
          </div>
        `;
    }
  });

  getEle("testimonialList").innerHTML = contentHTML;
}
