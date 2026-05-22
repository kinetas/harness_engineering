# add

외부 확장 기능 및 연동 모듈 저장소.
Boss AI가 PRD를 분석하여 필요한 외부 기능을 이 폴더에 등록하고 관리한다.

---

## 폴더 구조

### registry.json
현재 등록된 모든 확장 기능의 목록 DB.
모든 확장 기능은 installed/ 에 추가되기 전에 반드시 이 파일에 등록되어야 함.

등록 형식:
{
  "extensions": [
    {
      "name": "kafka",
      "status": "inactive",
      "path": "./installed/kafka",
      "version": "1.0.0"
    }
  ]
}

status 값: "active" | "inactive" | "error"

---

### installed/
실제 확장 기능 코드 및 설정 파일이 저장되는 폴더.
각 확장 기능은 독립된 하위 폴더로 관리됨.

예시:
- installed/kafka/
- installed/redis/
- installed/webhook/

---

### config/
전역 설정 파일 저장소.
확장 기능 전반에 걸쳐 공유되는 설정값(API Key 경로, 공통 timeout 등)을 관리.
민감한 정보는 직접 작성하지 않고 환경 변수 참조 형태로 작성할 것.

---

### runtime/
확장 기능 실행 중 생성되는 임시 데이터 저장소.
로그, 세션 데이터, 캐시 등 런타임에만 필요한 파일을 저장.
시스템 재시작 시 초기화될 수 있음을 전제로 설계할 것.

---

### template/
새 확장 기능 추가 시 참고할 기본 구조 템플릿.
Developer AI가 신규 확장 기능을 만들 때 이 템플릿을 복사하여 시작함.

---

## 확장 기능 추가 절차

1. Boss AI가 PRD 분석 후 필요한 확장 기능을 결정
2. Developer AI가 template/ 를 복사하여 installed/ 에 구현
3. 구현 완료 후 registry.json 에 등록 (status: "inactive")
4. Debugger AI 검수 통과 후 status를 "active"로 변경
5. fragment 보고서 작성 완료

---

## 확장 기능 예시
- kafka / redis / MCP / webhook / external API / plugin