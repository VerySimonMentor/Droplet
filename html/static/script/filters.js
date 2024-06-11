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
    var $label = $(`<label for="${id}" value=true>${label}</label>`);
    $dateRange.data('clear', true);
    $dateRange.daterangepicker();
    $dateRange.val('');

    $dateRange.on('apply.daterangepicker', function (ev, picker) {
        $(this).data('clear', false);
    });

    $dateRange.on('clear.daterangepicker', function (ev, picker) {
        $(this).val('');
        $(this).data('clear', true);
    });

    $dateRange.on('cancel.daterangepicker', function (ev, picker) {
        if ($(this).data('clear')) {
            $(this).val('');
        }
    });

    $dateRange.on('outsideClick.daterangepicker', function (ev, picker) {
        if ($(this).data('clear')) {
            $(this).val('');
        }
    });

    return [$label, $dateRange];
}


// chechbox
function singleCheckboxFilter(id, label) {
    var $checkbox = $(`<input type="checkbox" id="${id}" class="form-control">`);
    var $label = $(`<label for="${id}">${label}</label>`);
    return [$label, $checkbox];
}


// search input
function searchInputFilter(id, label, placeholder) {
    var $input = $(`<input id="${id}" type="text" class="form-control" placeholder="${placeholder}">`);
    if (label) {
        var $label = $(`<label for="${id}">${label}</label>`);
        return [$label, $input];
    } else {
        return $input;
    }
}

//二级页签筛选器
function doubleTabFilter(id, subClass, options) {
    // var $tabFilter = $(`<ul id="${id}"></ul>`);
    // $tabFilter.append(`<li value=0><a href="#">全部</a></li>`);
    // for (let i = 0; i < options.length; i++) {
    //     $tabFilter.append(`<li value="${options[i].id}"><a href="#">${options[i].name}</a></li>`);
    // }

    // $tabFilter.on('click', 'li', function (e) {
    //     $(this).addClass('active').siblings().removeClass('active');
    // });


    // return $tabFilter;

    // var $tabFilter = $(`<ul class="tab-filter"></ul>`);
    // var $subTabFilter = $(`<ul class="sub-tab"></ul>`).hide();

    // $tabFilter.append(`<li value=0><a href="#">全部</a></li>`);
    // for (let i = 0; i < options.length; i++) {
    //     $tabFilter.append(`<li value="${options[i].id}"><a href="#">${options[i].name}</a></li>`);
    // }

    // $tabFilter.on('click', 'li', function (e) {
    //     e.preventDefault();
    //     var selectedId = $(this).attr('value');
    //     $(this).addClass('active').siblings().removeClass('active');
    //     $subTabFilter.empty().hide();

    //     if (selectedId != 0) {
    //         var selectedOption = options.find(option => option.id === selectedId);
    //         if (selectedOption && selectedOption.subOptions) {
    //             for (let j = 0; j < selectedOption.subOptions.length; j++) {
    //                 $subTabFilter.append(`<li value="${selectedOption.subOptions[j].id}"><a href="#">${selectedOption.subOptions[j].name}</a></li>`);
    //             }
    //             $subTabFilter.slideDown();
    //         }
    //     }
    // });

    // $subTabFilter.on('click', 'li', function (e) {
    //     e.preventDefault();
    //     $(this).addClass('active').siblings().removeClass('active');
    // });

    // return [$tabFilter, $subTabFilter];


    // 建立页签元素
    var $tabFilter = $(`<ul id="${id}"></ul>`);
    var $allTab = $(`<li value=0><a href="#" class='active'>全部</a></li>`);
    $allTab.on('click', function (event) {
        event.stopPropagation(); // 防止事件冒泡
        chooseAllTab(id, $(this).val(), subClass, $(this));
    });
    $tabFilter.append($allTab);
    // 遍历options
    for (let i = 0; i < options.length; i++) {
        let optionItem = options[i]; // 使用let代替var
        // 创建li元素
        var $newOptionItem = $(`<li value="${optionItem.id}"><a href="#">${optionItem.name}</a></li>`);

        // 创建子菜单的ul元素
        var $subMenu = $(`<ul class="${subClass}"></ul>`);
        // 遍历子菜单
        for (let j = 0; j < optionItem.subOptions.length; j++) {
            let subItem = optionItem.subOptions[j]; // 使用let代替var
            // 创建子菜单的li元素
            var $newSubMenuItem = $(`<li value="${subItem.id}"><a href="#">${subItem.name}</a></li>`);
            $newSubMenuItem.on('click', function (event) {
                event.stopPropagation(); // 防止事件冒泡
                chooseSubTab(id, $(this), subClass,);
            });
            // 将子菜单li元素添加到子菜单ul元素中
            $subMenu.append($newSubMenuItem);
        }

        // 将子菜单ul元素添加到主菜单li元素中
        $newOptionItem.append($subMenu);

        // 为主菜单li元素添加click事件处理函数
        $newOptionItem.on('click', function (event) {
            event.stopPropagation(); // 防止事件冒泡
            chooseTab(id, $(this).val(), subClass);
        });

        // 将主菜单li元素添加到sidebar ul元素中
        $tabFilter.append($newOptionItem);
    }
    return $tabFilter
}
function chooseTab(id, tabVal, subClass) {
    // 收起除当前点击的二级菜单之外的所有二级菜单
    $(`#${id} li`).filter(function() {
        return $(this).val() !== tabVal;
    }).find(`.${subClass}`).slideUp();
    // 切换当前点击的二级菜单的显示状态
    $(`#${id} li`).filter(function() {
        return $(this).val() === tabVal;
    }).find(`.${subClass}`).slideToggle();
}
function chooseSubTab(id, that,subClass) {
    // 移除所有子菜单项的激活状态
    $(`.${subClass} a`).removeClass('active');
    // 移除所有父菜单项的激活状态
    $(`#${id} a`).removeClass('active');
    // 添加当前子菜单项的激活状态
    that.find('a').addClass('active');
    // 添加父菜单项的激活状态
    that.parent().prev('a').addClass('active');
}
function chooseAllTab(id, tabVal, subClass, that) {
    // 收起除当前点击的二级菜单之外的所有二级菜单
    $(`#${id} li`).filter(function() {
        return $(this).val() !== tabVal;
    }).find(`.${subClass}`).slideUp();
    // 移除所有子菜单项的激活状态
    $(`.${subClass} a`).removeClass('active');
    // 移除所有父菜单项的激活状态
    $(`#${id} a`).removeClass('active');
    // 添加父菜单项的激活状态
    that.find('a').addClass('active');
}