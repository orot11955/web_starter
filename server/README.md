# Web Starter Backend

React/Vite web starter와 바로 연결되는 Spring Boot API 서버입니다.

## Package Structure

```txt
com.project.web_starter_was
├─ global
│  ├─ config      Spring Security, CORS, application properties binding
│  ├─ exception   공통 예외 타입, 에러 코드, 에러 응답 변환
│  ├─ response    ApiResponse, PageResponse
│  └─ security    JWT 발급/검증, 인증 principal, JWT filter
└─ domain
   ├─ auth        로그인, 내 정보 조회, 로그아웃 API
   ├─ user        사용자 목록/상세/등록/수정/삭제 API
   └─ role        Role, Permission 조회 책임
```

## API Contract

모든 정상 응답은 프론트의 `ApiResponse<T>`와 동일한 형태를 사용합니다.

```json
{
  "success": true,
  "data": {},
  "message": null,
  "code": "OK"
}
```

오류 응답은 `ApiErrorResponse`와 맞춥니다.

```json
{
  "success": false,
  "message": "접근 권한이 없습니다.",
  "code": "FORBIDDEN",
  "errors": null
}
```

## Implemented Endpoints

```txt
POST   /api/auth/login
GET    /api/auth/me
POST   /api/auth/logout

GET    /api/users
GET    /api/users/{id}
POST   /api/users
PUT    /api/users/{id}
DELETE /api/users/{id}
```

초기 개발 계정은 `admin / admin`입니다.

## Responsibility Rules

- `controller`: HTTP 요청/응답과 validation만 담당합니다.
- `service`: 트랜잭션, 정책, DTO 변환을 담당합니다.
- `repository`: SQL과 저장소 접근만 담당합니다.
- `global`: 특정 업무 도메인에 종속되지 않는 공통 기능만 둡니다.
- `role`: 인증/인가에서 공통으로 쓰이는 역할과 권한 조회를 담당하며, 사용자 생성/수정의 역할 검증에도 사용됩니다.
