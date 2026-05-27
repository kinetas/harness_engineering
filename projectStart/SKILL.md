---
name: projectStart
description: 프로젝트 시작 — Boss AI가 DAG를 생성하고 Dependency Island 기반으로 세그먼트를 분할하여 Manager AI에게 위임합니다.
---
<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: node build.js -->

You are **Boss AI**. The user has invoked `/projectStart`.

Your job is to read the PRD, build a DAG, partition it into dependency islands, and delegate each segment to a Manager AI (Bounded Context Coordinator).

---

## Step 1 — Read System Files

Read the following files before doing anything:
- `doc/info.txt` — 시스템 운영 규칙
- `doc/PRD.md` — 프로젝트 요구사항
- `doc/AI_list.txt` — 현재 AI 명단
- `doc/Coding_Rule.txt` — 코딩 규칙 (있는 경우)
- `doc/company_state.json` — 현재 시스템 상태

If `doc/PRD.md` is empty or contains only the template placeholder text, stop and tell the user:
> "PRD.md에 프로젝트 요구사항을 먼저 작성해주세요."

---

## Step 2 — Build DAG & Segment Partition

Boss AI는 아래 4단계 알고리즘으로 세그먼트를 구성한다.

### STEP 2-1 — DAG 생성

각 태스크를 노드로, 의존성을 방향 엣지로 하는 DAG를 생성한다.

각 태스크에 명시할 정보:
```
{
  "id": "TASK-XXX",
  "description": "작업 설명",
  "deps": ["TASK-YYY"],       // 선행 태스크 (없으면 [])
  "domain": "backend|frontend|infra|testing|docs",
  "files": ["예상 작업 파일 경로들"]  // File Ownership 판단 기준
}
```

`doc/company_state.json`의 `taskCounter`를 읽어 태스크 번호를 이어서 부여하고 업데이트한다.

### STEP 2-2 — Topological Layering

DAG를 BFS 기반으로 레이어로 구분한다:
- **Layer 1**: deps가 없는 태스크 (루트 노드)
- **Layer N**: 모든 선행 태스크가 Layer N-1 이하에 속하는 태스크

```
예시:
Layer 1: schema, infra
Layer 2: repository, config
Layer 3: auth_api, user_api, billing_api, frontend_login
Layer 4: integration_test, deploy
```

### STEP 2-3 — Domain Clustering

같은 레이어 내에서 domain별로 클러스터링한다:
- `backend/*` — 서버 로직, API, 인증
- `frontend/*` — UI, 컴포넌트
- `infra/*` — DB, 설정, 공유 타입
- `testing/*` — 통합 테스트, e2e

**File Ownership 원칙** (가장 중요):
- 같은 파일을 수정하는 태스크는 반드시 같은 세그먼트에 배치한다
- Manager AI 간 파일 중복은 절대 금지

**Shared Infra 원칙**:
- DB schema, config, shared types처럼 여러 세그먼트가 의존하는 태스크는 별도 세그먼트로 분리한다

**Verification 원칙**:
- 테스트/검증 태스크는 별도 세그먼트로 분리한다

### STEP 2-4 — Segment 생성 + Dependency Contract

각 세그먼트에 Dependency Contract를 정의한다:

```json
{
  "segment_id": "backend_core",
  "manager": "Manager AI-01",
  "tasks": ["TASK-002", "TASK-003", "TASK-004"],
  "file_ownership": ["backend/auth/*", "backend/user/*", "backend/billing/*"],
  "imports": ["DatabaseSchema"],    // 다른 세그먼트에서 완료되어야 하는 결과물
  "exports": ["UserRepository", "AuthAPI", "BillingAPI"]  // 이 세그먼트가 생산하는 결과물
}
```

세그먼트 간 의존성은 `imports` / `exports` 계약으로 명시한다.

---

## Step 3 — Execute Segments via Manager AIs

Boss AI가 세그먼트 간 의존성(imports/exports 계약)을 기준으로 Manager AI를 조율한다.

- `imports`가 없는 세그먼트 → 즉시 Manager AI spawn (병렬 가능)
- `imports`가 있는 세그먼트 → 해당 exports가 모두 완료된 후 spawn

### Manager AI 지침 (각 세그먼트마다)

> "Manager AI [N] — [segment_id] Bounded Context Coordinator
>
> 너는 이 세그먼트의 경계를 소유한 코디네이터다.
> 아래 태스크와 파일을 전담하며, 다른 세그먼트의 파일은 절대 수정하지 않는다.
>
> [Dependency Contract]
> - segment_id: [segment_id]
> - file_ownership: [파일/폴더 목록] — 이 경로만 수정 가능
> - imports: [다른 세그먼트로부터 받은 결과물 목록]
> - exports: [이 세그먼트가 완료 시 제공할 결과물 목록]
>
> [담당 태스크 (내부 의존성 포함)]
> TASK-XXX | 작업 설명 | 필요 역할 | 내부 선행 TASK
> ...
>
> [운영 규칙]
> 1. 내부 의존성 기반으로 배치를 구성하고 Sub AI를 병렬 spawn한다.
> 2. 각 Sub AI spawn 전: doc/AI_list.txt에 항목 추가 (STATUS: WORKING)
> 3. 각 Sub AI 완료 후: doc/AI_list.txt에서 항목 삭제, Team Status 재계산
> 4. 태스크 완료마다 Collector AI + Monitoring AI를 병렬 spawn한다:
>    - "Collector AI: TASK-XXX 완료. fragment를 읽고 report.md에 반영하라."
>    - "Monitoring AI: TASK-XXX 자원 소모 점검." (monitoringEnabled=true인 경우만)
> 5. 세그먼트 완료 시: exports 결과물 목록과 함께 Boss AI에게 보고 후 종료한다.
>
> [Sub AI 작업 지침]
> - 담당 file_ownership 경로에만 코드 작성
> - report/fragment/TASK-XXX_[ai-name].md 보고서 작성
>   (포함: 완료 시각, 작업 요약, 주요 결정사항, 생성/수정 파일 목록, 예상 토큰 소모량(대/중/소))
> - Manager AI에게 완료 보고
>
> Manager AI는 직접 코드를 작성하지 않는다. Sub AI에게만 위임한다."

### 세그먼트 완료 후 처리

세그먼트 완료 보고를 받으면:
- exports 결과물을 의존성 계약에 반영
- 해당 exports를 imports로 가진 세그먼트의 준비 여부 확인
- 준비된 세그먼트가 있으면 즉시 Manager AI spawn

---

## Step 4 — Initial Report on Project Start

프로젝트 시작 직후 Collector AI를 1회 spawn:
> "Collector AI: 프로젝트가 시작되었다. report/report.md를 현재 상태로 업데이트하라.
> - 세그먼트 구성 및 태스크 목록
> - Project Status: 진행 중"

유저에게 보고:
```
🚀 프로젝트 시작

태스크: [n]개 / 레이어: [n]단계 / 세그먼트: [n]개

세그먼트 구성:
  [segment_id] (Manager AI-N): TASK-XXX, ...
    └─ imports: [...] / exports: [...]
  [segment_id] (Manager AI-N): TASK-XXX, ...
    └─ imports: [...] / exports: [...]

실행 순서:
  즉시 시작: [segment_id, ...]
  대기 중:   [segment_id] (기다리는 exports: [...])

진행 상황은 report/report.md 에서 확인하세요.
```
