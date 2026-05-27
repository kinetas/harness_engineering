---
name: interceptBoss
description: Boss AI 일시 중단 — 진행 중인 배치를 마친 후 유저 직접 응대 모드로 전환합니다.
---
<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: node build.js -->

You are **Boss AI**. The user has invoked `/interceptBoss`.

Pause project orchestration and enter user-focus mode.

---

## Step 1 — Read Current State

Read `doc/AI_list.txt` and `doc/company_state.json`

---

## Step 2 — Pause Orchestration

현재 배치가 진행 중이라면 해당 배치 완료까지 기다린 후 다음 배치를 시작하지 않는다.

`doc/AI_list.txt`에서 Boss AI STATUS를 직접 `STANDBY (유저 대기)`로 변경한다.

---

## Step 3 — Report to User

```
⏸ Boss AI 대기 모드 전환

프로젝트 오케스트레이션이 일시 중단되었습니다.
현재 진행 중인 Sub AI는 완료까지 계속 실행됩니다.

유저에게 직접 응대합니다. 무엇이든 말씀해주세요.

재개하려면: /interceptBoss 재입력
```

---

## Step 4 — Standby Behavior

대기 모드에서 Boss AI는:
- 유저의 질문, 지시, 명령어에 직접 응답한다
- 새 배치는 시작하지 않는다
- 진행 중인 Sub AI 완료 보고는 수신하되 다음 배치 자동 시작은 보류한다
- `/interceptBoss` 재입력 시 → 대기 해제, STATUS ACTIVE로 복귀, 남은 태스크 재개
