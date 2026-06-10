# Stock Lab Portfolio

보유 주식, 관심종목, 배당, KOSPI/NASDAQ 지수를 보여주는 웹 대시보드 프로토타입입니다.

## 로컬 실행

```bash
npm start
```

브라우저에서 아래 주소를 엽니다.

```text
http://127.0.0.1:5173
```

## Render 배포

1. 이 폴더를 GitHub 저장소에 올립니다.
2. Render에서 `New +` -> `Web Service`를 선택합니다.
3. GitHub 저장소를 연결합니다.
4. 설정값은 아래처럼 둡니다.

```text
Runtime: Node
Build Command: npm install
Start Command: npm start
```

5. 배포가 끝나면 Render가 `https://...onrender.com` 주소를 제공합니다.
6. 블로그에는 그 주소를 링크로 넣으면 됩니다.

## 블로그 공유

네이버 블로그는 외부 iframe/script 삽입이 제한될 수 있으므로 링크와 스크린샷 공유를 권장합니다.

```text
Stock Lab 대시보드 보기
https://your-render-url.onrender.com
```

티스토리나 워드프레스처럼 iframe을 허용하는 블로그는 아래처럼 삽입할 수 있습니다.

```html
<iframe
  src="https://your-render-url.onrender.com"
  width="100%"
  height="900"
  style="border:0; border-radius:12px;"
  loading="lazy">
</iframe>
```

## 데이터

- `/api/quotes`에서 Yahoo Finance chart 데이터를 가져옵니다.
- KOSPI, NASDAQ, USD/KRW, 관심종목 가격을 10초마다 갱신합니다.
- 투자자 동향 등 일부 데이터는 UI 확인용 샘플입니다.

## 유의사항

이 앱은 투자 조언이 아닙니다. 실제 투자 판단 전에는 증권사 HTS/MTS, 공식 거래소, 공시 자료로 재확인해야 합니다.
