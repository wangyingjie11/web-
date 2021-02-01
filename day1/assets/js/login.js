$(function () {
  $("#login").on("click", function () {
    $(this).parents(".login-box").hide();
    $(".reg-box").show();
  });
  $("#reg").on("click", function () {
    $(this).parents(".reg-box").hide();
    $(".login-box").show();
  });

  layui.form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      var repwdd = $(".reg-box [name=password]").val();
      if (repwdd !== value) {
        return "两次输入的密码不一致";
      }
    },
  });

  $("#form-reg").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/api/reguser",
      data: {
        username: $(".reg-box [name=username]").val(),
        password: $(".reg-box [name=password]").val(),
      },
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          //   return console.log("注册失败");
          return layui.layer.msg("注册失败");
        }
        layui.layer.msg("注册成功了，请登录");
        $("#reg").click();
      },
    });
  });
  $("#form-login").on("submit", function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
      method: "post",
      url: "/api/login",
      data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) return layui.layer.msg("登录失败");
        layui.layer.msg("登录成功");
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      },
    });
  });
});
