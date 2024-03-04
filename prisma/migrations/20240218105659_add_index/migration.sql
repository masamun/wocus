-- CreateIndex
CREATE INDEX "Task_milestoneId_idx" ON "Task"("milestoneId");

-- CreateIndex
CREATE INDEX "TaskActivity_taskId_pv_ac_ev_date_at_idx" ON "TaskActivity"("taskId", "pv", "ac", "ev", "date_at");
