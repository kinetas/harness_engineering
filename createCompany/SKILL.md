---
name: createCompany
description: 워크스페이스 생성 — doc/, develope/, report/ 등 폴더 및 초기 파일 구조를 생성합니다.
---
<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: node build.js -->

The user has invoked `/createCompany`. Create the workspace folder and file structure only.

Do NOT initialize any AI. That is handled by `/startCompany`.

---

## Step 1 — Detect Existing State

Check whether the following content files already exist:
- `doc/PRD.md`
- `doc/Coding_Rule.txt`
- `report/report.md`

If **any of them exist**, this is a **re-initialization** (user is resuming or restarting after `/deleteCompany`).
If **none exist**, this is a **fresh setup**.

---

## Step 2 — Create Folder Structure

Create the following folders if they do not exist:
- `doc/sample/`
- `develope/`
- `add/installed/`
- `add/config/`
- `add/runtime/`
- `add/template/`
- `report/fragment/`

---

## Step 3 — Create Files

### Always create (overwrite is safe — these are AI operational files):
- `doc/AI_anomaly.txt`
- `add/registry.json`

#### `doc/AI_anomaly.txt`
```
[AI Anomaly Log]

(Monitoring AI가 이상 감지 시 이 파일에 기록합니다.)
```

#### `add/registry.json`
```json
{
  "extensions": []
}
```

### Create only if file does NOT already exist:
- `doc/PRD.md`
- `doc/Coding_Rule.txt`
- `doc/db.md`
- `develope/README.md`
- `report/report.md`

#### `doc/PRD.md`
```
# Product Requirement Document

(이 파일을 작성한 후 /projectStart 를 입력하세요.)

---

# Project Overview

## Project Name
[PROJECT_NAME]

## Project Objective


---

# User Requirements

## What do you want to build?

## Why are you building this?

## Target Users

---

# Core Features

## Required Features

- [ ]

---

# Detailed Feature Requirements

## Feature Name

### Purpose

### Expected Behavior

### Input

### Output

### Dependencies
- Dependencies: None

---

# UI / UX Requirements

---

# Technical Requirements

## Preferred Language

## Preferred Framework

## Database

## Infrastructure

---

# External Tools / APIs

| Tool/API | Purpose |
|---|---|
|  |  |

---

# Development Rules

## Coding Style

## Architecture Style

---

# Performance Requirements

## Expected Scale

## Optimization Priority

---

# Security Requirements

---

# Future Plans

---

# Boss AI Instructions

Boss AI must:

1. Analyze all requirements.
2. Split tasks into smaller units.
3. Assign suitable AI for each task.
4. Spawn Manager AI per segment to coordinate Sub AI.
5. Follow Coding Rule.txt strictly.
6. Prioritize stability and readability.
7. Generate task workflow before development starts.

---

# Final Notes
```

#### `doc/Coding_Rule.txt`
```
[Harness Engineering 코딩 규칙]

(프로젝트 시작 전 이 파일에 코딩 규칙을 작성하세요.)
(참고 양식: doc/sample/Coding_Rule_sample.txt)
```

#### `doc/db.md`
```markdown
# Database Design Document

(PRD 작성 후 이 파일에 DB 설계 내용을 정리하세요.)

---

# 페이지 구성

| 페이지명 | URL 경로 | 설명 | 인증 필요 |
|---|---|---|---|
|  |  |  |  |

---

# 필요 기능

## 기능 목록

- [ ] 기능명: 설명

## 기능별 데이터 요구사항

### [기능명]
- 읽기:
- 쓰기:
- 삭제:

---

# 전체 엔티티 구성

## 엔티티 목록

| 엔티티명 | 테이블명 | 설명 |
|---|---|---|
|  |  |  |

## 엔티티 상세

### [Entity Name]

| 컬럼명 | 타입 | NULL | 기본값 | 설명 |
|---|---|---|---|---|
| id | BIGINT | NO | AUTO_INCREMENT | PK |
| created_at | DATETIME | NO | CURRENT_TIMESTAMP |  |
| updated_at | DATETIME | NO | CURRENT_TIMESTAMP |  |

## 관계도 (ERD 요약)

```
[Entity A] 1──* [Entity B]
[Entity B] *──1 [Entity C]
```

---

# 외부 API 사용 목록

| API 이름 | 용도 | 연동 엔티티 | 비고 |
|---|---|---|---|
|  |  |  |  |

---

# 인증 / 권한 설계

## 인증 방식

- [ ] JWT
- [ ] Session
- [ ] OAuth2

## 권한 레벨

| 역할 | 권한 범위 |
|---|---|
| 관리자 |  |
| 일반 사용자 |  |
| 비회원 |  |

---

# 인덱스 전략

| 테이블 | 인덱스 컬럼 | 인덱스 타입 | 이유 |
|---|---|---|---|
|  |  |  |  |

---

# 데이터 흐름

## 주요 시나리오별 흐름

### 시나리오: [기능명]
1.
2.
3.

---

# 마이그레이션 계획

## 초기 시드 데이터

- [ ] 기본 카테고리
- [ ] 관리자 계정

## 스키마 변경 정책

---

# 보안 고려사항

- [ ] 민감 데이터 암호화 (비밀번호, 개인정보)
- [ ] SQL Injection 방지
- [ ] 접근 제어 (Row-level Security 등)

---

# 성능 고려사항

## 예상 데이터 규모

| 테이블 | 예상 레코드 수 | 증가율 |
|---|---|---|
|  |  |  |

## 캐싱 전략

- [ ] Redis 캐시 대상:
- [ ] 캐시 TTL:
```

#### `develope/README.md`
```
# develope

이 폴더는 AI가 생성한 소스 코드가 저장되는 공간입니다.

- Developer AI가 코드를 이 폴더 안에 작성합니다.
- Debugger AI가 이 폴더의 코드를 검수합니다.
- 구조는 PRD의 Architecture Style을 따릅니다.
```

#### `report/report.md`
```
# Project Report

Last Update: (미시작)

---

# Project Status

## Current Progress
- 시스템 초기화 완료
- PRD 작성 대기 중

## Overall Completion
- Planning: 0%
- Core System: 0%
- Extension System: 0%
- UI/UX: 0%

---

# Current Working Tasks

| Task | Assigned AI | Status |
|---|---|---|
| (없음) | - | - |

---

# Patch Notes

---

# Current Issues

| Priority | Issue | Status |
|---|---|---|
| - | - | - |

---

# Next Targets

- PRD 작성 후 /projectStart 입력

---

# AI Activity Summary

| AI | Activity |
|---|---|
| Boss AI | 시스템 초기화 |

---

# Reference Fragments

(없음)
```

---

## Step 4 — Note Sample Files

The following sample files already exist as read-only references. Do NOT overwrite them:
- `doc/sample/PRD_sample.md`
- `doc/sample/AI_list_sample.txt`
- `doc/sample/AI_anomaly_sample.txt`
- `doc/sample/Coding_Rule_sample.txt`
- `report/fragment/fragment_sample.md`
- `report/report_sample.md`

---

## Step 5 — Report to User

### If fresh setup:

```
✅ Harness Engineering 워크스페이스 생성 완료

생성된 구조:
doc/
 ├─ sample/         (참고 양식 모음 - 읽기 전용)
 ├─ info.txt        (시스템 명세)
 ├─ PRD.md          ← 여기에 프로젝트 요구사항을 작성하세요
 ├─ db.md           ← DB 설계 문서 (페이지/기능/엔티티/API)
 ├─ AI_anomaly.txt  (이상 로그)
 └─ Coding_Rule.txt ← 코딩 규칙을 작성하세요 (선택)
develope/           (소스 코드 공간)
add/                (외부 확장 기능)
report/             (보고서)

다음 단계:
1. /startCompany 입력하여 Main AI 초기화
```

### If re-initialization (existing files detected):

```
✅ 워크스페이스 복원 완료

기존 파일 유지됨:
  doc/PRD.md          ← 이전 프로젝트 기획 문서
  doc/Coding_Rule.txt ← 이전 코딩 규칙
  report/report.md    ← 이전 개발 보고서

AI 운영 파일 재생성됨:
  doc/AI_anomaly.txt
  add/registry.json

내용 수정이 필요하면:
  /complainProject  → PRD 변경 요청
  /newTask          → 개별 수정 작업 요청

다음 단계:
1. /startCompany 입력하여 Main AI 재초기화
```
