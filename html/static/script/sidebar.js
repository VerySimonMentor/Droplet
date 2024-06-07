$(document).ready(function () {

    $('.sidebar-second-level a').click(function (e) {
        // 阻止子菜单链接的默认行为
        e.stopPropagation();
        
    });

    $('.sidebar-btn').click(function () {
        $('#sidebar').toggleClass('hidden');
        $('.main-content').toggleClass('hidden');
    });

    $('#add-item').click(function () {
        // addFirstLevelItem('新菜单项', ['新子菜单项1', '新子菜单项2']);
        //获取"#login-time-filters").data('daterangepicker')的startDate属性，并转换为时间戳
        console.log($("#login-time-range-filters").data('daterangepicker').startDate._d.getTime());
        //获取"#login-time-filters").data('daterangepicker')的ednDate属性，在此基础上加一天，并转换为时间戳
        console.log($("#login-time-range-filters").data('daterangepicker').endDate._d.getTime());
    });

    // 函数：创建完整的一级菜单项（包含二级菜单项）
    function createFirstLevelItem(title, subItems) {
        let secondLevelItems = '';
        subItems.forEach(item => {
            secondLevelItems += `<li><a href="#">${item}</a></li>`;
        });

        const firstLevelItem = `
            <li>
                <div class="sidebar-item"><span>${title}</span></div>
                <ul class="sidebar-second-level">
                    ${secondLevelItems}
                </ul>
            </li>`;
        return firstLevelItem;
    }

    // 函数：将一级菜单项添加到菜单中
    function addFirstLevelItem(title, subItems) {
        const firstLevelItem = createFirstLevelItem(title, subItems);
        $('.sidebar-first-level').append(firstLevelItem);

        // 重新绑定事件处理函数
        $('.sidebar-item').off('click').on('click', function () {
            $('.sidebar-second-level').not($(this).next()).slideUp();
            $(this).next('.sidebar-second-level').slideToggle();
        });

        $('.sidebar-second-level a').off('click').on('click', function (e) {
            e.stopPropagation();
            $('.sidebar-second-level a').removeClass('active');
            $('.sidebar-item').removeClass('active');
            $(this).addClass('active');
            $(this).closest('.sidebar-second-level').prev('.sidebar-item').addClass('active');
        });
    }

});




function chooseSidebar(ownId) {
    // 收起除当前点击的二级菜单之外的所有二级菜单
    $('#sidebar-first-level').not($(`#${ownId}`)).find('.sidebar-second-level').slideUp();
    // 切换当前点击的二级菜单的显示状态
    $('#'+ownId).find('.sidebar-second-level').slideToggle();
}



function chooseSubSidebar(subOwnId, subRelateId) {
    // 移除所有子菜单项的激活状态
    $('.sidebar-second-level a').removeClass('active');
    // 移除所有父菜单项的激活状态
    $('#sidebar-first-level a').removeClass('active');
    // 添加当前子菜单项的激活状态
    $(`#${subOwnId} a`).addClass('active');
    // 添加父菜单项的激活状态
    $(`#${subOwnId}`).closest('.sidebar-second-level').prev('a').addClass('active');
}