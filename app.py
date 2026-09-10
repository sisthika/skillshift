"""
SkillShift - General Workforce Auto-Reassignment System
Backend REST API powered by Flask and CORS.

Features:
- Live workforce employee management
- Task catalog and absence profile tracking
- Intelligent candidate recommendation engine with multi-factor scoring:
    * Task Capability: 40%
    * Workload Capacity: 25%
    * Historical Performance: 20%
    * Operational Risk / Continuity: 15%
- Capacity-based candidate rejection when safe working limits are exceeded
- Safe vs Unsafe candidate status tagging and best-to-worst ranking
- Production-ready for Render deployment and GitHub Pages integration
"""

import os
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Initialize Flask application
app = Flask(__name__)

# Configure Cross-Origin Resource Sharing (CORS)
# Enables communication between GitHub Pages frontend and Render backend
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)


@app.after_request
def add_cors_headers(response):
    """Ensure required CORS headers are present on every response."""
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response


# ============================================================================
# IN-MEMORY DATA STORE (Hackathon & Demo Ready)
# ============================================================================

# Default Workforce Employees
EMPLOYEES = [
    {
        "id": 1,
        "name": "Arjun Kumar",
        "role": "Senior Operations Associate",
        "initials": "AK",
        "status": "available",
        "currentTask": "Inventory Quality Check",
        "currentHours": 3.0,
        "maxHours": 8.0,
        "performance": 96,
        "skills": {
            "Inventory Audit": 97,
            "Quality Inspection": 95,
            "Warehouse": 92,
            "Order Processing": 84,
            "Customer Support": 62,
            "Data Entry": 88,
            "Equipment Maintenance": 70
        },
        "completedTasks": 148
    },
    {
        "id": 2,
        "name": "Priya Sharma",
        "role": "Operations Specialist",
        "initials": "PS",
        "status": "available",
        "currentTask": "Order Processing",
        "currentHours": 5.0,
        "maxHours": 8.0,
        "performance": 94,
        "skills": {
            "Inventory Audit": 89,
            "Quality Inspection": 91,
            "Warehouse": 84,
            "Order Processing": 98,
            "Customer Support": 88,
            "Data Entry": 94,
            "Equipment Maintenance": 65
        },
        "completedTasks": 172
    },
    {
        "id": 3,
        "name": "Rahul Menon",
        "role": "Warehouse Associate",
        "initials": "RM",
        "status": "busy",
        "currentTask": "Warehouse Dispatch",
        "currentHours": 7.0,
        "maxHours": 8.0,
        "performance": 92,
        "skills": {
            "Inventory Audit": 88,
            "Quality Inspection": 82,
            "Warehouse": 97,
            "Order Processing": 79,
            "Customer Support": 52,
            "Data Entry": 72,
            "Equipment Maintenance": 84
        },
        "completedTasks": 129
    },
    {
        "id": 4,
        "name": "Sneha Iyer",
        "role": "Quality Analyst",
        "initials": "SI",
        "status": "available",
        "currentTask": "Product Testing",
        "currentHours": 2.0,
        "maxHours": 8.0,
        "performance": 98,
        "skills": {
            "Inventory Audit": 94,
            "Quality Inspection": 99,
            "Warehouse": 73,
            "Order Processing": 68,
            "Customer Support": 58,
            "Data Entry": 89,
            "Equipment Maintenance": 76
        },
        "completedTasks": 203
    },
    {
        "id": 5,
        "name": "Vikram Rao",
        "role": "Maintenance Technician",
        "initials": "VR",
        "status": "available",
        "currentTask": "Equipment Inspection",
        "currentHours": 4.0,
        "maxHours": 8.0,
        "performance": 91,
        "skills": {
            "Inventory Audit": 60,
            "Quality Inspection": 77,
            "Warehouse": 75,
            "Order Processing": 51,
            "Customer Support": 42,
            "Data Entry": 65,
            "Equipment Maintenance": 99
        },
        "completedTasks": 117
    },
    {
        "id": 6,
        "name": "Meera Nair",
        "role": "Customer Operations Executive",
        "initials": "MN",
        "status": "available",
        "currentTask": "Customer Escalations",
        "currentHours": 3.0,
        "maxHours": 8.0,
        "performance": 95,
        "skills": {
            "Inventory Audit": 64,
            "Quality Inspection": 70,
            "Warehouse": 56,
            "Order Processing": 91,
            "Customer Support": 99,
            "Data Entry": 93,
            "Equipment Maintenance": 40
        },
        "completedTasks": 184
    },
    {
        "id": 7,
        "name": "Karthik S",
        "role": "Junior Operations Associate",
        "initials": "KS",
        "status": "available",
        "currentTask": "Data Verification",
        "currentHours": 4.0,
        "maxHours": 8.0,
        "performance": 87,
        "skills": {
            "Inventory Audit": 73,
            "Quality Inspection": 75,
            "Warehouse": 80,
            "Order Processing": 82,
            "Customer Support": 65,
            "Data Entry": 97,
            "Equipment Maintenance": 45
        },
        "completedTasks": 96
    },
    {
        "id": 8,
        "name": "Ananya Das",
        "role": "Operations Associate",
        "initials": "AD",
        "status": "available",
        "currentTask": "Order Validation",
        "currentHours": 4.0,
        "maxHours": 8.0,
        "performance": 90,
        "skills": {
            "Inventory Audit": 80,
            "Quality Inspection": 85,
            "Warehouse": 78,
            "Order Processing": 93,
            "Customer Support": 79,
            "Data Entry": 90,
            "Equipment Maintenance": 51
        },
        "completedTasks": 141
    }
]

# Absent Tasks Catalog
TASKS = {
    "1": {
        "id": 1,
        "task": "Inventory Quality Check",
        "skill": "Inventory Audit",
        "priority": "HIGH",
        "hours": 3.0
    },
    "2": {
        "id": 2,
        "task": "Order Processing",
        "skill": "Order Processing",
        "priority": "MEDIUM",
        "hours": 3.0
    },
    "3": {
        "id": 3,
        "task": "Warehouse Dispatch",
        "skill": "Warehouse",
        "priority": "HIGH",
        "hours": 4.0
    },
    "4": {
        "id": 4,
        "task": "Product Quality Inspection",
        "skill": "Quality Inspection",
        "priority": "HIGH",
        "hours": 3.0
    },
    "5": {
        "id": 5,
        "task": "Equipment Maintenance",
        "skill": "Equipment Maintenance",
        "priority": "CRITICAL",
        "hours": 4.0
    },
    "6": {
        "id": 6,
        "task": "Customer Support Queue",
        "skill": "Customer Support",
        "priority": "HIGH",
        "hours": 3.0
    },
    "7": {
        "id": 7,
        "task": "Data Entry Validation",
        "skill": "Data Entry",
        "priority": "MEDIUM",
        "hours": 2.0
    },
    "8": {
        "id": 8,
        "task": "Order Validation",
        "skill": "Order Processing",
        "priority": "MEDIUM",
        "hours": 2.0
    }
}


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def generate_initials(name: str) -> str:
    """Generate a 2-letter uppercase initials string from an employee name."""
    parts = [p.strip() for p in name.strip().split() if p.strip()]
    if not parts:
        return "NA"
    if len(parts) == 1:
        return parts[0][:2].upper()
    return (parts[0][0] + parts[-1][0]).upper()


def find_employee_by_identifier(identifier):
    """Find an employee by numeric ID or exact/partial name."""
    if identifier is None:
        return None
    
    # Try numeric ID lookup
    try:
        emp_id = int(identifier)
        for emp in EMPLOYEES:
            if emp["id"] == emp_id:
                return emp
    except (ValueError, TypeError):
        pass

    # Try name lookup
    str_ident = str(identifier).strip().lower()
    for emp in EMPLOYEES:
        if emp["name"].lower() == str_ident:
            return emp
    for emp in EMPLOYEES:
        if str_ident in emp["name"].lower():
            return emp

    return None


# ============================================================================
# REST API ENDPOINTS
# ============================================================================

@app.route("/", methods=["GET"])
def index():
    """Serve the frontend dashboard index.html"""
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/api", methods=["GET"])
def api_info():
    """Root API endpoint providing API information and route directory."""
    return jsonify({
        "system": "SkillShift Workforce Auto-Reassignment API",
        "version": "1.0.0",
        "status": "operational",
        "endpoints": {
            "health": "GET /api/health",
            "employees": "GET /api/employees, POST /api/employees",
            "tasks": "GET /api/tasks",
            "recommendations": "POST /api/recommendations",
            "confirm_reassign": "POST /api/reassign/confirm"
        }
    })


@app.route("/<path:path>", methods=["GET"])
def serve_static(path):
    """Serve static frontend files (style.css, script.js, etc.)."""
    if path.startswith("api"):
        return jsonify({"error": "Endpoint not found"}), 404
    file_path = os.path.join(BASE_DIR, path)
    if os.path.exists(file_path) and not os.path.isdir(file_path):
        return send_from_directory(BASE_DIR, path)
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/api/health", methods=["GET"])
def health_check():
    """
    GET /api/health
    Healthcheck endpoint to verify that the backend is live and operational.
    Compatible with Render health checks and uptime monitoring.
    """
    return jsonify({
        "status": "healthy",
        "system": "SkillShift",
        "timestamp": datetime.now().isoformat(),
        "total_employees": len(EMPLOYEES),
        "active_tasks": len(TASKS)
    }), 200


@app.route("/api/employees", methods=["GET"])
def get_employees():
    """
    GET /api/employees
    Returns the complete list of all workforce employees along with their
    workloads, skills, and current statuses.
    """
    return jsonify({
        "success": True,
        "count": len(EMPLOYEES),
        "employees": EMPLOYEES
    }), 200


@app.route("/api/employees", methods=["POST"])
def add_employee():
    """
    POST /api/employees
    Add a new employee to the workforce roster.
    
    Expected JSON payload:
    - name (str, required)
    - role (str, required)
    - primarySkill / skill (str, required)
    - skillLevel (int, 0-100, optional, default 80)
    - currentTask (str, optional, default 'No active task')
    - currentHours (float, optional, default 0)
    - maxHours (float, optional, default 8)
    - performance (int, 0-100, optional, default 85)
    - completedTasks (int, optional, default 0)
    - status (str, 'available' | 'busy', default 'available')
    """
    data = request.get_json(force=True, silent=True) or {}

    name = str(data.get("name", "")).strip()
    role = str(data.get("role", "")).strip()
    primary_skill = str(data.get("primarySkill") or data.get("skill", "")).strip()

    if not name or not role:
        return jsonify({
            "success": False,
            "error": "Both 'name' and 'role' are required fields."
        }), 400

    # Prevent duplicates
    if any(e["name"].lower() == name.lower() for e in EMPLOYEES):
        return jsonify({
            "success": False,
            "error": f"An employee with the name '{name}' already exists."
        }), 409

    # Generate unique ID
    next_id = max((e["id"] for e in EMPLOYEES), default=0) + 1

    # Extract numerical parameters
    try:
        skill_level = max(0, min(100, int(data.get("skillLevel", 80))))
        current_hours = max(0.0, float(data.get("currentHours", 0.0)))
        max_hours = max(1.0, float(data.get("maxHours", 8.0)))
        performance = max(0, min(100, int(data.get("performance", 85))))
        completed_tasks = max(0, int(data.get("completedTasks", 0)))
    except (ValueError, TypeError) as err:
        return jsonify({
            "success": False,
            "error": f"Invalid numerical value: {err}"
        }), 400

    if current_hours > max_hours:
        return jsonify({
            "success": False,
            "error": "Current working hours cannot exceed maximum hours."
        }), 400

    status = str(data.get("status", "available")).strip().lower()
    if status not in ["available", "busy", "absent"]:
        status = "available"

    current_task = str(data.get("currentTask", "No active task")).strip() or "No active task"

    # Standard skill profiles
    skills = {
        "Inventory Audit": 50,
        "Quality Inspection": 50,
        "Warehouse": 50,
        "Order Processing": 50,
        "Customer Support": 50,
        "Data Entry": 50,
        "Equipment Maintenance": 50
    }

    # If incoming payload includes custom skills dictionary, merge it
    custom_skills = data.get("skills")
    if isinstance(custom_skills, dict):
        for k, v in custom_skills.items():
            try:
                skills[k] = max(0, min(100, int(v)))
            except (ValueError, TypeError):
                pass
    elif primary_skill:
        skills[primary_skill] = skill_level

    new_emp = {
        "id": next_id,
        "name": name,
        "role": role,
        "initials": generate_initials(name),
        "status": status,
        "currentTask": current_task,
        "currentHours": current_hours,
        "maxHours": max_hours,
        "performance": performance,
        "skills": skills,
        "completedTasks": completed_tasks,
        "primarySkill": primary_skill
    }

    EMPLOYEES.append(new_emp)

    # Also add a default task profile for reassignment
    TASKS[str(next_id)] = {
        "id": next_id,
        "task": current_task,
        "skill": primary_skill or "Data Entry",
        "priority": "MEDIUM",
        "hours": 2.0
    }

    return jsonify({
        "success": True,
        "message": f"Employee '{name}' added successfully.",
        "employee": new_emp
    }), 201


@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    """
    GET /api/tasks
    Returns the predefined catalog of absent tasks with required skill,
    priority, and estimated duration.
    """
    return jsonify({
        "success": True,
        "count": len(TASKS),
        "tasks": TASKS
    }), 200


@app.route("/api/recommendations", methods=["POST"])
def recommend_candidates():
    """
    POST /api/recommendations
    Calculates candidate suitability and returns ranked recommendations.

    Accepts:
    - absent employee (by ID or name via 'absent_employee', 'absentEmployee', 'employee_id')
    - absent task (via 'absent_task', 'absentTask', 'task', 'task_name')
    - required skill (via 'required_skill', 'requiredSkill', 'skill')
    - task duration (hours via 'task_duration', 'taskDuration', 'hours', 'duration')

    Multi-factor Suitability Weights:
    - Task Capability: 40%
    - Workload Capacity: 25%
    - Historical Performance: 20%
    - Operational Risk / Continuity: 15%

    Capacity Rule:
    - Candidates whose remaining capacity cannot absorb the task duration
      are marked as unsafe (safe working capacity exceeded) and ranked lower.
      Candidates are returned sorted from best to worst.

    Returned fields per candidate:
    - employee name
    - role
    - capability score
    - capacity score
    - performance score
    - risk score
    - overall score
    - safe/unsafe status
    """
    data = request.get_json(force=True, silent=True) or {}

    # 1. Resolve absent employee
    absent_emp_input = (
        data.get("absent_employee") or
        data.get("absentEmployee") or
        data.get("employee_id") or
        data.get("absent_id") or
        data.get("id")
    )
    absent_employee = find_employee_by_identifier(absent_emp_input)

    # 2. Resolve task name, required skill, and duration
    task_name = (
        data.get("absent_task") or
        data.get("absentTask") or
        data.get("task") or
        data.get("task_name")
    )
    required_skill = (
        data.get("required_skill") or
        data.get("requiredSkill") or
        data.get("skill")
    )
    task_duration_raw = (
        data.get("task_duration") or
        data.get("taskDuration") or
        data.get("duration") or
        data.get("hours")
    )

    # Default from catalog if absent employee has a registered task
    if absent_employee and str(absent_employee["id"]) in TASKS:
        ref_task = TASKS[str(absent_employee["id"])]
        if not task_name:
            task_name = ref_task.get("task", "Assigned Task")
        if not required_skill:
            required_skill = ref_task.get("skill", "Inventory Audit")
        if task_duration_raw is None:
            task_duration_raw = ref_task.get("hours", 3.0)

    task_name = str(task_name or "Assigned Task").strip()
    required_skill = str(required_skill or "Inventory Audit").strip()

    try:
        task_duration = max(1.0, float(task_duration_raw if task_duration_raw is not None else 3.0))
    except (ValueError, TypeError):
        task_duration = 3.0

    absent_id = absent_employee["id"] if absent_employee else None

    # Evaluate each available employee
    candidates = []

    for emp in EMPLOYEES:
        # Rule: Cannot replace oneself
        if absent_id is not None and emp["id"] == absent_id:
            continue

        # Rule: Absent employees cannot cover
        if emp.get("status") == "absent":
            continue

        # --------------------------------------------------------------------
        # 1. TASK CAPABILITY SCORE (40%)
        # --------------------------------------------------------------------
        skills = emp.get("skills", {})
        capability = float(skills.get(required_skill, 50))
        capability = max(0.0, min(100.0, capability))

        # --------------------------------------------------------------------
        # 2. WORKLOAD CAPACITY SCORE (25%)
        # Check safe working capacity
        # --------------------------------------------------------------------
        max_h = float(emp.get("maxHours", 8.0))
        curr_h = float(emp.get("currentHours", 0.0))
        remaining_capacity = max(0.0, max_h - curr_h)

        # Candidate is safe if free hours >= task duration
        is_safe = remaining_capacity >= task_duration

        if is_safe:
            # Scaled against standard 5-hour benchmark
            capacity_score = min(100.0, round((remaining_capacity / 5.0) * 100.0))
        else:
            # Rejection penalty for exceeding safe capacity
            capacity_score = max(0.0, round((remaining_capacity / task_duration) * 40.0))

        # --------------------------------------------------------------------
        # 3. HISTORICAL PERFORMANCE SCORE (20%)
        # --------------------------------------------------------------------
        performance = float(emp.get("performance", 85))
        performance = max(0.0, min(100.0, performance))

        # --------------------------------------------------------------------
        # 4. OPERATIONAL RISK / CONTINUITY SCORE (15%)
        # Combines capability (55%) and capacity (45%)
        # --------------------------------------------------------------------
        risk_score = round(capability * 0.55 + capacity_score * 0.45)

        # --------------------------------------------------------------------
        # OVERALL SUITABILITY SCORE
        # Formula: 40% Capability + 25% Capacity + 20% Performance + 15% Risk
        # --------------------------------------------------------------------
        overall_score = round(
            (capability * 0.40) +
            (capacity_score * 0.25) +
            (performance * 0.20) +
            (risk_score * 0.15)
        )
        overall_score = max(0, min(100, int(overall_score)))

        # Status text
        status_label = "safe" if is_safe else "unsafe"

        # Explanatory decision text
        if is_safe:
            decision_text = (
                f"{emp['name']} has {remaining_capacity:.1f} hours of remaining capacity. "
                f"Adding this {task_duration:.1f}-hour task stays within the safe workload limit."
            )
        else:
            decision_text = (
                f"{emp['name']} has insufficient capacity ({remaining_capacity:.1f} hrs free). "
                f"Adding this {task_duration:.1f}-hour task exceeds safe working limits."
            )

        candidate_item = {
            "employee_id": emp["id"],
            "employee_name": emp["name"],
            "name": emp["name"],
            "role": emp["role"],
            "initials": emp.get("initials") or generate_initials(emp["name"]),
            "capability_score": int(capability),
            "capacity_score": int(capacity_score),
            "performance_score": int(performance),
            "risk_score": int(risk_score),
            "overall_score": int(overall_score),
            "safe": is_safe,
            "status": status_label,
            "remaining_capacity": round(remaining_capacity, 1),
            "decision_text": decision_text
        }
        candidates.append(candidate_item)

    # ------------------------------------------------------------------------
    # SORT CANDIDATES BEST TO WORST:
    # 1. Safe candidates are prioritized first
    # 2. Within each group, highest overall score first
    # ------------------------------------------------------------------------
    candidates.sort(key=lambda c: (1 if c["safe"] else 0, c["overall_score"]), reverse=True)

    safe_candidates = [c for c in candidates if c["safe"]]
    rejected_candidates = [c for c in candidates if not c["safe"]]
    best_candidate = safe_candidates[0] if safe_candidates else None

    return jsonify({
        "success": True,
        "absent_employee": absent_employee["name"] if absent_employee else "Unknown",
        "absent_task": task_name,
        "required_skill": required_skill,
        "task_duration": task_duration,
        "total_candidates": len(candidates),
        "safe_candidates_count": len(safe_candidates),
        "rejected_candidates_count": len(rejected_candidates),
        "best_candidate": best_candidate,
        "candidates": candidates
    }), 200


@app.route("/api/reassign/confirm", methods=["POST"])
def confirm_reassignment():
    """
    POST /api/reassign/confirm
    Updates an employee's workload when a reassignment is approved and marks
    the absent employee as absent.
    """
    data = request.get_json(force=True, silent=True) or {}
    replacement_id = data.get("replacement_id")
    absent_id = data.get("absent_id")
    task_hours = float(data.get("hours", 3.0))

    replacement = find_employee_by_identifier(replacement_id)
    absent = find_employee_by_identifier(absent_id)

    if not replacement:
        return jsonify({"success": False, "error": "Replacement employee not found."}), 404

    # Update replacement workload
    replacement["currentHours"] = min(
        replacement.get("maxHours", 8.0),
        replacement.get("currentHours", 0.0) + task_hours
    )
    if replacement["currentHours"] >= replacement.get("maxHours", 8.0):
        replacement["status"] = "busy"

    # Mark absent employee as absent
    if absent:
        absent["status"] = "absent"

    return jsonify({
        "success": True,
        "message": f"Task successfully reassigned to {replacement['name']}.",
        "updated_replacement": replacement,
        "updated_absent": absent
    }), 200


# ============================================================================
# ENTRYPOINT (Render and Local Execution)
# ============================================================================

if __name__ == "__main__":
    # Render binds dynamic port via the PORT environment variable
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_DEBUG", "False").lower() in ["true", "1"]
    print(f"[*] SkillShift Backend running on http://0.0.0.0:{port}")
    app.run(host="0.0.0.0", port=port, debug=debug)
