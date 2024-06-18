
var scale = 1;

var isMouseInsideTableContainer = false;

$(document).ready(function () {
    initUserDepartment();
});

// 初始化用户部门管理页面
function initUserDepartment() {


    //如果没有id="user-department-container"的div，则创建一个
    if ($("#user-department-container").length == 0) {
        var $container = $(`<div id="user-department-container"></div>`);
        $("#user-department").append($container);
    } else {
        var $container = $("#user-department-container");
    }

    // //如果没有id="user-department-switch-container"的div，则创建一个
    // if ($("#user-department-switch-container").length == 0) {
    //     var $switch = $(`<div id="user-department-switch-container"></div>`);
    //     $("#user-department").append($switch);
    // } else {
    //     var $switchContainer = $("#user-department-switch-container");
    // }
    // // 创建用户部门切换按钮
    // var $tabContainer = $(`<div id="user-department-tab-container" class="tab"></div>`);
    // var $userTab = $(`<button id="user-tab" class="user-department-tab">用户</button>`);
    // var $departmentTab = $(`<button id="department-tab" class="user-department-tab">部门</button>`);
    // $tabContainer.append($userTab);
    // $tabContainer.append($departmentTab);
    // //$switchContainer.append($tabContainer);
    // $("#user-department").append($tabContainer);
    // $(`.user-department-tab`).on('click', function () {
    //     $tabContainer.children().not($(this)).removeClass('active');
    //     $(this).addClass('active');
    //     $container.children().not($(`#${$(this).attr('id')}-container`)).hide();
    //     $(`#${$(this).attr('id')}-container`).show();
    // });


    //如果没有id="user-container"的div，则创建一个
    if ($(`#user-container`).length == 0) {
        var $userContainer = $(`<div id="user-container" class="tab-content></div>`);
        $container.append($userContainer);
    } else {
        var $userContainer = $("#user-container");
    }

    //如果没有id="department-container"的div，则创建一个
    if ($(`#department-container`).length == 0) {
        var $departmentContainer = $(`<div id="department-container"  class="tab-content"></div>`);
        var $departmentTableContainer = $(`<div id="department-table-container"></div>`);

        $departmentContainer.append($departmentTableContainer);
        $container.append($departmentContainer);
    } else {
        var $departmentContainer = $("#department-container");
    }

    $.getJSON('./static/testJson/systemManagement/organizationManagement/departmentPropertiesList.json', function (properties) {
        $.getJSON('./static/testJson/systemManagement/organizationManagement/departmentList.json', function (res) {
            // 部门管理
            const tableId = 'department-table';
            var $table = createCascadeTable(tableId, properties.departmentPropertiesList, res.departmentList);
            addTableButton($table, "操作", ["编辑", "删除"], [editDepartment, deleteDepartment]);
            $departmentTableContainer.append($table);
            $departmentTableContainer.on('wheel', function (event) {
                if (event.ctrlKey) {
                    event.preventDefault();
                    scale += event.originalEvent.deltaY * -0.01;
                    scale = Math.min(Math.max(.75, scale), 3);
                    $table.css({ transform: `scale(${scale})` });
                }
            });
            $departmentTableContainer.on('mouseenter', function () {
                isMouseInsideTableContainer = true;
                console.log("mouse enter table container");
            });
            $departmentTableContainer.on('mouseleave', function () {
                isMouseInsideTableContainer = false;
                console.log("mouse leave table container");
            });
            //当选中departmentTableContainer并且按下ctrl+0时，重置缩放
            $(document).on('keydown', function (event) {
                if (event.ctrlKey && event.key === '0') {
                    console.log("ctrl+0");
                    console.log(isMouseInsideTableContainer);
                    if (!isMouseInsideTableContainer) {
                        return;
                    }
                    event.preventDefault();
                    scale = 1;
                    $table.css({ transform: `scale(${scale})` });
                    console.log("reset scale");
                }
            });

        });
    });
}

function editDepartment(id) {
    console.log("editDepartment" + id);
}

function deleteDepartment(id) {
    console.log("deleteDepartment" + id);
}