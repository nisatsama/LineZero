const { generateAnalyticsReport } = require("../utils/gemini");
const Task = require("../models/Task");

const getAnalytics = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    const today = new Date();

    // Beginning of today
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    // Beginning of current week (Monday)
    const startOfWeek = new Date(startOfToday);
    const day = startOfWeek.getDay();
    const diff = day === 0 ? 6 : day - 1;
    startOfWeek.setDate(startOfWeek.getDate() - diff);

    // Beginning of current month
    const startOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    //----------------------------
    // Basic Counts
    //----------------------------

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      (task) => task.completed
    ).length;

    const pendingTasks = tasks.filter(
      (task) => !task.completed
    ).length;

    const completionRate =
      totalTasks === 0
        ? 0
        : Number(((completedTasks / totalTasks) * 100).toFixed(2));

    //----------------------------
    // Today
    //----------------------------

    const todayTasks = tasks.filter(
      (task) => new Date(task.createdAt) >= startOfToday
    );

    const completedToday = todayTasks.filter(
      (task) => task.completed
    ).length;

    //----------------------------
    // Week
    //----------------------------

    const weekTasks = tasks.filter(
      (task) => new Date(task.createdAt) >= startOfWeek
    );

    const completedWeek = weekTasks.filter(
      (task) => task.completed
    ).length;

    const weeklyCompletion =
      weekTasks.length === 0
        ? 0
        : Number(
            ((completedWeek / weekTasks.length) * 100).toFixed(2)
          );

    //----------------------------
    // Month
    //----------------------------

    const monthTasks = tasks.filter(
      (task) => new Date(task.createdAt) >= startOfMonth
    );

    const completedMonth = monthTasks.filter(
      (task) => task.completed
    ).length;

    const monthlyCompletion =
      monthTasks.length === 0
        ? 0
        : Number(
            ((completedMonth / monthTasks.length) * 100).toFixed(2)
          );

    //----------------------------
    // Deadline Analytics
    //----------------------------

    const overdueTasks = tasks.filter((task) => {
      return (
        !task.completed &&
        new Date(task.deadline) < today
      );
    }).length;

    const completedBeforeDeadline = tasks.filter((task) => {
      return (
        task.completed &&
        new Date(task.deadline) >= today
      );
    }).length;

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const upcomingDeadlines = tasks.filter((task) => {
      const deadline = new Date(task.deadline);

      return (
        !task.completed &&
        deadline >= today &&
        deadline <= nextWeek
      );
    }).length;

    //----------------------------
    // Response
    //----------------------------
const last7Days = [];

for (let i = 6; i >= 0; i--) {
  const date = new Date();
  date.setDate(today.getDate() - i);

  const start = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  const dayTasks = tasks.filter(task => {
    const created = new Date(task.createdAt);

    return created >= start && created < end;
  });

  last7Days.push({
    day: start.toLocaleDateString("en-US", {
      weekday: "short",
    }),

    completed: dayTasks.filter(task => task.completed).length,

    pending: dayTasks.filter(task => !task.completed).length,
  });
}
const monthlyProgress = [];

const daysInMonth = new Date(
  today.getFullYear(),
  today.getMonth() + 1,
  0
).getDate();

for (let day = 1; day <= daysInMonth; day++) {

  const start = new Date(
    today.getFullYear(),
    today.getMonth(),
    day
  );

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  const count = tasks.filter(task => {
    const created = new Date(task.createdAt);

    return (
      created >= start &&
      created < end &&
      task.completed
    );
  }).length;

  monthlyProgress.push({
    day,
    completed: count,
  });
}
const upcomingTasks = tasks
  .filter(task =>
    !task.completed &&
    new Date(task.deadline) >= today
  )
  .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
  .slice(0, 5)
  .map(task => ({
    task: task.task,
    deadline: task.deadline,
  }));
  const productivityScore = Math.round(
  completionRate * 0.7 +
  weeklyCompletion * 0.3
);
  
   const statistics = {
  totalTasks,
  completedTasks,
  pendingTasks,
  completionRate,

  overdueTasks,
  upcomingDeadlines,
  completedBeforeDeadline,

  productivityScore,

  today: {
    total: todayTasks.length,
    completed: completedToday,
  },

  weekly: {
    total: weekTasks.length,
    completed: completedWeek,
    completionRate: weeklyCompletion,
  },

  monthly: {
    total: monthTasks.length,
    completed: completedMonth,
    completionRate: monthlyCompletion,
  },

  charts: {
    last7Days,
    monthlyProgress,
    completionChart: [
      {
        name: "Completed",
        value: completedTasks,
      },
      {
        name: "Pending",
        value: pendingTasks,
      },
    ],
  },

  upcomingTasks,
};
const aiInput = {
  statistics,

  recentTasks: tasks.slice(0, 20).map((task) => ({
    task: task.task,
    completed: task.completed,
    deadline: task.deadline,
    createdAt: task.createdAt,
  })),
};
const aiReport =
  await generateAnalyticsReport(aiInput);
  return res.status(200).json({
  success: true,
  statistics,
  aiReport,
});

} catch (error) {
  console.error("Analytics Error:", error);

  return res.status(500).json({
    success: false,
    message: "Failed to fetch analytics",
    error: error.message,
  });
}
};

module.exports = {
  getAnalytics,
};