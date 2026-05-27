---
name: deleteCompany
description: 배포 전 정리 — AI 운영 파일 삭제 + README.md 선택 생성 (기존 파일 보호, 프로젝트명 파일로 분리 저장 가능)
---
<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: node build.js -->

You are **Boss AI**. The user has invoked `/deleteCompany`.

이 명령은 개발 완료 후 배포/공개 전에 실행합니다.
AI 운영 파일을 제거하고, PRD와 report를 바탕으로 README.md를 생성합니다.

---

## Step 1 — Confirm with User

Before doing anything, ask the user:

> "📦 배포 전 정리를 시작합니다.
>
> **삭제 대상 (AI 운영 파일)**
> - doc/AI_list.txt
> - doc/AI_anomaly.txt
> - doc/company_state.json
> - report/fragment/* (fragment_sample.md 제외)
> - add/registry.json, add/installed/*, add/config/*, add/runtime/*
>
> **보존 대상**
> - develope/ (산출물)
> - doc/PRD.md
> - doc/Coding_Rule.txt
> - report/report.md
>
> **생성**
> - README.md (PRD + report 기반 자동 생성)
>
> 계속하시겠습니까? (y/n)"

Only proceed if the user confirms with `y` or `yes`.

---

## Step 2 — Ask Whether to Generate README

Ask the user:

> "README.md를 자동 생성할까요? (PRD + report 기반) (y/n)"

If the user answers `n` or `no`, skip Step 3 and proceed to Step 4.

---

## Step 3 — Generate README.md

### Step 3-1 — Check for existing README.md

If `README.md` already exists in the project root, ask:

> "README.md 파일이 이미 존재합니다. 덮어쓰시겠습니까? (y/n)"

- If `y`: overwrite `README.md`
- If `n`: read `doc/PRD.md` to extract the project name, then save as `README_[프로젝트명].md`
  (e.g. `README_MyProject.md` — use the Project Name field from PRD, in English or Korean as written)

### Step 3-2 — Ask for Additional Sections

Ask the user:

> "README에 추가로 남기고 싶은 항목이 있으신가요?
> (예: 설치 방법, 환경 변수, 라이선스, 기여 방법 등)
> 없으면 Enter를 누르세요."

Collect the user's response. If empty, proceed with default sections only.

### Step 3-3 — Write README

Read the following files:
- `doc/PRD.md`
- `report/report.md`

Generate the README with these sections:

**Required sections (always include):**
1. **프로젝트 개요** — 개발 목적 (from PRD)
2. **개발 방향** — 핵심 방향과 원칙 (from PRD)
3. **아키텍처 구조** — 시스템 구성 (from PRD + report)
4. **데이터베이스 구조** — 주요 테이블/스키마 (from PRD + report, 없으면 생략)

**Optional sections (add only if user requested):**
- Add any sections the user specified in Step 3-2

Write the README in Korean unless PRD is written in another language.
Keep it concise and professional — this is the public-facing document.

---

## Step 4 — Delete AI Operational Files

Delete the following:
- `doc/AI_list.txt`
- `doc/AI_anomaly.txt`
- `doc/company_state.json`
- All files inside `report/fragment/` EXCEPT `fragment_sample.md`
- `add/registry.json`
- All files inside `add/installed/`, `add/config/`, `add/runtime/`

Do NOT delete:
- `develope/` (산출물)
- `doc/PRD.md`
- `doc/Coding_Rule.txt`
- `report/report.md`
- Any sample files or `info.txt`

---

## Step 5 — Report to User

```
✅ 배포 전 정리 완료

README: [생성됨 / README_[프로젝트명].md로 저장됨 / 생성 건너뜀]
AI 운영 파일 삭제됨

보존된 파일:
  develope/        ← 산출물
  doc/PRD.md       ← 기획 문서
  report/report.md ← 개발 보고서

이제 develope/ 폴더를 배포하거나 레포지토리에 올릴 수 있습니다.
```
