$('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
    console.log(123);
})
$('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
})
// 表单验证
var form = layui.form
form.verify({
    pwd: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
        var pwd = $('.reg-box [name=password]').val()
        if (pwd !== value) {
            return '两次输入的密码不一样'
        }

    }
})
// 发起注册用户的Ajax请求
// 监听注册表单提交事件
$('#form_reg').on('submit', function (e) {
    // 阻止默认行为
    e.preventDefault()
    var layer = layui.layer

    $.post('/api/reguser', {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
    }, function (res) {
        if (res.status !== 0) {
            console.log(res.status);
            return layer.msg('失败了')
        }
        layer.msg('注册成功请登录')
        $('#link_login').click()
    })
})
// 发起登录的ajax请求
// 监听登录表单提交事件
$('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/api/login',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('失败')
            }
            layer.msg('登录成功')
            localStorage.setItem('token', res.token)
            location.href = '/index.html'
        }
    })
})
