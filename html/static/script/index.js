document.addEventListener('DOMContentLoaded', function () {
    fetchServiceMenu();
    // loadScript("./static/script/resource-pool.js");
});

$(document).ready(function () {

});


function fetchServiceMenu() {
    $.ajax({
        url: '/serviceMenuList',
        method: 'GET',
        success: function (res) {
            renderServiceMenu(res.serviceMenuList);
            //获取所有相关功能的script
            for (let i = 0; i < res.serviceMenuList.length; i++) {
                let scripts = res.serviceMenuList[i].scripts;
                for (let j = 0; j < scripts.length; j++) {
                    loadScript(scripts[j]);
                }
            }
            if (res.serviceMenuList.length > 0) {
                //显示第一个功能的sidebar
                fetchSidebar(res.serviceMenuList[0].ownId)
            }
        },
        error: function (res) {
            //-------------------------测试-------------------------
            $.getJSON('static/testJson/serviceMenuList.json', function (res) {
                renderServiceMenu(res.serviceMenuList);
                //获取所有相关功能的script
                for (let i = 0; i < res.serviceMenuList.length; i++) {
                    let scripts = res.serviceMenuList[i].scripts;
                    for (let j = 0; j < scripts.length; j++) {
                        loadScript(scripts[j]);
                    }
                }
                if (res.serviceMenuList.length > 0) {
                    //显示第一个功能的sidebar
                    fetchSidebar(res.serviceMenuList[0].ownId)
                }
            }
            ).fail(function (res) {
                console.log("err" + res);
            });
            //-------------------------测试-------------------------
        }
    });


}

function renderServiceMenu(serviceMenuList) {
    // 遍历serviceMenuList
    // 为每个serviceMenuList生成一个li元素
    // 为每个li元素添加一个click事件处理函数
    // 在click事件处理函数中调用chooseService函数
    // 将li元素添加到ul元素中
    for (let i = 0; i < serviceMenuList.length; i++) {
        let serviceMenu = serviceMenuList[i];
        var $newMenu = $(`<li id="${serviceMenu.ownId}"><a href="#">${serviceMenu.name}</a></li>`);
        $newMenu.on('click', function (event) {
            chooseService(serviceMenu.relatedId);
        });

        $('#service-menu').append($newMenu);
    }
}

function fetchSidebar(id) {
    $.ajax({
        url: '/sidebarList',
        method: 'GET',
        data: {
            id: id
        },
        success: function (res) {
            console.log(res);
            renderSidebar(res.sidebarList);
        }
    });
    //-------------------------测试-------------------------
    $.getJSON('static/testJson/sidebarList/' + id + '.json', function (res) {
        renderSidebar(res.sidebarList);
    }).fail(function (res) {
        console.log(res);
    });

    //-------------------------测试-------------------------
}


function renderSidebar(sidebarList) {
    // 清空sidebar ul元素
    $('#sidebar-first-level').empty();
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
                chooseSubSidebar(subItem.subOwnId, subItem.subRelateId);
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


function chooseService(relatedId) {
    // 选择当前服务
    fetchSidebar(relatedId);
}

