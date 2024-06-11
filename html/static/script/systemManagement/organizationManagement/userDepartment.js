


$(document).ready(function () {
    initUserDepartment();
});

// 初始化用户部门管理页面
function initUserDepartment() {
    var $container = $(`<div id="user-department-container"></div>`);

    // 用户管理
    var $userContainer = $(`<div id="user-container"></div>`);

    //如果没有id="department-container"的div，则创建一个
    if ($("#department-container").length == 0) {
        var $departmentContainer = $(`<div id="department-container"></div>`);
    } else {
        var $departmentContainer = $("#department-container");
    }
    $.getJSON('./static/testJson/systemManagement/organizationManagement/departmentStruct.json', function (res) {
        // 部门管理
        var $table = createCascadeTable('department-table', ["id", "name"], res.departmentStruct);
        $departmentContainer.append($table);
    });

    //如果departmentContainer不在container中，则添加
    if ($container.children("#department-container").length == 0) {
        $container.append($departmentContainer);
    }




    $container.append($userContainer);
    $container.append($departmentContainer);
    $("#user-department").append($container);
}