# kyc-iframe-sample

# 주요 샘플 코드 (index.html)

- 샘플코드
  - index.html : https://github.com/useb-inc/kyc-sample-iframe/blob/production/index.html
  - kyc.js : https://github.com/useb-inc/kyc-sample-iframe/blob/production/js/kyc.js

---

# postMessage 데이터 설명 (모듈 전체)

- 포멧

```
{
  "api_response": { 사용불필요
    "result_code": "N100",
    "result_message": "OK."
  },
  "hmac": { 메세지 무결성 인증용
    "timestamp": "2023-06-12T03:30:01Z",
    "vlaue" : "<HMAC_VALUE>"
  }
  "review_result": {
    "id": 210,
    "transaction_id": 심사에 대한 유니크 키 "1686540548390099825-8760076060914995455",
    "request_time": 요청시간 ["2021-12-25T03:55:31.918Z"],
    "name": 이름 ["테스트"],
    "phone_number": 전화번호 ["01012345678]",
    "birthday": 생년월일 ["2000-01-01"],
    "result_type": 종합판정결과 [1 -> 자동승인 | 2 -> 자동거부 | 5 -> 수동심사대상]
    "result_email": 이메일 발송 [0 -> 미발송 | 1 -> 발송완료 | 2 -> 발송실패] (수동심사처리인 경우 심사 완료 후 메일이 발송 됩니다.),
    "result_sms": 메세지 발송 [0 -> 미발송 | 1 -> 발송완료 | 2 -> 발송실패],

    "module": { 고객이 사용하고 있는 기능
      "id_card_ocr": 신분증OCR 기능 사용여부 [true | false],
      "id_card_verification": 신분증진위확인 기능 사용여부 [true | false],
      "face_authentication": 신분증얼굴vs셀피얼굴 비교 기능 사용여부 [true | false],
      "account_verification": 1원 계좌인증 사용여부 [true | false],
      "liveness": 얼굴 라이브니스(진위확인) 기능 사용여부 [true | false],
      "custom_field": [true | false],
      "edd_field": [true | false],
    },
    "id_card": { 신분증인증 결과
      "modified": 신분증 OCR 결과에서 추가 수정여부 [true | false],
      "verified": 신분증 정보 정부기관 진위확인 결과 [true | false],


      "id_card_image": 신분증 민감정보 Masking 사진 ["/9j/4AAQSkZ..."],
      "id_crop_image": 신분증에서 얼굴 crop 사진 ["/9j/4AAQSkZ..."],

      "original_ocr_data": 신분증 OCR 결과(json 형식) ["{\"idType\":\"2\",\"userName\":\"홍길동\",\"driverNo\":[\"12\",\"03\",\"123456\",\"12\"],\"juminNo1\":\"990101\",\"juminNo2\":\"1001234\",\"_juminNo2\":\"1\",\"issueDate\":\"2017-01-01\",\"transaction_id\":\"4dd9c67508fb9e4489ec683dddd3f519\",\"driverNo1\":\"\",\"driverNo2\":\"11-03-123123-11\"}"],
      "modified_ocr_data": 신분증 OCR 결과에서 사용자가 직접 수정한 내용 ["{\"idType\":\"2\",\"userName\":\"임꺽정\",\"driverNo\":[\"12\",\"03\",\"123456\",\"12\"],\"juminNo1\":\"990101\",\"juminNo2\":\"1001234\",\"_juminNo2\":\"1\",\"issueDate\":\"2017-01-01\",\"transaction_id\":\"4dd9c67508fb9e4489ec683dddd3f519\",\"driverNo1\":\"\",\"driverNo2\":\"11-03-123123-11\"}"],

      "id_card_origin": 신분증 원본 촬영 사진 ["/9j/4AAQSkZ..."],
      "is_manual_input": 신분증 사진을 OCR을 사용하지 않고 직접 입력 여부 [true | false],
      "uploaded_type": 신분증 이미지 출처. pc와 mobile은 수동이며 camera일때는 촬영성공 ["pc" | "mobile" | "camera"],
      "is_uploaded": 신분증을 직접 촬영하지 않고 업로드 했는지 여부 [true | false],


    },
    "face_check": { 안면인증 결과
      "is_same_person": 신분증 얼굴사진 vs 셀피 얼굴사진 비교 결과 [true | false],
      "is_live": 셀피 얼굴사진 진위확인(라이브니스) 결과 [true | false]
      "selfie_image": 셀피 얼굴사진 ["/9j/4AAQSkZ..."]
    },
    "account": { 1원 계좌인증 결과
      "verified": 1원 계좌인증 성공여부 [true | false],
      "finance_code": 금융사코드 ["O12"],
      "finance_company": 금융사명 ["OO은행"],
      "account_number": 계좌번호 ["987654321012",],
      "account_holder": 예금주명 ["홍길동"],
      "mod_account_holder": 고객명과 계좌 예금주명이 불일치할 경우 사용자가 수정한 계좌 예금주명["Hong Gil Dong"]
    },
    "custom_result" : [
      {
        "key" : "",
        "value" : "",
        "attachment" : {
          id: 12,
          name: "사업자등록증.png"
        },
        "type" : "file",
      },
      {
        "key" : "",
        "value" : "",
        "attachment" : null,
        "type" : "text",
      }
    ],
    "edd_result" : [
      {
        "key" : "",
        "value" : "[\"직업\",\"근로소득자\",\"급여소득자\"]",
        "type" : "tree" | "ox" | "ox_addr" | "conutry"
      }
    ],
    "ra_result" : {
      "application_id" : 29, // 심사 아이디
      "ra_score" : , // EDD/RA 점수
      "ra_threshold" : [], // EDD/RA 기준값 [30, 70]
      "customer_score" : , // EDD 고객위험 점수 합계
      "customer_std_score" : , // EDD 고객위험 최대 점수
      "svc_score" : , // EDD 상품 및 서비스 위험 점수 합계
      "svc_std_score" : , // EDD 상품 및 서비스 위험 최대 점수
      "country_score" : , // EDD 국가위험 점수 합계
      "country_std_score" : , // EDD 국가위험 최대 점수
      "ra_grade" "low" | "middle" | "high",  EDD/RA 위험 결과
    }
    "histories": { 계좌 변경 정보
      "accounts": [
        {
          "finance_code": "011",
          "account_number": "1234567890987",
          "account_holder": "테스터",
          "created_at": "2022-10-11T06:32:40.063Z"
        }
      ]
    }
  },
  "attachment" : { 첨부파일 - custom_result에서 attachment값이 모두 null값이라면 attachment key는 postmessage에서 보이지 않습니다.
    "1" : {
      "file_name" : "",
      "value" : ""
    }
  }

  "result": 성공 실패 ["success" | "failed"],
}
```

---

- 샘플 (성공케이스 예시)

```json
{
  "api_response": {
    "result_code": "N100",
    "result_message": "OK."
  },
  "hmac": {
    "timestamp": "2023-06-12T03:30:01Z",
    "value": "v6Ky3/EeSr/Jn/omeyUILdt4iBBS5RW9RFAt64F3/Y8="
  },
  "review_result": {
    "id": 210,
    "transaction_id": "",
    "request_time": "2021-12-25T03:55:31.918Z",
    "name": "홍길동",
    "phone_number": "01012345678",
    "birthday": "1990-01-01",
    "result_type": 1,
    "result_email": 0,
    "result_sms": 0,

    "module": {
      "id_card_ocr": true,
      "id_card_verification": true,
      "face_authentication": false,
      "account_verification": true,
      "liveness": false,
      "custom_field": false,
      "edd_field": false
    },

    "id_card": {
      "modified": true,
      "verified": true,
      "id_card_image": "/9j/4AAQSkZ...",
      "id_crop_image": "/9j/4AAQSkZ...",
      "original_ocr_data": "{\"idType\":\"2\",\"userName\":\"홍길동\",\"driverNo\":[\"12\",\"03\",\"123456\",\"12\"],\"juminNo1\":\"990101\",\"juminNo2\":\"1001234\",\"_juminNo2\":\"1\",\"issueDate\":\"2017-01-01\",\"transaction_id\":\"4dd9c67508fb9e4489ec683dddd3f519\",\"driverNo1\":\"\",\"driverNo2\":\"11-03-123123-11\"}",
      "modified_ocr_data": "",
      "id_card_origin": "/9j/4AAQSkZ...",
      "is_manual_input": false,
      "uploaded_type": "pc",
      "is_uploaded": false
    },
    "face_check": null,
    "account": {
      "verified": true,
      "finance_company": "OO은행",
      "finance_code": "O12",
      "account_number": "987654321012",
      "account_holder": "홍길동",
      "mod_account_holder": null
    },
    "custom_result": null,
    "edd_result": null,
    "ra_result": null,
    "histories": {
      "accounts": null
    }
  },
  "result": "success"
}
```

---

- 샘플 (실패 케이스)

```json
{
  "api_response": {
    "result_code": "N100",
    "result_message": "OK."
  },
  "review_result": {
    "id": 210,
    "transaction_id": "1686540548390099825-8760076060914995455",
    "request_time": "2021-12-25T04:18:23.755Z",
    "name": "홍길동",
    "phone_number": "01012345678",
    "birthday": "2021-12-25",
    "result_type": 1,
    "rejected_email": 0,
    "reviewer_sms": 0,
    "module": {
      "id_card_ocr": true,
      "id_card_verification": true,
      "face_authentication": false,
      "account_verification": true,
      "liveness": false,
      "custom_field": false,
      "edd_field": false
    },
    "id_card": {
      "modified": false,
      "verified": false,
      "id_card_image": "/9j/4AAQSkZ...",
      "id_crop_image": "/9j/4AAQSkZ...",
      "originall_ocr_data": "/9j/4AAQSkZ...",
      "modified_ocr_data": "/9j/4AAQSkZ...",
      "id_card_origin": "/9j/4AAQSkZ...",
      "is_manual_input": false,
      "uploaded_type": "pc",
      "is_uploaded": false
    },
    "face_check": null,
    "account": null,
    "custom_result": null,
    "edd_result": null,
    "ra_result": null,
    "histories": {
      "accounts": null
    }
  },
  "result": "failed"
}
```

# 샘플 코드 셋업 가이드

[샘플 코드 셋업 가이드](/README.md#샘플-코드-셋업-가이드)
