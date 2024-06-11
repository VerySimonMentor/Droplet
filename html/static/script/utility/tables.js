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
function checkCascadeHeaderData(header, data) {
    return data.every(item => 
        Object.keys(item).filter(key => key !== 'parentId' && key !== 'children').length === header.length
    );
}

//创建级联表格
//返回一个jq的table对象
//tableId: 表格id, tableHeader: 表头, tableData: 表格数据
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
        var $th = $(`<th>${header}</th>`);
        $tr.append($th);
    });
    $thead.append($tr);
    $table.append($thead);

    function addRow(data, level) {
        data.forEach(item => {
            var $tr = $(`<tr data-id="${item.id}" data-parent-id="${item.parentId}" class="cascade-table-level-${level}"></tr>`);
            var $arrow = (item.children.length) > 0 ? $('<span class="arrow">▼</span>'): '';
            // 遍历item除了.parentId和.children的属性
            Object.keys(item).filter(key => key !== 'parentId' && key !== 'children').forEach((key, index) => {
                var $td = $(`<td></td>`);
                //在第一个td中添加箭头
                if (index === 0) {
                    $td.append($arrow).append(item[key]);
                } else {
                    $td.append(item[key]);
                }
                
                $tr.append($td);
            });
    
            $tbody.append($tr);
            if (item.children.length > 0) {
                addRow(item.children, level + 1);
            }
        });
    }

    addRow(tableData, 0);
    $table.append($tbody);

    $table.on('click', '.arrow', function () {
        var $arrow = $(this);
        var $tr = $arrow.closest('tr');
        var id = $tr.data('id');
        var level = parseInt($tr.attr('class').match(/level-(\d+)/)[1], 10);

        if ($arrow.text() === '▶') {
            $arrow.text('▼');
            showChildren(id, level);
        } else if($arrow.text() === '▼'){
            $arrow.text('▶');
            hideChildren(id);
        }
    });

    return $table;

    function showChildren(parentId, level) {
        $table.find(`tr[data-parent-id=${parentId}]`).each(function () {
            const $child = $(this);
            $child.show();

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