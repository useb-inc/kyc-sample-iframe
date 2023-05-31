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

function isUseBDomain() {
  const USEB_DOMAIN = "useb.co.kr";
  return window.location.hostname.includes(USEB_DOMAIN);
}

function getSignInURL() {
  if (isUseBDomain()) {
    const delimiter = "https://kyc"
    const tmp = KYC_TARGET_ORIGIN.split(delimiter);
    return delimiter + "-api" + tmp[1];
  } else {
    // POST https://kyc-api.useb.co.kr/sign-in API는 운영계에서 CORS가 미허용되어 있습니다.
    // 따라서, 브라우저(클라이언트)에서 운영계 URL로 /sign-in 호출시 CORS 이슈가 발생되며,
    // 고객사 서버에서 운영계 URL(https://kyc-api.useb.co.kr/sign-in)로 API 호출 후
    // 응답받은 token을 access_token으로 넣어 연동해야합니다.
    // 예제에서는 CORS가 허용 되어있는 계발계 URL로 임시 호출하도록 되어있습니다.
    return "https://kyc-api-dev.useb.co.kr";
  }
}
