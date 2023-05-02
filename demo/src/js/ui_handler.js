const paramBox = document.getElementById('param');
const useInputUiBox = document.getElementById('use_input_ui');
const userinfoTypeSelect = document.getElementById('userinfo_type');
const userinfoDivision = document.getElementById('userinfo-division');

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
    document.querySelector('#param .custom--radio-check').classList.add('checked');
    document.querySelector('#use_input_ui .custom--radio-check').classList.remove('checked');
    userinfoTypeSelect.options[0].selected = true;
    userinfoTypeSelect.dispatchEvent(changeEvent);
    userinfoDivision.style.display = 'block'
});
useInputUiBox.addEventListener('click', () => {
    document.querySelector('#use_input_ui .custom--radio-check').classList.add('checked');
    document.querySelector('#param .custom--radio-check').classList.remove('checked');
    userinfoTypeSelect.options[1].selected = true;
    userinfoTypeSelect.dispatchEvent(changeEvent);
    userinfoDivision.style.display = 'none';
});


if (isDevelopMode()) {
    const hijackModeInput = document.getElementById('hijack-mode-input');
    const hijackModeDivision = document.getElementById('hijack-mode-division');
    const hijackModeCheckbox = document.getElementById('hijack-mode-checkbox');
    hijackModeCheckbox.addEventListener('click', () => {
        if (hijackModeCheckbox.checked) {
            hijackModeInput.style.display = 'block';
            hijackModeDivision.style.display = 'block';
            logicOptionsDiv.style.display = 'none';
        } else {
            hijackModeInput.style.display = 'none';
            hijackModeDivision.style.display = 'none';
            logicOptionsDiv.style.display = 'block';
        }
    });
} else {
    document.getElementById('hijack-mode-section').remove();
    document.getElementById('hijack-mode-division').remove();
    document.getElementById('hijack-mode-input').remove();
}
