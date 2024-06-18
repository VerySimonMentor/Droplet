//检查header和data是否匹配
function checkHeaderData(header, data) {
    return data.every(row => row.length === header.length);
}

//创建普通表格,返回一个jq的table对象
//tableId: 表格id, tableHeader: 表头, tableData: 表格数据
function createTable(tableId, tableHeader, tableData) {
    if (!checkHeaderData(tableHeader, tableData)) {
        console.error(`表头和数据不匹配Id: ${tableId}, Header: ${tableHeader}, Data: ${tableData}`);
        return null;
    }
    var $table = $(`<table id="${tableId}"></table>`);
    var $thead = $(`<thead></thead>`);
    var $tbody = $(`<tbody></tbody>`);

    var $tr = $('<tr></tr>');
    tableHeader.forEach(header => {
        var $th = $(`<th>${header}</th>`);
        $tr.append($th);
    });
    $thead.append($tr);
    $table.append($thead);

    tableData.forEach(rowData => {
        var $tr = $('<tr></tr>');
        rowData.forEach(cellData => {
            var $td = $(`<td>${cellData}</td>`);
            $tr.append($td);
        });
        $tbody.append($tr);
    });
    $table.append($tbody);
    return $table;
}


// 检查表格数据是否匹配
function checkTableData(tableId, tableData) {
    var $table = $(`#${tableId}`);
    var $thead = $table.children('thead');
    var $tr = $thead.children('tr');
    var $th = $tr.children('th');
    return tableData.every(row => row.length === $th.length);
}

//修改表格数据
function modifyTable(tableId, tableData) {
    if (!checkTableData(tableId, tableData)) {
        console.error(`表头和数据不匹配Id: ${tableId}, Data: ${tableData}`);
        return;
    }
    var $table = $(`#${tableId}`);
    var $tbody = $table.children('tbody');
    $tbody.empty();
    tableData.forEach(rowData => {
        var $tr = $('<tr></tr>');
        rowData.forEach(cellData => {
            var $td = $(`<td>${cellData}</td>`);
            $tr.append($td);
        });
        $tbody.append($tr);
    });
}

// 级联表格检查表头和数据是否匹配
// 表头和数据顺序不一样的情况仍然返回true
//TODO: 后续创建表格时按照顺序来
function checkCascadeHeaderData(header, data) {
    function extractNames(itemArray) {
        let names = [];
        itemArray.forEach(item => {
            if (item.name !== 'parentId' && item.name !== 'children') {
                names.push(item.name);
            }
            if (item.name === 'children' && Array.isArray(item.value)) {
                item.value.forEach(childArray => {
                    names.push(extractNames(childArray));
                });
            }
        });
        return names;
    }

    function extractHeader(header) {
        return header.map(h => h.name)
    }

    function checkNames(itemNames, header) {
        //如果itemNames中都不是Array元素则是是叶子节点，那么检查是否和表头匹配
        if (!header.every(h => itemNames.includes(h))) {
            return false;
        };
        itemNames.forEach(name => {
            if (Array.isArray(name)) {
                if (!checkNames(name, header))
                    return false;
            } else {
                if (!header.includes(name))
                    return false
            }
        });
        return true;
    }
    return data.every(itemArray => {
        const itemNames = extractNames(itemArray);
        const itemHeader = extractHeader(header)
        return checkNames(itemNames, itemHeader);
    });
}

//创建级联表格
//返回一个jq的table对象
//tableId: 表格id, tableHeader: 表头, tableData: 表格数据
//header的格式:
//[{"name":"header1", "propertyIndex":1, "diaplayDefault":true},{...},{...}]
//data的格式:
//[[{"name":"id","value":1},{"name":"parentId","value":0},{...},{...}],[...],[...]]
function createCascadeTable(tableId, tableHeader, tableData) {
    if (!checkCascadeHeaderData(tableHeader, tableData)) {
        console.error(`表头和数据不匹配Id: ${tableId}, Header: ${tableHeader}, Data: ${tableData}`);
        return null;
    }
    var $table = $(`<table id="${tableId}"></table>`);
    var $thead = $('<thead></thead>');
    var $tbody = $('<tbody></tbody>');

    var $tr = $('<tr></tr>');
    tableHeader.forEach(header => {
        var $th = $(`<th>${header.name}</th>`);
        $tr.append($th);
    });
    $thead.append($tr);
    $table.append($thead);

    function addRow(data, level) {
        data.forEach(itemArray => {
            const item = Object.fromEntries(itemArray.map(i => [i.name, i.value]));
            var $tr = $(`<tr data-id="${item["id"]}" data-parent-id="${item["parentId"]}" id="cascade-table-level-${level}"></tr>`);
            var $arrow = item['children'] && item['children'].length > 0 ? $('<span class="arrow">▼</span>') : '';
            
            // 遍历thead中的th的text作为key，来寻找item中的元素
            const $headers = $thead.find('th')
            $headers.each(function(index) {
                const key = $(this).text();
                var $td = $(`<td></td>`).css('padding-left', `${20 * level}px`);
                //在第一个td中添加箭头
                if (index === 0) {
                    $td.append($arrow).append(item[key]);
                } else {
                    $td.append(item[key]);
                }
                $tr.append($td);
            });

            // //遍历item除了key是parentId和children的value
            // Object.keys(item).filter(key => key !== 'parentId' && key !== 'children').forEach((key, index) => {
            //     var $td = $(`<td></td>`);
            //     //在第一个td中添加箭头
            //     if (index === 0) {
            //         $td.append($arrow).append(item[key]);
            //     } else {
            //         $td.append(item[key]);
            //     }
            //     $tr.append($td);
            // });
            $tbody.append($tr);
            if (item['children'] && item['children'].length > 0) {
                addRow(item['children'], level + 1);
            }
        });
    }

    addRow(tableData, 0);
    $table.append($tbody);

    $table.on('click', '.arrow', function () {
        var $arrow = $(this);
        var $tr = $arrow.closest('tr');
        var id = $tr.data('id');
        var level = parseInt($tr.attr('id').match(/level-(\d+)/)[1], 10);

        if ($arrow.text() === '▶') {
            $arrow.text('▼');
            showChildren(id, level);
        } else if ($arrow.text() === '▼') {
            $arrow.text('▶');
            hideChildren(id);
        }
    });

    return $table;

    function showChildren(parentId, level) {
        $table.find(`tr[data-parent-id=${parentId}]`).each(function () {
            const $child = $(this);
            $child.show();
            
            // 如果箭头是▼，则展示子节点
            // TODO: 不用▼来判断，而是用一个变量来判断
            if ($child.find('.arrow').text() === '▼') {
                showChildren($child.data('id'), level + 1);
            }
        });
    }

    function hideChildren(parentId) {
        $table.find(`tr[data-parent-id=${parentId}]`).each(function () {
            const $child = $(this);
            $child.hide();
            hideChildren($child.data('id'));
        });
    }

}

// 给级联表格添加一列，都是按钮（可能不只一个按钮），按钮文本为buttonText，点击按钮时调用callback
// tableId: 表格id, buttonText: 按钮文本
// callback: 点击按钮时调用的函数数组，函数参数为当前行的id
function addTableButton($table, title, buttonTexts, callback) {
    var $thead = $table.children('thead');
    var $tbody = $table.children('tbody');
    $thead.find('tr').append(`<th>${title}</th>`);
    $tbody.children('tr').each(function () {
        var $tr = $(this);
        var $td = $(`<td></td>`);
        buttonTexts.forEach((buttonText, index) => {
            let $button = $(`<a>${buttonText}</a>`);
            $button.on('click', function () {
                callback[index]($tr.data('id'));
            });
            $td.append($button);
        });
        $tr.append($td);
    });
}