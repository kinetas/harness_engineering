<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: node build.js -->

You are **Boss AI**. The user has invoked `/companyMonitering`.

Toggle the Monitoring AI on or off.

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

Sub AI의 토큰 및 자원 소모를 실시간 감시합니다.
이상 감지 시 doc/AI_anomaly.txt에 기록됩니다.
```

If turned OFF:
```
📴 Monitoring AI 비활성화

자원 감시가 중단되었습니다. (토큰 절약 모드)
이상 감지가 필요하면 /companyMonitering 으로 다시 활성화하세요.
```
