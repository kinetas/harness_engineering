# Product Requirement Document

---

# Project Overview

## Project Name
[PROJECT_NAME]

## Project Objective
이 프로젝트에서 최종적으로 구현하려는 목표를 작성.

예시:
- AI 기반 자동 개발 시스템 구축
- 실시간 채팅 플랫폼 개발
- 게임 런처 제작
- 업무 자동화 웹 서비스 구축

---

# User Requirements

## What do you want to build?
유저가 만들고 싶은 시스템/서비스 설명.

## Why are you building this?
프로젝트 목적 및 해결하려는 문제 작성.

## Target Users
예상 사용자층 작성.

예시:
- 일반 사용자
- 개발자
- 기업 내부 팀
- 디자이너

---

# Core Features

반드시 필요한 핵심 기능 작성.

## Required Features

- [ ] 로그인 시스템
- [ ] AI 채팅 기능
- [ ] 실시간 알림
- [ ] 관리자 페이지
- [ ] 보고서 생성
- [ ] 파일 업로드

추가 기능 자유 작성 가능.

---

# Detailed Feature Requirements

## Feature Name
기능 설명 작성.

### Purpose
왜 필요한 기능인지 설명.

### Expected Behavior
실제 동작 방식 설명.

### Input
입력 데이터 설명.

### Output
출력 결과 설명.

### Dependencies
이 기능 구현 전에 반드시 완료되어야 하는 선행 기능 ID 작성.
선행 기능이 없으면 None으로 표기.

예시:
- Dependencies: [FEAT-01, FEAT-02]
- Dependencies: None

> Boss AI는 이 항목을 기준으로 병렬 처리 가능한 작업과
> 직렬 처리가 필요한 작업을 구분하여 Sub AI에게 할당한다.

---

# UI / UX Requirements

원하는 UI/UX 스타일 작성.

예시:
- 다크모드
- 미니멀 디자인
- 게임 스타일 UI
- 모바일 우선 디자인
- 반응형 웹

---

# Technical Requirements

## Preferred Language
사용 희망 언어 작성.

예시:
- Python
- TypeScript
- Go
- Rust

## Preferred Framework
원하는 프레임워크 작성.

예시:
- FastAPI
- Next.js
- React
- Electron
- NestJS

## Database
사용 희망 DB 작성.

예시:
- PostgreSQL
- MySQL
- MongoDB
- SQLite

## Infrastructure
원하는 인프라 작성.

예시:
- Docker
- Kubernetes
- AWS
- Firebase
- Redis
- Kafka

---

# External Tools / APIs

사용 예정인 외부 Tool 및 API 작성.

| Tool/API | Purpose |
|---|---|
| OpenAI API | AI 기능 |
| Discord API | 디스코드 연동 |
| Stripe | 결제 시스템 |
| Kafka | 이벤트 처리 |
| Redis | 캐시 |

---

# Development Rules

## Coding Style
원하는 코딩 스타일 작성.

예시:
- snake_case 변수명 사용
- 함수 camelCase 사용
- TypeScript strict mode 사용

## Architecture Style
원하는 구조 작성.

예시:
- MSA
- Event Driven
- MVC
- Clean Architecture

---

# Performance Requirements

## Expected Scale
예상 규모 작성.

예시:
- 동시 접속자 1,000명
- 하루 API 호출 100만회

## Optimization Priority
우선순위 작성.

예시:
- 속도 우선
- 비용 절감 우선
- 확장성 우선

---

# Security Requirements

필요한 보안 정책 작성.

예시:
- JWT 인증
- OAuth 로그인
- Role 기반 권한 관리
- Rate Limit 적용

---

# Future Plans

향후 추가 예정 기능 작성.

예시:
- 모바일 앱 출시
- AI 자동화 기능 추가
- 멀티 서버 지원

---

# Boss AI Instructions

Boss AI must:

1. Analyze all requirements.
2. Split tasks into smaller units.
3. Assign suitable AI for each task.
4. Request HR AI when additional AI is needed.
5. Follow Coding Rule.txt strictly.
6. Prioritize stability and readability.
7. Generate task workflow before development starts.

---

# Final Notes

추가 요청사항 자유 작성.