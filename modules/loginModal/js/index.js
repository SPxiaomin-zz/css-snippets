/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */

$(function() {
    /**
     * 获取元素
     */
    var showModalLogin = $('#js_show_modal_login');
    var modalLogin = $('#js_modal_login');
    var modalLoginClose = $('#js_modal_login_close');
    var modalLoginUsername = $('#js_modal_login_username');
    var modalLoginPassword = $('#js_modal_login_password');
    var modalLoginSubmit = $('#js_modal_login_submit');

    /**
     * 表单验证
     */
    var validateLoginForm = function() {
        var _flag = true;

        if (modalLoginUsername.val().length <= 0) {
            _flag = false;
            modalLoginUsername.addClass('error');
        } else if (modalLoginPassword.val().length <= 0) {
            _flag = false;
            modalLoginPassword.addClass('error');
        }

        return _flag;
    };

    modalLoginUsername.on('input', function() {
        modalLoginUsername.removeClass('error');
    });

    modalLoginPassword.on('input', function() {
        modalLoginPassword.removeClass('error');
    });

    /**
     * 登录模态框的显示和关闭
     */
    showModalLogin.on('click', function() {
        modalLogin.removeClass('f-dn');
    });

    modalLoginClose.on('click', function() {
        modalLogin.addClass('f-dn');
    });

    /**
     * 表单提交
     */
    modalLoginSubmit.on('click', function(event) {
        event.preventDefault();

        if (validateLoginForm()) {
            modalLoginClose.triggerHandler('click');

            console.log('登录成功！！！');
        }
    });
});
