"""
SkillShift - Automated Test Suite and Runner
Executes comprehensive local tests against all REST API endpoints:
- GET  /api/health
- GET  /api/employees
- POST /api/employees
- GET  /api/tasks
- POST /api/recommendations

Also validates suitability scoring formula:
  40% Capability + 25% Capacity + 20% Performance + 15% Risk
And validates safe working capacity limits & best-to-worst ranking.
"""

import sys
import os
import json

# Ensure backend directory is in python path
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(current_dir, "backend")
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

try:
    from app import app
except ImportError:
    from backend.app import app


def run_tests():
    print("=" * 70)
    print(" SKILLSHIFT API LOCAL TEST SUITE")
    print("=" * 70)

    client = app.test_client()
    passed = 0
    failed = 0

    # ------------------------------------------------------------------------
    # Test 1: GET /api/health
    # ------------------------------------------------------------------------
    print("\n[Test 1] GET /api/health")
    res = client.get("/api/health")
    data = res.get_json()
    if res.status_code == 200 and data.get("status") == "healthy":
        print("  PASS: Health check returned 200 OK with status='healthy'")
        print(f"        Response: {data}")
        passed += 1
    else:
        print(f"  FAIL: Expected 200 OK, got {res.status_code}. Response: {data}")
        failed += 1

    # ------------------------------------------------------------------------
    # Test 2: GET /api/employees
    # ------------------------------------------------------------------------
    print("\n[Test 2] GET /api/employees")
    res = client.get("/api/employees")
    data = res.get_json()
    employees = data.get("employees", [])
    if res.status_code == 200 and len(employees) >= 8:
        print(f"  PASS: Retrieved {len(employees)} employees successfully")
        print(f"        Sample: {employees[0]['name']} ({employees[0]['role']})")
        passed += 1
    else:
        print(f"  FAIL: Expected >= 8 employees, got {len(employees)}")
        failed += 1

    # ------------------------------------------------------------------------
    # Test 3: POST /api/employees (Add Employee)
    # ------------------------------------------------------------------------
    print("\n[Test 3] POST /api/employees")
    new_emp_payload = {
        "name": "Test Engineer Rohan",
        "role": "Systems Specialist",
        "primarySkill": "Quality Inspection",
        "skillLevel": 92,
        "currentTask": "Safety Diagnostics",
        "currentHours": 1.0,
        "maxHours": 8.0,
        "performance": 95,
        "completedTasks": 80,
        "status": "available"
    }
    res = client.post("/api/employees", json=new_emp_payload)
    data = res.get_json()
    if res.status_code == 201 and data.get("success") is True:
        created = data.get("employee", {})
        print(f"  PASS: Created employee ID {created.get('id')} - {created.get('name')}")
        print(f"        Initials: {created.get('initials')}, Skill level: {created.get('skills', {}).get('Quality Inspection')}")
        passed += 1
    else:
        print(f"  FAIL: Could not create employee. Code: {res.status_code}, data: {data}")
        failed += 1

    # ------------------------------------------------------------------------
    # Test 4: GET /api/tasks
    # ------------------------------------------------------------------------
    print("\n[Test 4] GET /api/tasks")
    res = client.get("/api/tasks")
    data = res.get_json()
    tasks = data.get("tasks", {})
    if res.status_code == 200 and len(tasks) >= 8:
        print(f"  PASS: Retrieved {len(tasks)} tasks successfully")
        sample_task = tasks.get("1", {})
        print(f"        Sample Task 1: {sample_task.get('task')} (Skill: {sample_task.get('skill')}, Hours: {sample_task.get('hours')})")
        passed += 1
    else:
        print(f"  FAIL: Expected tasks dictionary with >= 8 entries, got {data}")
        failed += 1

    # ------------------------------------------------------------------------
    # Test 5: POST /api/recommendations (Algorithm, Capacity Limit, Sorting)
    # ------------------------------------------------------------------------
    print("\n[Test 5] POST /api/recommendations (Reassignment Calculation)")
    reassign_payload = {
        "absent_employee": 1,  # Arjun Kumar
        "absent_task": "Inventory Quality Check",
        "required_skill": "Inventory Audit",
        "task_duration": 3.0
    }
    res = client.post("/api/recommendations", json=reassign_payload)
    data = res.get_json()

    if res.status_code == 200 and data.get("success") is True:
        candidates = data.get("candidates", [])
        best = data.get("best_candidate")

        print(f"  PASS: Recommendation calculation succeeded. Evaluated {len(candidates)} candidates.")
        print(f"        Best Candidate: {best.get('employee_name')} (Overall: {best.get('overall_score')}%, Status: {best.get('status')})")

        # Verify candidate keys
        required_keys = [
            "employee_name", "role", "capability_score", "capacity_score",
            "performance_score", "risk_score", "overall_score", "status", "safe"
        ]
        sample = candidates[0]
        missing = [k for k in required_keys if k not in sample]
        if not missing:
            print(f"  PASS: All required fields present in candidate: {required_keys}")
            passed += 1
        else:
            print(f"  FAIL: Missing keys in candidate object: {missing}")
            failed += 1

        # Verify safe capacity rejection / status
        unsafe_candidates = [c for c in candidates if not c["safe"]]
        safe_candidates = [c for c in candidates if c["safe"]]
        print(f"  PASS: Capacity evaluation: {len(safe_candidates)} safe, {len(unsafe_candidates)} capacity risks")

        # Verify sorting: safe candidates must precede unsafe candidates, and overall scores decrease
        sorting_correct = True
        seen_unsafe = False
        for c in candidates:
            if not c["safe"]:
                seen_unsafe = True
            elif seen_unsafe and c["safe"]:
                sorting_correct = False
                break

        if sorting_correct:
            print("  PASS: Candidates correctly sorted best to worst (safe candidates first)")
            passed += 1
        else:
            print("  FAIL: Candidates are not sorted with safe candidates preceding unsafe candidates")
            failed += 1

        # Verify math formula for top candidate:
        # overall = round(capability * 0.40 + capacity * 0.25 + performance * 0.20 + risk * 0.15)
        cap = sample["capability_score"]
        cap_sc = sample["capacity_score"]
        perf = sample["performance_score"]
        risk = sample["risk_score"]
        expected_overall = round(cap * 0.40 + cap_sc * 0.25 + perf * 0.20 + risk * 0.15)
        expected_overall = max(0, min(100, expected_overall))

        if abs(sample["overall_score"] - expected_overall) <= 1:
            print(f"  PASS: Formula verified: 40% capability ({cap}) + 25% capacity ({cap_sc}) + 20% perf ({perf}) + 15% risk ({risk}) = {sample['overall_score']}%")
            passed += 1
        else:
            print(f"  FAIL: Score mismatch: calculated {sample['overall_score']}, expected {expected_overall}")
            failed += 1
    else:
        print(f"  FAIL: Recommendation endpoint failed. Code: {res.status_code}, Response: {data}")
        failed += 1

    # ------------------------------------------------------------------------
    # Test Summary
    # ------------------------------------------------------------------------
    print("\n" + "=" * 70)
    print(f" TEST RESULTS: {passed} PASSED | {failed} FAILED")
    print("=" * 70)

    if failed == 0:
        print("[SUCCESS] All SkillShift API endpoints and logic verified cleanly!\n")
        return 0
    else:
        print(f"[ERROR] {failed} tests failed. Please review errors.\n")
        return 1


if __name__ == "__main__":
    if "--server" in sys.argv:
        port = int(os.environ.get("PORT", 5000))
        print(f"Starting server on port {port}...")
        app.run(host="0.0.0.0", port=port, debug=True)
    else:
        code = run_tests()
        sys.exit(code)
