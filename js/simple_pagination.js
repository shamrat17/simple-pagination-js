/*
    this is a simple pure js framework for a light weight html table pagination
    created by Shamrat Akbar
    it's free for any kinds of use and modification
    Date: 26/08/17
*/

(function(){

    this.SimplePagination = function(){

        this.tableId    = "";
        this.numRows    = 0;
        this.rowPerPage = 5;
        this.tr         = [];
        this.th         = "";
        this.rowPerPage = 5;
        this.pageCount  = 0;

        var defaults ={

        }
        if (arguments[0] && typeof arguments[0] == "objects") {
            this.tableId = arguments[0].tableId;
            this.rowPerPage = arguments[0].rowPerPage;
        }
        initialize.call(this)
    }

    function initialize() {
        var table = document.getElementById(this.tableId);
        this.numRows = table.rows.length;
        var firstRow = table.rows[0].firstElementChild.tagName;
        var hasHead  = (firstRow == "TH");
        this.tr = [];
        var loopStartFrom = (hasHead)?1:0;
        this.th = (hasHead ? table.rows[(0)].outerHTML:"");
        this.pageCount = Math.ceil(this.numRows/this.rowPerPage);

        if (this.pageCount > 1) {

            for (var i = loopStartFrom, ii=0; i < this.numRows; i++,ii++) {
                this.tr[ii] = table.rows[i].outerHTML;
            }
            table.insertAdjacentHTML("afterend","<div id='buttons'></div");
            sort(1);
        }
    }
    function sort(page) {
        var rows = this.th;
        var startIndex = ((this.rowPerPage * page) - this.rowPerPage);

        for (var i = startIndex; i < (startIndex+this.rowPerPage) && i < this.tr.length; i++) {
            rows+=this.tr[i];
        }
        table.innerHTML = rows;
        // create the pagination buttons
        document.getElementById("buttons").innerHTML = pageButtons(this.pageCount,page);
        // CSS Stuff
        document.getElementById("id"+page).setAttribute("class","active");
    }
    function pageButtons(pCount,cur) {
        var prevDis = (cur == 1)?"disabled":"",
            nextDis = (cur == pCount)?"disabled":"",
            /* this (buttons) will hold every single button needed
            ** it will creates each button and sets the onclick attribute
            ** to the "sort" function with a special (p) number..
            */
            buttons = "<input type='button' value='&lt;&lt; Prev' onclick='sort("+(cur - 1)+")' "+prevDis+">";
        for (i=1; i<=pCount;i++)
            buttons += "<input type='button' id='id"+i+"'value='"+i+"' onclick='sort("+i+")'>";
        buttons += "<input type='button' value='Next &gt;&gt;' onclick='sort("+(cur + 1)+")' "+nextDis+">";
        return buttons;
    }



}());