const paramBox = document.getElementById('param');
const useInputUiBox = document.getElementById('use_input_ui');
const userinfoTypeSelect = document.getElementById('userinfo_type');
const userinfoDivision = document.getElementById('userinfo-division');
const hijackModeCheckbox = document.getElementById('hijack_mode_checkbox');
const hijackDivision = document.getElementById('hijack-division');
const hijackDiv = document.getElementById('hijack_div');
const changeEvent = document.createEvent("HTMLEvents");
const logicOptionsDiv = document.getElementById('logic-options');
// const userinfoBtn = document.getElementById('userinfo--btn');

changeEvent.initEvent("change", true, false);

// userinfoBtn.addEventListener('click', () => {
//     let location = document.getElementById('logic-options').offsetTop

//     console.log(location)
//     console.log(window.scrollTo)
//     window.scrollTo({ top: location, behavior: 'smooth' });
// })

paramBox.addEventListener('click', () => {
    document.querySelector('#param .customer--radio-check').classList.add('checked');
    document.querySelector('#use_input_ui .customer--radio-check').classList.remove('checked');
    userinfoTypeSelect.options[0].selected = true;
    userinfoTypeSelect.dispatchEvent(changeEvent);
    userinfoDivision.style.display = 'block'
});
useInputUiBox.addEventListener('click', () => {
    document.querySelector('#use_input_ui .customer--radio-check').classList.add('checked');
    document.querySelector('#param .customer--radio-check').classList.remove('checked');
    userinfoTypeSelect.options[1].selected = true;
    userinfoTypeSelect.dispatchEvent(changeEvent);
    userinfoDivision.style.display = 'none';
});
hijackModeCheckbox.addEventListener('click', () => {
    if (hijackModeCheckbox.checked) {
        hijackDiv.style.display = 'block';
        hijackDivision.style.display = 'block';
        logicOptionsDiv.style.display = 'none';
    } else {
        hijackDiv.style.display = 'none';
        hijackDivision.style.display = 'none';
        logicOptionsDiv.style.display = 'block';
    }
});