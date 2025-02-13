// ==UserScript==
// @name         GEE任务取消  (GEE Task Cancellation)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  根据输入框里的关键词，将任务列表中匹配关键词的任务批量删除（通常这个关键词是日期）  (Batch delete tasks in the task list that match the keyword entered in the input box, usually the keyword is a date.)
// @author       You
// @match        https://code.earthengine.google.com/
// @icon         https://code.earthengine.google.com/images/bigicon.png
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    // Function to find a string in a div's content
    // 在 div 的内容中查找字符串
    function findStringInDiv(div, searchString) {
        // 获取 div 内容的文本  (Get the text content of the div)
        const divText = div.textContent || div.innerText;

        // 在 div 文本中搜索指定字符串  (Search for the specified string in the div text)
        if (divText.includes(searchString)) {
            return true;
        } else {
            return false;
        }
    }

    // Append a fixed position div with input and button for task cancellation
    // 在页面上添加一个固定位置的 div，包含输入框和按钮来取消任务
    $("body")
        .append("<div style='position:fixed;z-index:999;width:250px;heigh:90px;top:15px;right:260px;display:flex'id='cancel_muti'><input type='text' class='search' style='width:130px' placeholder='Type keywords' id='keyword_of_del'></input><button class='goog-button link-button' style='color:#4888ef;margin-left: 5px;' id='muti-cancel'>Muti-Cancel</button></div>")

    var list_box = $('div > div.content > ee-remote-task-list');

    // When the "Muti-Cancel" button is clicked
    // 当点击 "Muti-Cancel" 按钮时
    $("#muti-cancel").click(function(){
        var keywords = $('#keyword_of_del').val();  // 获取输入框中的关键词 (Get the keyword from the input box)
        console.log(keywords)

        // Loop through all the task list items
        // 遍历任务列表中的所有项
        document.querySelector("#task-pane").shadowRoot.querySelector("div > ee-remote-task-list").shadowRoot.querySelector("div.remote-tasks").querySelectorAll('div').forEach(childDiv => {
            // 在这里对每个子 div 进行操作  (Operate on each child div here)
            //console.log(childDiv);
            childDiv.click();

            // If the child div contains the search keyword
            // 如果子 div 中包含搜索的关键词
            if(findStringInDiv(childDiv, keywords)){
                try {
                    // Try to click the cancel button for that task
                    // 尝试点击该任务的取消按钮
                    childDiv.querySelector("div.info > div.links > button").click();
                } catch (err) {
                    console.log("er");  // If there's an error, log it (如果出现错误，记录日志)
                }
            }
        })
    })

    console.log(list_box);  // Log the task list box (记录任务列表框)
})();
