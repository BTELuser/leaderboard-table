// Sample Data
const players = [
  { username: "Welshlegend123", kd: 0.62, official: true, join: "24/06/2025", status: "active", points: 0 },
  { username: "jilled", kd: 1.03, official: false, join: "24/06/2025", status: "active", points: 0 },
  { username: "Giant_Professor", kd: 3.68, official: true, join: "24/06/2025", status: "active", points: 0 },
  { username: "Dieordied", kd: 1.17, official: false, join: "24/06/2025", status: "active", points: 0 },
  { username: "-Fig-", kd: 2.04, official: false, join: "24/06/2025", status: "active", points: 0 },
  { username: "NYS Lask", kd: 2.57, official: false, join: "24/06/2025", status: "active", points: 0 },
  { username: "lordpearl", kd: 2.01, official: false, join: "24/06/2025", status: "active", points: 0 },
  { username: "Whispering Deat", kd: 0.98, official: false, join: "24/06/2025", status: "active", points: 0 },
  { username: "Luinflower", kd: 5.31, official: true, join: "24/06/2025", status: "active", points: 0 },
];

const matches = [
  // {date, player1, player2, score, winner, approvedBy, status, player1Kills, player1Deaths, player2Kills, player2Deaths, draw}
  {date: "24/06/2025", player1: "NYS Lask", player2: "Welshlegend123", score: "5-3", winner: "NYS Lask", approvedBy: "Welshlegend123", status: "APPROVED", player1Kills: 5, player1Deaths: 3, player2Kills: 3, player2Deaths: 5, draw: false},
  {date: "24/06/2025", player1: "NYS Lask", player2: "Welshlegend123", score: "8-1", winner: "NYS Lask", approvedBy: "Welshlegend123", status: "APPROVED", player1Kills: 8, player1Deaths: 1, player2Kills: 1, player2Deaths: 8, draw: false},
  {date: "24/06/2025", player1: "Dieordied", player2: "Welshlegend123", score: "11-1", winner: "Dieordied", approvedBy: "Welshlegend123", status: "APPROVED", player1Kills: 11, player1Deaths: 1, player2Kills: 1, player2Deaths: 11, draw: false},
  {date: "24/06/2025", player1: "Dieordied", player2: "Welshlegend123", score: "3-5", winner: "Welshlegend123", approvedBy: "Welshlegend123", status: "APPROVED", player1Kills: 3, player1Deaths: 5, player2Kills: 5, player2Deaths: 3, draw: false},
  {date: "24/06/2025", player1: "- blu -", player2: "Welshlegend123", score: "7-8", winner: "Welshlegend123", approvedBy: "Welshlegend123", status: "APPROVED", player1Kills: 7, player1Deaths: 8, player2Kills: 8, player2Deaths: 7, draw: false},
  {date: "24/06/2025", player1: "- blu -", player2: "Welshlegend123", score: "11-7", winner: "- blu -", approvedBy: "Welshlegend123", status: "APPROVED", player1Kills: 11, player1Deaths: 7, player2Kills: 7, player2Deaths: 11, draw: false},
  {date: "24/06/2025", player1: "Dieordied", player2: "Luinflower", score: "4-1", winner: "Dieordied", approvedBy: "Welshlegend123", status: "APPROVED", player1Kills: 4, player1Deaths: 1, player2Kills: 1, player2Deaths: 4, draw: false},
  {date: "24/06/2025", player1: "Dieordied", player2: "Luinflower", score: "3-1", winner: "Dieordied", approvedBy: "Welshlegend123", status: "APPROVED", player1Kills: 3, player1Deaths: 1, player2Kills: 1, player2Deaths: 3, draw: false},
  {date: "24/06/2025", player1: "Dark TNT", player2: "Luinflower", score: "4-13", winner: "Luinflower", approvedBy: "Welshlegend123", status: "APPROVED", player1Kills: 4, player1Deaths: 13, player2Kills: 13, player2Deaths: 4, draw: false},
  // Example draw:
  {date: "24/06/2025", player1: "Giant_Professor", player2: "lordpearl", score: "5-5", winner: null, approvedBy: "Welshlegend123", status: "APPROVED", player1Kills: 5, player1Deaths: 5, player2Kills: 5, player2Deaths: 5, draw: true},
];

function getPlayerKDR(username) {
  const p = players.find(x => x.username === username);
  return p ? p.kd : 1.0;
}

// Points formula
function calculatePoints(winnerKills, winnerDeaths, winnerKDR, loserKDR) {
    return (
        12 * ((5 * winnerKills - 4 * winnerDeaths) / 5) +
        15 +
        12 * (loserKDR - winnerKDR)
    );
}
function calculateDrawPoints(kills, kdr) {
    return kills * kdr;
}

// Calculate and update player points
function updatePlayerPoints() {
  // Reset all
  players.forEach(p => p.points = 0);

  matches.forEach(m => {
    if (m.draw) {
      // Both get kills * kdr
      let p1 = players.find(p => p.username === m.player1);
      let p2 = players.find(p => p.username === m.player2);
      let p1points = calculateDrawPoints(m.player1Kills, getPlayerKDR(m.player1));
      let p2points = calculateDrawPoints(m.player2Kills, getPlayerKDR(m.player2));
      if (p1) p1.points += p1points;
      if (p2) p2.points += p2points;
      m.points = { [m.player1]: p1points, [m.player2]: p2points };
    } else {
      let winner = m.winner;
      let loser = m.player1 === winner ? m.player2 : m.player1;

      // KDRs
      let winnerKDR = getPlayerKDR(winner);
      let loserKDR = getPlayerKDR(loser);

      // Kills/Deaths
      let winnerKills = m.player1 === winner ? m.player1Kills : m.player2Kills;
      let winnerDeaths = m.player1 === winner ? m.player1Deaths : m.player2Deaths;
      let loserKills = m.player1 === loser ? m.player1Kills : m.player2Kills;
      let loserDeaths = m.player1 === loser ? m.player1Deaths : m.player2Deaths;

      let winnerPoints = calculatePoints(winnerKills, winnerDeaths, winnerKDR, loserKDR);
      let loserPoints = -winnerPoints;
      let winnerP = players.find(p => p.username === winner);
      let loserP = players.find(p => p.username === loser);

      if (winnerP) winnerP.points += winnerPoints;
      if (loserP) loserP.points += loserPoints;
      m.points = { [winner]: winnerPoints, [loser]: loserPoints };
    }
  });
}

// Populate Players Table
function renderPlayersTable(filter = "") {
  updatePlayerPoints();
  const tbody = document.querySelector("#playersTable tbody");
  tbody.innerHTML = "";
  players
    .filter(p => p.username.toLowerCase().includes(filter.toLowerCase()))
    .forEach(player => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${player.username}</td>
        <td>${player.kd}</td>
        <td>
          <span class="badge ${player.official ? 'green' : 'gray'}">${player.official ? "YES" : "NO"}</span>
        </td>
        <td>${player.join}</td>
        <td><span class="badge green">${player.status.toUpperCase()}</span></td>
        <td>${player.points.toFixed(1)}</td>
        <td>
          <button class="action-btn orange">Edit</button>
          <button class="action-btn stats">Stats</button>
          <button class="action-btn red">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
}

// Populate Matches Table
function renderMatchesTable(filter = "") {
  const tbody = document.querySelector("#matchesTable tbody");
  tbody.innerHTML = "";
  matches
    .filter(m =>
      m.player1.toLowerCase().includes(filter.toLowerCase()) ||
      m.player2.toLowerCase().includes(filter.toLowerCase()) ||
      (m.winner && m.winner.toLowerCase().includes(filter.toLowerCase()))
    )
    .forEach(match => {
      let pointsCol = "--";
      if (match.draw && match.points) {
        pointsCol = Object.entries(match.points).map(([player, pt]) => `<div>${player}: ${pt.toFixed(1)}</div>`).join("");
      } else if (match.points) {
        pointsCol = Object.entries(match.points).map(([player, pt]) => `<div>${player}: ${pt.toFixed(1)}</div>`).join("");
      }
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${match.date}</td>
        <td>${match.player1}</td>
        <td>${match.player2}</td>
        <td>${match.score}</td>
        <td>${match.winner ?? "Draw"}</td>
        <td>${match.approvedBy}</td>
        <td><span class="badge green">${match.status}</span></td>
        <td>${pointsCol}</td>
        <td>
          <button class="action-btn orange">Edit</button>
          <button class="action-btn view">View</button>
          <button class="action-btn red">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
}

// Navigation logic
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    let pg = btn.getAttribute("data-page");
    document.getElementById(pg).classList.add("active");
    btn.classList.add("active");
  });
});

// Search handlers
document.getElementById("searchPlayers").addEventListener("input", e => {
  renderPlayersTable(e.target.value);
});
document.getElementById("searchMatches").addEventListener("input", e => {
  renderMatchesTable(e.target.value);
});

// Initial render
renderPlayersTable();
renderMatchesTable();


// --- Analytics ---
function renderAnalytics() {
  // Match Frequency (dummy)
  const ctx1 = document.getElementById('matchFrequencyChart').getContext('2d');
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
      datasets: [{
        label: 'Matches',
        data: [21, 63, 84, 105, 84],
        backgroundColor: '#5078e8'
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
  // Win Rate Analysis (dummy)
  const ctx2 = document.getElementById('winRateChart').getContext('2d');
  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: [
        "lordpearl", "Giant_Professor", "Stupid_Sho39", "-Fig-", "- blu -", "Dieordied", "Russian Soldier", "fire_bolt"
      ],
      datasets: [{
        label: 'Win Rate (%)',
        data: [100, 90.9, 75, 72.7, 70.4, 66.7, 66.7, 66.7],
        backgroundColor: [
          '#13bf3a', '#13bf3a', '#13bf3a', '#13bf3a', '#13bf3a', '#c3a13a', '#c3a13a', '#c3a13a'
        ]
      }]
    },
    options: {
      plugins: {
        legend: { display: false },
        datalabels: { display: true }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { callback: val => `${val}%` }
        }
      }
    }
  });
}

// Only render charts on analytics page show
document.querySelectorAll(".nav-btn[data-page='analytics']").forEach(btn => {
  btn.addEventListener("click", renderAnalytics);
});

// Initial analytics render if first page
if (document.querySelector('.page.active').id === 'analytics') {
  renderAnalytics();
}
