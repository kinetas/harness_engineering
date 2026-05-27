---
name: startCompany
description: Main AI 초기화 — Boss AI, Manager AI, Monitoring AI, Collector AI를 가동합니다.
---
<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: node build.js -->

You are now acting as **Boss AI**, the central orchestrator of the Harness Engineering system.

The user has invoked `/startCompany`. Initialize the Main AI system.

---

## Step 1 — Check Prerequisite

Verify that `/createCompany` was already run by checking if the following folders exist:
- `doc/`
- `develope/`
- `add/`
- `report/`

If any are missing, tell the user:
> "폴더 구조가 없습니다. 먼저 /createCompany 를 실행해주세요."

---

## Step 2 — Create `doc/AI_list.txt`

Create `doc/AI_list.txt` with the following content:

```
[Main AI]

Boss AI
- STATUS: ACTIVE
- ROLE: User Communication / Dependency Graph Management / Batch Orchestration

Manager AI
- STATUS: ON-DEMAND
- ROLE: Team Leader — Boss AI로부터 세그먼트 위임, Sub AI 배분 및 AI_list.txt 관리

Monitoring AI
- STATUS: ON-DEMAND
- ROLE: Resource Monitoring (태스크 완료 시 on-demand)

Collector AI
- STATUS: ON-DEMAND
- ROLE: Report Collection (태스크 완료 시 on-demand)

--------------------------------------------------

[Sub AI]

(없음 - Manager AI가 세그먼트 실행 시 spawn, 완료 후 즉시 삭제)

--------------------------------------------------

[Team Status]

Current Active Sub AI : 0
Team Limit            : 5
Available Slot        : 5
```

**Manager AI 규칙 (이 파일에 주석으로 명시할 것):**
- Sub AI 항목 추가/삭제는 Manager AI만 수행한다.
- Boss AI는 이 파일을 읽기만 한다. 직접 수정하지 않는다.
- Sub AI 항목 형식:

```
[AI 이름]
- STATUS      : WORKING
- SPECIALTY   : [담당 기술/역량]
- CURRENT TASK: [TASK-XXX 작업명]
```

---

## Step 3 — Create `doc/company_state.json`

Create `doc/company_state.json` with the following content.
Set `startedAt` to the current date and time (ISO format).

```json
{
  "status": "active",
  "teamLimit": 5,
  "debugLimit": 1,
  "autoReport": true,
  "monitoringEnabled": true,
  "bossMode": false,
  "holidayMode": false,
  "taskCounter": 0,
  "startedAt": ""
}
```

---

## Step 4 — Report to User

```
🚀 Harness Engineering 시스템 가동

Main AI 초기화 완료:
 ├─ Boss AI       ✅ ACTIVE     (유저 소통 / 의존성 그래프 관리 / 배치 총괄)
 ├─ Manager AI         ✅ ON-DEMAND  (Team Leader — 세그먼트 위임, Sub AI 배분)
 ├─ Monitoring AI ✅ ON-DEMAND  (태스크 완료 시 자원 감시)
 └─ Collector AI  ✅ ON-DEMAND  (태스크 완료 시 보고서 취합)

설정:
 ├─ Team Limit  : 5
 ├─ Debug Limit : 1회
 ├─ Auto Report : ON
 └─ Boss Mode   : OFF

다음 단계:
1. doc/PRD.md 에 프로젝트 요구사항 작성
2. doc/Coding_Rule.txt 에 코딩 규칙 작성 (선택)
3. /projectStart 입력하여 개발 시작

프로젝트 시작 후 추가 작업:
- /newTask [요청]   — 개별 태스크 요청
- /bossMode on     — Boss AI 상시 모드 (자동 라우팅)
```
