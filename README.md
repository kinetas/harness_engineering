# Harness Engineering

## Install

```bash
git clone --single-branch --depth 1 https://github.com/kinetas/harness_engineering.git ~/.claude/skills/harness-engineering && cd ~/.claude/skills/harness-engineering && ./setup
```

---

## 스킬 목록

### 워크스페이스 관리
| 스킬 | 설명 |
|---|---|
| `/createCompany` | 워크스페이스 생성 — 처음 시작 또는 배포 후 재개발 시 구조 복원 |
| `/startCompany` | Main AI 초기화 |
| `/stopCompany` | 시스템 일시 중단 |
| `/deleteCompany` | 배포 전 정리 — AI 운영 파일 삭제 + README.md 선택 생성 (기존 파일 보호) |

### 프로젝트 진행
| 스킬 | 설명 |
|---|---|
| `/projectStart` | PRD 분석 후 전체 프로젝트 시작 — DAG 기반 세그먼트 분할 후 Manager AI 병렬 위임 |
| `/newTask [요청]` | 개별 태스크 요청 — Boss AI가 의존성 분석 후 Manager AI에게 위임 |
| `/bossMode [on\|off]` | Boss AI 상시 모드 토글 — on 시 유저 입력 자동 인터셉트 |
| `/complainProject` | 변경 요청 마법사 — 개선/수정 사항을 대화형으로 수집하여 CHANGE_REQUEST.md 작성 및 PRD 업데이트 |
| `/changeStart` | 변경 개발 시작 — CHANGE_REQUEST.md 기반 DAG 분석 후 Manager AI 병렬 위임 |
| `/setupDoc` | PRD / Coding Rule 대화형 작성 마법사 |

### 팀 운영
| 스킬 | 설명 |
|---|---|
| `/interceptBoss` | Boss AI 대기 모드 전환 |
| `/teamLimit` | AI 용량 대화형 설정 — Manager AI 최대 수 및 Manager당 Sub AI 최대 수 |
| `/holidayStart` | 휴일 모드 (Sub AI 일시 정지) |
| `/holidayOver` | 휴일 모드 해제 |

### 품질 & 모니터링
| 스킬 | 설명 |
|---|---|
| `/adjustCodingRule [file]` | Debugger AI로 코딩 규칙 검사 |
| `/debugLimit [n]` | Debugger AI 반려 횟수 제한 변경 |
| `/companyMonitering` | Monitoring AI 토글 (태스크 완료 시 자원 점검) |

### 보고서
| 스킬 | 설명 |
|---|---|
| `/autoReport` | Collector AI 자동 보고서 수집 토글 |
| `/collectorMode [n]` | Collector AI 실행 시점 설정 — 1(세그먼트, 기본) / 2(프로젝트) / 3(태스크마다) |
| `/giveMeReport` | 현재 report.md 요약 출력 |

### 확장 기능
| 스킬 | 설명 |
|---|---|
| `/installExtension [url]` | git URL에서 확장 기능 설치 |
| `/removeExtension [name]` | 설치된 확장 기능 제거 |
| `/listExtensions` | 설치된 확장 기능 목록 출력 |

---

## 스킬 파일 구조 (템플릿 시스템)

각 스킬은 두 개의 파일로 관리됩니다:

| 파일 | 역할 | 편집 여부 |
|------|------|-----------|
| `SKILL.md.tmpl` | 소스 템플릿. 여기를 수정한다 | ✅ 편집 |
| `SKILL.md` | 빌드된 결과물. Claude Code가 읽는 파일 | ❌ 직접 수정 금지 |

`SKILL.md`는 `build.js`가 자동으로 생성하므로 직접 수정하면 다음 빌드 때 덮어씌워집니다.

---

## 공통 조각 (Fragments)

`_fragments/` 폴더에 여러 스킬이 공유하는 텍스트 블록이 있습니다.
템플릿에서 `{{이름}}` 형태로 사용하면 빌드 시 내용으로 대체됩니다.

| 플레이스홀더 | 파일 | 확장 내용 |
|---|---|---|
| `{{ROLE}}` | `_fragments/role.md` | `You are **Boss AI**.` |
| `{{READ_STATE}}` | `_fragments/read_state.md` | `Read \`doc/AI_list.txt\` and \`doc/company_state.json\`` |
| `{{READ_COMPANY_STATE}}` | `_fragments/read_company_state.md` | `Read \`doc/company_state.json\`` |
| `{{READ_ALL_CONTEXT}}` | `_fragments/read_all_context.md` | 시스템 파일 전체 목록 |

---

## 스킬 수정 방법

### 기존 스킬 내용 바꾸기

1. 해당 스킬의 `SKILL.md.tmpl` 파일을 편집
2. 빌드 실행:
   ```bash
   node build.js
   ```
3. 생성된 `SKILL.md` 확인

### 공통 텍스트(fragment) 바꾸기

예: 모든 스킬의 Boss AI 역할 설명을 바꾸고 싶을 때

1. `_fragments/role.md` 편집
2. 빌드 실행:
   ```bash
   node build.js
   ```
   → `{{ROLE}}`을 사용하는 모든 스킬이 한 번에 업데이트됨

### 새 스킬 추가하기

1. 새 폴더 생성: `mkdir mySkill`
2. `mySkill/SKILL.md.tmpl` 작성 (플레이스홀더 사용 가능):
   ```markdown
   {{ROLE}} The user has invoked `/mySkill`.

   ...스킬 내용...
   ```
3. 빌드 실행: `node build.js`
4. `setup` 재실행하여 Claude Code에 등록

### 새 공통 조각 추가하기

1. `_fragments/my_fragment.md` 파일 생성 (파일명 = 플레이스홀더 이름의 소문자)
   - 파일명 규칙: 소문자 + 언더스코어 → 플레이스홀더는 대문자 자동 변환
   - 예: `my_fragment.md` → `{{MY_FRAGMENT}}`
2. 원하는 템플릿에서 `{{MY_FRAGMENT}}`로 사용
3. `./setup` 실행

---

## AI 아키텍처

### 개요

Harness Engineering은 **Boss AI를 중심으로 한 계층형 멀티 에이전트 시스템**입니다.
유저의 요청이 들어오면 Boss AI가 작업을 분해하고, Manager AI와 Sub AI를 동적으로 생성(spawn)하여 병렬로 개발을 진행합니다.

```
유저
 │
 ▼
Boss AI ─────── (상시 가동, 유일한 대화 창구)
 │
 ├── Manager AI-1  (세그먼트 A 전담, On-Demand)
 │    ├── Sub AI   (TASK-001 코드 작성)
 │    ├── Sub AI   (TASK-002 코드 작성)
 │    └── Sub AI   (TASK-003 코드 작성)
 │
 ├── Manager AI-2  (세그먼트 B 전담, On-Demand)
 │    ├── Sub AI   (TASK-004 코드 작성)
 │    └── Sub AI   (TASK-005 코드 작성)
 │
 ├── Monitoring AI (태스크 완료 시 자원 점검, On-Demand)
 └── Collector AI  (보고서 취합, On-Demand)
```

---

### AI 역할 분담

| AI | 수명 | 역할 |
|---|---|---|
| **Boss AI** | 상시 | 유저 소통, DAG 생성, 세그먼트 분할, Manager AI 조율 |
| **Manager AI** | On-Demand | 세그먼트(Bounded Context) 소유, Sub AI 배분 및 완료 집계 |
| **Sub AI** | On-Demand | 단일 태스크 실행 (코드 작성 + fragment 보고서 작성) |
| **Monitoring AI** | On-Demand | 태스크 완료 후 토큰 소모·오류 반복·범위 초과 점검 |
| **Collector AI** | On-Demand | fragment 보고서를 읽어 `report/report.md` 업데이트 |
| **Debugger AI** | On-Demand | `/adjustCodingRule` 호출 시 Coding_Rule.txt 기준 코드 검수 |

---

### 프로젝트 실행 흐름

```
/createCompany   →  워크스페이스 폴더 구조 생성
/startCompany    →  company_state.json + AI_list.txt 초기화
PRD.md 작성
/projectStart    →  DAG 생성 → 세그먼트 분할 → Manager AI 병렬 spawn
```

#### DAG 기반 세그먼트 분할 (4단계 알고리즘)

`/projectStart`와 `/changeStart` 실행 시 Boss AI가 아래 순서로 세그먼트를 구성합니다.

```
STEP 1 — DAG 생성
  PRD의 각 기능을 태스크 노드로, 선행 관계를 방향 엣지로 표현

STEP 2 — Topological Layering (BFS)
  Layer 1: 선행 태스크가 없는 루트 노드
  Layer N: 모든 선행 태스크가 Layer N-1 이하

STEP 3 — Domain Clustering
  같은 레이어 내에서 backend / frontend / infra / testing 도메인별 클러스터링
  ※ File Ownership 원칙: 같은 파일을 수정하는 태스크는 반드시 같은 세그먼트

STEP 4 — Segment + Dependency Contract 생성
  각 세그먼트에 imports(선행 결과물) / exports(제공 결과물) 계약 명시
```

#### 세그먼트 실행 규칙

- `imports`가 없는 세그먼트 → 즉시 Manager AI spawn (병렬 가능)
- `imports`가 있는 세그먼트 → 해당 `exports` 완료 후 spawn
- Manager AI는 `managerLimit`(기본 3) 슬롯 범위 내에서 동시 실행
- Sub AI는 Manager당 `subAILimit`(기본 4) 슬롯 범위 내에서 병렬 실행

---

### 상태 관리 파일

모든 AI는 아래 파일을 통해 상태를 공유합니다.

| 파일 | 역할 |
|---|---|
| `doc/company_state.json` | 시스템 설정 (limit, 모드, 카운터) |
| `doc/AI_list.txt` | 현재 활성 Manager·Sub AI 슬롯 현황 |
| `doc/AI_anomaly.txt` | Monitoring AI가 기록하는 이상 로그 |
| `report/fragment/` | 각 Sub AI가 완료 후 작성하는 태스크 보고서 |
| `report/report.md` | Collector AI가 fragment를 취합해 업데이트하는 최종 보고서 |

**쓰기 규칙** — 충돌 방지를 위한 엄격한 소유권 분리:
- `AI_list.txt` 전체 구조 변경 → Boss AI만 가능
- 자신의 세그먼트 Sub AI 카운트 수정 → 해당 Manager AI만 가능
- `develope/` 내 코드 작성 → 세그먼트별 `file_ownership` 경로에 한정

---

### Collector AI 동작 모드

`company_state.json`의 `collectorMode` 값으로 보고서 갱신 시점을 조정합니다.

| 모드 | 갱신 시점 | 특징 |
|---|---|---|
| `1` (기본) | 세그먼트 완료 시 | 균형적 — 세그먼트 단위로 report.md 갱신 |
| `2` | 프로젝트 완료 시 1회 | 토큰 절약 최대화 |
| `3` | 태스크 완료마다 | 가장 실시간, 토큰 소모 많음 |

---

### Boss Mode

`/bossMode on` 활성화 시 유저의 모든 입력을 Boss AI가 자동으로 분류합니다.

```
작업 요청 (만들어, 추가해, 고쳐, 버그…) → Manager AI → Sub AI 파이프라인
상태 질문 / 코드 설명 / /skill 명령어  → Boss AI 직접 답변
```

---

## 빌드

`build.js`가 `SKILL.md.tmpl` → `SKILL.md` 변환을 담당합니다.
gstack의 `bun run gen:skill-docs`와 동일한 역할입니다.

```bash
node build.js          # 전체 빌드 (출력 표시)
node build.js --quiet  # 전체 빌드 (출력 없음)
```

`setup` 실행 시 자동으로 빌드가 먼저 수행됩니다.
