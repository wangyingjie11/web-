$(function () {
  function cc() {
    $.ajax({
      method: "get",
      url: "/my/userinfo",
      //   headers: {
      //     Authorization: localStorage.getItem("token") || "",
      //   },
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg("获取数据失败");
        }
        ee(res.data);
      },
      complete: function (res) {
        console.log(res);
      },
    });
  }
  function ee(user) {
    var name = user.nickname || user.username;
    // console.log(name);
    $(".txt").html(name);
    if (user.user_pic !== null) {
      $(".text-img img").prop("src", user.user_pic).show();
      $(".text-img .text-txt").hide();
    } else {
      var first = name[0].toUpperCase();
      $(".text-img img").hide();
      $(".text-img .text-txt").show().html(first);
    }
  }
  cc();

  //退出

  $("#logout").on("click", function () {
    // alert(1);
    layui.layer.confirm(
      "你确定要退出吗？",
      { icon: 3, title: "提示" },
      function (index) {
        //do something
        localStorage.removeItem("token");
        location.href = "/login.html";
        layui.layer.close(index);
      }
    );
  });
});
