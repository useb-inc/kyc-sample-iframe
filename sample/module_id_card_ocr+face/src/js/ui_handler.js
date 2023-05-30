const paramBox = document.getElementById('param');
const useInputUiBox = document.getElementById('use_input_ui');
const userinfoTypeSelect = document.getElementById('userinfo_type');
const userinfoDivision = document.getElementById('userinfo-division');

const changeEvent = document.createEvent('HTMLEvents');

changeEvent.initEvent('change', true, false);

paramBox.addEventListener('click', () => {
  document
    .querySelector('#param .custom--radio-check')
    .classList.add('checked');
  document
    .querySelector('#use_input_ui .custom--radio-check')
    .classList.remove('checked');
  userinfoTypeSelect.options[0].selected = true;
  userinfoTypeSelect.dispatchEvent(changeEvent);
  userinfoDivision.style.display = 'block';
});
useInputUiBox.addEventListener('click', () => {
  document
    .querySelector('#use_input_ui .custom--radio-check')
    .classList.add('checked');
  document
    .querySelector('#param .custom--radio-check')
    .classList.remove('checked');
  userinfoTypeSelect.options[1].selected = true;
  userinfoTypeSelect.dispatchEvent(changeEvent);
  userinfoDivision.style.display = 'none';
});
