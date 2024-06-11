document.addEventListener('DOMContentLoaded', function () {
    fetchServiceMenu();
    // loadScript("./static/script/resource-pool.js");
});

$(document).ready(function () {

});


function fetchServiceMenu() {
    // $.ajax({
    //     url: '/serviceMenuList',
    //     method: 'GET',
    //     success: function (res) {
    //         renderServiceMenu(res.serviceMenuList);
    //         //获取所有相关功能的script
    //         for (let i = 0; i < res.serviceMenuList.length; i++) {
    //             let scripts = res.serviceMenuList[i].scripts;
    //             for (let j = 0; j < scripts.length; j++) {
    //                 loadScript(scripts[j]);
    //             }
    //         }
    //         renderServiceDiv(res.serviceMenuList);
    //         if (res.serviceMenuList.length > 0) {
    //             //显示第一个功能的sidebar
    //             fetchSidebar(res.serviceMenuList[0].ownId)
    //         }
    //     },
    //     error: function (res) {

    //     }
    // });

    //-------------------------测试-------------------------
    $.getJSON('static/testJson/serviceMenuList.json', function (res) {
        renderServiceMenu(res.serviceMenuList);
        renderServiceDiv(res.serviceMenuList);
        if (res.serviceMenuList.length > 0) {
            //显示第一个功能的sidebar
            chooseService(res.serviceMenuList[0].ownId, res.serviceMenuList[0].relateId)
        }
    }
    ).fail(function (res) {
        console.log("err" + res);
    });
    //-------------------------测试-------------------------


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
            chooseService(serviceMenu.ownId, serviceMenu.relateId);
        });

        $('#service-menu').append($newMenu);

        // //获取所有相关功能的script
        // let scripts = serviceMenu.scripts;
        // for (let j = 0; j < scripts.length; j++) {
        //     loadScript(scripts[j]);
        // }
    }
}

function chooseService(ownId, relateId) {
    // 选择当前服务
    fetchSidebar(relateId);
    // 隐藏$('#main-content')下所有div，除了id为relateId的div
    $('#main-content').children('div').not(`#${relateId}`).hide();
    // 显示id为relateId的div
    $(`#${relateId}`).show();

    //移除所有service-menu下的active
    $('#service-menu a').removeClass('active');
    //为当前service-menu添加active
    $(`#${ownId} a`).addClass('active');

}


function renderServiceDiv(serviceMenuList) {
    for (let i = 0; i < serviceMenuList.length; i++) {
        let serviceMenu = serviceMenuList[i];
        var $newDiv = $(`<div id="${serviceMenu.relateId}" class="service-div"></div>`);
        $('#main-content').append($newDiv);
    }
}