var sname = document.getElementById("siteName");
var url = document.getElementById("siteurl");
var urlList = [];
if (localStorage.getItem("urls") != null) {
  urlList = JSON.parse(localStorage.getItem("urls"));
  displaydata();
}

function addurl() {
  if (validationname() === true && validationurl() === true) {
    var urlobj = {
      sitename: sname.value,
      siteurl: url.value,
    };
    urlList.push(urlobj);
    localStorage.setItem("urls", JSON.stringify(urlList));
    clearform();
    displaydata();
  } else {
    div = "";
    div += `<div class=" alertdiv w-100 h-100 d-flex justify-content-center align-items-center">
        <div class="alretdivall d-flex justify-content-center align-items-center ">
            <div class="aleert bg-white rounded p-4">
                <div class="alrethead d-flex justify-content-between">
                    <div class="headcircle d-flex">
                        <span class="S1"></span>
                        <span class="S2"></span>
                        <span class="S3"></span>
                    </div> 
                    <div class="clearalret">
                        <label for="clear"><i class="fa-solid fa-x fa-xl"></i></label>
                        <input type="checkbox" id="clear" hidden>
                    </div>
                </div>
                <p class="fw-bold py-3">Site Name or Url is not valid, Please follow the rules below :</p>
                <ul>
                    <li><i class="fa-regular fa-circle-right pe-2"></i>Site name must contain at least 3 characters</li>
                    <li><i class="fa-regular fa-circle-right pe-2"></i>Site URL must be a valid one</li>
                </ul>
            </div>
        </div>
    </div>`;
    document.getElementById("alert").innerHTML = div;
  }
}

function displaydata() {
  var tr = "";
  for (var i = 0; i < urlList.length; i++) {
    tr += `
        <tr>
            <td>${i + 1}</td>
            <td>${urlList[i].sitename}</td>
            <td><a href="${
              urlList[i].siteurl
            }" target="_blank"><button class="btn vistbtn"><i class="fa-solid fa-eye pe-1"></i> Visit</button></a></td>
            <td><button onclick="deletedata(${i})" class="btn deletebtn"><i class="fa-solid fa-trash-can pe-1"></i>Delete</button></td>
            </tr>`;
  }
  document.getElementById("tableBody").innerHTML = tr;
}

function clearform() {
  sname.value = "";
  url.value = "";
}

function deletedata(index) {
  urlList.splice(index, 1);
  localStorage.setItem("urls", JSON.stringify(urlList));
  displaydata();
}

function validationname() {
  var nameregex = /([A-Z]|[a-z]|[0-9]){3,}/;
  var nameValue = sname.value;
  if (nameregex.test(nameValue) == true) {
    return true;
  } else {
    return false;
  }
}
function validationurl() {
  var urlregex =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/;
  var urlValue = url.value;
  if (urlregex.test(urlValue) == true) {
    return true;
  } else {
    return false;
  }
}
