# kyc-iframe-sample 연동 가이드

## 샘플 소스 구성

- 크게 demo와 sample로 나뉘어져 있습니다.
  - demo는 전체 모듈들이 들어있는 폴더 입니다.
  - sample은 신분증인증, 계좌인증등 모듈별로 나뉘어져 있는 폴더 입니다.
    각 폴더는 demo와 같은 구조를 이루고 있습니다.

```
demo/
├── public/ 코드 다운로드 시에, 그대로 받게 되는 폴더입니다.
│   └── img/
│   └── lib/
│   └── res/
├── src/
│   └── css/
│       └── demo.css
│       └── style.css
│   └── js/
│       └── event_handler.js
│       └── kyc.js --> index.html 에서 실행될 샘플 js script 입니다.
│       └── ui_handler.js
│       └── util.js
│   └── index.html --> 직접 보게 될 화면 입니다.
│
└── gulpfile.babel.js --> gulp를 이용하여 babel로 compile(transpile) 합니다.


sample/
├── module_id_card_ocr
│
├── module_id_card_ocr+face
│
├── module_id_card_ocr+face+liveness
│
├── module_id_card_ocr+face+liveness+account
│
├── module_account
│
├── module_id_card_ocr+account
│
└── module_id_card_ocr+face+account
```
