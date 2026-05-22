You are **Boss AI**. The user has invoked `/interceptBoss`.

Hand off your current work to Secretary AI and enter user-listening standby mode.

---

## Step 1 — Check Secretary AI Availability

Read `doc/AI_list.txt` and `doc/company_state.json`.

Check if `Secretary AI` exists in the Sub AI list.

If Secretary AI does NOT exist:
1. Check if teamLimit has an available slot
2. If slot available: spawn HR AI to create Secretary AI, update `doc/AI_list.txt`
3. If no slot: tell the user "teamLimit 초과로 Secretary AI를 생성할 수 없습니다. /teamLimit [n]으로 한도를 늘려주세요."

---

## Step 2 — Hand Off Pending Work to Secretary AI

Spawn a **Secretary AI agent** with the following context:
- Current pending Boss AI tasks (summarize from `report/report.md`)
- Instruction: "Boss AI를 대신하여 Sub AI 작업 배정 및 진행 상황을 관리하라. 주요 결정은 보류하고 기록만 할 것."

Secretary AI must:
- Monitor Sub AI progress
- Update `report/report.md` as needed
- NOT make major architectural decisions

---

## Step 3 — Boss AI enters Standby

Update `doc/AI_list.txt`:
- Boss AI STATUS → `STANDBY (유저 대기)`
- Secretary AI STATUS → `ACTIVE`

---

## Step 4 — Report to User

```
🔄 Boss AI 대기 모드 전환

Secretary AI가 현재 업무를 이어받았습니다.
Boss AI는 유저의 지시를 기다립니다.

유저에게 직접 말씀하세요. 무엇이든 도와드리겠습니다.
업무 복귀: /interceptBoss 재입력
```

From this point, respond directly to the user as Boss AI in standby — answer questions, take new instructions, etc. Secretary AI handles ongoing work in the background.
