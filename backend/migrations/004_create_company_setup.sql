-- Create positions table
CREATE TABLE IF NOT EXISTS public.positions (
  id BIGSERIAL PRIMARY KEY,
  company_id BIGINT NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  department TEXT,
  max_employees INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create contracts table
CREATE TABLE IF NOT EXISTS public.contracts (
  id BIGSERIAL PRIMARY KEY,
  employee_id BIGINT NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  position_id BIGINT NOT NULL REFERENCES public.positions(id) ON DELETE CASCADE,
  contract_type TEXT CHECK (contract_type IN ('full_time', 'part_time', 'contractor', 'intern')) DEFAULT 'full_time',
  start_date DATE NOT NULL,
  end_date DATE,
  probation_period_days INTEGER DEFAULT 0,
  terms_json JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create position_salary_settings table
CREATE TABLE IF NOT EXISTS public.position_salary_settings (
  id BIGSERIAL PRIMARY KEY,
  position_id BIGINT NOT NULL REFERENCES public.positions(id) ON DELETE CASCADE,
  base_salary DECIMAL(15, 2) NOT NULL DEFAULT 0,
  kpi_percentage DECIMAL(5, 2) DEFAULT 15.0,
  bonus_rules_json JSONB DEFAULT '{}'::jsonb,
  penalty_rules_json JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(position_id)
);

-- Create daily_tasks table
CREATE TABLE IF NOT EXISTS public.daily_tasks (
  id BIGSERIAL PRIMARY KEY,
  position_id BIGINT NOT NULL REFERENCES public.positions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  frequency TEXT CHECK (frequency IN ('daily', 'weekly', 'monthly', 'as_needed')) DEFAULT 'daily',
  priority TEXT CHECK (priority IN ('high', 'medium', 'low')) DEFAULT 'medium',
  kpi_weight DECIMAL(5, 2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create kpi_templates table
CREATE TABLE IF NOT EXISTS public.kpi_templates (
  id BIGSERIAL PRIMARY KEY,
  company_id BIGINT NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT,
  target_value DECIMAL(15, 2) NOT NULL,
  unit TEXT NOT NULL,
  period TEXT CHECK (period IN ('daily', 'weekly', 'monthly', 'quarterly', 'yearly')) DEFAULT 'monthly',
  weight DECIMAL(5, 2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create employee_tasks table
CREATE TABLE IF NOT EXISTS public.employee_tasks (
  id BIGSERIAL PRIMARY KEY,
  employee_id BIGINT NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  task_id BIGINT NOT NULL REFERENCES public.daily_tasks(id) ON DELETE CASCADE,
  completed_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT CHECK (status IN ('pending', 'in_progress', 'completed', 'overdue')) DEFAULT 'pending',
  quality_score DECIMAL(5, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_positions_company_id ON public.positions(company_id);
CREATE INDEX IF NOT EXISTS idx_positions_department ON public.positions(department);
CREATE INDEX IF NOT EXISTS idx_contracts_employee_id ON public.contracts(employee_id);
CREATE INDEX IF NOT EXISTS idx_contracts_position_id ON public.contracts(position_id);
CREATE INDEX IF NOT EXISTS idx_contracts_start_date ON public.contracts(start_date);
CREATE INDEX IF NOT EXISTS idx_position_salary_settings_position_id ON public.position_salary_settings(position_id);
CREATE INDEX IF NOT EXISTS idx_daily_tasks_position_id ON public.daily_tasks(position_id);
CREATE INDEX IF NOT EXISTS idx_daily_tasks_frequency ON public.daily_tasks(frequency);
CREATE INDEX IF NOT EXISTS idx_kpi_templates_company_id ON public.kpi_templates(company_id);
CREATE INDEX IF NOT EXISTS idx_kpi_templates_category ON public.kpi_templates(category);
CREATE INDEX IF NOT EXISTS idx_employee_tasks_employee_id ON public.employee_tasks(employee_id);
CREATE INDEX IF NOT EXISTS idx_employee_tasks_task_id ON public.employee_tasks(task_id);
CREATE INDEX IF NOT EXISTS idx_employee_tasks_completed_date ON public.employee_tasks(completed_date);
CREATE INDEX IF NOT EXISTS idx_employee_tasks_status ON public.employee_tasks(status);

-- Enable Row Level Security
ALTER TABLE public.positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.position_salary_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kpi_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_tasks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable all access for all users" ON public.positions
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all access for all users" ON public.contracts
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all access for all users" ON public.position_salary_settings
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all access for all users" ON public.daily_tasks
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all access for all users" ON public.kpi_templates
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all access for all users" ON public.employee_tasks
  FOR ALL USING (true) WITH CHECK (true);

