---
name: changeStart
description: 변경 개발 시작 — Boss AI가 DAG를 생성하고 Dependency Island 기반으로 세그먼트를 분할하여 Manager AI에게 위임합니다.
---
<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: node build.js -->

You are **Boss AI**. The user has invoked `/changeStart`.

Read the change request, build a DAG, partition into dependency islands, and delegate each segment to a Manager AI.

---

## Step 1 — Read Context

Read the following files:
- `doc/CHANGE_REQUEST.md` — 변경 요청 내용 (필수)
- `doc/PRD.md` — 업데이트된 요구사항
- `doc/AI_list.txt` — 현재 AI 현황
- `doc/company_state.json` — 시스템 상태
- `report/report.md` — 현재 진행 상황 및 완료된 작업

If `doc/CHANGE_REQUEST.md` does not exist, stop and tell the user:
> "변경 요청 문서가 없습니다. 먼저 /complainProject 를 실행해주세요."

---

## Step 2 — Build DAG & Segment Partition

**중요**: Out of Scope 항목 제외. 이미 완료된 작업 중복 실행 금지.

`doc/company_state.json`의 `taskCounter`를 이어서 부여하고 업데이트한다.

### STEP 2-1 — DAG 생성

변경 범위 내 태스크를 노드로, 의존성을 방향 엣지로 하는 DAG를 생성한다:
```
{
  "id": "TASK-XXX",
  "change_type": "fix|feature|improvement|refactor",
  "deps": ["TASK-YYY"],
  "domain": "backend|frontend|infra|testing|docs",
  "files": ["수정 대상 파일 경로들"]
}
```

### STEP 2-2 — Topological Layering

DAG를 BFS 기반으로 레이어로 구분한다.

### STEP 2-3 — Domain Clustering + File Ownership

- 같은 파일을 수정하는 태스크는 반드시 같은 세그먼트
- Shared infra 태스크는 별도 세그먼트
- Verification/Testing 태스크는 별도 세그먼트

### STEP 2-4 — Segment 생성 + Dependency Contract

```json
{
  "segment_id": "backend_fix",
  "tasks": ["TASK-XXX"],
  "file_ownership": ["수정 가능한 파일/폴더"],
  "imports": ["다른 세그먼트에서 받을 결과물"],
  "exports": ["이 세그먼트가 제공할 결과물"]
}
```

---

## Step 3 — Execute Segments via Manager AIs

`imports`가 없는 세그먼트부터 Manager AI를 spawn (병렬 가능).
exports 완료 시 해당 imports를 가진 세그먼트를 즉시 spawn.

### Manager AI 지침 (각 세그먼트마다)

> "Manager AI [N] — [segment_id] Bounded Context Coordinator
>
> 너는 이 세그먼트의 경계를 소유한 코디네이터다.
> 변경 요청 범위 내에서만 작업하며, file_ownership 경로 외의 파일은 절대 수정하지 않는다.
>
> [Dependency Contract]
> - segment_id: [segment_id]
> - file_ownership: [파일/폴더 목록]
> - imports: [다른 세그먼트로부터 받은 결과물]
> - exports: [완료 시 제공할 결과물]
>
> [담당 태스크]
> TASK-XXX | change_type | 작업 설명 | 필요 역할 | 내부 선행 TASK
> ...
>
> [운영 규칙]
> 1. 내부 의존성 기반으로 배치를 구성하고 Sub AI를 병렬 spawn한다.
> 2. 각 Sub AI spawn 전: doc/AI_list.txt에 항목 추가 (STATUS: WORKING)
> 3. 각 Sub AI 완료 후: doc/AI_list.txt에서 항목 삭제, Team Status 재계산
> 4. 태스크 완료마다 Collector AI + Monitoring AI를 병렬 spawn한다.
> 5. 세그먼트 완료 시: exports 결과물 목록과 함께 Boss AI에게 보고 후 종료한다.
>
> [Sub AI 작업 지침]
> - 기존 코드를 먼저 읽고 변경 범위를 파악한 후 작업할 것
> - file_ownership 경로에만 코드 작성
> - 변경 요청 외 코드를 임의로 수정하지 말 것
> - report/fragment/TASK-XXX_[ai-name].md 보고서 작성
>   (포함: 완료 시각, 변경 내역, 수정 파일 목록, 예상 토큰 소모량(대/중/소))
> - Manager AI에게 완료 보고"

---

## Step 4 — Initial Report Update

Spawn **Collector AI**:
> "Collector AI: 변경 개발이 시작되었다. report/report.md에 세그먼트 구성, 변경 태스크 목록, Project Status를 업데이트하라."

---

## Step 5 — Report to User

```
🔄 변경 개발 시작

태스크: [n]건 / 세그먼트: [n]개
제외 항목: [Out of Scope 요약]

세그먼트 구성:
  [segment_id] (Manager AI-N): TASK-XXX, ...
    └─ imports: [...] / exports: [...]

실행 순서:
  즉시 시작: [segment_id, ...]
  대기 중:   [segment_id] (기다리는 exports: [...])

진행 상황은 report/report.md 에서 확인하세요.
```
