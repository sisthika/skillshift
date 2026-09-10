/* =========================================================
   SKILLSHIFT - WORKFORCE TASK REASSIGNMENT
   Frontend Demo Logic
   ========================================================= */


/* =========================================================
   EMPLOYEE DATA
   ========================================================= */

const employees = [

    {
        id: 1,
        name: "Arjun Kumar",
        role: "Senior Operations Associate",
        initials: "AK",
        status: "available",

        currentTask: "Inventory Quality Check",
        currentHours: 3,
        maxHours: 8,

        performance: 96,

        skills: {
            "Inventory Audit": 97,
            "Quality Inspection": 95,
            "Warehouse": 92,
            "Order Processing": 84,
            "Customer Support": 62,
            "Data Entry": 88,
            "Equipment Maintenance": 70
        },

        completedTasks: 148
    },

    {
        id: 2,
        name: "Priya Sharma",
        role: "Operations Specialist",
        initials: "PS",
        status: "available",

        currentTask: "Order Processing",
        currentHours: 5,
        maxHours: 8,

        performance: 94,

        skills: {
            "Inventory Audit": 89,
            "Quality Inspection": 91,
            "Warehouse": 84,
            "Order Processing": 98,
            "Customer Support": 88,
            "Data Entry": 94,
            "Equipment Maintenance": 65
        },

        completedTasks: 172
    },

    {
        id: 3,
        name: "Rahul Menon",
        role: "Warehouse Associate",
        initials: "RM",
        status: "busy",

        currentTask: "Warehouse Dispatch",
        currentHours: 7,
        maxHours: 8,

        performance: 92,

        skills: {
            "Inventory Audit": 88,
            "Quality Inspection": 82,
            "Warehouse": 97,
            "Order Processing": 79,
            "Customer Support": 52,
            "Data Entry": 72,
            "Equipment Maintenance": 84
        },

        completedTasks: 129
    },

    {
        id: 4,
        name: "Sneha Iyer",
        role: "Quality Analyst",
        initials: "SI",
        status: "available",

        currentTask: "Product Testing",
        currentHours: 2,
        maxHours: 8,

        performance: 98,

        skills: {
            "Inventory Audit": 94,
            "Quality Inspection": 99,
            "Warehouse": 73,
            "Order Processing": 68,
            "Customer Support": 58,
            "Data Entry": 89,
            "Equipment Maintenance": 76
        },

        completedTasks: 203
    },

    {
        id: 5,
        name: "Vikram Rao",
        role: "Maintenance Technician",
        initials: "VR",
        status: "available",

        currentTask: "Equipment Inspection",
        currentHours: 4,
        maxHours: 8,

        performance: 91,

        skills: {
            "Inventory Audit": 60,
            "Quality Inspection": 77,
            "Warehouse": 75,
            "Order Processing": 51,
            "Customer Support": 42,
            "Data Entry": 65,
            "Equipment Maintenance": 99
        },

        completedTasks: 117
    },

    {
        id: 6,
        name: "Meera Nair",
        role: "Customer Operations Executive",
        initials: "MN",
        status: "available",

        currentTask: "Customer Escalations",
        currentHours: 3,
        maxHours: 8,

        performance: 95,

        skills: {
            "Inventory Audit": 64,
            "Quality Inspection": 70,
            "Warehouse": 56,
            "Order Processing": 91,
            "Customer Support": 99,
            "Data Entry": 93,
            "Equipment Maintenance": 40
        },

        completedTasks: 184
    },

    {
        id: 7,
        name: "Karthik S",
        role: "Junior Operations Associate",
        initials: "KS",
        status: "available",

        currentTask: "Data Verification",
        currentHours: 4,
        maxHours: 8,

        performance: 87,

        skills: {
            "Inventory Audit": 73,
            "Quality Inspection": 75,
            "Warehouse": 80,
            "Order Processing": 82,
            "Customer Support": 65,
            "Data Entry": 97,
            "Equipment Maintenance": 45
        },

        completedTasks: 96
    },

    {
        id: 8,
        name: "Ananya Das",
        role: "Operations Associate",
        initials: "AD",
        status: "available",

        currentTask: "Order Validation",
        currentHours: 4,
        maxHours: 8,

        performance: 90,

        skills: {
            "Inventory Audit": 80,
            "Quality Inspection": 85,
            "Warehouse": 78,
            "Order Processing": 93,
            "Customer Support": 79,
            "Data Entry": 90,
            "Equipment Maintenance": 51
        },

        completedTasks: 141
    }

];


/* =========================================================
   ABSENT TASKS
   ========================================================= */

const absentTasks = {

    "1": {
        task: "Inventory Quality Check",
        skill: "Inventory Audit",
        priority: "HIGH",
        hours: 3
    },

    "2": {
        task: "Order Processing",
        skill: "Order Processing",
        priority: "MEDIUM",
        hours: 3
    },

    "3": {
        task: "Warehouse Dispatch",
        skill: "Warehouse",
        priority: "HIGH",
        hours: 4
    },

    "4": {
        task: "Product Quality Inspection",
        skill: "Quality Inspection",
        priority: "HIGH",
        hours: 3
    },

    "5": {
        task: "Equipment Maintenance",
        skill: "Equipment Maintenance",
        priority: "CRITICAL",
        hours: 4
    },

    "6": {
        task: "Customer Support Queue",
        skill: "Customer Support",
        priority: "HIGH",
        hours: 3
    },

    "7": {
        task: "Data Entry Validation",
        skill: "Data Entry",
        priority: "MEDIUM",
        hours: 2
    },

    "8": {
        task: "Order Validation",
        skill: "Order Processing",
        priority: "MEDIUM",
        hours: 2
    }

};


/* =========================================================
   HISTORY
   ========================================================= */

let reassignmentHistory = [

    {
        time: "09:42 AM",
        absent: "Rohit Verma",
        task: "Stock Verification",
        replacement: "Sneha Iyer",
        score: 96
    },

    {
        time: "09:15 AM",
        absent: "Deepak Shah",
        task: "Order Validation",
        replacement: "Priya Sharma",
        score: 94
    },

    {
        time: "08:51 AM",
        absent: "Amit Joshi",
        task: "Customer Escalation",
        replacement: "Meera Nair",
        score: 97
    },

    {
        time: "08:23 AM",
        absent: "Neha Singh",
        task: "Data Verification",
        replacement: "Karthik S",
        score: 91
    }

];


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    populateEmployeeSelect();

    renderWorkforce();

    renderRecentHistory();

    renderEmployeeCards();

    renderHistory();

});


/* =========================================================
   NAVIGATION
   ========================================================= */

function showSection(sectionId, button) {

    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active-section");
    });

    const section = document.getElementById(sectionId);

    if (section) {
        section.classList.add("active-section");
    }


    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });


    if (button) {
        button.classList.add("active");
    }


    const titles = {

        dashboard: [
            "Workforce Dashboard",
            "Intelligent workforce management at a glance."
        ],

        reassign: [
            "Task Reassignment",
            "Find the safest and most capable replacement."
        ],

        employees: [
            "Employee Intelligence",
            "Capability inferred from historical task performance."
        ],

        history: [
            "Reassignment History",
            "Audit trail of workforce decisions."
        ]

    };


    if (titles[sectionId]) {

        const pageTitle =
            document.getElementById("pageTitle");

        const pageSubtitle =
            document.getElementById("pageSubtitle");

        if (pageTitle) {
            pageTitle.textContent =
                titles[sectionId][0];
        }

        if (pageSubtitle) {
            pageSubtitle.textContent =
                titles[sectionId][1];
        }

    }

}


/* =========================================================
   OPEN REASSIGNMENT
   ========================================================= */

function openReassign() {

    const buttons =
        document.querySelectorAll(".nav-item");

    const button = buttons.length > 1
        ? buttons[1]
        : null;

    showSection("reassign", button);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   EMPLOYEE SELECT
   ========================================================= */

function populateEmployeeSelect() {

    const select =
        document.getElementById("employeeSelect");

    if (!select) return;


    select.innerHTML =
        '<option value="">Select employee...</option>';


    employees.forEach(employee => {

        const option =
            document.createElement("option");

        option.value = employee.id;

        option.textContent =
            `${employee.name} — ${employee.role}`;

        select.appendChild(option);

    });

}


/* =========================================================
   LOAD ABSENT EMPLOYEE
   ========================================================= */

function loadAbsentEmployee() {

    const select =
        document.getElementById("employeeSelect");

    const findBtn =
        document.getElementById("findBtn");

    const taskDetails =
        document.getElementById("taskDetails");

    if (!select) return;


    const id = select.value;


    if (!id) {

        if (taskDetails) {
            taskDetails.classList.add("hidden");
        }

        if (findBtn) {
            findBtn.disabled = true;
        }

        return;
    }


    const employee =
        employees.find(e => e.id == id);

    const task =
        absentTasks[id];


    if (!employee || !task) return;


    const employeeName =
        document.getElementById("employeeName");

    const employeeRole =
        document.getElementById("employeeRole");

    const taskName =
        document.getElementById("taskName");

    const taskPriority =
        document.getElementById("taskPriority");

    const taskHours =
        document.getElementById("taskHours");


    if (employeeName) {
        employeeName.textContent =
            employee.name;
    }

    if (employeeRole) {
        employeeRole.textContent =
            employee.role;
    }

    if (taskName) {
        taskName.textContent =
            task.task;
    }

    if (taskPriority) {
        taskPriority.textContent =
            task.priority;
    }

    if (taskHours) {
        taskHours.textContent =
            `${task.hours} hours`;
    }


    if (taskDetails) {
        taskDetails.classList.remove("hidden");
    }

    if (findBtn) {
        findBtn.disabled = false;
    }


    const recommendation =
        document.getElementById("recommendation");

    const emptyRecommendation =
        document.getElementById("emptyRecommendation");

    const candidatePanel =
        document.getElementById("candidatePanel");


    if (recommendation) {
        recommendation.classList.add("hidden");
    }

    if (emptyRecommendation) {
        emptyRecommendation.classList.remove("hidden");
    }

    if (candidatePanel) {
        candidatePanel.classList.add("hidden");
    }

}


/* =========================================================
   CANDIDATE SCORING
   =========================================================

   TASK CAPABILITY     = 40%
   WORKLOAD CAPACITY   = 25%
   PERFORMANCE        = 20%
   CONTINUITY / RISK  = 15%

   FINAL SCORE = /100
   UI displays this as percentage.

   Example:
   94% = 9.4 / 10

   ========================================================= */

function calculateCandidates(absentId) {

    const task =
        absentTasks[absentId];

    if (!task) return [];


    const candidates = [];


    employees.forEach(employee => {

        /* Cannot replace themselves */
        if (employee.id == absentId) {
            return;
        }


        /* Absent employees cannot replace someone */
        if (employee.status === "absent") {
            return;
        }


        const capability =
            Number(employee.skills?.[task.skill] || 0);


        const remainingCapacity =
            Math.max(
                0,
                Number(employee.maxHours || 0) -
                Number(employee.currentHours || 0)
            );


        const requiredHours =
            Math.max(Number(task.hours || 0), 1);


        const safe =
            remainingCapacity >= requiredHours;


        /*
         * Capacity:
         *
         * If employee has enough capacity:
         * more free capacity = higher score.
         *
         * If employee does not have enough:
         * heavily penalize.
         */

        let capacityScore;


        if (safe) {

            capacityScore =
                Math.min(
                    100,
                    Math.round(
                        (remainingCapacity / 5) * 100
                    )
                );

        } else {

            capacityScore =
                Math.max(
                    0,
                    Math.round(
                        (remainingCapacity / requiredHours) * 40
                    )
                );

        }


        /*
         * Historical performance
         */

        const performance =
            Math.min(
                100,
                Math.max(
                    0,
                    Number(employee.performance || 0)
                )
            );


        /*
         * Risk score
         *
         * Capability contributes 55%
         * Capacity contributes 45%
         */

        const risk =
            Math.round(
                capability * 0.55 +
                capacityScore * 0.45
            );


        /*
         * FINAL SCORE
         */

        let overall =
            Math.round(

                capability * 0.40 +

                capacityScore * 0.25 +

                performance * 0.20 +

                risk * 0.15

            );


        /*
         * Never allow score outside 0-100.
         */

        overall =
            Math.max(
                0,
                Math.min(100, overall)
            );


        candidates.push({

            employee,

            capability,

            capacity: capacityScore,

            performance,

            risk,

            overall,

            safe

        });

    });


    /*
     * Safe candidates always appear first.
     *
     * Within each group:
     * highest score first.
     */

    candidates.sort((a, b) => {

        if (a.safe !== b.safe) {
            return a.safe ? -1 : 1;
        }

        return b.overall - a.overall;

    });


    return candidates;

}


/* =========================================================
   FIND BEST CANDIDATE
   ========================================================= */

function findBestCandidate() {

    const select =
        document.getElementById("employeeSelect");

    if (!select) return;


    const absentId =
        select.value;


    if (!absentId) {

        showToast(
            "Select an employee",
            "Please select an absent employee first."
        );

        return;
    }


    const candidates =
        calculateCandidates(absentId);


    if (!candidates.length) {

        showToast(
            "No replacement found",
            "There are no suitable employees available."
        );

        return;
    }


    const safeCandidates =
        candidates.filter(candidate => candidate.safe);


    if (!safeCandidates.length) {

        showToast(
            "No safe replacement",
            "No available employee has enough workload capacity."
        );

        renderCandidateTable(candidates);

        const candidatePanel =
            document.getElementById("candidatePanel");

        if (candidatePanel) {
            candidatePanel.classList.remove("hidden");
        }

        return;
    }


    const best =
        safeCandidates[0];


    displayRecommendation(best);

    renderCandidateTable(candidates);


    const candidatePanel =
        document.getElementById("candidatePanel");

    const emptyRecommendation =
        document.getElementById("emptyRecommendation");

    const recommendation =
        document.getElementById("recommendation");


    if (candidatePanel) {
        candidatePanel.classList.remove("hidden");
    }

    if (emptyRecommendation) {
        emptyRecommendation.classList.add("hidden");
    }

    if (recommendation) {
        recommendation.classList.remove("hidden");
    }

}


/* =========================================================
   DISPLAY RECOMMENDATION
   ========================================================= */

function displayRecommendation(candidate) {

    if (!candidate || !candidate.employee) return;


    const employee =
        candidate.employee;


    const candidateName =
        document.getElementById("candidateName");

    const candidateRole =
        document.getElementById("candidateRole");

    const candidateAvatar =
        document.getElementById("candidateAvatar");

    const matchScore =
        document.getElementById("matchScore");

    const skillScore =
        document.getElementById("skillScore");

    const capacityScore =
        document.getElementById("capacityScore");

    const historyScore =
        document.getElementById("historyScore");

    const riskScore =
        document.getElementById("riskScore");


    if (candidateName) {
        candidateName.textContent =
            employee.name;
    }

    if (candidateRole) {
        candidateRole.textContent =
            employee.role;
    }

    if (candidateAvatar) {
        candidateAvatar.textContent =
            employee.initials;
    }


    /*
     * Display overall score as percentage
     * and /10 equivalent in title.
     */

    if (matchScore) {

        matchScore.textContent =
            `${candidate.overall}%`;

        matchScore.title =
            `${(candidate.overall / 10).toFixed(1)} / 10`;

    }


    if (skillScore) {
        skillScore.textContent =
            `${candidate.capability}%`;
    }

    if (capacityScore) {
        capacityScore.textContent =
            `${candidate.capacity}%`;
    }

    if (historyScore) {
        historyScore.textContent =
            `${candidate.performance}%`;
    }

    if (riskScore) {
        riskScore.textContent =
            `${candidate.risk}%`;
    }


    const skillBar =
        document.getElementById("skillBar");

    const capacityBar =
        document.getElementById("capacityBar");

    const historyBar =
        document.getElementById("historyBar");

    const riskBar =
        document.getElementById("riskBar");


    if (skillBar) {
        skillBar.style.width =
            `${candidate.capability}%`;
    }

    if (capacityBar) {
        capacityBar.style.width =
            `${candidate.capacity}%`;
    }

    if (historyBar) {
        historyBar.style.width =
            `${candidate.performance}%`;
    }

    if (riskBar) {
        riskBar.style.width =
            `${candidate.risk}%`;
    }


    const select =
        document.getElementById("employeeSelect");

    const task =
        select
            ? absentTasks[select.value]
            : null;


    const decisionText =
        document.getElementById("decisionText");


    if (!task || !decisionText) return;


    const remaining =
        Number(employee.maxHours || 0) -
        Number(employee.currentHours || 0);


    if (candidate.safe) {

        decisionText.textContent =
            `${employee.name} has ${remaining} hours of remaining capacity. ` +
            `Adding this ${task.hours}-hour task stays within the safe workload limit.`;

    } else {

        decisionText.textContent =
            `${employee.name} has insufficient capacity for this task. ` +
            `The system recommends reviewing a safer alternative.`;

    }

}


/* =========================================================
   CANDIDATE TABLE
   ========================================================= */

function renderCandidateTable(candidates) {

    const tbody =
        document.getElementById("candidateTable");

    if (!tbody) return;


    tbody.innerHTML = "";


    candidates.forEach((candidate, index) => {

        const employee =
            candidate.employee;


        const row =
            document.createElement("tr");


        let statusText;
        let statusClass;


        if (!candidate.safe) {

            statusText =
                "Capacity Risk";

            statusClass =
                "busy";

        } else if (index === 0) {

            statusText =
                "Recommended";

            statusClass =
                "available";

        } else {

            statusText =
                "Available";

            statusClass =
                "available";

        }


        row.innerHTML = `

            <td>

                <span class="table-avatar">
                    ${escapeHTML(employee.initials)}
                </span>

                <span class="table-name">

                    <strong>
                        ${escapeHTML(employee.name)}
                    </strong>

                    <small>
                        ${escapeHTML(employee.role)}
                    </small>

                </span>

            </td>


            <td>
                ${candidate.capability}%
            </td>


            <td>
                ${candidate.capacity}%
            </td>


            <td>
                ${candidate.performance}%
            </td>


            <td>
                ${candidate.risk}%
            </td>


            <td class="overall-score"
                title="${(candidate.overall / 10).toFixed(1)} / 10">

                ${candidate.overall}%

            </td>


            <td>

                <span class="availability ${statusClass}">
                    ${statusText}
                </span>

            </td>

        `;


        tbody.appendChild(row);

    });

}


/* =========================================================
   COMPARE ALTERNATIVES
   ========================================================= */

function findAlternative() {

    const select =
        document.getElementById("employeeSelect");

    if (!select) return;


    const absentId =
        select.value;


    if (!absentId) {

        showToast(
            "Select an employee",
            "Please select an absent employee first."
        );

        return;
    }


    const candidates =
        calculateCandidates(absentId);


    const safeCandidates =
        candidates.filter(candidate => candidate.safe);


    if (safeCandidates.length < 2) {

        showToast(
            "No alternatives",
            "There is only one safe replacement available."
        );

        return;
    }


    const second =
        safeCandidates[1];


    displayRecommendation(second);


    showToast(
        "Alternative candidate",
        `${second.employee.name} scored ${(second.overall / 10).toFixed(1)}/10.`
    );

}


/* =========================================================
   CONFIRM REASSIGNMENT
   ========================================================= */

function confirmReassignment() {

    const select =
        document.getElementById("employeeSelect");

    if (!select) return;


    const absentId =
        select.value;


    if (!absentId) {

        showToast(
            "Select an employee",
            "Please select an absent employee first."
        );

        return;
    }


    const candidates =
        calculateCandidates(absentId);


    const safeCandidates =
        candidates.filter(candidate => candidate.safe);


    if (!safeCandidates.length) {

        showToast(
            "Reassignment blocked",
            "No candidate has enough safe workload capacity."
        );

        return;
    }


    const candidate =
        safeCandidates[0];


    const absentEmployee =
        employees.find(
            e => e.id == absentId
        );


    const task =
        absentTasks[absentId];


    if (!candidate || !absentEmployee || !task) {
        return;
    }


    /*
     * Prevent duplicate reassignment.
     */

    if (absentEmployee.status === "absent") {

        showToast(
            "Already reassigned",
            "This employee's task has already been reassigned."
        );

        return;
    }


    /*
     * Add history
     */

    const now =
        new Date();


    const time =
        now.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    reassignmentHistory.unshift({

        time,

        absent:
            absentEmployee.name,

        task:
            task.task,

        replacement:
            candidate.employee.name,

        score:
            candidate.overall

    });


    /*
     * Update candidate workload
     */

    candidate.employee.currentHours +=
        Number(task.hours);


    /*
     * Mark absent employee
     */

    absentEmployee.status =
        "absent";


    /*
     * Update dashboard counter
     */

    const reassignedCount =
        document.getElementById("reassignedCount");


    if (reassignedCount) {

        let count =
            Number(
                reassignedCount.textContent
            ) || 0;

        count++;

        reassignedCount.textContent =
            count;

    }


    /*
     * Refresh UI
     */

    renderWorkforce();

    renderRecentHistory();

    renderHistory();

    renderEmployeeCards();


    showToast(
        "Task reassigned successfully",
        `${task.task} → ${candidate.employee.name}`
    );


    /*
     * Reset form
     */

    select.value = "";


    const taskDetails =
        document.getElementById("taskDetails");

    const recommendation =
        document.getElementById("recommendation");

    const candidatePanel =
        document.getElementById("candidatePanel");

    const emptyRecommendation =
        document.getElementById("emptyRecommendation");

    const findBtn =
        document.getElementById("findBtn");


    if (taskDetails) {
        taskDetails.classList.add("hidden");
    }

    if (recommendation) {
        recommendation.classList.add("hidden");
    }

    if (candidatePanel) {
        candidatePanel.classList.add("hidden");
    }

    if (emptyRecommendation) {
        emptyRecommendation.classList.remove("hidden");
    }

    if (findBtn) {
        findBtn.disabled = true;
    }

}


/* =========================================================
   WORKFORCE LIST
   ========================================================= */

function renderWorkforce() {

    const container =
        document.getElementById("workforceList");

    if (!container) return;


    container.innerHTML = "";


    employees
        .slice(0, 6)
        .forEach(employee => {

            const row =
                document.createElement("div");


            row.className =
                "employee-row";


            const statusText = {

                available: "Available",

                busy: "Busy",

                absent: "Absent"

            }[employee.status] || "Unknown";


            row.innerHTML = `

                <div class="small-avatar">
                    ${escapeHTML(employee.initials)}
                </div>


                <div class="employee-info">

                    <strong>
                        ${escapeHTML(employee.name)}
                    </strong>

                    <span>
                        ${escapeHTML(employee.currentTask)}
                    </span>

                </div>


                <span class="availability ${employee.status}">
                    ${statusText}
                </span>

            `;


            container.appendChild(row);

        });

}


/* =========================================================
   RECENT HISTORY
   ========================================================= */

function renderRecentHistory() {

    const container =
        document.getElementById("recentList");

    if (!container) return;


    container.innerHTML = "";


    reassignmentHistory
        .slice(0, 5)
        .forEach(item => {

            const row =
                document.createElement("div");


            row.className =
                "recent-row";


            row.innerHTML = `

                <div class="arrow">
                    ⇄
                </div>


                <div class="recent-text">

                    <strong>
                        ${escapeHTML(item.replacement)}
                    </strong>

                    <span>
                        Took over ${escapeHTML(item.task)}
                    </span>

                </div>


                <span class="score-pill"
                      title="${(item.score / 10).toFixed(1)} / 10">

                    ${item.score}%

                </span>

            `;


            container.appendChild(row);

        });

}


/* =========================================================
   EMPLOYEE CARDS
   ========================================================= */

function renderEmployeeCards() {

    const container =
        document.getElementById("employeeCards");

    if (!container) return;


    container.innerHTML = "";


    employees.forEach(employee => {

        const maxHours =
            Math.max(
                Number(employee.maxHours) || 1,
                1
            );


        const currentHours =
            Math.max(
                0,
                Number(employee.currentHours) || 0
            );


        const capacity =
            Math.min(
                100,
                Math.round(
                    currentHours /
                    maxHours *
                    100
                )
            );


        const remaining =
            Math.max(
                0,
                maxHours - currentHours
            );


        const card =
            document.createElement("div");


        card.className =
            "employee-card";


        card.innerHTML = `

            <div class="employee-top">

                <div class="big-avatar">
                    ${escapeHTML(employee.initials)}
                </div>


                <div>

                    <h3>
                        ${escapeHTML(employee.name)}
                    </h3>

                    <p>
                        ${escapeHTML(employee.role)}
                    </p>

                </div>

            </div>


            <div class="employee-stat">

                <span>Status</span>

                <span class="availability ${employee.status}">
                    ${escapeHTML(
            employee.status.toUpperCase()
        )}
                </span>

            </div>


            <div class="employee-stat">

                <span>
                    Historical Performance
                </span>

                <strong>
                    ${employee.performance}%
                </strong>

            </div>


            <div class="employee-stat">

                <span>
                    Tasks Completed
                </span>

                <strong>
                    ${employee.completedTasks}
                </strong>

            </div>


            <div class="employee-stat">

                <span>
                    Current Workload
                </span>

                <strong>
                    ${currentHours}/${maxHours} hrs
                </strong>

            </div>


            <div class="capacity-bar">

                <div style="width:${capacity}%"></div>

            </div>


            <div class="employee-stat">

                <span>
                    Remaining Capacity
                </span>

                <strong>
                    ${remaining} hrs
                </strong>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   HISTORY TABLE
   ========================================================= */

function renderHistory() {

    const tbody =
        document.getElementById("historyTable");

    if (!tbody) return;


    tbody.innerHTML = "";


    reassignmentHistory.forEach(item => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${escapeHTML(item.time)}
            </td>


            <td>

                <strong>
                    ${escapeHTML(item.absent)}
                </strong>

            </td>


            <td>
                ${escapeHTML(item.task)}
            </td>


            <td>

                <strong>
                    ${escapeHTML(item.replacement)}
                </strong>

            </td>


            <td>

                <span class="score-pill"
                      title="${(item.score / 10).toFixed(1)} / 10">

                    ${item.score}%

                </span>

            </td>


            <td>

                <span class="availability available">
                    Auto Reassigned
                </span>

            </td>

        `;


        tbody.appendChild(row);

    });

}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer = null;


function showToast(title, message) {

    const toast =
        document.getElementById("toast");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastMessage =
        document.getElementById("toastMessage");


    if (!toast) return;


    if (toastTitle) {
        toastTitle.textContent =
            title;
    }


    if (toastMessage) {
        toastMessage.textContent =
            message;
    }


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 4000);

}


/* =========================================================
   SAFE HTML HELPER
   ========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   OPTIONAL KEYBOARD SUPPORT
   ========================================================= */

document.addEventListener("keydown", function (event) {

    /*
     * Press Escape to return to dashboard.
     */

    if (event.key === "Escape") {

        const activeSection =
            document.querySelector(
                ".section.active-section"
            );


        if (
            activeSection &&
            activeSection.id !== "dashboard"
        ) {

            const dashboardButton =
                document.querySelector(
                    '.nav-item[onclick*="dashboard"]'
                );


            showSection(
                "dashboard",
                dashboardButton
            );

        }

    }

});
/* =========================================================
   ADD EMPLOYEE FEATURE
   No HTML changes required
   ========================================================= */

(function () {



    /* ---------------------------------------------------------
       CREATE MODAL
       --------------------------------------------------------- */

    function createAddEmployeeModal() {

        if (document.getElementById("addEmployeeModal")) {
            return;
        }


        const modal =
            document.createElement("div");

        modal.id =
            "addEmployeeModal";


        modal.innerHTML = `

            <div id="addEmployeeOverlay"
                 style="
                    position:fixed;
                    inset:0;
                    background:rgba(15,23,42,.55);
                    backdrop-filter:blur(6px);
                    z-index:9998;
                 ">
            </div>


            <div style="
                position:fixed;
                inset:0;
                z-index:9999;
                display:flex;
                align-items:center;
                justify-content:center;
                padding:20px;
                pointer-events:none;
            ">

                <div id="addEmployeeBox"
                     style="
                        width:min(680px,100%);
                        max-height:90vh;
                        overflow-y:auto;
                        background:white;
                        border-radius:18px;
                        box-shadow:0 25px 80px rgba(0,0,0,.22);
                        padding:28px;
                        pointer-events:auto;
                     ">


                    <div style="
                        display:flex;
                        justify-content:space-between;
                        align-items:flex-start;
                        margin-bottom:24px;
                     ">

                        <div>

                            <div style="
                                font-size:12px;
                                font-weight:700;
                                letter-spacing:.08em;
                                color:#6366f1;
                                margin-bottom:6px;
                            ">
                                WORKFORCE
                            </div>

                            <h2 style="
                                margin:0;
                                font-size:24px;
                                color:#111827;
                            ">
                                Add Employee
                            </h2>

                            <p style="
                                margin:6px 0 0;
                                color:#6b7280;
                                font-size:14px;
                            ">
                                Add employee details for intelligent task matching.
                            </p>

                        </div>


                        <button
                            type="button"
                            id="closeAddEmployeeBtn"
                            style="
                                border:none;
                                background:#f3f4f6;
                                width:34px;
                                height:34px;
                                border-radius:50%;
                                font-size:20px;
                                cursor:pointer;
                                color:#4b5563;
                            "
                        >
                            ×
                        </button>

                    </div>


                    <form id="addEmployeeForm">

                        <div style="
                            display:grid;
                            grid-template-columns:1fr 1fr;
                            gap:16px;
                        ">


                            <!-- NAME -->

                            <div style="grid-column:1/-1;">

                                <label style="
                                    display:block;
                                    font-size:13px;
                                    font-weight:600;
                                    margin-bottom:7px;
                                    color:#374151;
                                ">
                                    Employee Name *
                                </label>

                                <input
                                    id="newEmployeeName"
                                    type="text"
                                    required
                                    placeholder="e.g. Rahul Verma"
                                    style="
                                        width:100%;
                                        box-sizing:border-box;
                                        padding:12px 13px;
                                        border:1px solid #d1d5db;
                                        border-radius:9px;
                                        font-size:14px;
                                        outline:none;
                                    "
                                >

                            </div>


                            <!-- ROLE -->

                            <div>

                                <label style="
                                    display:block;
                                    font-size:13px;
                                    font-weight:600;
                                    margin-bottom:7px;
                                    color:#374151;
                                ">
                                    Role *
                                </label>

                                <input
                                    id="newEmployeeRole"
                                    type="text"
                                    required
                                    placeholder="e.g. Operations Associate"
                                    style="
                                        width:100%;
                                        box-sizing:border-box;
                                        padding:12px 13px;
                                        border:1px solid #d1d5db;
                                        border-radius:9px;
                                        font-size:14px;
                                    "
                                >

                            </div>


                            <!-- PRIMARY SKILL -->

                            <div>

                                <label style="
                                    display:block;
                                    font-size:13px;
                                    font-weight:600;
                                    margin-bottom:7px;
                                    color:#374151;
                                ">
                                    Primary Skill *
                                </label>

                                <select
                                    id="newEmployeeSkill"
                                    required
                                    style="
                                        width:100%;
                                        box-sizing:border-box;
                                        padding:12px 13px;
                                        border:1px solid #d1d5db;
                                        border-radius:9px;
                                        font-size:14px;
                                        background:white;
                                    "
                                >

                                    <option value="">
                                        Select skill
                                    </option>

                                    <option value="Inventory Audit">
                                        Inventory Audit
                                    </option>

                                    <option value="Quality Inspection">
                                        Quality Inspection
                                    </option>

                                    <option value="Warehouse">
                                        Warehouse
                                    </option>

                                    <option value="Order Processing">
                                        Order Processing
                                    </option>

                                    <option value="Customer Support">
                                        Customer Support
                                    </option>

                                    <option value="Data Entry">
                                        Data Entry
                                    </option>

                                    <option value="Equipment Maintenance">
                                        Equipment Maintenance
                                    </option>

                                </select>

                            </div>


                            <!-- SKILL LEVEL -->

                            <div>

                                <label style="
                                    display:block;
                                    font-size:13px;
                                    font-weight:600;
                                    margin-bottom:7px;
                                    color:#374151;
                                ">
                                    Skill Level (0–100) *
                                </label>

                                <input
                                    id="newEmployeeSkillLevel"
                                    type="number"
                                    min="0"
                                    max="100"
                                    value="80"
                                    required
                                    style="
                                        width:100%;
                                        box-sizing:border-box;
                                        padding:12px 13px;
                                        border:1px solid #d1d5db;
                                        border-radius:9px;
                                        font-size:14px;
                                    "
                                >

                            </div>


                            <!-- CURRENT TASK -->

                            <div>

                                <label style="
                                    display:block;
                                    font-size:13px;
                                    font-weight:600;
                                    margin-bottom:7px;
                                    color:#374151;
                                ">
                                    Current Task *
                                </label>

                                <input
                                    id="newEmployeeTask"
                                    type="text"
                                    required
                                    placeholder="e.g. Inventory Check"
                                    style="
                                        width:100%;
                                        box-sizing:border-box;
                                        padding:12px 13px;
                                        border:1px solid #d1d5db;
                                        border-radius:9px;
                                        font-size:14px;
                                    "
                                >

                            </div>


                            <!-- CURRENT HOURS -->

                            <div>

                                <label style="
                                    display:block;
                                    font-size:13px;
                                    font-weight:600;
                                    margin-bottom:7px;
                                    color:#374151;
                                ">
                                    Current Workload (hrs) *
                                </label>

                                <input
                                    id="newEmployeeCurrentHours"
                                    type="number"
                                    min="0"
                                    step="0.5"
                                    value="2"
                                    required
                                    style="
                                        width:100%;
                                        box-sizing:border-box;
                                        padding:12px 13px;
                                        border:1px solid #d1d5db;
                                        border-radius:9px;
                                        font-size:14px;
                                    "
                                >

                            </div>


                            <!-- MAX HOURS -->

                            <div>

                                <label style="
                                    display:block;
                                    font-size:13px;
                                    font-weight:600;
                                    margin-bottom:7px;
                                    color:#374151;
                                ">
                                    Maximum Hours *
                                </label>

                                <input
                                    id="newEmployeeMaxHours"
                                    type="number"
                                    min="1"
                                    step="0.5"
                                    value="8"
                                    required
                                    style="
                                        width:100%;
                                        box-sizing:border-box;
                                        padding:12px 13px;
                                        border:1px solid #d1d5db;
                                        border-radius:9px;
                                        font-size:14px;
                                    "
                                >

                            </div>


                            <!-- PERFORMANCE -->

                            <div>

                                <label style="
                                    display:block;
                                    font-size:13px;
                                    font-weight:600;
                                    margin-bottom:7px;
                                    color:#374151;
                                ">
                                    Historical Performance (%) *
                                </label>

                                <input
                                    id="newEmployeePerformance"
                                    type="number"
                                    min="0"
                                    max="100"
                                    value="90"
                                    required
                                    style="
                                        width:100%;
                                        box-sizing:border-box;
                                        padding:12px 13px;
                                        border:1px solid #d1d5db;
                                        border-radius:9px;
                                        font-size:14px;
                                    "
                                >

                            </div>


                            <!-- COMPLETED TASKS -->

                            <div>

                                <label style="
                                    display:block;
                                    font-size:13px;
                                    font-weight:600;
                                    margin-bottom:7px;
                                    color:#374151;
                                ">
                                    Tasks Completed *
                                </label>

                                <input
                                    id="newEmployeeCompletedTasks"
                                    type="number"
                                    min="0"
                                    value="50"
                                    required
                                    style="
                                        width:100%;
                                        box-sizing:border-box;
                                        padding:12px 13px;
                                        border:1px solid #d1d5db;
                                        border-radius:9px;
                                        font-size:14px;
                                    "
                                >

                            </div>


                            <!-- STATUS -->

                            <div style="grid-column:1/-1;">

                                <label style="
                                    display:block;
                                    font-size:13px;
                                    font-weight:600;
                                    margin-bottom:7px;
                                    color:#374151;
                                ">
                                    Current Status *
                                </label>

                                <select
                                    id="newEmployeeStatus"
                                    required
                                    style="
                                        width:100%;
                                        box-sizing:border-box;
                                        padding:12px 13px;
                                        border:1px solid #d1d5db;
                                        border-radius:9px;
                                        font-size:14px;
                                        background:white;
                                    "
                                >

                                    <option value="available">
                                        Available
                                    </option>

                                    <option value="busy">
                                        Busy
                                    </option>

                                    <option value="absent">
                                        Absent
                                    </option>

                                </select>

                            </div>


                        </div>


                        <div style="
                            display:flex;
                            justify-content:flex-end;
                            gap:10px;
                            margin-top:26px;
                            padding-top:20px;
                            border-top:1px solid #e5e7eb;
                        ">

                            <button
                                type="button"
                                id="cancelAddEmployeeBtn"
                                style="
                                    padding:11px 18px;
                                    border:1px solid #d1d5db;
                                    background:white;
                                    border-radius:9px;
                                    cursor:pointer;
                                    font-weight:600;
                                    color:#374151;
                                "
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                style="
                                    padding:11px 20px;
                                    border:none;
                                    background:#111827;
                                    color:white;
                                    border-radius:9px;
                                    cursor:pointer;
                                    font-weight:600;
                                "
                            >
                                Add Employee
                            </button>

                        </div>


                    </form>

                </div>

            </div>
        `;


        document.body.appendChild(modal);


        /* -----------------------------------------------------
           CLOSE BUTTONS
           ----------------------------------------------------- */

        document
            .getElementById("closeAddEmployeeBtn")
            .addEventListener(
                "click",
                closeAddEmployeeModal
            );


        document
            .getElementById("cancelAddEmployeeBtn")
            .addEventListener(
                "click",
                closeAddEmployeeModal
            );


        document
            .getElementById("addEmployeeOverlay")
            .addEventListener(
                "click",
                closeAddEmployeeModal
            );


        /* -----------------------------------------------------
           FORM SUBMIT
           ----------------------------------------------------- */

        document
            .getElementById("addEmployeeForm")
            .addEventListener(
                "submit",
                addNewEmployee
            );

    }


    /* ---------------------------------------------------------
       OPEN MODAL
       --------------------------------------------------------- */

    window.openAddEmployeeModal = function () {

        createAddEmployeeModal();

        const modal =
            document.getElementById(
                "addEmployeeModal"
            );

        if (modal) {

            modal.style.display =
                "block";

            document.body.style.overflow =
                "hidden";

            setTimeout(() => {

                const name =
                    document.getElementById(
                        "newEmployeeName"
                    );

                if (name) {
                    name.focus();
                }

            }, 100);

        }

    };


    /* ---------------------------------------------------------
       CLOSE MODAL
       --------------------------------------------------------- */

    window.closeAddEmployeeModal = function () {

        const modal =
            document.getElementById(
                "addEmployeeModal"
            );

        if (modal) {

            modal.style.display =
                "none";

        }

        document.body.style.overflow =
            "";

    };


    /* ---------------------------------------------------------
       GENERATE INITIALS
       --------------------------------------------------------- */

    function generateInitials(name) {

        const words =
            name
                .trim()
                .split(/\s+/)
                .filter(Boolean);


        if (!words.length) {
            return "NA";
        }


        if (words.length === 1) {

            return words[0]
                .substring(0, 2)
                .toUpperCase();

        }


        return (
            words[0][0] +
            words[words.length - 1][0]
        ).toUpperCase();

    }


    /* ---------------------------------------------------------
       GENERATE UNIQUE ID
       --------------------------------------------------------- */

    function generateEmployeeId() {

        let id =
            Date.now();


        while (
            employees.some(
                employee => employee.id == id
            )
        ) {

            id++;

        }


        return id;

    }


    /* ---------------------------------------------------------
       ADD NEW EMPLOYEE
       --------------------------------------------------------- */

    function addNewEmployee(event) {

        event.preventDefault();


        const name =
            document
                .getElementById(
                    "newEmployeeName"
                )
                .value
                .trim();


        const role =
            document
                .getElementById(
                    "newEmployeeRole"
                )
                .value
                .trim();


        const primarySkill =
            document
                .getElementById(
                    "newEmployeeSkill"
                )
                .value;


        const skillLevel =
            Number(
                document
                    .getElementById(
                        "newEmployeeSkillLevel"
                    )
                    .value
            );


        const currentTask =
            document
                .getElementById(
                    "newEmployeeTask"
                )
                .value
                .trim();


        const currentHours =
            Number(
                document
                    .getElementById(
                        "newEmployeeCurrentHours"
                    )
                    .value
            );


        const maxHours =
            Number(
                document
                    .getElementById(
                        "newEmployeeMaxHours"
                    )
                    .value
            );


        const performance =
            Number(
                document
                    .getElementById(
                        "newEmployeePerformance"
                    )
                    .value
            );


        const completedTasks =
            Number(
                document
                    .getElementById(
                        "newEmployeeCompletedTasks"
                    )
                    .value
            );


        const status =
            document
                .getElementById(
                    "newEmployeeStatus"
                )
                .value;


        /* -----------------------------------------------------
           VALIDATION
           ----------------------------------------------------- */

        if (!name || !role || !primarySkill || !currentTask) {

            showToast(
                "Missing information",
                "Please fill in all required fields."
            );

            return;

        }


        if (
            skillLevel < 0 ||
            skillLevel > 100
        ) {

            showToast(
                "Invalid skill level",
                "Skill level must be between 0 and 100."
            );

            return;

        }


        if (
            performance < 0 ||
            performance > 100
        ) {

            showToast(
                "Invalid performance",
                "Performance must be between 0 and 100."
            );

            return;

        }


        if (
            currentHours < 0 ||
            maxHours <= 0 ||
            currentHours > maxHours
        ) {

            showToast(
                "Invalid workload",
                "Current hours cannot exceed maximum hours."
            );

            return;

        }


        if (completedTasks < 0) {

            showToast(
                "Invalid task count",
                "Completed tasks cannot be negative."
            );

            return;

        }


        /* -----------------------------------------------------
           DUPLICATE NAME CHECK
           ----------------------------------------------------- */

        const duplicate =
            employees.some(
                employee =>
                    employee.name
                        .toLowerCase() ===
                    name.toLowerCase()
            );


        if (duplicate) {

            showToast(
                "Employee already exists",
                "An employee with this name is already in the system."
            );

            return;

        }


        /* -----------------------------------------------------
           CREATE SKILL PROFILE
           ----------------------------------------------------- */

        const skills = {

            "Inventory Audit": 50,

            "Quality Inspection": 50,

            "Warehouse": 50,

            "Order Processing": 50,

            "Customer Support": 50,

            "Data Entry": 50,

            "Equipment Maintenance": 50

        };


        /*
         * Primary skill gets the entered level.
         */

        skills[primarySkill] =
            skillLevel;


        /* -----------------------------------------------------
           CREATE EMPLOYEE
           ----------------------------------------------------- */

        const newEmployee = {

            id:
                generateEmployeeId(),

            name:
                name,

            role:
                role,

            initials:
                generateInitials(name),

            status:
                status,

            currentTask:
                currentTask,

            currentHours:
                currentHours,

            maxHours:
                maxHours,

            performance:
                performance,

            skills:
                skills,

            completedTasks:
                completedTasks,

            primarySkill:
                primarySkill

        };


        /* -----------------------------------------------------
           ADD TO MAIN EMPLOYEE ARRAY
           ----------------------------------------------------- */

        employees.push(
            newEmployee
        );


        /* -----------------------------------------------------
           CREATE ABSENCE TASK
           -----------------------------------------------------

           This allows the new employee to be selected in
           the reassignment page later.
           */

        absentTasks[newEmployee.id] = {

            task:
                currentTask,

            skill:
                primarySkill,

            priority:
                "MEDIUM",

            hours:
                2

        };


        /* -----------------------------------------------------
           SAVE TO BROWSER
           ----------------------------------------------------- */

        try {

            const savedEmployees =
                JSON.parse(
                    localStorage.getItem(
                        "skillshift_custom_employees"
                    ) || "[]"
                );


            savedEmployees.push(
                newEmployee
            );


            localStorage.setItem(
                "skillshift_custom_employees",
                JSON.stringify(
                    savedEmployees
                )
            );

        } catch (error) {

            console.warn(
                "Could not save employee to localStorage:",
                error
            );

        }


        /* -----------------------------------------------------
           REFRESH EVERYTHING
           ----------------------------------------------------- */

        populateEmployeeSelect();

        renderWorkforce();

        renderRecentHistory();

        renderEmployeeCards();

        renderHistory();


        /* -----------------------------------------------------
           CLOSE MODAL
           ----------------------------------------------------- */

        closeAddEmployeeModal();


        /* -----------------------------------------------------
           SUCCESS MESSAGE
           ----------------------------------------------------- */

        showToast(
            "Employee added successfully",
            `${name} has been added to the workforce.`
        );


        /* -----------------------------------------------------
           RESET FORM
           ----------------------------------------------------- */

        const form =
            document.getElementById(
                "addEmployeeForm"
            );

        if (form) {
            form.reset();
        }

    }


    /* ---------------------------------------------------------
       LOAD SAVED CUSTOM EMPLOYEES
       --------------------------------------------------------- */

    function loadSavedCustomEmployees() {

        try {

            const saved =
                JSON.parse(
                    localStorage.getItem(
                        "skillshift_custom_employees"
                    ) || "[]"
                );


            if (!Array.isArray(saved)) {
                return;
            }


            saved.forEach(savedEmployee => {

                /*
                 * Prevent duplicates.
                 */

                const exists =
                    employees.some(
                        employee =>
                            employee.id ==
                            savedEmployee.id
                    );


                if (exists) {
                    return;
                }


                employees.push(
                    savedEmployee
                );


                /*
                 * Recreate absence task.
                 */

                if (
                    !absentTasks[
                    savedEmployee.id
                    ]
                ) {

                    absentTasks[
                        savedEmployee.id
                    ] = {

                        task:
                            savedEmployee.currentTask,

                        skill:
                            savedEmployee.primarySkill ||
                            "Data Entry",

                        priority:
                            "MEDIUM",

                        hours:
                            2

                    };

                }

            });


        } catch (error) {

            console.warn(
                "Could not load saved employees:",
                error
            );

        }

    }


    /* ---------------------------------------------------------
       ESCAPE KEY
       --------------------------------------------------------- */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                document.getElementById(
                    "addEmployeeModal"
                ) &&
                document.getElementById(
                    "addEmployeeModal"
                ).style.display !== "none"
            ) {

                closeAddEmployeeModal();

            }

        }
    );


    /* ---------------------------------------------------------
       INITIALIZE ADD EMPLOYEE FEATURE
       --------------------------------------------------------- */

    function initializeAddEmployeeFeature() {

        /*
         * Load employees saved from previous sessions
         * before rendering the cards.
         */

        loadSavedCustomEmployees();


        /*
         * Refresh existing UI with saved employees.
         */

        if (
            typeof populateEmployeeSelect ===
            "function"
        ) {
            populateEmployeeSelect();
        }


        if (
            typeof renderWorkforce ===
            "function"
        ) {
            renderWorkforce();
        }


        if (
            typeof renderEmployeeCards ===
            "function"
        ) {
            renderEmployeeCards();
        }


        /*
         * Create button and modal.
         */

        createAddEmployeeButton();

        createAddEmployeeModal();

    }


    /*
     * If DOM is still loading, wait.
     */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeAddEmployeeFeature
        );

    } else {

        initializeAddEmployeeFeature();

    }


})();
/* =========================================================
   ADD EMPLOYEE FEATURE
   Adds new employee + shows them on Employees page
   ========================================================= */

(function () {

    let addEmployeeModal = null;


    /* ---------------------------------------------------------
       CREATE MODAL
    --------------------------------------------------------- */

    function createAddEmployeeModal() {

        if (document.getElementById("addEmployeeModal")) {
            addEmployeeModal =
                document.getElementById("addEmployeeModal");
            return;
        }

        addEmployeeModal =
            document.createElement("div");

        addEmployeeModal.id =
            "addEmployeeModal";

        addEmployeeModal.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(17,22,42,.55);
            backdrop-filter: blur(5px);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 20px;
        `;

        addEmployeeModal.innerHTML = `

            <div style="
                width: min(650px, 100%);
                max-height: 90vh;
                overflow-y: auto;
                background: white;
                border-radius: 18px;
                padding: 28px;
                box-shadow: 0 25px 70px rgba(0,0,0,.20);
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:22px;
                ">

                    <div>
                        <h2 style="
                            margin:0;
                            font-size:20px;
                            color:#172033;
                        ">
                            Add Employee
                        </h2>

                        <p style="
                            margin:5px 0 0;
                            color:#7c8498;
                            font-size:11px;
                        ">
                            Add a new employee to your workforce.
                        </p>
                    </div>

                    <button
                        type="button"
                        id="closeAddEmployee"
                        style="
                            width:32px;
                            height:32px;
                            border:none;
                            border-radius:8px;
                            background:#f3f4f8;
                            color:#687086;
                            font-size:18px;
                            cursor:pointer;
                        "
                    >
                        ×
                    </button>

                </div>


                <form id="addEmployeeForm">

                    <div style="
                        display:grid;
                        grid-template-columns:1fr 1fr;
                        gap:16px;
                    ">

                        <!-- NAME -->
                        <div style="grid-column:1/-1;">
                            <label>Employee Name *</label>

                            <input
                                id="newEmployeeName"
                                type="text"
                                placeholder="e.g. John Mathew"
                                required
                                style="
                                    width:100%;
                                    padding:12px;
                                    border:1px solid #e8ebf2;
                                    border-radius:9px;
                                    outline:none;
                                    font-size:12px;
                                "
                            >
                        </div>


                        <!-- ROLE -->
                        <div>
                            <label>Role *</label>

                            <input
                                id="newEmployeeRole"
                                type="text"
                                placeholder="e.g. Operations Associate"
                                required
                                style="
                                    width:100%;
                                    padding:12px;
                                    border:1px solid #e8ebf2;
                                    border-radius:9px;
                                    outline:none;
                                    font-size:12px;
                                "
                            >
                        </div>


                        <!-- SKILL -->
                        <div>
                            <label>Primary Skill *</label>

                            <select
                                id="newEmployeeSkill"
                                required
                                style="
                                    width:100%;
                                    padding:12px;
                                    border:1px solid #e8ebf2;
                                    border-radius:9px;
                                    background:white;
                                    font-size:12px;
                                "
                            >
                                <option value="">Select skill</option>
                                <option>Inventory Audit</option>
                                <option>Quality Inspection</option>
                                <option>Warehouse</option>
                                <option>Order Processing</option>
                                <option>Customer Support</option>
                                <option>Data Entry</option>
                                <option>Equipment Maintenance</option>
                            </select>
                        </div>


                        <!-- SKILL LEVEL -->
                        <div>
                            <label>Skill Level *</label>

                            <input
                                id="newEmployeeSkillLevel"
                                type="number"
                                min="1"
                                max="100"
                                value="80"
                                required
                                style="
                                    width:100%;
                                    padding:12px;
                                    border:1px solid #e8ebf2;
                                    border-radius:9px;
                                    outline:none;
                                    font-size:12px;
                                "
                            >
                        </div>


                        <!-- CURRENT TASK -->
                        <div>
                            <label>Current Task</label>

                            <input
                                id="newEmployeeTask"
                                type="text"
                                placeholder="e.g. Inventory Check"
                                style="
                                    width:100%;
                                    padding:12px;
                                    border:1px solid #e8ebf2;
                                    border-radius:9px;
                                    outline:none;
                                    font-size:12px;
                                "
                            >
                        </div>


                        <!-- CURRENT HOURS -->
                        <div>
                            <label>Current Hours</label>

                            <input
                                id="newEmployeeCurrentHours"
                                type="number"
                                min="0"
                                max="24"
                                value="2"
                                style="
                                    width:100%;
                                    padding:12px;
                                    border:1px solid #e8ebf2;
                                    border-radius:9px;
                                    outline:none;
                                    font-size:12px;
                                "
                            >
                        </div>


                        <!-- MAX HOURS -->
                        <div>
                            <label>Max Hours</label>

                            <input
                                id="newEmployeeMaxHours"
                                type="number"
                                min="1"
                                max="24"
                                value="8"
                                style="
                                    width:100%;
                                    padding:12px;
                                    border:1px solid #e8ebf2;
                                    border-radius:9px;
                                    outline:none;
                                    font-size:12px;
                                "
                            >
                        </div>


                        <!-- PERFORMANCE -->
                        <div>
                            <label>Performance Score</label>

                            <input
                                id="newEmployeePerformance"
                                type="number"
                                min="1"
                                max="100"
                                value="90"
                                style="
                                    width:100%;
                                    padding:12px;
                                    border:1px solid #e8ebf2;
                                    border-radius:9px;
                                    outline:none;
                                    font-size:12px;
                                "
                            >
                        </div>


                        <!-- COMPLETED TASKS -->
                        <div>
                            <label>Completed Tasks</label>

                            <input
                                id="newEmployeeCompletedTasks"
                                type="number"
                                min="0"
                                value="50"
                                style="
                                    width:100%;
                                    padding:12px;
                                    border:1px solid #e8ebf2;
                                    border-radius:9px;
                                    outline:none;
                                    font-size:12px;
                                "
                            >
                        </div>


                        <!-- STATUS -->
                        <div>
                            <label>Status</label>

                            <select
                                id="newEmployeeStatus"
                                style="
                                    width:100%;
                                    padding:12px;
                                    border:1px solid #e8ebf2;
                                    border-radius:9px;
                                    background:white;
                                    font-size:12px;
                                "
                            >
                                <option value="available">
                                    Available
                                </option>

                                <option value="busy">
                                    Busy
                                </option>
                            </select>
                        </div>

                    </div>


                    <div style="
                        display:flex;
                        justify-content:flex-end;
                        gap:10px;
                        margin-top:25px;
                    ">

                        <button
                            type="button"
                            id="cancelAddEmployee"
                            style="
                                padding:12px 18px;
                                border:1px solid #e8ebf2;
                                background:white;
                                color:#626a7f;
                                border-radius:9px;
                                font-size:12px;
                                font-weight:700;
                                cursor:pointer;
                            "
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            style="
                                padding:12px 20px;
                                border:none;
                                background:#635bff;
                                color:white;
                                border-radius:9px;
                                font-size:12px;
                                font-weight:700;
                                cursor:pointer;
                            "
                        >
                            Add Employee
                        </button>

                    </div>

                </form>

            </div>
        `;

        document.body.appendChild(addEmployeeModal);

        document
            .getElementById("closeAddEmployee")
            .addEventListener("click", closeAddEmployeeModal);

        document
            .getElementById("cancelAddEmployee")
            .addEventListener("click", closeAddEmployeeModal);

        document
            .getElementById("addEmployeeForm")
            .addEventListener("submit", addNewEmployee);

        // Close when clicking outside
        addEmployeeModal.addEventListener("click", function (event) {

            if (event.target === addEmployeeModal) {
                closeAddEmployeeModal();
            }

        });

    }


    /* ---------------------------------------------------------
       OPEN MODAL
    --------------------------------------------------------- */

    function openAddEmployeeModal() {

        if (!addEmployeeModal) {
            createAddEmployeeModal();
        }

        addEmployeeModal.style.display = "flex";

        setTimeout(function () {

            const nameInput =
                document.getElementById("newEmployeeName");

            if (nameInput) {
                nameInput.focus();
            }

        }, 100);

    }


    /* ---------------------------------------------------------
       CLOSE MODAL
    --------------------------------------------------------- */

    function closeAddEmployeeModal() {

        if (!addEmployeeModal) return;

        addEmployeeModal.style.display = "none";

        const form =
            document.getElementById("addEmployeeForm");

        if (form) {
            form.reset();

            document.getElementById(
                "newEmployeeSkillLevel"
            ).value = 80;

            document.getElementById(
                "newEmployeeCurrentHours"
            ).value = 2;

            document.getElementById(
                "newEmployeeMaxHours"
            ).value = 8;

            document.getElementById(
                "newEmployeePerformance"
            ).value = 90;

            document.getElementById(
                "newEmployeeCompletedTasks"
            ).value = 50;
        }

    }


    /* ---------------------------------------------------------
       GENERATE INITIALS
    --------------------------------------------------------- */

    function getInitials(name) {

        return name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map(word => word.charAt(0).toUpperCase())
            .join("");

    }


    /* ---------------------------------------------------------
       ADD NEW EMPLOYEE
    --------------------------------------------------------- */

    function addNewEmployee(event) {

        event.preventDefault();

        const name =
            document.getElementById("newEmployeeName")
                .value.trim();

        const role =
            document.getElementById("newEmployeeRole")
                .value.trim();

        const skill =
            document.getElementById("newEmployeeSkill")
                .value;

        const skillLevel =
            Number(
                document.getElementById(
                    "newEmployeeSkillLevel"
                ).value
            );

        const currentTask =
            document.getElementById("newEmployeeTask")
                .value.trim() ||
            "No Current Task";

        const currentHours =
            Number(
                document.getElementById(
                    "newEmployeeCurrentHours"
                ).value
            ) || 0;

        const maxHours =
            Number(
                document.getElementById(
                    "newEmployeeMaxHours"
                ).value
            ) || 8;

        const performance =
            Number(
                document.getElementById(
                    "newEmployeePerformance"
                ).value
            ) || 90;

        const completedTasks =
            Number(
                document.getElementById(
                    "newEmployeeCompletedTasks"
                ).value
            ) || 0;

        const status =
            document.getElementById(
                "newEmployeeStatus"
            ).value;


        /* VALIDATION */

        if (!name || !role || !skill) {

            alert(
                "Please fill in the employee name, role and primary skill."
            );

            return;
        }


        if (skillLevel < 1 || skillLevel > 100) {

            alert(
                "Skill level must be between 1 and 100."
            );

            return;
        }


        if (currentHours > maxHours) {

            alert(
                "Current hours cannot be greater than maximum hours."
            );

            return;
        }


        /* CHECK DUPLICATE NAME */

        const duplicate =
            employees.some(
                employee =>
                    employee.name.toLowerCase() ===
                    name.toLowerCase()
            );

        if (duplicate) {

            alert(
                "An employee with this name already exists."
            );

            return;
        }


        /* GENERATE UNIQUE ID */

        const newId =
            Math.max(
                ...employees.map(employee =>
                    Number(employee.id) || 0
                ),
                0
            ) + 1;


        /* BUILD SKILLS */

        const skills = {

            "Inventory Audit": 50,

            "Quality Inspection": 50,

            "Warehouse": 50,

            "Order Processing": 50,

            "Customer Support": 50,

            "Data Entry": 50,

            "Equipment Maintenance": 50

        };

        skills[skill] = skillLevel;


        /* CREATE EMPLOYEE */

        const newEmployee = {

            id: newId,

            name: name,

            role: role,

            initials: getInitials(name),

            status: status,

            currentTask: currentTask,

            currentHours: currentHours,

            maxHours: maxHours,

            performance: performance,

            skills: skills,

            completedTasks: completedTasks

        };


        /* ADD TO MAIN EMPLOYEE ARRAY */

        employees.push(newEmployee);


        /* CREATE DEFAULT ABSENT TASK */

        absentTasks[newId] = {

            task: currentTask,

            skill: skill,

            priority: "MEDIUM",

            hours: 2

        };


        /* SAVE TO LOCAL STORAGE */

        let customEmployees = [];

        try {

            customEmployees =
                JSON.parse(
                    localStorage.getItem(
                        "skillshift_custom_employees"
                    )
                ) || [];

        } catch (error) {

            customEmployees = [];

        }


        customEmployees.push(newEmployee);

        localStorage.setItem(
            "skillshift_custom_employees",
            JSON.stringify(customEmployees)
        );


        /* -----------------------------------------------------
           IMPORTANT:
           REFRESH EVERYTHING
        ----------------------------------------------------- */

        populateEmployeeSelect();

        renderWorkforce();

        renderRecentHistory();

        renderEmployeeCards();

        renderHistory();


        /* CLOSE MODAL */

        closeAddEmployeeModal();


        /* SUCCESS MESSAGE */

        if (typeof showToast === "function") {

            showToast(
                "Employee Added",
                `${name} has been added to your workforce.`
            );

        } else {

            alert(
                `${name} has been successfully added!`
            );

        }


        /* OPEN EMPLOYEE PAGE */

        const employeesButton =
            document.querySelectorAll(".nav-item")[2];

        showSection(
            "employees",
            employeesButton
        );

    }


    /* ---------------------------------------------------------
       LOAD SAVED CUSTOM EMPLOYEES
    --------------------------------------------------------- */

    function loadSavedEmployees() {

        let savedEmployees = [];

        try {

            savedEmployees =
                JSON.parse(
                    localStorage.getItem(
                        "skillshift_custom_employees"
                    )
                ) || [];

        } catch (error) {

            savedEmployees = [];

        }


        if (!Array.isArray(savedEmployees)) return;


        savedEmployees.forEach(savedEmployee => {

            // Don't add duplicates
            const exists =
                employees.some(
                    employee =>
                        Number(employee.id) ===
                        Number(savedEmployee.id)
                );

            if (exists) return;


            employees.push(savedEmployee);


            if (!absentTasks[savedEmployee.id]) {

                const skill =
                    Object.keys(savedEmployee.skills || {})
                        .sort(
                            (a, b) =>
                                savedEmployee.skills[b] -
                                savedEmployee.skills[a]
                        )[0] || "Data Entry";


                absentTasks[savedEmployee.id] = {

                    task:
                        savedEmployee.currentTask ||
                        "No Current Task",

                    skill: skill,

                    priority: "MEDIUM",

                    hours: 2

                };

            }

        });

    }


    /* ---------------------------------------------------------
       INITIALIZE
    --------------------------------------------------------- */

    function initializeAddEmployeeFeature() {

        loadSavedEmployees();

        createAddEmployeeButton();

        createAddEmployeeModal();

        // Refresh employee page with saved employees
        if (typeof renderEmployeeCards === "function") {
            renderEmployeeCards();
        }

        if (typeof populateEmployeeSelect === "function") {
            populateEmployeeSelect();
        }

    }


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initializeAddEmployeeFeature
        );

    } else {

        initializeAddEmployeeFeature();

    }


})();
/* =========================================================
   SKILLSHIFT - ADMIN PROFILE
   FINAL VERSION
   ========================================================= */

(function () {

    const STORAGE_KEY = "skillshift_admin_profile_final";

    let admin = {
        name: "Admin",
        position: "Workforce Manager",
        email: "admin@skillshift.com",
        status: "Online",
        notifications: true
    };


    /* =====================================================
       LOAD SAVED ADMIN
       ===================================================== */

    function loadAdmin() {

        try {

            const saved =
                localStorage.getItem(STORAGE_KEY);

            if (saved) {

                admin = {
                    ...admin,
                    ...JSON.parse(saved)
                };

            }

        } catch (error) {

            console.log("Using default admin profile.");

        }

    }


    /* =====================================================
       INITIALS
       ===================================================== */

    function initials(name) {

        const parts =
            name.trim().split(/\s+/);

        if (parts.length === 1) {

            return parts[0]
                .substring(0, 2)
                .toUpperCase();

        }

        return (
            parts[0][0] +
            parts[parts.length - 1][0]
        ).toUpperCase();

    }


    /* =====================================================
       UPDATE TOP RIGHT ADMIN
       ===================================================== */

    function updateTopAdmin() {

        const profile =
            document.querySelector(".profile");

        if (!profile) return;


        const avatar =
            profile.querySelector(".avatar");

        const name =
            profile.querySelector("strong");

        const spans =
            profile.querySelectorAll("span");


        if (avatar) {

            avatar.textContent =
                initials(admin.name);

        }


        if (name) {

            name.textContent =
                admin.name;

        }


        /*
         * First span after the name container
         * is the position.
         */

        if (spans.length >= 1) {

            spans[0].textContent =
                admin.position;

        }

    }


    /* =====================================================
       CREATE PANEL
       ===================================================== */

    function createAdminPanel() {

        /*
         * Remove any old version if it exists.
         * This prevents conflicts.
         */

        const oldPanel =
            document.getElementById(
                "skillshiftAdminSettings"
            );

        if (oldPanel) {

            oldPanel.remove();

        }


        const panel =
            document.createElement("div");

        panel.id =
            "skillshiftAdminSettings";


        panel.innerHTML = `

            <div class="skillshift-admin-card">

                <!-- HEADER -->

                <div class="skillshift-admin-header">

                    <div>

                        <div class="skillshift-admin-eyebrow">
                            ACCOUNT SETTINGS
                        </div>

                        <h2>
                            Admin Profile
                        </h2>

                        <p>
                            Manage your workforce manager profile.
                        </p>

                    </div>


                    <button
                        type="button"
                        class="skillshift-admin-x"
                        id="skillshiftAdminX"
                    >
                        ×
                    </button>

                </div>


                <!-- PREVIEW -->

                <div class="skillshift-admin-preview">

                    <div
                        class="skillshift-admin-big-avatar"
                        id="skillshiftAdminPreviewAvatar"
                    >
                        AD
                    </div>

                    <div>

                        <strong
                            id="skillshiftAdminPreviewName"
                        >
                            Admin
                        </strong>

                        <span
                            id="skillshiftAdminPreviewPosition"
                        >
                            Workforce Manager
                        </span>

                    </div>

                </div>


                <!-- FORM -->

                <form id="skillshiftAdminForm">


                    <!-- NAME -->

                    <div class="skillshift-admin-field">

                        <label>
                            Admin Name
                        </label>

                        <input
                            id="skillshiftAdminName"
                            type="text"
                            required
                            placeholder="Enter your name"
                        >

                    </div>


                    <!-- POSITION -->

                    <div class="skillshift-admin-field">

                        <label>
                            Position
                        </label>

                        <select
                            id="skillshiftAdminPosition"
                        >

                            <option value="Workforce Manager">
                                Workforce Manager
                            </option>

                            <option value="Operations Manager">
                                Operations Manager
                            </option>

                            <option value="HR Manager">
                                HR Manager
                            </option>

                            <option value="Team Lead">
                                Team Lead
                            </option>

                            <option value="Administrator">
                                Administrator
                            </option>

                            <option value="Workforce Director">
                                Workforce Director
                            </option>

                        </select>

                    </div>


                    <!-- EMAIL -->

                    <div class="skillshift-admin-field">

                        <label>
                            Email Address
                        </label>

                        <input
                            id="skillshiftAdminEmail"
                            type="email"
                            required
                            placeholder="admin@skillshift.com"
                        >

                    </div>


                    <!-- STATUS -->

                    <div class="skillshift-admin-field">

                        <label>
                            Status
                        </label>

                        <select
                            id="skillshiftAdminStatus"
                        >

                            <option value="Online">
                                🟢 Online
                            </option>

                            <option value="Away">
                                🟡 Away
                            </option>

                            <option value="Busy">
                                🔴 Busy
                            </option>

                        </select>

                    </div>


                    <!-- NOTIFICATIONS -->

                    <div class="skillshift-admin-notifications">

                        <div>

                            <strong>
                                Notifications
                            </strong>

                            <small>
                                Receive workforce alerts
                            </small>

                        </div>


                        <label
                            class="skillshift-admin-switch"
                        >

                            <input
                                id="skillshiftAdminNotifications"
                                type="checkbox"
                            >

                            <span></span>

                        </label>

                    </div>


                    <!-- BUTTONS -->

                    <div class="skillshift-admin-actions">

                        <button
                            type="button"
                            id="skillshiftAdminCancel"
                            class="skillshift-admin-cancel"
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            id="skillshiftAdminSave"
                            class="skillshift-admin-save"
                        >
                            Save Changes
                        </button>

                    </div>


                </form>

            </div>

        `;


        document.body.appendChild(panel);


        /* =================================================
           FILL CURRENT VALUES
           ================================================= */

        document.getElementById(
            "skillshiftAdminName"
        ).value = admin.name;


        document.getElementById(
            "skillshiftAdminPosition"
        ).value = admin.position;


        document.getElementById(
            "skillshiftAdminEmail"
        ).value = admin.email;


        document.getElementById(
            "skillshiftAdminStatus"
        ).value = admin.status;


        document.getElementById(
            "skillshiftAdminNotifications"
        ).checked = admin.notifications;


        updatePreview();


        /* =================================================
           CLOSE
           ================================================= */

        document.getElementById(
            "skillshiftAdminX"
        ).onclick = closeAdmin;


        document.getElementById(
            "skillshiftAdminCancel"
        ).onclick = closeAdmin;


        /* =================================================
           SAVE
           ================================================= */

        document.getElementById(
            "skillshiftAdminForm"
        ).onsubmit = function (event) {

            event.preventDefault();

            saveAdmin();

        };


        /* =================================================
           CLICK OUTSIDE
           ================================================= */

        panel.onclick = function (event) {

            if (event.target === panel) {

                closeAdmin();

            }

        };


        /* =================================================
           ESC KEY
           ================================================= */

        document.onkeydown = function (event) {

            if (
                event.key === "Escape"
            ) {

                closeAdmin();

            }

        };

    }


    /* =====================================================
       OPEN
       ===================================================== */

    function openAdmin() {

        loadAdmin();

        createAdminPanel();

        const panel =
            document.getElementById(
                "skillshiftAdminSettings"
            );

        panel.style.display = "flex";

    }


    /* =====================================================
       CLOSE
       ===================================================== */

    function closeAdmin() {

        const panel =
            document.getElementById(
                "skillshiftAdminSettings"
            );

        if (panel) {

            panel.style.display = "none";

        }

    }


    /* =====================================================
       UPDATE PREVIEW
       ===================================================== */

    function updatePreview() {

        const name =
            document.getElementById(
                "skillshiftAdminPreviewName"
            );

        const position =
            document.getElementById(
                "skillshiftAdminPreviewPosition"
            );

        const avatar =
            document.getElementById(
                "skillshiftAdminPreviewAvatar"
            );


        if (name) {

            name.textContent =
                admin.name;

        }


        if (position) {

            position.textContent =
                admin.position;

        }


        if (avatar) {

            avatar.textContent =
                initials(admin.name);

        }

    }


    /* =====================================================
       SAVE
       ===================================================== */

    function saveAdmin() {

        const name =
            document.getElementById(
                "skillshiftAdminName"
            ).value.trim();


        const position =
            document.getElementById(
                "skillshiftAdminPosition"
            ).value;


        const email =
            document.getElementById(
                "skillshiftAdminEmail"
            ).value.trim();


        const status =
            document.getElementById(
                "skillshiftAdminStatus"
            ).value;


        const notifications =
            document.getElementById(
                "skillshiftAdminNotifications"
            ).checked;


        if (!name || !email) {

            alert(
                "Please enter the admin name and email."
            );

            return;

        }


        admin = {

            name: name,

            position: position,

            email: email,

            status: status,

            notifications: notifications

        };


        /* SAVE TO BROWSER */

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(admin)
        );


        /* UPDATE TOP RIGHT */

        updateTopAdmin();


        /* CLOSE */

        closeAdmin();


        /* SUCCESS */

        if (
            typeof showToast === "function"
        ) {

            showToast(
                "Profile Saved",
                "Your admin details have been saved successfully."
            );

        } else {

            alert(
                "Your admin details have been saved successfully!"
            );

        }

    }


    /* =====================================================
       CSS
       ===================================================== */

    function addAdminCSS() {

        if (
            document.getElementById(
                "skillshiftAdminCSS"
            )
        ) return;


        const style =
            document.createElement("style");

        style.id =
            "skillshiftAdminCSS";


        style.textContent = `

            #skillshiftAdminSettings {

                position: fixed !important;

                inset: 0 !important;

                width: 100vw !important;

                height: 100vh !important;

                background:
                    rgba(14, 18, 35, .48) !important;

                backdrop-filter:
                    blur(4px);

                display: none;

                align-items: flex-start;

                justify-content: flex-end;

                padding:
                    85px 28px 28px;

                box-sizing: border-box;

                z-index: 999999 !important;

                overflow-y: auto;

            }


            .skillshift-admin-card {

                width: 390px !important;

                max-width: calc(100vw - 40px);

                background: #ffffff !important;

                border-radius: 18px;

                padding: 24px;

                box-sizing: border-box;

                box-shadow:
                    0 30px 80px
                    rgba(0,0,0,.25);

                color: #172033;

                position: relative;

            }


            .skillshift-admin-header {

                display: flex;

                justify-content: space-between;

                align-items: flex-start;

                margin-bottom: 18px;

            }


            .skillshift-admin-eyebrow {

                color: #635bff;

                font-size: 9px;

                font-weight: 800;

                letter-spacing: 1.5px;

                margin-bottom: 5px;

            }


            .skillshift-admin-header h2 {

                margin: 0;

                font-size: 20px;

                color: #172033;

            }


            .skillshift-admin-header p {

                margin: 5px 0 0;

                color: #7c8498;

                font-size: 11px;

            }


            .skillshift-admin-x {

                width: 32px !important;

                height: 32px !important;

                min-width: 32px !important;

                padding: 0 !important;

                border: none !important;

                border-radius: 8px !important;

                background: #f1f2f6 !important;

                color: #626a7f !important;

                font-size: 20px !important;

                line-height: 32px !important;

                cursor: pointer !important;

            }


            .skillshift-admin-preview {

                display: flex;

                align-items: center;

                gap: 12px;

                padding: 13px;

                margin-bottom: 20px;

                background: #f8f8ff;

                border: 1px solid #e8e6ff;

                border-radius: 12px;

            }


            .skillshift-admin-big-avatar {

                width: 46px;

                height: 46px;

                min-width: 46px;

                border-radius: 13px;

                display: flex;

                align-items: center;

                justify-content: center;

                background:
                    linear-gradient(
                        135deg,
                        #716aff,
                        #5148e8
                    );

                color: white;

                font-size: 14px;

                font-weight: 800;

            }


            .skillshift-admin-preview strong {

                display: block;

                font-size: 13px;

                color: #172033;

            }


            .skillshift-admin-preview span {

                display: block;

                margin-top: 3px;

                font-size: 10px;

                color: #7c8498;

            }


            .skillshift-admin-field {

                margin-bottom: 14px;

            }


            .skillshift-admin-field label {

                display: block;

                margin-bottom: 6px;

                color: #626a7f;

                font-size: 10px;

                font-weight: 700;

            }


            .skillshift-admin-field input,

            .skillshift-admin-field select {

                width: 100% !important;

                height: 40px !important;

                box-sizing: border-box !important;

                padding: 0 11px !important;

                border: 1px solid #e4e7ee !important;

                border-radius: 9px !important;

                background: #ffffff !important;

                color: #172033 !important;

                font-size: 11px !important;

                outline: none !important;

            }


            .skillshift-admin-field input:focus,

            .skillshift-admin-field select:focus {

                border-color: #635bff !important;

                box-shadow:
                    0 0 0 3px
                    rgba(99,91,255,.08) !important;

            }


            .skillshift-admin-notifications {

                display: flex;

                justify-content: space-between;

                align-items: center;

                padding: 14px 0;

                margin-top: 3px;

                border-top: 1px solid #edf0f4;

                border-bottom: 1px solid #edf0f4;

            }


            .skillshift-admin-notifications strong {

                display: block;

                color: #172033;

                font-size: 11px;

            }


            .skillshift-admin-notifications small {

                display: block;

                margin-top: 3px;

                color: #7c8498;

                font-size: 9px;

            }


            .skillshift-admin-switch {

                width: 40px;

                height: 22px;

                position: relative;

                display: block;

            }


            .skillshift-admin-switch input {

                opacity: 0 !important;

                width: 0 !important;

                height: 0 !important;

            }


            .skillshift-admin-switch span {

                position: absolute;

                inset: 0;

                border-radius: 20px;

                background: #dfe2e9;

                cursor: pointer;

            }


            .skillshift-admin-switch span::before {

                content: "";

                position: absolute;

                width: 16px;

                height: 16px;

                left: 3px;

                top: 3px;

                border-radius: 50%;

                background: white;

                transition: .2s;

                box-shadow:
                    0 2px 5px
                    rgba(0,0,0,.15);

            }


            .skillshift-admin-switch
            input:checked + span {

                background: #635bff;

            }


            .skillshift-admin-switch
            input:checked + span::before {

                transform: translateX(18px);

            }


            /* IMPORTANT:
               BUTTONS ARE FORCED VISIBLE */

            .skillshift-admin-actions {

                display: flex !important;

                visibility: visible !important;

                opacity: 1 !important;

                width: 100% !important;

                justify-content: flex-end !important;

                align-items: center !important;

                gap: 10px !important;

                margin-top: 20px !important;

                padding-top: 2px !important;

            }


            .skillshift-admin-actions button {

                display: inline-flex !important;

                visibility: visible !important;

                opacity: 1 !important;

                align-items: center !important;

                justify-content: center !important;

                height: 40px !important;

                min-height: 40px !important;

                padding: 0 17px !important;

                border-radius: 9px !important;

                font-size: 11px !important;

                font-weight: 700 !important;

                cursor: pointer !important;

                box-sizing: border-box !important;

            }


            .skillshift-admin-cancel {

                border: 1px solid #e3e6ed !important;

                background: #ffffff !important;

                color: #626a7f !important;

            }


            .skillshift-admin-save {

                border: none !important;

                background: #635bff !important;

                color: #ffffff !important;

                box-shadow:
                    0 6px 15px
                    rgba(99,91,255,.20);

            }


            .skillshift-admin-save:hover {

                background: #5148e8 !important;

            }


            @media (max-width: 600px) {

                #skillshiftAdminSettings {

                    padding:
                        70px 12px 12px;

                }

                .skillshift-admin-card {

                    width: 100% !important;

                }

            }

        `;


        document.head.appendChild(style);

    }


    /* =====================================================
       CONNECT TO TOP-RIGHT ADMIN
       ===================================================== */

    function connectAdminProfile() {

        const profile =
            document.querySelector(".profile");

        if (!profile) {

            console.log(
                "SkillShift: Admin profile not found."
            );

            return;

        }


        profile.style.cursor = "pointer";

        profile.title =
            "Open Admin Settings";


        profile.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                openAdmin();

            }
        );

    }


    /* =====================================================
       START
       ===================================================== */

    function startAdminSystem() {

        loadAdmin();

        addAdminCSS();

        updateTopAdmin();

        connectAdminProfile();

    }


    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            startAdminSystem
        );

    } else {

        startAdminSystem();

    }

})();
/* =========================================================
   SKILLSHIFT - ADD EMPLOYEE
   New employees appear automatically on Employee page
   ========================================================= */

(function () {

    const STORAGE_KEY = "skillshift_custom_employees";

    /* =====================================================
       LOAD SAVED CUSTOM EMPLOYEES
       ===================================================== */

    function loadCustomEmployees() {

        try {

            const saved =
                localStorage.getItem(STORAGE_KEY);

            if (!saved) return;

            const customEmployees =
                JSON.parse(saved);

            if (!Array.isArray(customEmployees)) return;

            customEmployees.forEach(savedEmployee => {

                /*
                 * Prevent duplicates
                 */
                const exists =
                    employees.some(
                        employee =>
                            employee.id === savedEmployee.id
                    );

                if (!exists) {

                    employees.push(savedEmployee);

                }

            });

        } catch (error) {

            console.log(
                "Could not load saved employees."
            );

        }

    }


    /* =====================================================
       SAVE CUSTOM EMPLOYEES
       ===================================================== */

    function saveCustomEmployees() {

        /*
         * Only save employees added through this feature.
         * Original demo employees remain untouched.
         */

        const customEmployees =
            employees.filter(
                employee =>
                    employee.customEmployee === true
            );


        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(customEmployees)
        );

    }


    /* =====================================================
       CREATE MODAL
       ===================================================== */

    function createAddEmployeeModal() {

        if (
            document.getElementById(
                "skillshiftEmployeeModal"
            )
        ) return;


        const modal =
            document.createElement("div");

        modal.id =
            "skillshiftEmployeeModal";


        modal.innerHTML = `

            <div class="skillshift-employee-modal">

                <div class="skillshift-modal-header">

                    <div>

                        <span class="skillshift-modal-label">
                            WORKFORCE MANAGEMENT
                        </span>

                        <h2>
                            Add New Employee
                        </h2>

                        <p>
                            Add employee details to your workforce.
                        </p>

                    </div>


                    <button
                        type="button"
                        id="skillshiftEmployeeClose"
                        class="skillshift-modal-close"
                    >
                        ×
                    </button>

                </div>


                <form id="skillshiftEmployeeForm">


                    <div class="skillshift-form-grid">


                        <!-- NAME -->

                        <div class="skillshift-field">

                            <label>
                                Employee Name *
                            </label>

                            <input
                                id="newEmployeeName"
                                type="text"
                                placeholder="e.g. Rahul Kumar"
                                required
                            >

                        </div>


                        <!-- ROLE -->

                        <div class="skillshift-field">

                            <label>
                                Job Position *
                            </label>

                            <input
                                id="newEmployeeRole"
                                type="text"
                                placeholder="e.g. Operations Associate"
                                required
                            >

                        </div>


                        <!-- PRIMARY SKILL -->

                        <div class="skillshift-field">

                            <label>
                                Primary Skill *
                            </label>

                            <select
                                id="newEmployeeSkill"
                                required
                            >

                                <option value="">
                                    Select skill
                                </option>

                                <option value="Inventory Audit">
                                    Inventory Audit
                                </option>

                                <option value="Quality Inspection">
                                    Quality Inspection
                                </option>

                                <option value="Warehouse">
                                    Warehouse
                                </option>

                                <option value="Order Processing">
                                    Order Processing
                                </option>

                                <option value="Customer Support">
                                    Customer Support
                                </option>

                                <option value="Data Entry">
                                    Data Entry
                                </option>

                                <option value="Equipment Maintenance">
                                    Equipment Maintenance
                                </option>

                            </select>

                        </div>


                        <!-- SKILL LEVEL -->

                        <div class="skillshift-field">

                            <label>
                                Skill Level *
                            </label>

                            <input
                                id="newEmployeeSkillLevel"
                                type="number"
                                min="0"
                                max="100"
                                value="85"
                                required
                            >

                        </div>


                        <!-- CURRENT TASK -->

                        <div class="skillshift-field">

                            <label>
                                Current Task
                            </label>

                            <input
                                id="newEmployeeTask"
                                type="text"
                                placeholder="e.g. Inventory Check"
                            >

                        </div>


                        <!-- CURRENT HOURS -->

                        <div class="skillshift-field">

                            <label>
                                Current Hours
                            </label>

                            <input
                                id="newEmployeeCurrentHours"
                                type="number"
                                min="0"
                                value="0"
                            >

                        </div>


                        <!-- MAX HOURS -->

                        <div class="skillshift-field">

                            <label>
                                Maximum Hours
                            </label>

                            <input
                                id="newEmployeeMaxHours"
                                type="number"
                                min="1"
                                value="8"
                            >

                        </div>


                        <!-- PERFORMANCE -->

                        <div class="skillshift-field">

                            <label>
                                Historical Performance
                            </label>

                            <input
                                id="newEmployeePerformance"
                                type="number"
                                min="0"
                                max="100"
                                value="85"
                            >

                        </div>


                        <!-- COMPLETED TASKS -->

                        <div class="skillshift-field">

                            <label>
                                Tasks Completed
                            </label>

                            <input
                                id="newEmployeeCompletedTasks"
                                type="number"
                                min="0"
                                value="0"
                            >

                        </div>


                        <!-- STATUS -->

                        <div class="skillshift-field">

                            <label>
                                Status
                            </label>

                            <select
                                id="newEmployeeStatus"
                            >

                                <option value="available">
                                    Available
                                </option>

                                <option value="busy">
                                    Busy
                                </option>

                            </select>

                        </div>


                    </div>


                    <!-- ACTIONS -->

                    <div class="skillshift-modal-actions">

                        <button
                            type="button"
                            id="skillshiftEmployeeCancel"
                            class="skillshift-employee-cancel"
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            class="skillshift-employee-save"
                        >
                            Add Employee
                        </button>

                    </div>


                </form>

            </div>

        `;


        document.body.appendChild(modal);


        /*
         * CLOSE
         */

        document
            .getElementById(
                "skillshiftEmployeeClose"
            )
            .onclick =
            closeAddEmployeeModal;


        /*
         * CANCEL
         */

        document
            .getElementById(
                "skillshiftEmployeeCancel"
            )
            .onclick =
            closeAddEmployeeModal;


        /*
         * FORM SUBMIT
         */

        document
            .getElementById(
                "skillshiftEmployeeForm"
            )
            .onsubmit =
            addNewEmployee;


        /*
         * CLICK OUTSIDE
         */

        modal.onclick =
            function (event) {

                if (
                    event.target === modal
                ) {

                    closeAddEmployeeModal();

                }

            };

    }


    /* =====================================================
       OPEN MODAL
       ===================================================== */

    function openAddEmployeeModal() {

        const modal =
            document.getElementById(
                "skillshiftEmployeeModal"
            );

        if (!modal) return;

        modal.style.display = "flex";

        setTimeout(function () {

            const nameInput =
                document.getElementById(
                    "newEmployeeName"
                );

            if (nameInput) {

                nameInput.focus();

            }

        }, 100);

    }


    /* =====================================================
       CLOSE MODAL
       ===================================================== */

    function closeAddEmployeeModal() {

        const modal =
            document.getElementById(
                "skillshiftEmployeeModal"
            );

        if (!modal) return;

        modal.style.display = "none";

    }


    /* =====================================================
       ADD NEW EMPLOYEE
       ===================================================== */

    function addNewEmployee(event) {

        event.preventDefault();


        /* ---------------------------------------------
           GET VALUES
           --------------------------------------------- */

        const name =
            document
                .getElementById(
                    "newEmployeeName"
                )
                .value
                .trim();


        const role =
            document
                .getElementById(
                    "newEmployeeRole"
                )
                .value
                .trim();


        const primarySkill =
            document
                .getElementById(
                    "newEmployeeSkill"
                )
                .value;


        const skillLevel =
            Number(
                document
                    .getElementById(
                        "newEmployeeSkillLevel"
                    )
                    .value
            );


        const currentTask =
            document
                .getElementById(
                    "newEmployeeTask"
                )
                .value
                .trim() ||
            "No task assigned";


        const currentHours =
            Number(
                document
                    .getElementById(
                        "newEmployeeCurrentHours"
                    )
                    .value
            ) || 0;


        const maxHours =
            Number(
                document
                    .getElementById(
                        "newEmployeeMaxHours"
                    )
                    .value
            ) || 8;


        const performance =
            Number(
                document
                    .getElementById(
                        "newEmployeePerformance"
                    )
                    .value
            ) || 0;


        const completedTasks =
            Number(
                document
                    .getElementById(
                        "newEmployeeCompletedTasks"
                    )
                    .value
            ) || 0;


        const status =
            document
                .getElementById(
                    "newEmployeeStatus"
                )
                .value;


        /* ---------------------------------------------
           VALIDATION
           --------------------------------------------- */

        if (!name || !role || !primarySkill) {

            alert(
                "Please enter the employee name, position and primary skill."
            );

            return;

        }


        if (
            skillLevel < 0 ||
            skillLevel > 100
        ) {

            alert(
                "Skill level must be between 0 and 100."
            );

            return;

        }


        if (
            performance < 0 ||
            performance > 100
        ) {

            alert(
                "Performance must be between 0 and 100."
            );

            return;

        }


        if (currentHours > maxHours) {

            alert(
                "Current hours cannot be greater than maximum hours."
            );

            return;

        }


        /* ---------------------------------------------
           CREATE INITIALS
           --------------------------------------------- */

        const nameParts =
            name.split(/\s+/);

        let initials;


        if (nameParts.length === 1) {

            initials =
                nameParts[0]
                    .substring(0, 2)
                    .toUpperCase();

        } else {

            initials =
                (
                    nameParts[0][0] +
                    nameParts[
                    nameParts.length - 1
                    ][0]
                ).toUpperCase();

        }


        /* ---------------------------------------------
           CREATE UNIQUE ID
           --------------------------------------------- */

        const maxExistingId =
            employees.reduce(
                function (max, employee) {

                    return Math.max(
                        max,
                        Number(employee.id) || 0
                    );

                },
                0
            );


        const newId =
            maxExistingId + 1;


        /* ---------------------------------------------
           SKILL PROFILE
           --------------------------------------------- */

        const skills = {

            "Inventory Audit": 50,

            "Quality Inspection": 50,

            "Warehouse": 50,

            "Order Processing": 50,

            "Customer Support": 50,

            "Data Entry": 50,

            "Equipment Maintenance": 50

        };


        /*
         * Set selected primary skill
         */

        skills[primarySkill] =
            skillLevel;


        /* ---------------------------------------------
           CREATE EMPLOYEE
           --------------------------------------------- */

        const newEmployee = {

            id: newId,

            name: name,

            role: role,

            initials: initials,

            status: status,

            currentTask: currentTask,

            currentHours: currentHours,

            maxHours: maxHours,

            performance: performance,

            skills: skills,

            completedTasks: completedTasks,

            customEmployee: true

        };


        /* ---------------------------------------------
           ADD TO MAIN EMPLOYEE ARRAY
           --------------------------------------------- */

        employees.push(
            newEmployee
        );


        /* ---------------------------------------------
           ADD ABSENCE TASK
           --------------------------------------------- */

        absentTasks[newId] = {

            task: currentTask,

            skill: primarySkill,

            priority: "MEDIUM",

            hours: 2

        };


        /* ---------------------------------------------
           SAVE
           --------------------------------------------- */

        saveCustomEmployees();


        /* ---------------------------------------------
           UPDATE EMPLOYEE SELECT
           --------------------------------------------- */

        const employeeSelect =
            document.getElementById(
                "employeeSelect"
            );


        if (employeeSelect) {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                newEmployee.id;

            option.textContent =
                `${newEmployee.name} — ${newEmployee.role}`;

            employeeSelect.appendChild(
                option
            );

        }


        /* ---------------------------------------------
           REFRESH ALL EMPLOYEE VIEWS
           --------------------------------------------- */

        renderEmployeeCards();

        renderWorkforce();


        /* ---------------------------------------------
           CLOSE MODAL
           --------------------------------------------- */

        closeAddEmployeeModal();


        /* ---------------------------------------------
           RESET FORM
           --------------------------------------------- */

        const form =
            document.getElementById(
                "skillshiftEmployeeForm"
            );

        if (form) {

            form.reset();

        }


        /* ---------------------------------------------
           SUCCESS MESSAGE
           --------------------------------------------- */

        if (
            typeof showToast === "function"
        ) {

            showToast(
                "Employee Added",
                `${name} has been added to the workforce.`
            );

        } else {

            alert(
                `${name} has been added successfully!`
            );

        }

    }


    /* =====================================================
       ADD CSS
       ===================================================== */

    function addEmployeeStyles() {

        if (
            document.getElementById(
                "skillshiftEmployeeStyles"
            )
        ) return;


        const style =
            document.createElement("style");


        style.id =
            "skillshiftEmployeeStyles";


        style.textContent = `

            /* ADD BUTTON */

            #skillshiftAddEmployeeBtn {

                border: none;

                background: #635bff;

                color: white;

                padding: 11px 16px;

                border-radius: 9px;

                font-size: 11px;

                font-weight: 700;

                cursor: pointer;

                box-shadow:
                    0 7px 18px
                    rgba(99,91,255,.18);

                transition: .2s;

            }


            #skillshiftAddEmployeeBtn:hover {

                background: #5148e8;

                transform:
                    translateY(-1px);

            }


            /* MODAL */

            #skillshiftEmployeeModal {

                position: fixed;

                inset: 0;

                width: 100vw;

                height: 100vh;

                display: none;

                align-items: center;

                justify-content: center;

                padding: 25px;

                box-sizing: border-box;

                background:
                    rgba(15,19,36,.52);

                backdrop-filter:
                    blur(5px);

                z-index: 999999;

                overflow-y: auto;

            }


            .skillshift-employee-modal {

                width: 650px;

                max-width: 100%;

                max-height: 90vh;

                overflow-y: auto;

                background: white;

                border-radius: 20px;

                padding: 25px;

                box-sizing: border-box;

                box-shadow:
                    0 30px 90px
                    rgba(0,0,0,.25);

                animation:
                    skillshiftEmployeeIn .2s ease;

            }


            @keyframes skillshiftEmployeeIn {

                from {

                    opacity: 0;

                    transform:
                        translateY(-12px)
                        scale(.98);

                }

                to {

                    opacity: 1;

                    transform:
                        translateY(0)
                        scale(1);

                }

            }


            .skillshift-modal-header {

                display: flex;

                justify-content:
                    space-between;

                align-items:
                    flex-start;

                margin-bottom: 22px;

            }


            .skillshift-modal-label {

                color: #635bff;

                font-size: 9px;

                font-weight: 800;

                letter-spacing: 1.4px;

            }


            .skillshift-modal-header h2 {

                margin: 5px 0 0;

                color: #172033;

                font-size: 21px;

            }


            .skillshift-modal-header p {

                margin: 5px 0 0;

                color: #7c8498;

                font-size: 11px;

            }


            .skillshift-modal-close {

                width: 34px;

                height: 34px;

                border: none;

                border-radius: 9px;

                background: #f1f2f6;

                color: #687086;

                font-size: 20px;

                cursor: pointer;

            }


            .skillshift-form-grid {

                display: grid;

                grid-template-columns:
                    1fr 1fr;

                gap: 15px;

            }


            .skillshift-field label {

                display: block;

                margin-bottom: 7px;

                color: #626a7f;

                font-size: 10px;

                font-weight: 700;

            }


            .skillshift-field input,

            .skillshift-field select {

                width: 100%;

                height: 40px;

                box-sizing: border-box;

                padding: 0 11px;

                border:
                    1px solid #e5e8ef;

                border-radius: 9px;

                background: white;

                color: #172033;

                font-size: 11px;

                outline: none;

            }


            .skillshift-field input:focus,

            .skillshift-field select:focus {

                border-color: #635bff;

                box-shadow:
                    0 0 0 3px
                    rgba(99,91,255,.08);

            }


            .skillshift-modal-actions {

                display: flex;

                justify-content: flex-end;

                gap: 10px;

                margin-top: 23px;

                padding-top: 18px;

                border-top:
                    1px solid #edf0f4;

            }


            .skillshift-employee-cancel {

                height: 40px;

                padding: 0 17px;

                border:
                    1px solid #e2e5ec;

                background: white;

                color: #626a7f;

                border-radius: 9px;

                font-size: 11px;

                font-weight: 700;

                cursor: pointer;

            }


            .skillshift-employee-save {

                height: 40px;

                padding: 0 19px;

                border: none;

                background: #635bff;

                color: white;

                border-radius: 9px;

                font-size: 11px;

                font-weight: 700;

                cursor: pointer;

                box-shadow:
                    0 7px 16px
                    rgba(99,91,255,.18);

            }


            .skillshift-employee-save:hover {

                background: #5148e8;

            }


            @media (max-width: 650px) {

                .skillshift-form-grid {

                    grid-template-columns: 1fr;

                }

                .skillshift-employee-modal {

                    padding: 20px;

                }

            }

        `;


        document.head.appendChild(style);

    }


    /* =====================================================
       INITIALIZE
       ===================================================== */

    function initializeAddEmployee() {

        /*
         * FIRST load previously added employees
         */

        loadCustomEmployees();


        /*
         * Add button
         */

        createAddEmployeeButton();


        /*
         * Create modal
         */

        createAddEmployeeModal();


        /*
         * Add styles
         */

        addEmployeeStyles();


        /*
         * Refresh cards AFTER loading saved employees
         */

        if (
            typeof renderEmployeeCards === "function"
        ) {

            renderEmployeeCards();

        }


        if (
            typeof renderWorkforce === "function"
        ) {

            renderWorkforce();

        }

    }


    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeAddEmployee
        );

    } else {

        initializeAddEmployee();

    }

})();
/* =========================================================
   SKILLSHIFT - FINAL WORKING ADD EMPLOYEE
   ========================================================= */

(function () {

    const STORAGE_KEY = "skillshift_custom_employees";

    /* ---------------------------------------------------------
       LOAD SAVED CUSTOM EMPLOYEES
       --------------------------------------------------------- */

    function loadSavedEmployees() {

        try {

            const saved =
                JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

            if (!Array.isArray(saved)) return;

            saved.forEach(savedEmployee => {

                const alreadyExists =
                    employees.some(e => e.id == savedEmployee.id);

                if (!alreadyExists) {
                    employees.push(savedEmployee);
                }

            });

        } catch (error) {

            console.error(
                "Could not load saved employees:",
                error
            );

        }

    }


    /* ---------------------------------------------------------
       SAVE CUSTOM EMPLOYEES
       --------------------------------------------------------- */

    function saveEmployees() {

        const customEmployees =
            employees.filter(e => e.customEmployee === true);

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(customEmployees)
        );

    }


    /* ---------------------------------------------------------
       REMOVE OLD DUPLICATE BUTTONS
       --------------------------------------------------------- */

    function removeOldButtons() {

        document
            .querySelectorAll("button")
            .forEach(button => {

                const text =
                    button.textContent
                        .replace(/\s+/g, " ")
                        .trim()
                        .toLowerCase();

                if (
                    text.includes("add employee") &&
                    !button.closest("#skillshiftEmployeeModal")
                ) {
                    button.remove();
                }

            });

    }


    /* ---------------------------------------------------------
       CREATE ONE ADD EMPLOYEE BUTTON
       --------------------------------------------------------- */

    function createButton() {

        const section =
            document.getElementById("employees");

        if (!section) return;

        const heading =
            section.querySelector(".section-heading");

        if (!heading) return;

        const button =
            document.createElement("button");

        button.id =
            "skillshiftFinalAddEmployee";

        button.type =
            "button";

        button.innerHTML =
            '<span style="font-size:20px;">+</span> Add Employee';

        button.style.cssText = `
            background:#5b5bf7;
            color:white;
            border:none;
            border-radius:14px;
            padding:14px 22px;
            font-size:15px;
            font-weight:700;
            cursor:pointer;
            box-shadow:0 10px 25px rgba(91,91,247,.22);
            transition:.2s;
            white-space:nowrap;
        `;

        button.onmouseenter = function () {
            this.style.transform =
                "translateY(-2px)";
        };

        button.onmouseleave = function () {
            this.style.transform =
                "translateY(0)";
        };

        button.onclick =
            openEmployeeModal;

        heading.style.display =
            "flex";

        heading.style.justifyContent =
            "space-between";

        heading.style.alignItems =
            "center";

        heading.appendChild(button);

    }


    /* ---------------------------------------------------------
       CREATE MODAL
       --------------------------------------------------------- */

    function createModal() {

        if (
            document.getElementById(
                "skillshiftFinalEmployeeModal"
            )
        ) return;

        const modal =
            document.createElement("div");

        modal.id =
            "skillshiftFinalEmployeeModal";

        modal.innerHTML = `

            <div id="skillshiftFinalModalBox">

                <div class="skillshift-modal-header">

                    <div>
                        <span
                            style="
                                color:#6966ff;
                                font-size:12px;
                                font-weight:800;
                                letter-spacing:1.5px;
                            "
                        >
                            WORKFORCE
                        </span>

                        <h2>
                            Add New Employee
                        </h2>

                        <p>
                            Add employee details to your workforce.
                        </p>
                    </div>

                    <button
                        type="button"
                        id="skillshiftFinalClose"
                    >
                        ×
                    </button>

                </div>


                <form id="skillshiftFinalEmployeeForm">

                    <div class="skillshift-form-grid">

                        <div class="skillshift-field">
                            <label>Employee Name</label>
                            <input
                                id="sfName"
                                type="text"
                                placeholder="e.g. Riya Patel"
                                required
                            >
                        </div>


                        <div class="skillshift-field">
                            <label>Job Position</label>
                            <input
                                id="sfRole"
                                type="text"
                                placeholder="e.g. Operations Associate"
                                required
                            >
                        </div>


                        <div class="skillshift-field">
                            <label>Primary Skill</label>
                            <select
                                id="sfSkill"
                                required
                            >
                                <option value="">
                                    Select skill
                                </option>

                                <option>
                                    Inventory Audit
                                </option>

                                <option>
                                    Quality Inspection
                                </option>

                                <option>
                                    Warehouse
                                </option>

                                <option>
                                    Order Processing
                                </option>

                                <option>
                                    Customer Support
                                </option>

                                <option>
                                    Data Entry
                                </option>

                                <option>
                                    Equipment Maintenance
                                </option>
                            </select>
                        </div>


                        <div class="skillshift-field">
                            <label>Skill Level</label>
                            <input
                                id="sfSkillLevel"
                                type="number"
                                min="0"
                                max="100"
                                value="85"
                                required
                            >
                        </div>


                        <div class="skillshift-field">
                            <label>Current Task</label>
                            <input
                                id="sfTask"
                                type="text"
                                placeholder="e.g. Order Verification"
                                required
                            >
                        </div>


                        <div class="skillshift-field">
                            <label>Current Hours</label>
                            <input
                                id="sfCurrentHours"
                                type="number"
                                min="0"
                                value="2"
                                required
                            >
                        </div>


                        <div class="skillshift-field">
                            <label>Maximum Hours</label>
                            <input
                                id="sfMaxHours"
                                type="number"
                                min="1"
                                value="8"
                                required
                            >
                        </div>


                        <div class="skillshift-field">
                            <label>Historical Performance %</label>
                            <input
                                id="sfPerformance"
                                type="number"
                                min="0"
                                max="100"
                                value="90"
                                required
                            >
                        </div>


                        <div class="skillshift-field">
                            <label>Tasks Completed</label>
                            <input
                                id="sfCompleted"
                                type="number"
                                min="0"
                                value="0"
                                required
                            >
                        </div>


                        <div class="skillshift-field">
                            <label>Status</label>
                            <select id="sfStatus">

                                <option value="available">
                                    Available
                                </option>

                                <option value="busy">
                                    Busy
                                </option>

                            </select>
                        </div>

                    </div>


                    <div class="skillshift-modal-actions">

                        <button
                            type="button"
                            id="skillshiftFinalCancel"
                            class="skillshift-cancel"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            class="skillshift-save"
                        >
                            ✓ Save Employee
                        </button>

                    </div>

                </form>

            </div>
        `;


        document.body.appendChild(modal);


        /* CLOSE */

        document
            .getElementById("skillshiftFinalClose")
            .onclick =
            closeEmployeeModal;


        document
            .getElementById("skillshiftFinalCancel")
            .onclick =
            closeEmployeeModal;


        /* SAVE */

        document
            .getElementById("skillshiftFinalEmployeeForm")
            .addEventListener(
                "submit",
                saveNewEmployee
            );


        /* CLICK OUTSIDE */

        modal.addEventListener(
            "click",
            function (event) {

                if (event.target === modal) {
                    closeEmployeeModal();
                }

            }
        );

    }


    /* ---------------------------------------------------------
       OPEN MODAL
       --------------------------------------------------------- */

    function openEmployeeModal() {

        const modal =
            document.getElementById(
                "skillshiftFinalEmployeeModal"
            );

        if (!modal) return;

        modal.style.display =
            "flex";

        document.body.style.overflow =
            "hidden";

        setTimeout(() => {

            document
                .getElementById("sfName")
                .focus();

        }, 100);

    }


    /* ---------------------------------------------------------
       CLOSE MODAL
       --------------------------------------------------------- */

    function closeEmployeeModal() {

        const modal =
            document.getElementById(
                "skillshiftFinalEmployeeModal"
            );

        if (!modal) return;

        modal.style.display =
            "none";

        document.body.style.overflow =
            "";

    }


    /* ---------------------------------------------------------
       CREATE UNIQUE ID
       --------------------------------------------------------- */

    function createEmployeeId() {

        let id = Date.now();

        while (
            employees.some(e => e.id == id)
        ) {
            id++;
        }

        return id;

    }


    /* ---------------------------------------------------------
       CREATE INITIALS
       --------------------------------------------------------- */

    function createInitials(name) {

        return name
            .trim()
            .split(/\s+/)
            .map(word => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();

    }


    /* ---------------------------------------------------------
       SAVE NEW EMPLOYEE
       --------------------------------------------------------- */

    function saveNewEmployee(event) {

        event.preventDefault();


        const name =
            document
                .getElementById("sfName")
                .value
                .trim();


        const role =
            document
                .getElementById("sfRole")
                .value
                .trim();


        const skill =
            document
                .getElementById("sfSkill")
                .value;


        const skillLevel =
            Number(
                document
                    .getElementById("sfSkillLevel")
                    .value
            );


        const currentTask =
            document
                .getElementById("sfTask")
                .value
                .trim();


        const currentHours =
            Number(
                document
                    .getElementById("sfCurrentHours")
                    .value
            );


        const maxHours =
            Number(
                document
                    .getElementById("sfMaxHours")
                    .value
            );


        const performance =
            Number(
                document
                    .getElementById("sfPerformance")
                    .value
            );


        const completedTasks =
            Number(
                document
                    .getElementById("sfCompleted")
                    .value
            );


        const status =
            document
                .getElementById("sfStatus")
                .value;


        /* VALIDATION */

        if (!name || !role || !skill || !currentTask) {

            alert(
                "Please fill in all required employee details."
            );

            return;

        }


        if (maxHours < currentHours) {

            alert(
                "Maximum hours must be greater than current hours."
            );

            return;

        }


        /* -----------------------------------------------------
           CREATE EMPLOYEE OBJECT
           ----------------------------------------------------- */

        const newEmployee = {

            id: createEmployeeId(),

            name: name,

            role: role,

            initials: createInitials(name),

            status: status,

            currentTask: currentTask,

            currentHours: currentHours,

            maxHours: maxHours,

            performance: performance,

            skills: {

                "Inventory Audit": 0,

                "Quality Inspection": 0,

                "Warehouse": 0,

                "Order Processing": 0,

                "Customer Support": 0,

                "Data Entry": 0,

                "Equipment Maintenance": 0

            },

            completedTasks: completedTasks,

            customEmployee: true

        };


        /* SET PRIMARY SKILL */

        newEmployee.skills[skill] =
            skillLevel;


        /* ADD TO MAIN EMPLOYEE ARRAY */

        employees.push(
            newEmployee
        );


        /* CREATE TASK ENTRY FOR REASSIGNMENT */

        absentTasks[newEmployee.id] = {

            task: currentTask,

            skill: skill,

            priority: "MEDIUM",

            hours: Math.max(
                1,
                Math.min(
                    3,
                    maxHours - currentHours
                )
            )

        };


        /* SAVE TO BROWSER */

        saveEmployees();


        /* REFRESH EVERYTHING */

        renderEmployeeCards();

        renderWorkforce();

        refreshWorkforceWithAllEmployees();

        addEmployeeToSelect(
            newEmployee
        );


        /* CLOSE */

        closeEmployeeModal();


        document
            .getElementById(
                "skillshiftFinalEmployeeForm"
            )
            .reset();


        /* SUCCESS MESSAGE */

        if (typeof showToast === "function") {

            showToast(
                "Employee Added",
                `${name} has been added to the workforce.`
            );

        } else {

            alert(
                `${name} has been added successfully!`
            );

        }

    }


    /* ---------------------------------------------------------
       ADD EMPLOYEE TO REASSIGN DROPDOWN
       --------------------------------------------------------- */

    function addEmployeeToSelect(employee) {

        const select =
            document.getElementById(
                "employeeSelect"
            );

        if (!select) return;


        const existing =
            Array.from(
                select.options
            ).some(
                option =>
                    option.value == employee.id
            );


        if (existing) return;


        const option =
            document.createElement("option");


        option.value =
            employee.id;


        option.textContent =
            `${employee.name} — ${employee.role}`;


        select.appendChild(option);

    }


    /* ---------------------------------------------------------
       FORCE DASHBOARD WORKFORCE LIST TO SHOW ALL EMPLOYEES
       --------------------------------------------------------- */

    function refreshWorkforceWithAllEmployees() {

        const container =
            document.getElementById(
                "workforceList"
            );

        if (!container) return;


        container.innerHTML = "";


        employees.forEach(employee => {

            const row =
                document.createElement("div");


            row.className =
                "employee-row";


            const statusText = {

                available: "Available",

                busy: "Busy",

                absent: "Absent"

            }[employee.status] || "Available";


            row.innerHTML = `

                <div class="small-avatar">
                    ${employee.initials}
                </div>

                <div class="employee-info">

                    <strong>
                        ${employee.name}
                    </strong>

                    <span>
                        ${employee.currentTask}
                    </span>

                </div>

                <span
                    class="availability ${employee.status}"
                >
                    ${statusText}
                </span>

            `;


            container.appendChild(row);

        });

    }


    /* ---------------------------------------------------------
       ADD MODAL CSS
       --------------------------------------------------------- */

    function addStyles() {

        if (
            document.getElementById(
                "skillshiftFinalEmployeeStyles"
            )
        ) return;


        const style =
            document.createElement("style");


        style.id =
            "skillshiftFinalEmployeeStyles";


        style.textContent = `

            #skillshiftFinalEmployeeModal {

                position:fixed;

                inset:0;

                background:rgba(15,23,42,.55);

                backdrop-filter:blur(8px);

                display:none;

                align-items:center;

                justify-content:center;

                z-index:99999;

                padding:20px;

            }


            #skillshiftFinalModalBox {

                width:min(720px, 100%);

                max-height:90vh;

                overflow-y:auto;

                background:#ffffff;

                border-radius:24px;

                padding:30px;

                box-shadow:
                    0 30px 80px rgba(15,23,42,.25);

                animation:
                    skillshiftModalIn .2s ease;

            }


            @keyframes skillshiftModalIn {

                from {
                    opacity:0;
                    transform:translateY(15px) scale(.98);
                }

                to {
                    opacity:1;
                    transform:translateY(0) scale(1);
                }

            }


            .skillshift-modal-header {

                display:flex;

                align-items:flex-start;

                justify-content:space-between;

                margin-bottom:24px;

            }


            .skillshift-modal-header h2 {

                margin:5px 0 5px;

                color:#111827;

                font-size:26px;

            }


            .skillshift-modal-header p {

                margin:0;

                color:#64748b;

                font-size:14px;

            }


            #skillshiftFinalClose {

                width:40px;

                height:40px;

                border:none;

                border-radius:12px;

                background:#f1f5f9;

                color:#475569;

                font-size:27px;

                cursor:pointer;

            }


            .skillshift-form-grid {

                display:grid;

                grid-template-columns:1fr 1fr;

                gap:18px;

            }


            .skillshift-field {

                display:flex;

                flex-direction:column;

                gap:7px;

            }


            .skillshift-field label {

                color:#334155;

                font-size:13px;

                font-weight:700;

            }


            .skillshift-field input,

            .skillshift-field select {

                width:100%;

                box-sizing:border-box;

                border:1px solid #e2e8f0;

                border-radius:11px;

                padding:12px 13px;

                font-size:14px;

                outline:none;

                background:#f8fafc;

                color:#0f172a;

            }


            .skillshift-field input:focus,

            .skillshift-field select:focus {

                border-color:#6966ff;

                background:#ffffff;

                box-shadow:
                    0 0 0 3px rgba(105,102,255,.10);

            }


            .skillshift-modal-actions {

                display:flex;

                justify-content:flex-end;

                gap:12px;

                margin-top:28px;

                padding-top:20px;

                border-top:1px solid #e5e7eb;

            }


            .skillshift-cancel {

                border:1px solid #dbe2ea;

                background:white;

                color:#475569;

                border-radius:12px;

                padding:13px 20px;

                font-weight:700;

                cursor:pointer;

            }


            .skillshift-save {

                border:none;

                background:#5b5bf7;

                color:white;

                border-radius:12px;

                padding:13px 22px;

                font-weight:800;

                cursor:pointer;

                box-shadow:
                    0 8px 20px rgba(91,91,247,.22);

            }


            .skillshift-save:hover {

                background:#4f46e5;

            }


            @media(max-width:650px) {

                .skillshift-form-grid {

                    grid-template-columns:1fr;

                }

                #skillshiftFinalModalBox {

                    padding:22px;

                }

            }

        `;


        document.head.appendChild(style);

    }


    /* ---------------------------------------------------------
       INITIALIZE
       --------------------------------------------------------- */

    function initialize() {

        loadSavedEmployees();

        removeOldButtons();

        addStyles();

        createModal();

        createButton();

        refreshWorkforceWithAllEmployees();

        renderEmployeeCards();


        /* Make sure saved employees appear in dropdown */

        employees.forEach(
            addEmployeeToSelect
        );

    }


    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialize
        );

    } else {

        initialize();

    }

})();