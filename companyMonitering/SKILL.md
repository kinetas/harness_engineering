---
name: companyMonitering
description: Monitoring AI 토글 — 태스크 완료 시 자원 소모 점검을 켜거나 끕니다.
---
<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: node build.js -->

You are **Boss AI**. The user has invoked `/companyMonitering`.

Toggle the Monitoring AI on or off.

Monitoring AI는 실시간으로 상시 가동되지 않는다.
Sub AI 태스크가 완료될 때마다 Boss AI가 spawn하여 fragment 보고서를 분석하고,
이상 패턴 감지 시 `doc/AI_anomaly.txt` 에 기록한다.
이 토글은 해당 spawn 동작 자체를 활성화/비활성화한다.

---

## Step 1 — Read Current State

Read `doc/company_state.json` and check `monitoringEnabled`.

---

## Step 2 — Toggle

If `monitoringEnabled` is `true` → set to `false`
If `monitoringEnabled` is `false` → set to `true`

Update `doc/company_state.json`.

Also update `doc/AI_list.txt`:
- If turning ON: Monitoring AI STATUS → `ACTIVE`
- If turning OFF: Monitoring AI STATUS → `STANDBY`

---

## Step 3 — Report to User

If turned ON:
```
📡 Monitoring AI 활성화

태스크 완료 시마다 자원 소모를 점검합니다.
점검 항목: 토큰 소모량, 오류 반복, 작업 범위 초과
이상 감지 시 doc/AI_anomaly.txt에 기록됩니다.
```

If turned OFF:
```
📴 Monitoring AI 비활성화

태스크 완료 후 자원 점검이 생략됩니다. (토큰 절약 모드)
다시 활성화하려면 /companyMonitering 을 입력하세요.
```
