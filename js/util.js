const DEV_KYC_DEMO_DOMAIN = "kyc-demo-dev.useb.co.kr";

function removeDebugWin() {
  const div = document.getElementById("debug_win");
  div.style.display = "none";
  div.innerHTML = "";

}
function updateDebugWin(inp) {
  if (document.getElementById("debug_win_checkbox").checked === false) {
    return;
  }
  const div = document.getElementById("debug_win");
  const closeBtn = document.createElement("div");
  closeBtn.className = "closeBtn";
  closeBtn.innerHTML = "[DEBUG] postMessage 수신 &nbsp;&nbsp;&nbsp; <span onclick='javascript:removeDebugWin()'><b>[X]</b></span>";
  const pre = document.createElement("pre");
  pre.className = "syntaxHighlight popupSize";
  pre.innerHTML = inp;
  div.appendChild(closeBtn);
  div.appendChild(pre);
  div.style.display = "block";

}
function syntaxHighlight(json) {
  json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    let cls = "number";
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = "key";
      } else {
        cls = "string";
      }
    } else if (/true|false/.test(match)) {
      cls = "boolean";
    } else if (/null/.test(match)) {
      cls = "null";
    }
    return '<span class="' + cls + '">' + match + "</span>";
  });

}

async function signIn(params) {
  const { customer_id, username, password } = params;

  const res = await fetch(getSignInURL() + "/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer_id: Number(customer_id),
      username,
      password,
    }),
  });
  return await res.json();
}

function isHijackMode() {
  if (isDevelopMode()) {
    const hijackMode = document.getElementById("hijack-mode-checkbox");
    return hijackMode?.checked;
  } else {
    return false;
  }
}

function getSignInURL() {
  const delimiter = "https://kyc"
  const tmp = KYC_TARGET_ORIGIN.split(delimiter);
  return delimiter + "-api" + tmp[1];
}

function isDevelopMode() {
  return window.location.hostname.includes(DEV_KYC_DEMO_DOMAIN) > 0;
}

function setHijackMode() {
  if (isHijackMode()) {
    const hijack_customer_id = document.getElementById("hijack_customer_id").value;
    const hijack_client_id = document.getElementById("hijack_client_id").value;
    const hijack_client_secret = document.getElementById("hijack_client_secret").value;
    const hijack_kyc_target = document.getElementById("hijack_kyc_target").value;
    if (!hijack_customer_id || !hijack_client_id || !hijack_client_secret || !hijack_kyc_target) {
      alert("hijack 정보가 입력되지 않았습니다.");
      hideLoadingUI();
    } else {
      KYC_TARGET_ORIGIN = hijack_kyc_target;
      KYC_URL = KYC_TARGET_ORIGIN + "/auth";
    }
  }
}

function performHijack(params) {
  if (isHijackMode()) {
    params.customer_id = document.getElementById("hijack_customer_id").value;
    params.id = document.getElementById("hijack_client_id").value;
    params.key = document.getElementById("hijack_client_secret").value;
  }
}
