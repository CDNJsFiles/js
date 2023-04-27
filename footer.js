$(function() {
    var from_init = $('#from_select').find("option:selected").val();
    var to_init = $('#to_select').find("option:selected").val();
    if (from_init.localeCompare(to_init) == 0) {
        $("#to_select option[value='" + from_init + "']").remove();
        $("#from_select option[value='" + $('#to_select').find("option:selected").val() + "']").remove();
        $('.selectpicker').selectpicker('refresh')
    }
    $('#invertSelection').on('click', function(e) {
        var t = document.getElementById("from_select"),
            n = document.getElementById("to_select"),
            d = t.getElementsByTagName("option")[t.selectedIndex].value,
            l = t.getElementsByTagName("option")[t.selectedIndex].innerHTML,
            m = n.getElementsByTagName("option")[n.selectedIndex].value,
            o = n.getElementsByTagName("option")[n.selectedIndex].innerHTML;
        $("#from_select option[value='" + m + "']").remove();
        $("#to_select option[value='" + d + "']").remove();
        $('#to_select').prepend("<option value='" + d + "' selected data-content='<span class=\"flag-icon flag-icon-" + getFlags(d) + "\"></span> " + l + "'>" + l + "</option>");
        $('#from_select').prepend("<option value='" + m + "' selected data-content='<span class=\"flag-icon flag-icon-" + getFlags(m) + "\"></span> " + o + "'>" + o + "</option>");
        $('.selectpicker').selectpicker('refresh')
    });
    $("#form").click(function(e) {
        var from_init = $('#from_select').find("option:selected").val();
        var to_init = $('#to_select').find("option:selected").val();
        if (from_init.localeCompare(to_init) == 0) {
            $('#error_msg').text("Source language and target language are the same!");
            e.preventDefault()
        } else {
            $('#error_msg').text("")
        }
    })
});

function change_language(from, name) {
    $('#from_select').prepend("<option value='" + from + "' selected data-content='<span class=\"flag-icon flag-icon-" + getFlags(from) + "\"></span> " + name + "'>" + name + "</option>");
    $('.selectpicker').selectpicker('refresh');
    var to = $('#to_select').find("option:selected").val();
    if (to.localeCompare(from) == 0) {
        $('.predict_language').hide();
        e.preventDefault()
    }
    $("form:first").submit()
}

function getFlags(lang_code) {
    switch (lang_code) {
        case 'en':
            return 'gb';
            break;
        case 'hi':
            return 'in';
            break;
        case 'ar':
            return 'sa';
            break;
        case 'ko':
            return 'kr';
            break;
        case 'ja':
            return 'jp';
            break;
        case 'zh':
            return 'cn';
            break;
        case 'sv':
            return 'se';
            break;
        case 'da':
            return 'dk';
            break;
        case 'el':
            return 'gr';
            break;
        case 'cs':
            return 'cz';
            break;
        case 'bn':
            return 'bd';
            break;
        case 'uk':
            return 'ua';
            break;
        case 'ca':
            return 'es';
            break;
        default:
            return lang_code;
            break
    }
}
window.$$initInstance && window.$$initInstance(function(node) {
    function closeMenu() {
        node.parentNode.removeChild(node);
        node.closeMenu = undefined
    }
    node.querySelector('.fermeture').addEventListener('click', closeMenu);
    node.querySelector('.lNavPopup__overlay').addEventListener('click', closeMenu);
    node.closeMenu = closeMenu
});
window.LeMenu = {
    toggleMenu: function() {
        if (this._popupNode && this._popupNode.closeMenu) {
            this._popupNode.closeMenu();
            this._popupNode = undefined
        } else this._popupNode = UI_Tools.createTemplateInstance('#template_navPopup', 'body')
    }
}

