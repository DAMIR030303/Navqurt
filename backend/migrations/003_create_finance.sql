-- Create salary_settings table
CREATE TABLE IF NOT EXISTS public.salary_settings (
  id BIGSERIAL PRIMARY KEY,
  employee_id BIGINT NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  base_salary DECIMAL(15, 2) NOT NULL DEFAULT 0,
  kpi_percentage DECIMAL(5, 2) DEFAULT 15.0,
  attendance_percentage DECIMAL(5, 2) DEFAULT 5.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(employee_id)
);

-- Create salaries table
CREATE TABLE IF NOT EXISTS public.salaries (
  id BIGSERIAL PRIMARY KEY,
  employee_id BIGINT NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  base_salary DECIMAL(15, 2) NOT NULL,
  kpi_bonus DECIMAL(15, 2) DEFAULT 0,
  attendance_bonus DECIMAL(15, 2) DEFAULT 0,
  penalties DECIMAL(15, 2) DEFAULT 0,
  total DECIMAL(15, 2) NOT NULL,
  period TEXT NOT NULL, -- Format: YYYY-MM
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(employee_id, period)
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
  id BIGSERIAL PRIMARY KEY,
  company_id BIGINT REFERENCES public.companies(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  description TEXT,
  category TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_salary_settings_employee_id ON public.salary_settings(employee_id);
CREATE INDEX IF NOT EXISTS idx_salaries_employee_id ON public.salaries(employee_id);
CREATE INDEX IF NOT EXISTS idx_salaries_period ON public.salaries(period);
CREATE INDEX IF NOT EXISTS idx_transactions_company_id ON public.transactions(company_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON public.transactions(date);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON public.transactions(type);

-- Enable Row Level Security
ALTER TABLE public.salary_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable all access for all users" ON public.salary_settings
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all access for all users" ON public.salaries
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all access for all users" ON public.transactions
  FOR ALL USING (true) WITH CHECK (true);



