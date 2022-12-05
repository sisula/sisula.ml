var preview_click = '' 
var pre_content = ''

function count(func , id){
    try{
        func(id).hide()
    }
    catch(Err){
        func(id).show()
    }
}

$(document).ready(function(){
    $('.close').click(function(){
        $('.content').hide()
        $(preview_click).fadeToggle()
    })
    // ======================= Button Click ============================
    $('#about').click(function(){
        if (preview_click != ''){
        if (preview_click == btn_id['1']) return  count($, btn_id['1'])
        $(preview_click).hide()}
        $(btn_id['1']).fadeToggle()
        preview_click = btn_id['1']
    })
            $(btn_id['1']).click(function(){
            $(btn_id['1']).hide()
            if (pre_content !== ''){$(pre_content).hide()}
            pre_content = flexbx_id_nv_2['1']
            $(flexbx_id_nv_2['1']).slideDown()
        })
    //
    $('#projects').click(function(){
        if (preview_click != ''){
            if (preview_click == btn_id['2']) return count($, btn_id['2'])
            $(preview_click).hide()}
        $(btn_id['2']).fadeToggle()
        preview_click = btn_id['2']
    })
            $(btn_id['2']).click(function(){
                $(btn_id['2']).hide()
                if (pre_content !== ''){$(pre_content).hide()}
                pre_content = flexbx_id_nv_2['2']
                $(flexbx_id_nv_2['2']).slideDown()
            })
    //
    $('#source').click(function(){
        if (preview_click != ''){
            if (preview_click == btn_id['3']) return count($, btn_id['3'])
            $(preview_click).hide()}
        $(btn_id['3']).fadeToggle()
        preview_click = btn_id['3']
    })
            $(btn_id['3']).click(function(){
                $(btn_id['3']).hide()
                if (pre_content !== ''){$(pre_content).hide()}
                pre_content = flexbx_id_nv_2['3']
                $(flexbx_id_nv_2['3']).slideDown()
            })

    $('#news').click(function(){
        if (preview_click != ''){
            if (preview_click == btn_id['4']) return count($, btn_id['4'])
            $(preview_click).hide()}
        $(btn_id['4']).fadeToggle()
        preview_click = btn_id['4']
    })
            $(btn_id['4']).click(function(){
                $(btn_id['4']).hide()
                if (pre_content !== ''){$(pre_content).hide()}
                pre_content = flexbx_id_nv_2['4']
                $(flexbx_id_nv_2['4']).slideDown()
            })

    $('#Workspace').click(function(){
        if (preview_click != ''){
            if (preview_click == btn_id['5']) return count($, btn_id['5'])
            $(preview_click).hide()}
        $(btn_id['5']).fadeToggle()
        preview_click = btn_id['5']
    })
            $(btn_id['5']).click(function(){
                $(btn_id['5']).hide()
                if (pre_content !== ''){$(pre_content).hide()}
                pre_content = flexbx_id_nv_2['5']
                $(flexbx_id_nv_2['5']).slideDown()
            })

    $('#contact').click(function(){
        if (preview_click != ''){
            if (preview_click == btn_id['6']) return count($, btn_id['6'])
            $(preview_click).hide()}
        $(btn_id['6']).fadeToggle()
        preview_click = btn_id['6']
    })
            $(btn_id['6']).click(function(){
                $(btn_id['6']).hide()
                if (pre_content !== ''){$(pre_content).hide()}
                pre_content = flexbx_id_nv_2['6']
                $(flexbx_id_nv_2['6']).slideDown()
            })
})
