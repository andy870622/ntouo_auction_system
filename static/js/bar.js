function signUpString() {
  return (location.href = '/presignup').toString();
}

function signIn() {
  return (location.href = '/signin').toString();
}

function index() {
  return (location.href = '/').toString();
}

function signOut() {
  return (location.href = '/signout').toString();
}

function viewHistory() {
  location.href = '/history';
}
// function goSignIn() {
//   location.href = "{% url 'signin' %}";
// }


function memberCenter() {
  return (location.href = '/membercenter').toString();
}


var isLoading = true;
var spinner = document.getElementById("loader");
var user_name = "";
var user_status = false;
var searchProduct;
var category;

//增加縮小視窗後的bar
$("body").prepend("<div id='pos-f-t' class='pos-f-t'><nav  class='navbar navbar-dark bg-dark'>" +
  "<button id='afterBut' class='navbar-toggler' disabled type='button' data-toggle='collapse' data-target='#navbarToggleExternalContent' aria-controls='navbarToggleExternalContent' aria-expanded='false' aria-label='Toggle navigation'>" +
  "<span class='navbar-toggler-icon'></span>" +
  "</button>" +
  "</nav>"+
  "<div class='collapse' id='navbarToggleExternalContent'>" +
  "<div class='bg-dark'>"+
  "<ul id='mySmallNavbar'></ul><br></div></div></div>");

//拿到username
$.ajax({
  url: "/getusername/",
  type: 'POST',
  cache: false,
  async: false,
  success: function(response) {
    user_name = response;
  }
});

//拿到idtoken
$.ajax({
  url: "/checkuserstatus/",
  type: 'POST',
  cache: false,
  async: false,
  success: function(response) {
    user_status = response.status;
  }
});

//拿到分類表
$.ajax({
  url: "/getcategory/",
  type: 'POST',
  cache: false,
  async: false,
  success: function(response) {
    category = response.split(",");
  }
});

setBody();
//加入分類表 BAR
function setBody() {
  for (i = 0; i < category.length; i++) {
    var plzwork = String(category[i]);
    //分類表
    $("#myNavbar").append("<li><a data-toggle='tab' onclick='searchCategory("+i+")' href='#'><img class='categorie categorie-" + i + "'>" + category[i] + "</a></li>");
    $("#mySmallNavbar").append("<li><a data-toggle='tab' onclick='searchCategory("+i+")' href='#'><img class='categorie categorie-" + i + "'>" + category[i] + "</a></li>");

  }
  var body = document.getElementsByTagName("body");
  //上方bar
  var need;
  var need2;

  if (!user_status || user_name == "") {
    need =
      " <header class='header1'><img onclick='index()' style='position:absolute;width:50px;height:50px;margin-left:10px;margin-top:5px;' src='/static/img/ntoulogo.png'><div style='margin-top:15px'><a  onclick='index()' id='sign'>海大拍賣</a><input type=button onclick='searchProduct()' value='搜尋' style='font-size:15px;'><input id='keyword' type='text' value='' style='width:100px;'>" +
      "<span id='bar' class='bar' style='color:white; float: right;'>" +
      "<a onclick='memberCenter()'>會員中心</a><a onclick='openCommand()'>意見回饋</a><a onclick='viewHistory()'>瀏覽紀錄</a><a onclick='signIn()'> 登入</a><a onclick='signUpString()'> 註冊</a></span></div></header>";
    need2 = "<span id='bar2'>" +
      "<a onclick='memberCenter()'>會員中心</a><a onclick='openCommand()'>意見回饋</a><a onclick='viewHistory()'>瀏覽紀錄</a><a onclick='signIn()'> 登入</a><a onclick='signUpString()'> 註冊</a></span>"
  } else {
    need =
      " <header class='header1'><img onclick='index()' style='position:absolute;width:50px;height:50px;margin-left:10px;margin-top:5px;' src='/static/img/ntoulogo.png'><div style='margin-top:15px'><a onclick='index()' id='sign'>海大拍賣</a><input onclick='searchProduct()' type=button value='搜尋'  style='font-size:15px;'><input id='keyword' type='text' value='' style='width:100px;'>" +
      "<span id='bar' class='bar' style='color:white; float: right;'>" +
      "<a onclick='memberCenter()'>會員中心</a><a onclick='openCommand()'>意見回饋</a><a onclick='viewHistory()'>瀏覽紀錄</a><a onclick='signOut()'> 登出</a><a>" + user_name + "</a><span></div></header>";

    need2 = "<span id='bar2'>" +
      "<a onclick='memberCenter()'>會員中心</a><a onclick='openCommand()'>意見回饋</a><a onclick='viewHistory()'>瀏覽紀錄</a><a onclick='signOut()'> 登出</a><a>" + user_name + "</a></span>";
  }

  $("#afterBut").after(need2);
  $("body").prepend(need);
  $("#keyword").keyup(function(e){
      if(e.keyCode === 13)
      {
        searchProduct();
      }
  });
}

//分類搜尋
function searchCategory(number)
{
  $.ajax(
    {
      url:"/searchcategory/",
      type:'POST',
      data:{'category':category[number]},
      cache:false,
      async:false,
      success:function(response)
      {
         location.href = response;
      }
    }
  );
}

//一般搜尋
function searchProduct()
{
  var keyword = document.getElementById('keyword').value;
  keyword = keyword.trim();

  if(keyword != "")
  {
  $.ajax(
    {
      url:"/searchproduct/",
      type:'POST',
      data:{'keyword':keyword},
      cache:false,
      async:false,
      success:function(response)
      {
         location.href = response;
      }
    }
  );
  }
}

//完成loading
function start() {
  if (isLoading) {
    $("#loader").hide();
    $("#loadspace").css("display", "none");
    isLoading = false;
  }
}

//開啟google表單
function openCommand() {
  window.open(' https://forms.gle/TwwdvBqdyqwR4TXf8 ', '', config = 'height=700,width=500');
}

//重設視窗大小
$(function() {
  $(window).resize(function() {
    wid = $(window).width();

    var barHeight = $(".header1").height();
    $(".pos-f-t").css('top', barHeight + 'px');
    $("#bar2").css('margin-left', 50 + "px");
    $("#bar2").css('width', wid * 0.8 + "px");
    $("#loadspace").css('top', barHeight + "px");
    if ($(window).width() < 1040) {
      $("#loadspace").css('top', barHeight + 58 + "px");
    }

  }).resize()
});
