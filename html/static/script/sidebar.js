$(document).ready(function () {

    // $('.sidebar-second-level a').click(function (e) {
    //     // 阻止子菜单链接的默认行为
    //     e.stopPropagation();
        
    // });

    $('.sidebar-btn').click(function () {
        $('#sidebar').toggleClass('hidden');
        $('#main-content').toggleClass('hidden');
    });

    // $('#add-item').click(function () {
    //     // addFirstLevelItem('新菜单项', ['新子菜单项1', '新子菜单项2']);
    //     //获取"#login-time-filters").data('daterangepicker')的startDate属性，并转换为时间戳
    //     console.log($("#login-time-range-filters").data('daterangepicker').startDate._d.getTime());
    //     //获取"#login-time-filters").data('daterangepicker')的ednDate属性，在此基础上加一天，并转换为时间戳
    //     console.log($("#login-time-range-filters").data('daterangepicker').endDate._d.getTime());
    // });

    // // 函数：创建完整的一级菜单项（包含二级菜单项）
    // function createFirstLevelItem(title, subItems) {
    //     let secondLevelItems = '';
    //     subItems.forEach(item => {
    //         secondLevelItems += `<li><a href="#">${item}</a></li>`;
    //     });

    //     const firstLevelItem = `
    //         <li>
    //             <div class="sidebar-item"><span>${title}</span></div>
    //             <ul class="sidebar-second-level">
    //                 ${secondLevelItems}
    //             </ul>
    //         </li>`;
    //     return firstLevelItem;
    // }

    // // 函数：将一级菜单项添加到菜单中
    // function addFirstLevelItem(title, subItems) {
    //     const firstLevelItem = createFirstLevelItem(title, subItems);
    //     $('.sidebar-first-level').append(firstLevelItem);

    //     // 重新绑定事件处理函数
    //     $('.sidebar-item').off('click').on('click', function () {
    //         $('.sidebar-second-level').not($(this).next()).slideUp();
    //         $(this).next('.sidebar-second-level').slideToggle();
    //     });

    //     $('.sidebar-second-level a').off('click').on('click', function (e) {
    //         e.stopPropagation();
    //         $('.sidebar-second-level a').removeClass('active');
    //         $('.sidebar-item').removeClass('active');
    //         $(this).addClass('active');
    //         $(this).closest('.sidebar-second-level').prev('.sidebar-item').addClass('active');
    //     });
    // }

});




function chooseSidebar(ownId) {
    // 收起除当前点击的二级菜单之外的所有二级菜单
    $('#sidebar-first-level li').not($(`#${ownId}`)).find('.sidebar-second-level').slideUp();
    // 切换当前点击的二级菜单的显示状态
    $(`#${ownId}`).find('.sidebar-second-level').slideToggle();
}



function chooseSubSidebar(fatherId, subOwnId, subRelateId) {
    // 移除所有子菜单项的激活状态
    $('.sidebar-second-level a').removeClass('active');
    // 移除所有父菜单项的激活状态
    $('#sidebar-first-level a').removeClass('active');
    // 添加当前子菜单项的激活状态
    $(`#${subOwnId} a`).addClass('active');
    // 添加父菜单项的激活状态
    $(`#${subOwnId}`).closest('.sidebar-second-level').prev('a').addClass('active');

    // 隐藏所有div，除了所选的div
    $(`#${fatherId}`).children('div').not($(`#${subRelateId}`)).hide();
    $(`#${subRelateId}`).show();
}

function fetchSidebar(id) {
    // 清空sidebar ul元素
    $('#sidebar-first-level').empty();
    // $.ajax({
    //     url: '/sidebarList',
    //     method: 'GET',
    //     data: {
    //         id: id
    //     },
    //     success: function (res) {
    //         console.log(res);
    //         renderSidebar(res.sidebarList);
    //     }
    // });
    //-------------------------测试-------------------------
    $.getJSON('static/testJson/sidebarList/' + id + '.json', function (res) {
        renderSidebar(res.sidebarList);

        renderSidebarDiv(id, res.sidebarList);
        // 渲染第一个子菜单
        if (res.sidebarList.length > 0) {
            if (res.sidebarList[0].subSidebar.length > 0) {
                chooseSubSidebar(res.sidebarList[0].relateId, res.sidebarList[0].subSidebar[0].subOwnId, res.sidebarList[0].subSidebar[0].subRelateId);
            }
        }
    }).fail(function (res) {
        console.log(res);
    });

    //-------------------------测试-------------------------
}


function renderSidebar(sidebarList) {
    // 遍历sidebarList
    for (let i = 0; i < sidebarList.length; i++) {
        let sidebarItem = sidebarList[i]; // 使用let代替var
        // 创建li元素
        var $newSidebarItem = $(`<li id="${sidebarItem.ownId}"><a href="#">${sidebarItem.name}</a></li>`);

        // 创建子菜单的ul元素
        var $subMenu = $('<ul class="sidebar-second-level"></ul>');
        // 遍历子菜单
        for (let j = 0; j < sidebarItem.subSidebar.length; j++) {
            let subItem = sidebarItem.subSidebar[j]; // 使用let代替var
            // 创建子菜单的li元素
            var $newSubMenuItem = $(`<li id="${subItem.subOwnId}"><a href="#">${subItem.subName}</a></li>`);
            $newSubMenuItem.on('click', function (event) {
                event.stopPropagation(); // 防止事件冒泡
                chooseSubSidebar(sidebarItem.relateId, subItem.subOwnId, subItem.subRelateId);
            });
            // 将子菜单li元素添加到子菜单ul元素中
            $subMenu.append($newSubMenuItem);
        }

        // 将子菜单ul元素添加到主菜单li元素中
        $newSidebarItem.append($subMenu);

        // 为主菜单li元素添加click事件处理函数
        $newSidebarItem.on('click', function (event) {
            event.stopPropagation(); // 防止事件冒泡
            chooseSidebar(sidebarItem.ownId);
        });

        // 将主菜单li元素添加到sidebar ul元素中
        $('#sidebar-first-level').append($newSidebarItem);
    }
}


function renderSidebarDiv(fatherId ,sidebarList) {
    for (let i = 0; i < sidebarList.length; i++) {
        let sidebarItem = sidebarList[i];
        var $newSidebarDiv = $(`<div id="${sidebarItem.relateId}"></div>`);
        for (let j = 0; j < sidebarItem.subSidebar.length; j++) {
            let subItem = sidebarItem.subSidebar[j];
            var $newSubSidebarDiv = $(`<div id="${subItem.subRelateId}"></div>`);
            $newSidebarDiv.append($newSubSidebarDiv);
        }
        $(`#${fatherId}`).append($newSidebarDiv);
    }
}
