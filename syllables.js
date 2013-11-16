
function get_selection()
{
    var html = "";
    var color_list = [ "red", "blue", "orange", "green", "purple" ];

    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            if (sel.rangeCount != 1)
                console.log("Warning : multiple selections not supported");

            range = sel.getRangeAt(0);

            // get text under selection
            container.appendChild(range.cloneContents());
            html = container.innerHTML;

            // Change color of text
            if (range.startOffset != range.endOffset)
            {
                document.designMode = "on";
                sel.removeAllRanges();
                sel.addRange(range);
                // Use HiliteColor since some browsers apply BackColor to the whole block
                if (!document.execCommand("HiliteColor", false, color_list[window.color_counter])) {
                    document.execCommand("BackColor", false, color_list[window.color_counter]);
                }
                document.designMode = "off";
            }

            // // remove selection
            // if (sel.empty) {  // Chrome
            //     sel.empty();
            // } else if (sel.removeAllRanges) {  // Firefox
            //     sel.removeAllRanges();
            // }
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
    $(div).addClass("syllable");
    $(div).css("color", color_list[window.color_counter]);
    $(div).draggable();
    $('body').append(div);

    // finally update global counter
    window.color_counter = (window.color_counter + 1) % color_list.length;
}

$(function() {
    window.color_counter = 0;
    $( "#text-written" ).mouseup(get_selection);
});
