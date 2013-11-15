
function get_selection()
{
    var html = "";
    var color_list = [ "red", "blue", "green", "yellow" ];

    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }

    if (html == "")
        return;

    var div = document.createElement("div");
    div.innerHTML = html;
    $(div).css("border-style", "solid");
    $(div).css("color", color_list[window.color_counter]);
    $(div).css("cursor", "default");
    $(div).css("float", "left");
    $(div).css("width", "auto");
    $(div).draggable();
    $('body').append(div);

    // finally update global counter
    window.color_counter = (window.color_counter + 1) % color_list.length;
}

$(function() {
    window.color_counter = 0;
    $( "#text-written" ).mouseup(get_selection);
});
