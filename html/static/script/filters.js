// 独立单选下拉框
// 返回一个独立单选下拉框的html对象（jquery对象）,其中包含一个下拉框和一个label
function singleSelectFilter(id, label, options) {
    var $select = $(`<select id="${id}" class="form-control"></select>`);
    var $label = $(`<label for="${id}">${label}</label>`);

    if (options.length === 0) {
        $select.append(`<option value="0">空</option>`);
    } else {
        $select.append(`<option value="0">请选择</option>`);
        for (let i = 0; i < options.length; i++) {
            $select.append(`<option value="${options[i].id}">${options[i].name}</option>`);
        }
    }

    return [$label, $select];
}

// 二级联动下拉框
// 返回一个二级联动下拉框的html对象（jquery对象）,其中包含两个下拉框和两个label
// options是一个json转换的对象，第一个id属性和name属性对应第一个下拉框的选项，subOptions是id属性和name属性对应第二个下拉框的选项
function doubleSelectFilter(id1, label1, id2, label2, options) {
    var $select1 = $(`<select id="${id1}" class="form-control"></select>`);
    var $label1 = $(`<label for="${id1}">${label1}</label>`);
    $select1.append(`<option value="0">请选择</option>`);
    for (let i = 0; i < options.length; i++) {
        $select1.append(`<option value="${options[i].id}">${options[i].name}</option>`);
    }

    var $select2 = $(`<select id="${id2}" class="form-control"></select>`);
    var $label2 = $(`<label for="${id2}">${label2}</label>`);
    $select2.append(`<option value="0">请选择</option>`);

    $select1.change(function () {
        var id1 = $select1.val();
        $select2.empty();
        if (id1 === "0") {
            $select2.append(`<option value="0">请选择</option>`);
        } else {
            for (let i = 0; i < options.length; i++) {
                if (options[i].id == id1) {
                    if (options[i].subOptions.length === 0) {
                        $select2.append(`<option value="0">空</option>`);
                    } else {
                        $select2.append(`<option value="0">请选择</option>`);
                        for (let j = 0; j < options[i].subOptions.length; j++) {
                            $select2.append(`<option value="${options[i].subOptions[j].id}">${options[i].subOptions[j].name}</option>`);
                        }
                    }
                    break; // 找到匹配项后立即停止循环
                }
            }
        }
    });

    return [$label1, $select1, $label2, $select2];
}


//三级联动下拉框
function tripleSelectFilter(id1, label1, id2, label2, id3, label3, options) {
    var $select1 = $(`<select id="${id1}" class="form-control"></select>`);
    var $label1 = $(`<label for="${id1}">${label1}</label>`);
    $select1.append(`<option value="0">请选择</option>`);
    for (let i = 0; i < options.length; i++) {
        $select1.append(`<option value="${options[i].id}">${options[i].name}</option>`);
    }

    var $select2 = $(`<select id="${id2}" class="form-control"></select>`);
    var $label2 = $(`<label for="${id2}">${label2}</label>`);
    $select2.append(`<option value="0">请选择</option>`);

    var $select3 = $(`<select id="${id3}" class="form-control"></select>`);
    var $label3 = $(`<label for="${id3}">${label3}</label>`);
    $select3.append(`<option value="0">请选择</option>`);

    $select1.change(function () {
        var id1 = $select1.val();
        $select2.empty();
        $select3.empty();
        if (id1 === "0") {
            $select2.append(`<option value="0">请选择</option>`);
            $select3.append(`<option value="0">请选择</option>`);
        } else {
            for (let i = 0; i < options.length; i++) {
                if (options[i].id == id1) {
                    if (options[i].subOptions.length === 0) {
                        $select2.append(`<option value="0">空</option>`);
                        $select3.append(`<option value="0">空</option>`);
                    } else {
                        $select2.append(`<option value="0">请选择</option>`);
                        $select3.append(`<option value="0">请选择</option>`);
                        for (let j = 0; j < options[i].subOptions.length; j++) {
                            $select2.append(`<option value="${options[i].subOptions[j].id}">${options[i].subOptions[j].name}</option>`);
                        }
                    }
                    break; // 找到匹配项后立即停止循环
                }
            }
        }
    });

    $select2.change(function () {
        var id2 = $select2.val();
        $select3.empty();
        if (id2 === "0") {
            $select3.append(`<option value="0">请选择</option>`);
        } else {
            var id1 = $select1.val();
            for (let i = 0; i < options.length; i++) {
                if (options[i].id == id1) {
                    for (let j = 0; j < options[i].subOptions.length; j++) {
                        if (options[i].subOptions[j].id == id2) {
                            if (options[i].subOptions[j].subOptions.length === 0) {
                                $select3.append(`<option value="0">空</option>`);
                            } else {
                                $select3.append(`<option value="0">请选择</option>`);
                                for (let k = 0; k < options[i].subOptions[j].subOptions.length; k++) {
                                    $select3.append(`<option value="${options[i].subOptions[j].subOptions[k].id}">${options[i].subOptions[j].subOptions[k].name}</option>`);
                                }
                            }
                            break; // 找到匹配项后立即停止循环
                        }
                    }
                    break; // 找到匹配项后立即停止循环
                }
            }
        }
    });

    return [$label1, $select1, $label2, $select2, $label3, $select3];
}


// 日期范围选择器
// 返回一个日期范围选择器的html对象（jquery对象）,其中包含一个日期范围选择器和一个label
function dateRangeFilter(id, label) {
    var $dateRange = $(`<input id="${id}" type="text" class="form-control">`);
    var $label = $(`<label for="${id}">${label}</label>`);

    $dateRange.daterangepicker();

    $dateRange.on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' ~ ' + picker.endDate.format('YYYY-MM-DD'));
    });

    $dateRange.on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });

    return [$label, $dateRange];
}
