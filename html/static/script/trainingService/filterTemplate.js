












function renderCampusAdviserFilter() {
    // $.ajax({
    //     url: '/resourcePool/campusAdviserList',
    //     method: 'GET',
    //     // 在404错误时，使用本地测试数据
    //     error: function () {

    //     },
    //     success: function (res) {
    //         const [labelCampus, selectCampus, labelAdviser, selectAdviser] = doubleSelectFilter("campus-filter", "所属校区", "adviser-filter", "所属顾问", res.campusAdviserList);
    //         $('.resource-pool .show-resource .filters').append(labelCampus, selectCampus, labelAdviser, selectAdviser);
    //     }
    // });


    return new Promise((resolve, reject) => {
        $.getJSON('static/testJson/resourcePool/campusAdviserList.json', function (res) {
            const [labelCampus, selectCampus, labelAdviser, selectAdviser] = doubleSelectFilter("campus-filter", "所属校区", "adviser-filter", "所属顾问", res.campusAdviserList);
            $('#show-resource-filters-container').append(labelCampus, selectCampus, labelAdviser, selectAdviser);
            resolve();
        }).fail(function (res) {
            console.log("err" + res);
            reject(res);
        });
    });
}


function renderSchoolCollegeFilter() {

    return new Promise((resolve, reject) => {
        $.getJSON('static/testJson/resourcePool/schoolCollegeList.json', function (res) {
            const [labelType, selectType, labelSchool, selectSchool, labelCollege, selectCollege] = tripleSelectFilter("school-type-filter", "学校类型", "school-filter", "所属学校", "college-filter", "所属学院", res.schoolCollegeList);
            const [labelYear, selectYear] = singleSelectFilter("school-year-filter", "入学年份", res.yearList);
            $('#show-resource-filters-container').append(labelYear, selectYear, labelType, selectType, labelSchool, selectSchool, labelCollege, selectCollege);
            resolve();
        }).fail(function (res) {
            console.log("err" + res);
            reject(res);
        });
    });

}


function renderChanneFilter() {

    return new Promise((resolve, reject) => {
        $.getJSON('static/testJson/resourcePool/channelList.json', function (res) {
            const [labelChannel1, selectChannel1, labelChannel2, selectChannel2, labelChannel3, selectChannel3] = tripleSelectFilter("first-channel-filter", "一级渠道", "second-channel-filter", "二级渠道", "third-channel-filter", "三级渠道", res.channelList);
            $('#show-resource-filters-container').append(labelChannel1, selectChannel1, labelChannel2, selectChannel2, labelChannel3, selectChannel3);
            resolve();
        }).fail(function (res) {
            console.log("err" + res);
            reject(res);
        });
    });

}


function renderLoginTimeRangeFilter() {

    return new Promise((resolve, reject) => {
        const [labelLoginTimeRange, inputLoginTimeRange] = dateRangeFilter("login-time-range-filter", "登录时间");
        $('#show-resource-filters-container').append(labelLoginTimeRange, inputLoginTimeRange);
        resolve();
    });

}

function renderAssignedTimeRangeFilter() {

    return new Promise((resolve, reject) => {
        const [labelAssignedTimeRange, inputAssignedTimeRange] = dateRangeFilter("assigned-time-range-filter", "分配时间");
        const [labelAssignedTimeCheckbox, inputAssignedTimeCheckbox] = singleCheckboxFilter("assigned-time-checkbox", "首次分配");
        $('#show-resource-filters-container').append(labelAssignedTimeCheckbox, inputAssignedTimeCheckbox, labelAssignedTimeRange, inputAssignedTimeRange);
        resolve();
    });

}

//渲染跟进状态筛选器
function renderFollowStatusFilter() {

    return new Promise((resolve, reject) => {
        $.getJSON('static/testJson/resourcePool/followStatusList.json', function (res) {
            const [labelFollowStatus, selectFollowStatus] = singleSelectFilter("follow-status-filter", "跟进状态", res.followStatusList);
            $('#show-resource-filters-container').append(labelFollowStatus, selectFollowStatus);
            resolve();
        }).fail(function (res) {
            console.log("err" + res);
            reject(res);
        });
    });

}