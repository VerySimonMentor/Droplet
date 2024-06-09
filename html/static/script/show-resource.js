
//用于记录当前所选program的indedx
var programValue = 1;

// 用于记录录入时间是否是clear
var loginTimeClear = true;

//用于记录分配时间是否是clear
var assignTimeClear = true;

//用于记录点开properties-filter时，原来的显示条目
var propertiesFilter = [];

$(document).ready(function () {


    //“设置显示条目”按钮的点击事件
    $('#resource-properties-display-button').click(function () {
        const checkBoxes = $('#properties-filter-checkboxes input[type="checkbox"]');
        for (var count = 0; count < checkBoxes.length; count++) {
            propertiesFilter[count] = checkBoxes[count].checked;
        }
        $('#properties-filter-background').css('display', 'block');
    });
    //“设置显示条目”弹窗中的“取消”按钮的点击事件
    $('#properties-filter-cancel').click(function () {
        cancelPropertiesFilter();
    });
    //“设置显示条目”弹窗中的“X”按钮的点击事件
    $('#properties-filter-close').click(function () {
        cancelPropertiesFilter();
    });
    //“设置显示条目”弹窗中其他区域的点击事件
    $('#properties-filter-background').click(function (e) {
        if (e.target == this) {
            cancelPropertiesFilter();
        }
    });
    // //“设置显示条目“弹窗中的“默认”按钮的点击事件
    // $('#properties-filter-default').click(function () {
    // });
    //“设置显示条目”弹窗中的“确定”按钮的点击事件
    $('#properties-filter-apply').click(function () {
        applyPropertiesFilter();
    });
    fetchResourceProperties();
});

function init() {
    
}

//----------------------------------------------新重构部分-------------------------------------------↓↓↓
// 函数：获取资源属性列表，并渲染筛选器和表头
function fetchResourceProperties() {
    $.ajax({
        url: '/resourcePool/resourcePropertiesList',
        type: 'GET',
        success: function (res) {
            renderFilter(res.properties);
            renderTableHeader(res.properties);
        },
        error: function (res) {
            //-------------------------测试-------------------------
            $.getJSON('static/testJson/resourcePool/resourcePropertiesList.json', function (res) {
                renderFilter(res.properties);
                renderTableHeader(res.properties);
            }
            ).fail(function (res) {
                console.log("err" + res);
            });
            //-------------------------测试-------------------------
        }
    });
}


async function renderFilter(properties) {
    $('#show-resource').append(`<div id="show-resource-filters"></div>`);
    //先渲染项目筛选器，因为项目筛选器是必须的
    await renderProgramFilter();
    $('#show-resource-filters').append(`<div id="show-resource-filters-container"></div>`);
    //根据获取的资源属性列表渲染筛选器
    for(let i = 0; i < properties.length; i++){
        try{
            //将peoperties[i].filterCode转为函数并执行
            var code = properties[i].filterCode;
            let a = new Function(code);
            await a();
        }
        catch(error){
            console.log("Error executing filterCode:", error);
        }
    }
    //渲染搜索框
    $('#show-resource-filters').append(searchInputFilter("search-filters", "", "按照姓名/手机号/微信号/QQ号搜索"));
}
    
function renderTableHeader(properties) {

}



//渲染项目筛选器
function renderProgramFilter() {
    return new Promise((resolve, reject) => {
        $.getJSON('static/testJson/resourcePool/programList.json', function (res) {
            $('#show-resource-filters').append(doubleTabFilter("programs-filters",'tab-filter-second-level', res.programList));
            resolve();
        }).fail(function (res) {
            console.log("err" + res);
            reject(res);
        });
    });
}

















//----------------------------------------------新重构部分-------------------------------------------↑↑↑

// //---------------------------------------------筛选器部分-------------------------------------------↓↓↓
// // 函数：将选项填入对应的选择器内
// function addSelectItem(selector, items) {
//     //清空原有选项
//     selector.empty();
//     selector.append(`<option value=0>请选择</option>`)
//     for (var count = 0; count < items.length; count++) {
//         selector.append(`<option value="${items[count].id}">${items[count].name}</option>`);
//     }
// }


// // 函数： 将选项放入对应的按钮内
// function addProgramItem(ul, programs) {
//     ul.empty();
//     ul.append(`<li value=0><a href="#">全部</a></li>`);
//     for (var count = 0; count < programs.length; count++) {
//         ul.append(`<li value="${programs[count].id}"><a href="#">${programs[count].name}</a></li>`);
//     }
// }

// function initializeResourcePoolFilters() {
//     $.ajax({
//         url: '/resourcePool/showRresource/managerSelectorOption/initPage',
//         type: 'GET',
//         success: function (res) {
//             addProgramItem($('.resource-pool .show-resource .filters #programs-filters'), res.programs);
//             setProgramsValue(1);
//             addSelectItem($('.resource-pool .show-resource .filters #campus-filters'), res.campus);
//             addSelectItem($('#school-filters'), res.school);
//             addSelectItem($('#college-filters'), []);
//             addSelectItem($('#adviser-filters'), res.adviser);
//             addSelectItem($('#first-channel-filters'), res.firstChannel);
//             addSelectItem($('#second-channel-filters'), []);
//             addSelectItem($('#third-channel-filters'), []);

//             $('#school-filters').off('change').change(function () {
//                 fetchCollegeList();
//             });

//             $('#first-channel-filters').off('change').change(function () {
//                 fetchSecondChannelList();
//             });




//         }
//     });

//     //测试
//     // 读取本地/static/data.json文件
//     $.getJSON('static/data.json', function (res) {
//         addProgramItem($('.resource-pool .show-resource .filters #programs-filters'), res.programs);
//         setProgramsValue(1);
//         addSelectItem($('.resource-pool .show-resource .filters #campus-filters'), res.campus);
//         addSelectItem($('#school-filters'), res.school);
//         addSelectItem($('#college-filters'), []);
//         addSelectItem($('#adviser-filters'), res.adviser);
//         addSelectItem($('#first-channel-filters'), res.firstChannel);
//         addSelectItem($('#second-channel-filters'), []);
//         addSelectItem($('#third-channel-filters'), []);


//     });
//     //测试


// }


// function fetchCollegeList() {
//     var schoolIndex = $('#school-filters').val();
//     $.ajax({
//         url: 'resourcePool/showRresource/managerSelectorOption/getCollege?schoolIndex=' + str(schoolIndex),
//         type: 'GET',
//         success: function (res) {
//             addSelectItem($('#college-filters'), res.college);
//         }
//     });
// }

// function fetchSecondChannelList() {
//     var firstChannelIndex = $('#first-channel-filters').val();
//     $.ajax({
//         url: 'resourcePool/showRresource/managerSelectorOption/getSecondChannel?firstChannelIndex=' + str(firstChannelIndex),
//         type: 'GET',
//         success: function (res) {
//             addSelectItem($('#second-channel-filters'), res.secondChannel);
//         }
//     });
//     $('#second-channel-filters').off('change').change(function () {
//         fetchThirdChannelList();
//     });
// }

// function fetchThirdChannelList() {
//     var firstChannelIndex = $('#first-channel-filters').val();
//     var secondChannelIndex = $('#second-channel-filters').val();
//     $.ajax({
//         url: 'resourcePool/showRresource/managerSelectorOption/getThirdChannel?firstChannelIndex=' + str(firstChannelIndex) + "&secondChannelIndex=" + str(secondChannelIndex),
//         type: 'GET',
//         success: function (res) {
//             addSelectItem($('#third-channel-filters'), res.thirdChannel);
//         }
//     });
// }

// function setProgramsValue(index) {
//     // 移除所有激活状态
//     $('#programs-filters a').removeClass('active');
//     // 在#programs-filters下，value为index的a标签添加激活状态
//     $('#programs-filters').find(`li[value=${index}] a`).addClass('active');
//     programValue = index;
//     console.log(programValue);
// }

// //---------------------------------------------筛选器部分-------------------------------------------↑↑↑



//---------------------------------------------数据表部分-------------------------------------------↓↓↓

//检查资源项格式是否与资源属性列表匹配
function checkResourceItem(resource) {
    if (resource.length != $('#resource-items-header th').length-1) {
        console.log('资源项长度与资源属性列表长度不匹配:');
        console.log(resource);
        return false;
    }
    for (var count = 0; count < resource.length; count++) {
        if (resource[count].name != $('#resource-items-header th').eq(count).text()) {
            console.log('资源项名称与资源属性列表名称不匹配:');
            console.log('count:' + count.toString() + ' name:' + resource[count].name);
            console.log(resource);
            return false;
        }
    }
    return true;
}

//添加资源数据
function addResourceData(resources) {
    for (var count = 0; count < resources.length; count++) {
        var item = resources[count];
        if (!checkResourceItem(item)) {
            continue;
        }
        var tr = $('<tr></tr>');
        for (var i = 0; i < resources[count].length; i++) {
            tr.append(`<td>${item[i].value}</td>`);
            if ($('#resource-items-header th').eq(i).hasClass('resource-items-col-hidden')) {
                tr.children('td').eq(i).addClass('resource-items-col-hidden');
            }
        }
        tr.append(`<td><a">编辑</a><a>删除</a></td>`);
        $('#resource-items-body').append(tr);
    }
}

// //获取资源属性列表
// function fetchResourceProperties() {
//     $.ajax({
//         url: 'resourcePool/showRresource/getResourceProperties',
//         type: 'GET',
//         success: function (res) {
//             for (var count = 0; count < res.properties.length; count++) {
//                 $('#resource-items-header').append(`<th>${res.properties[count].name}</th>`);
//                 $('#resource-items-colgroup').append(`<col>`);
//                 if (!res.properties[count].displayDefault) {
//                     $('#resource-items-header th').eq(count).addClass('resource-items-col-hidden');
//                     $('#resource-items-colgroup col').eq(count).addClass('resource-items-col-hidden');
//                 }
//                 // 添加checkbox，checkbox的id为properties-filter-checkbox-加上count，label的for为properties-filter-checkbox-加上count，checked为res.properties[count].displayDefault
//                 $('#properties-filter-checkboxes').append(`<div class="properties-filter-checkbox"><input type="checkbox" id="properties-filter-checkbox-${count}" ${res.properties[count].displayDefault ? 'checked' : ''}><label for="properties-filter-checkbox-${count}">${res.properties[count].name}</label></div>`);
//             }
//         }
//     });

//     //-----------------------------------
//     $.getJSON('static/properties.json', function (res) {
//         for (var count = 0; count < res.properties.length; count++) {
//             $('#resource-items-header').append(`<th>${res.properties[count].name}</th>`);
//             $('#resource-items-colgroup').append(`<col>`);
//             if (!res.properties[count].displayDefault) {
//                 $('#resource-items-header th').eq(count).addClass('resource-items-col-hidden');
//                 $('#resource-items-colgroup col').eq(count).addClass('resource-items-col-hidden');
//             }
//             // 添加checkbox，checkbox的id为properties-filter-checkbox-加上count，label的for为properties-filter-checkbox-加上count，checked为res.properties[count].displayDefault
//             $('#properties-filter-checkboxes').append(`<div class="properties-filter-checkbox"><input type="checkbox" id="properties-filter-checkbox-${count}" ${res.properties[count].displayDefault ? 'checked' : ''}><label for="properties-filter-checkbox-${count}">${res.properties[count].name}</label></div>`);
//         }
//         $('#resource-items-header').append(`<th>操作</th>`);
//         $('#resource-items-colgroup').append(`<col>`);
//         //添加一个checkbox，是控制“操作”列的显示与隐藏
//         $('#properties-filter-checkboxes').append(`<div class="properties-filter-checkbox"><input type="checkbox" id="properties-filter-checkbox-operation" checked><label for="properties-filter-checkbox-operation}">操作</label></div>`);
//     });

//     $.getJSON('static/rdata.json', function (res) {

//         addResourceData(res.resources);
//     });

//     //-----------------------------------
// }


function fetchResourceData() {
    var programsIndex = $('#programs-filters').val();
    var campusIndex = $('#campus-filters').val();
    var schoolIndex = $('#school-filters').val();
    var collegeIndex = $('#college-filters').val();
    var adviserIndex = $('#adviser-filters').val();
    var firstChannelIndex = $('#first-channel-filters').val();
    var secondChannelIndex = $('#second-channel-filters').val();
    var thirdChannelIndex = $('#third-channel-filters').val();
    var loginTimeStart = $('#login-time-range-filters').data('daterangepicker').startDate._d.getTime();
    var loginTimeEnd = $('#login-time-range-filters').data('daterangepicker').endDate._d.getTime();
    var assignTimeStart = $('#assign-time-range-filters').data('daterangepicker').startDate._d.getTime();
    var assignTimeEnd = $('assign-time-range-filters').data('daterangepicker').endDate._d.getTime();
    var search = $('#search-filters').val();


    const url =

        $.ajax({
            url: '',
            type: 'GET',
            success: function (res) {
                addResourceData(res);
            }
        });
}
function cancelPropertiesFilter() {
    //将显示条目恢复到原来的状态
    const checkBoxes = $('#properties-filter-checkboxes input[type="checkbox"]');
    for (var count = 0; count < checkBoxes.length; count++) {
        checkBoxes[count].checked = propertiesFilter[count];
    }
    $('#properties-filter-background').css('display', 'none');
}

function applyPropertiesFilter() {
    //将显示条目改变
    const checkBoxes = $('#properties-filter-checkboxes input[type="checkbox"]');
    for (var count = 0; count < checkBoxes.length; count++) {
        resourceItemDisplay(count, checkBoxes[count].checked);
    }
    $('#properties-filter-background').css('display', 'none');
}

//切换资源属性的显示状态
function resourceItemDisplay(index, display) {
    $('#resource-items-header th').eq(index).toggleClass('resource-items-col-hidden', !display);
    $('#resource-items-colgroup col').eq(index).toggleClass('resource-items-col-hidden', !display);
    //遍历#resource-items-body下的每个tr的第index个td
    $('#resource-items-body tr').each(function () {
        $(this).children('td').eq(index).toggleClass('resource-items-col-hidden', !display);
    });
    
}

//---------------------------------------------数据表部分-------------------------------------------↑↑↑