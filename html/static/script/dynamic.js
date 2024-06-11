// 维护一个已加载脚本的列表
const loadedScripts = new Set();
// 维护一个已加载样式的列表
const loadedStyles = new Set();


/**
 * Dynamically loads a JavaScript file using jQuery and executes a callback function once the file is loaded.
 *
 * @param {string} url - The URL of the JavaScript file to load.
 * @param {function} callback - The function to execute once the script is loaded.
 */
function loadScript(url, callback=null) {
    // 检查是否已加载脚本
    if (loadedScripts.has(url)) {
        console.log('Script already loaded:', url);
        if (callback) {
            try {
                callback();
            } catch (error) {
                console.error('Error executing callback:', error);
            }
        }
        return;
    }
    // 检查是否提供了URL
    if (!url) {
        console.error('URL is required to load a script.');
        return;
    }
    // 使用jQuery的getScript方法来加载JavaScript文件
    $.getScript(url)
        .done(function(script, textStatus) {
            // 当脚本加载成功时，执行回调函数
            console.log('Script loaded:', url);
            loadedScripts.add(url);
            if (callback) {
                try {
                    callback();
                } catch (error) {
                    console.error('Error executing callback:', error);
                }
            }
        })
        .fail(function(jqxhr, settings, exception) {
            // 处理加载失败的情况
            console.error('Error loading script:', url, exception);
        });
}

/**
 * Dynamically loads a CSS file by creating a new <link> element and appending it to the <head> element.
 *
 * @param {string} url - The URL of the CSS file to load.
 */
function loadStyle(url) {
    // 检查是否已加载样式
    if (loadedStyles.has(url)) {
        console.log('Style already loaded:', url);
        return;
    }

    // 检查是否提供了URL
    if (!url) {
        console.error('URL is required to load a style.');
        return;
    }

    // 创建一个新的 <link> 元素
    // 使用jQuery的getScript方法来加载JavaScript文件
    var link = document.createElement("link");
    link.type = "text/css";  // 设置元素类型为 "text/css"
    link.rel = "stylesheet";  // 设置元素的 rel 属性为 "stylesheet"
    link.href = url;  // 设置元素的 href 属性为指定的 URL

    //处理加载成功的情况
    link.onload = function() {
        loadedStyles.add(url);
        console.log('Style loaded:', url);
    };

    //处理加载失败的情况
    link.onerror = function() {
        console.error('Error loading style:', url);
    };

    // 将link元素添加到head中
    document.head.appendChild(link);
}