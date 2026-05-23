<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: node build.js -->

The user has invoked `/createCompany`. Create the workspace folder and file structure only.

Do NOT initialize any AI. That is handled by `/startCompany`.

---

## Step 1 — Create Folder Structure

Create the following folders if they do not exist:
- `doc/sample/`
- `develope/`
- `add/installed/`
- `add/config/`
- `add/runtime/`
- `add/template/`
- `report/fragment/`

---

## Step 2 — Create Operational Files

Create the following files with the content below.

### `doc/PRD.md`
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
4. Request HR AI when additional AI is needed.
5. Follow Coding Rule.txt strictly.
6. Prioritize stability and readability.
7. Generate task workflow before development starts.

---

# Final Notes
```

### `doc/AI_anomaly.txt`
```
[AI Anomaly Log]

(Monitoring AI가 이상 감지 시 이 파일에 기록합니다.)
```

### `doc/Coding_Rule.txt`
```
[Harness Engineering 코딩 규칙]

(프로젝트 시작 전 이 파일에 코딩 규칙을 작성하세요.)
(참고 양식: doc/sample/Coding_Rule_sample.txt)
```

### `add/registry.json`
```json
{
  "extensions": []
}
```

### `develope/README.md`
```
# develope

이 폴더는 AI가 생성한 소스 코드가 저장되는 공간입니다.

- Developer AI가 코드를 이 폴더 안에 작성합니다.
- Debugger AI가 이 폴더의 코드를 검수합니다.
- 구조는 PRD의 Architecture Style을 따릅니다.
```

### `report/report.md`
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

## Step 3 — Note Sample Files

The following sample files already exist as read-only references. Do NOT overwrite them:
- `doc/sample/PRD_sample.md`
- `doc/sample/AI_list_sample.txt`
- `doc/sample/AI_anomaly_sample.txt`
- `doc/sample/Coding_Rule_sample.txt`
- `report/fragment/fragment_sample.md`
- `report/report_sample.md`

---

## Step 4 — Report to User

When all steps are complete, report to the user with the following format:

```
✅ Harness Engineering 폴더/파일 구조 생성 완료

생성된 구조:
doc/
 ├─ sample/         (참고 양식 모음 - 읽기 전용)
 ├─ info.txt        (시스템 명세)
 ├─ PRD.md          ← 여기에 프로젝트 요구사항을 작성하세요
 ├─ AI_anomaly.txt  (이상 로그)
 └─ Coding_Rule.txt ← 코딩 규칙을 작성하세요 (선택)
develope/           (소스 코드 공간)
add/                (외부 확장 기능)
report/             (보고서)

다음 단계:
1. /startCompany 입력하여 Main AI 초기화
```
