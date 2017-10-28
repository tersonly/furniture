//基本信息

let btns = document.querySelectorAll('input[name=info]');
let layout = document.querySelector('.select-layout');
let sections = document.querySelectorAll('.select-layout>section');

let singleSectionWidth = sections[0].offsetWidth;



let vue = new Vue({
    el: 'body',
    data: {},
    methods: {
        tab: function ()
        {
            let _target = event.target;
            history.pushState({ position: singleSectionWidth * _target.value, index: _target.value }, '', '?item=' + _target.value);
            layout.style.transform = `translateX(-${singleSectionWidth * _target.value}px)`;
        }

    },
});


window.addEventListener('resize', function () {
    singleSectionWidth = sections[0].offsetWidth;
    layout.style.transform = "translateX(0px)";
    btns[0].checked=true

})