$(document).ready(function() {
    $('.sidebar-item').click(function() {
        // 收起除当前点击的二级菜单之外的所有二级菜单
        $('.sidebar-second-level').not($(this).next()).slideUp();
        // 切换当前点击的二级菜单的显示状态
        $(this).next('.sidebar-second-level').slideToggle();
    });

    $('.sidebar-second-level a').click(function(e) {
        // 阻止子菜单链接的默认行为
        e.stopPropagation();
        // 移除所有子菜单项的激活状态
        $('.sidebar-second-level a').removeClass('active');
        // 移除所有父菜单项的激活状态
        $('.sidebar-item').removeClass('active');
        // 添加当前子菜单项的激活状态
        $(this).addClass('active');
        // 添加父菜单项的激活状态
        $(this).closest('.sidebar-second-level').prev('.sidebar-item').addClass('active');
    });

    $('.sidebar-btn').click(function() {
        $('.sidebar').toggleClass('hidden');
    });
});