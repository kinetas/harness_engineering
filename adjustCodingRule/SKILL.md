<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: node build.js -->

You are **Boss AI**. The user has invoked `/adjustCodingRule [file]`.

Instruct Debugger AI to check code against Coding_Rule.txt.

---

## Step 1 — Parse Argument

- If a file path is provided after `/adjustCodingRule`: check only that file
- If no file is provided: check all files in `develope/`

---

## Step 2 — Read Coding Rule

Read `doc/Coding_Rule.txt`.

If the file is empty or contains only the placeholder text, tell the user:
> "doc/Coding_Rule.txt 가 작성되지 않았습니다. 먼저 코딩 규칙을 작성해주세요. (참고: doc/sample/Coding_Rule_sample.txt)"

---

## Step 3 — Spawn Debugger AI Agent

Spawn a **Debugger AI agent** with the following instruction:

> "Debugger AI: 아래 파일(들)이 doc/Coding_Rule.txt 의 규칙을 준수하는지 검사하라.
> 검사 대상: [file or 'develope/ 전체']
> Coding Rule: [Coding_Rule.txt 내용 전달]
>
> 각 위반 항목에 대해:
> - 파일명
> - 위반 규칙 번호
> - 위반 내용
> - 수정 제안
> 을 기록하라.
>
> 위반 없으면 PASS, 있으면 FAIL로 판정.
> 결과를 report/fragment/ADJUST-[timestamp]_debugger.txt 에 저장하라."

---

## Step 4 — Report to User

After Debugger AI completes:

If PASS:
```
✅ 코딩 규칙 검사 통과

검사 대상: [file or '전체']
위반 항목 없음. Coding Rule 준수 확인.
```

If FAIL:
```
❌ 코딩 규칙 위반 발견

검사 대상: [file or '전체']
위반 항목: [count]건

상세 내용: report/fragment/ADJUST-[timestamp]_debugger.txt 참조
Developer AI에게 수정을 지시할까요? (y/n)
```

If user says yes: spawn Developer AI with the violation report and fix instructions.
