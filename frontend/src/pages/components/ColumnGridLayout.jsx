import { FaArrowRight, FaBookOpen, FaCalendarAlt, FaChartBar, FaClock, FaExclamationTriangle, FaLayerGroup, FaMoneyBillWave, FaUserGraduate, FaUserTie } from "react-icons/fa";

export default function ColumnGridLauyout(){

    return (
        <>
            <div className="dashboard-grid">
            {/* Left Column */}
            <div className="grid-column">
              {/* Pending Approvals Card */}
              <div className="dashboard-card">
                <div className="card-header">
                  <h3><FaExclamationTriangle /> Pending Approvals</h3>
                  <button className="view-all-btn">
                    View All <FaArrowRight />
                  </button>
                </div>
                <div className="approvals-list">
                  {[1,2,3].map(item => (
                    <div key={1} className={`approval-item ${'priority'}`}>
                      <div className="approval-icon">
                        {/* {item.type.includes('Leave') && <FaUserTie />} */}
                        
                        { <FaBookOpen />}
                        {/* {item.type.includes('Event') && <FaCalendarAlt />} */}
                      </div>
                      <div className="approval-details">
                        <div className="approval-title">z</div>
                        <div className="approval-meta">
                          <span>z</span>
                          <span>• z</span>
                          {item.department && <span>• z</span>}
                          {item.amount && <span>• z</span>}
                        </div>
                      </div>
                      <div className="approval-actions">
                        <button className="approve-btn">✓</button>
                        <button className="reject-btn">✗</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department Overview */}
              <div className="dashboard-card">
                <div className="card-header">
                  <h3><FaLayerGroup /> Department Overview</h3>
                  <button className="view-all-btn">
                    Manage <FaArrowRight />
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="department-table">
                    <thead>
                      <tr>
                        <th>Department</th>
                        <th>Teachers</th>
                        <th>Students</th>
                        <th>HOD</th>
                        <th>Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1,3,7].map((dept, index) => (
                        <tr key={1}>
                          <td className="dept-name">z</td>
                          <td>z</td>
                          <td>z</td>
                          <td>z</td>
                          <td>
                            <span className={`badge ${45 >= 90 ? 'success' : 'warning'}`}>
                              z
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Class Performance Snapshot */}
              <div className="dashboard-card">
                <div className="card-header">
                  <h3><FaChartBar /> Class Performance Snapshot</h3>
                  <button className="view-all-btn">
                    Details <FaArrowRight />
                  </button>
                </div>
                <div className="class-stats">
                  {[2,5,7].map((cls, index) => (
                    <div key={index} className="class-stat-item">
                      <div className="class-info">
                        <span className="class-name">z</span>
                        <span className="class-teacher">z</span>
                      </div>
                      <div className="class-metrics">
                        <div className="metric">
                          <span className="metric-label">Attendance</span>
                          <div className="progress-bar">
                            <div className="progress" style={{ width: `${7}%` }}></div>
                          </div>
                          <span className="metric-value">z%</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Performance</span>
                          <div className="progress-bar">
                            <div className="progress performance" style={{ width: `${5}%` }}></div>
                          </div>
                          <span className="metric-value">z%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="grid-column">
              {/* Today's Schedule */}
              <div className="dashboard-card">
                <div className="card-header">
                  <h3><FaClock /> Today's Schedule</h3>
                  <button className="view-all-btn">
                    Full Day <FaArrowRight />
                  </button>
                </div>
                <div className="schedule-list">
                  {[5,8,7].map((item, index) => (
                    <div key={1} className="schedule-item">
                      <div className="schedule-time">e</div>
                      <div className="schedule-content">
                        <div className="schedule-title">e</div>
                        <div className="schedule-meta">
                          <span>e</span>
                          <span>• e</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="dashboard-card">
                <div className="card-header">
                  <h3>Quick Actions</h3>
                </div>
                <div className="quick-actions-grid">
                  <button className="quick-action-btn">
                    <div className="quick-icon">📝</div>
                    <span>Announcement</span>
                  </button>
                  <button className="quick-action-btn">
                    <div className="quick-icon">💰</div>
                    <span>Approve Budget</span>
                  </button>
                  <button className="quick-action-btn">
                    <div className="quick-icon">👥</div>
                    <span>Staff Meeting</span>
                  </button>
                  <button className="quick-action-btn">
                    <div className="quick-icon">📊</div>
                    <span>Generate Report</span>
                  </button>
                  <button className="quick-action-btn">
                    <div className="quick-icon">📧</div>
                    <span>Send Notice</span>
                  </button>
                  <button className="quick-action-btn">
                    <div className="quick-icon">📅</div>
                    <span>Create Event</span>
                  </button>
                  <button className="quick-action-btn">
                    <div className="quick-icon">✅</div>
                    <span>Leave Approvals</span>
                  </button>
                  <button className="quick-action-btn">
                    <div className="quick-icon">🏆</div>
                    <span>Achievements</span>
                  </button>
                </div>
              </div>

              {/* Staff on Leave Today */}
              <div className="dashboard-card">
                <div className="card-header">
                  <h3><FaUserTie /> Staff on Leave Today</h3>
                  <span className="leave-count">xx</span>
                </div>
                <div className="leave-list">
                  <div className="leave-item">
                    <div className="leave-teacher">
                      <div className="teacher-avatar">AS</div>
                      <div>
                        <div className="teacher-name">Ms. Anita Sharma</div>
                        <div className="teacher-subject">Science (Class 10A)</div>
                      </div>
                    </div>
                    <span className="leave-type sick">Sick Leave</span>
                  </div>
                  <div className="leave-item">
                    <div className="leave-teacher">
                      <div className="teacher-avatar">RK</div>
                      <div>
                        <div className="teacher-name">Mr. Raj Kumar</div>
                        <div className="teacher-subject">Mathematics HOD</div>
                      </div>
                    </div>
                    <span className="leave-type personal">Personal</span>
                  </div>
                  <div className="leave-item">
                    <div className="leave-teacher">
                      <div className="teacher-avatar">PV</div>
                      <div>
                        <div className="teacher-name">Mrs. Priya Verma</div>
                        <div className="teacher-subject">English (Class 12B)</div>
                      </div>
                    </div>
                    <span className="leave-type training">Training</span>
                  </div>
                  <div className="leave-item">
                    <div className="leave-teacher">
                      <div className="teacher-avatar">SD</div>
                      <div>
                        <div className="teacher-name">Mr. Sanjay Das</div>
                        <div className="teacher-subject">Physical Education</div>
                      </div>
                    </div>
                    <span className="leave-type duty">Official Duty</span>
                  </div>
                </div>
                <button className="view-all-link">View All Staff Attendance →</button>
              </div>

              {/* Upcoming Events */}
              <div className="dashboard-card">
                <div className="card-header">
                  <h3><FaCalendarAlt /> Upcoming Events</h3>
                  <span className="event-count">z</span>
                </div>
                <div className="events-mini-list">
                  <div className="mini-event">
                    <div className="event-date-mini">
                      <span className="day">15</span>
                      <span className="month">MAR</span>
                    </div>
                    <div className="event-info">
                      <div className="event-title">Parent-Teacher Meeting</div>
                      <div className="event-details">10:00 AM - Auditorium</div>
                    </div>
                  </div>
                  <div className="mini-event">
                    <div className="event-date-mini">
                      <span className="day">18</span>
                      <span className="month">MAR</span>
                    </div>
                    <div className="event-info">
                      <div className="event-title">Science Exhibition</div>
                      <div className="event-details">9:00 AM - Science Block</div>
                    </div>
                  </div>
                  <div className="mini-event">
                    <div className="event-date-mini">
                      <span className="day">20</span>
                      <span className="month">MAR</span>
                    </div>
                    <div className="event-info">
                      <div className="event-title">Staff Development Day</div>
                      <div className="event-details">2:00 PM - Conference Hall</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    );
}