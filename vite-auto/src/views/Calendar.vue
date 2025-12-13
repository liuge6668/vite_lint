<template>
  <div class="calendar-tool">
    <h1>日历工具</h1>
    <div class="calendar-container">
      <!-- 日历头部 -->
      <div class="calendar-header">
        <button @click="previousMonth" class="nav-btn">‹</button>
        <h2 class="month-year">{{ currentMonthName }} {{ currentYear }}</h2>
        <button @click="nextMonth" class="nav-btn">›</button>
      </div>

      <!-- 星期标题 -->
      <div class="weekdays">
        <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
      </div>

      <!-- 日历网格 -->
      <div class="calendar-grid">
        <div
          v-for="day in calendarDays"
          :key="day.date.toISOString()"
          class="calendar-day"
          :class="{
            today: day.isToday,
            'current-month': day.isCurrentMonth,
            selected: day.isSelected,
          }"
          @click="selectDay(day)"
        >
          <span class="day-number">{{ day.day }}</span>
          <div class="day-events" v-if="day.events && day.events.length">
            <div
              v-for="event in day.events.slice(0, 2)"
              :key="event.id"
              class="event-dot"
              :style="{ backgroundColor: event.color }"
            ></div>
          </div>
        </div>
      </div>

      <!-- 选中日期详情 -->
      <div v-if="selectedDate" class="selected-date-info">
        <h3>
          {{
            selectedDate.toLocaleDateString('zh-CN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }}
        </h3>
        <div v-if="selectedDateEvents.length === 0" class="no-events">这一天没有事件</div>
        <div v-else class="events-list">
          <div v-for="event in selectedDateEvents" :key="event.id" class="event-item">
            <div class="event-color" :style="{ backgroundColor: event.color }"></div>
            <div class="event-content">
              <div class="event-title">{{ event.title }}</div>
              <div class="event-time">{{ event.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface CalendarEvent {
  id: string
  title: string
  time: string
  color: string
}

interface CalendarDay {
  date: Date
  day: number
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  events: CalendarEvent[]
}

const currentDate = ref(new Date())
const selectedDate = ref<Date | null>(null)

// 示例事件数据
const events = ref<Record<string, CalendarEvent[]>>({
  '2024-01-15': [
    { id: '1', title: '项目会议', time: '10:00', color: '#409eff' },
    { id: '2', title: '代码审查', time: '14:00', color: '#67c23a' },
  ],
  '2024-01-20': [{ id: '3', title: '产品演示', time: '15:00', color: '#e6a23c' }],
  '2024-01-25': [{ id: '4', title: '团队建设', time: '18:00', color: '#f56c6c' }],
})

const weekdays = ['日', '一', '二', '三', '四', '五', '六']

const currentMonthName = computed(() => {
  return currentDate.value.toLocaleDateString('zh-CN', { month: 'long' })
})

const currentYear = computed(() => {
  return currentDate.value.getFullYear()
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()

  // 获取当月的第一天
  const firstDay = new Date(year, month, 1)
  // 获取当月的最后一天
  const lastDay = new Date(year, month + 1, 0)
  // 获取上个月的最后一天
  const prevLastDay = new Date(year, month, 0)

  const days: CalendarDay[] = []
  const today = new Date()

  // 添加上个月的日期
  const prevDays = firstDay.getDay()
  for (let i = prevDays - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevLastDay.getDate() - i)
    days.push({
      date,
      day: prevLastDay.getDate() - i,
      isCurrentMonth: false,
      isToday: date.toDateString() === today.toDateString(),
      isSelected: selectedDate.value
        ? date.toDateString() === selectedDate.value.toDateString()
        : false,
      events: getEventsForDate(date),
    })
  }

  // 添加当月的日期
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i)
    days.push({
      date,
      day: i,
      isCurrentMonth: true,
      isToday: date.toDateString() === today.toDateString(),
      isSelected: selectedDate.value
        ? date.toDateString() === selectedDate.value.toDateString()
        : false,
      events: getEventsForDate(date),
    })
  }

  // 添加下个月的日期
  const remainingCells = 42 - days.length // 6行 * 7列 = 42个格子
  for (let i = 1; i <= remainingCells; i++) {
    const date = new Date(year, month + 1, i)
    days.push({
      date,
      day: i,
      isCurrentMonth: false,
      isToday: date.toDateString() === today.toDateString(),
      isSelected: selectedDate.value
        ? date.toDateString() === selectedDate.value.toDateString()
        : false,
      events: getEventsForDate(date),
    })
  }

  return days
})

const selectedDateEvents = computed(() => {
  if (!selectedDate.value) return []
  return getEventsForDate(selectedDate.value)
})

const getEventsForDate = (date: Date): CalendarEvent[] => {
  const dateKey = date.toISOString().split('T')[0]
  return events.value[dateKey] || []
}

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const selectDay = (day: CalendarDay) => {
  selectedDate.value = day.date
}

onMounted(() => {
  // 默认选中今天
  selectedDate.value = new Date()
})
</script>

<style scoped>
.calendar-tool {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.calendar-container {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.month-year {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.nav-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  width: 40px;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-btn:hover {
  background: var(--primary-hover);
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
}

.weekday {
  text-align: center;
  font-weight: 600;
  color: var(--text-secondary);
  padding: 12px 0;
  font-size: 14px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 24px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.calendar-day:hover {
  background: var(--bg-tertiary);
}

.calendar-day.current-month {
  color: var(--text-primary);
}

.calendar-day:not(.current-month) {
  color: var(--text-disabled);
}

.calendar-day.today {
  background: var(--primary-color);
  color: white;
}

.calendar-day.today:hover {
  background: var(--primary-hover);
}

.calendar-day.selected {
  background: var(--success-color);
  color: white;
}

.calendar-day.selected:hover {
  background: var(--success-hover);
}

.day-number {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
}

.day-events {
  display: flex;
  gap: 2px;
  flex-wrap: wrap;
}

.event-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.selected-date-info {
  border-top: 1px solid var(--border-color);
  padding-top: 20px;
}

.selected-date-info h3 {
  margin: 0 0 16px 0;
  color: var(--text-primary);
  font-size: 18px;
}

.no-events {
  color: var(--text-secondary);
  font-style: italic;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: var(--bg-secondary);
  border-radius: 6px;
}

.event-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.event-content {
  flex: 1;
}

.event-title {
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.event-time {
  font-size: 12px;
  color: var(--text-secondary);
}
</style>
