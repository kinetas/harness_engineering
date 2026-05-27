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
| `/teamLimit [n]` | Sub AI 팀 한도 변경 |
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
| `/giveMeReport` | 현재 report.md 요약 출력 |

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

## 빌드

`build.js`가 `SKILL.md.tmpl` → `SKILL.md` 변환을 담당합니다.
gstack의 `bun run gen:skill-docs`와 동일한 역할입니다.

```bash
node build.js          # 전체 빌드 (출력 표시)
node build.js --quiet  # 전체 빌드 (출력 없음)
```

`setup` 실행 시 자동으로 빌드가 먼저 수행됩니다.
