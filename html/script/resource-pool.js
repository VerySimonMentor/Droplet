
var programValue = 1;
$(document).ready(function () {

    // 绑定时间范围选择器
    $('#login-time-filters').daterangepicker();

    //点击ul #programs-filters下的li后，将其值赋给programValue
    $('#programs-filters').on('click', 'li', function (e) {
        // 阻止链接的默认行为
        e.stopPropagation();
        // 移除所有激活状态
        $('#programs-filters a').removeClass('active');
        // 在this下的a标签添加当前的激活状态
        $(this).find('a').addClass('active');
        programValue = $(this).val();

    });

});

document.addEventListener('DOMContentLoaded', function () {
    // Your initialization code here
    initializeResourcePoolFilters();
});


// 函数：将选项填入对应的选择器内
function addSelectItem(selector, items) {
    //清空原有选项
    selector.empty();
    selector.append(`<option value=0>请选择</option>`)
    for (var count = 0; count < items.length; count++) {
        selector.append(`<option value="${count+1}">${items[count]}</option>`);
    }
}


// 函数： 将选项放入对应的按钮内
function addProgramItem(ul, programs) {
    ul.empty();
    for (var count = 0; count < programs.length; count++) {
        ul.append(`<li value="${count+1}"><a href="#">${programs[count]}</a></li>`);
    }
}

function initializeResourcePoolFilters() {
    $.ajax({
        url: '/resourcePool/showRresource/managerSelectorOption/initPage',
        type: 'GET',
        success: function (res) {
            addProgramItem($('.resource-pool .show-resource .filters #programs-filters'), res.programs);
            setProgramsValue(1);
            addSelectItem($('.resource-pool .show-resource .filters #campus-filters'), res.campus);
            addSelectItem($('#school-filters'), res.school);
            addSelectItem($('#college-filters'), []);
            addSelectItem($('#adviser-filters'), res.adviser);
            addSelectItem($('#first-channel-filters'), res.firstChannel);
            addSelectItem($('#second-channel-filters'), []);
            addSelectItem($('#third-channel-filters'), []);

            $('#school-filters').off('change').change(function () {
                fetchCollegeList();
            });

            $('#first-channel-filters').off('change').change(function () {
                fetchSecondChannelList();
            });

            
            

        }
    });

    //测试
    // 读取本地/static/data.json文件
    $.getJSON('static/data.json', function (res) {
        addProgramItem($('.resource-pool .show-resource .filters #programs-filters'), res.programs);
        setProgramsValue(1);
        addSelectItem($('.resource-pool .show-resource .filters #campus-filters'), res.campus);
        addSelectItem($('#school-filters'), res.school);
        addSelectItem($('#college-filters'), []);
        addSelectItem($('#adviser-filters'), res.adviser);
        addSelectItem($('#first-channel-filters'), res.firstChannel);
        addSelectItem($('#second-channel-filters'), []);
        addSelectItem($('#third-channel-filters'), []);

        
    });
    //测试


}


function fetchCollegeList() {
    var schoolIndex = $('#school-filters').val();
    $.ajax({
        url: 'resourcePool/showRresource/managerSelectorOption/getCollege?schoolIndex='+str(schoolIndex-1),
        type: 'GET',
        success: function (res) {
            addSelectItem($('#college-filters'), res.college);
        }
    });
}

function fetchSecondChannelList() {
    var firstChannelIndex = $('#first-channel-filters').val();
    $.ajax({
        url: 'resourcePool/showRresource/managerSelectorOption/getSecondChannel?firstChannelIndex='+str(firstChannelIndex-1),
        type: 'GET',
        success: function (res) {
            addSelectItem($('#second-channel-filters'), res.secondChannel);
        }
    });
    $('#second-channel-filters').off('change').change(function () {
        fetchThirdChannelList();
    });
}

function fetchThirdChannelList() {
    var firstChannelIndex = $('#first-channel-filters').val();
    var secondChannelIndex = $('#second-channel-filters').val();
    $.ajax({
        url: 'resourcePool/showRresource/managerSelectorOption/getThirdChannel?firstChannelIndex='+str(firstChannelIndex-1)+"&secondChannelIndex="+str(secondChannelIndex-1),
        type: 'GET',
        success: function (res) {
            addSelectItem($('#third-channel-filters'), res.thirdChannel);
        }
    });
}

function setProgramsValue(index) {
    // 移除所有激活状态
    $('#programs-filters a').removeClass('active');
    // 在#programs-filters下，value为index的a标签添加激活状态
    $('#programs-filters').find(`li[value=${index}] a`).addClass('active');
    programValue = index;
}

function fetchResourceData() {
    var programs = $('#programs-filters').val()-1;
    var campus = $('#campus-filters').val()-1;
    var school = $('#school-filters').val()-1;
    var college = $('#college-filters').val()-1;
    var adviser = $('#adviser-filters').val();
    var firstChannel = $('#first-channel-filters').val()-1;
    var secondChannel = $('#second-channel-filters').val()-1;
    var thirdChannel = $('#third-channel-filters').val()-1;

    $.ajax({
        url: 'resourcePool/showRresource/managerSelectorOption/getResourceData?programs='+programs+"&campus="+campus+"&school="+school+"&college="+college+"&adviser="+adviser+"&firstChannel="+firstChannel+"&secondChannel="+secondChannel+"&thirdChannel="+thirdChannel,
        type: 'GET',
        success: function (res) {
            addResourceData(res);
        }
    });
}

