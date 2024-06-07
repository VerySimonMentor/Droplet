// /**
//  * Dynamically loads a JavaScript file and executes a callback function once the file is loaded.
//  *
//  * @param {string} url - The URL of the JavaScript file to load.
//  * @param {function} callback - The function to execute once the script is loaded.
//  */
// function loadScript(url, callback) {
//     var script = document.createElement("script");  // 创建一个新的 <script> 元素
//     script.type = "text/javascript";  // 设置元素类型为 "text/javascript"
    
//     // 处理不同浏览器的兼容性
//     if (script.readyState) {  // 如果 script.readyState 存在（用于 IE）
//         /**
//          * 监听 script 元素的状态变化
//          * 当 readyState 变为 "loaded" 或 "complete" 时，表示脚本已加载完成
//          */
//         script.onreadystatechange = function() {
//             if (script.readyState == "loaded" || script.readyState == "complete") {
//                 script.onreadystatechange = null;  // 清除事件处理程序
//                 callback();  // 执行回调函数
//             }
//         };
//     } else {  // 处理其他浏览器
//         /**
//          * 监听 script 元素的加载事件
//          * 当脚本加载完成时，执行回调函数
//          */
//         script.onload = function() {
//             callback();  // 执行回调函数
//         };
//     }
    
//     script.src = url;  // 设置 script 元素的 src 属性为指定的 URL
//     document.getElementsByTagName("head")[0].appendChild(script);  // 将 script 元素添加到文档的 <head> 中
// }





/**
 * Dynamically loads a JavaScript file using jQuery and executes a callback function once the file is loaded.
 *
 * @param {string} url - The URL of the JavaScript file to load.
 * @param {function} callback - The function to execute once the script is loaded.
 */
function loadScript(url, callback=null) {
    // 使用jQuery的getScript方法来加载JavaScript文件
    $.getScript(url)
        .done(function(script, textStatus) {
            // 当脚本加载成功时，执行回调函数
            console.log('Script loaded:', url);
            if (callback) {
                callback();
            }
        })
        .fail(function(jqxhr, settings, exception) {
            // 处理加载失败的情况
            console.error('Error loading script:', url, exception);
        });
}


function loadStyle(url) {
    // 创建一个新的 <link> 元素
    var link = document.createElement("link");
    link.type = "text/css";  // 设置元素类型为 "text/css"
    link.rel = "stylesheet";  // 设置元素的 rel 属性为 "stylesheet"
    link.href = url;  // 设置元素的 href 属性为指定的 URL
    document.getElementsByTagName("head")[0].appendChild(link);  // 将 link 元素添加到文档的 <head> 中
}