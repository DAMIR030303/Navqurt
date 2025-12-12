package auth

// Role represents user role
type Role string

const (
	RoleSuperAdmin Role = "super_admin"
	RoleAdmin      Role = "admin"
	RoleManager    Role = "manager"
	RoleHR         Role = "hr"
	RoleAccountant Role = "accountant"
	RoleEmployee   Role = "employee"
)

// Permission represents a permission
type Permission string

const (
	PermissionManageEmployees Permission = "manage_employees"
	PermissionManageKPI       Permission = "manage_kpi"
	PermissionManageFinance   Permission = "manage_finance"
	PermissionViewReports     Permission = "view_reports"
	PermissionManageProjects  Permission = "manage_projects"
	PermissionManageCRM       Permission = "manage_crm"
	PermissionManageSettings  Permission = "manage_settings"
)

// RolePermissions maps roles to their permissions
var RolePermissions = map[Role][]Permission{
	RoleSuperAdmin: {
		PermissionManageEmployees,
		PermissionManageKPI,
		PermissionManageFinance,
		PermissionViewReports,
		PermissionManageProjects,
		PermissionManageCRM,
		PermissionManageSettings,
	},
	RoleAdmin: {
		PermissionManageEmployees,
		PermissionManageKPI,
		PermissionManageFinance,
		PermissionViewReports,
		PermissionManageProjects,
		PermissionManageCRM,
	},
	RoleManager: {
		PermissionManageEmployees,
		PermissionManageKPI,
		PermissionViewReports,
		PermissionManageProjects,
	},
	RoleHR: {
		PermissionManageEmployees,
		PermissionManageKPI,
		PermissionViewReports,
	},
	RoleAccountant: {
		PermissionManageFinance,
		PermissionViewReports,
	},
	RoleEmployee: {
		// Employees have minimal permissions
	},
}

// HasPermission checks if a role has a specific permission
func HasPermission(role Role, permission Permission) bool {
	permissions, ok := RolePermissions[role]
	if !ok {
		return false
	}

	for _, p := range permissions {
		if p == permission {
			return true
		}
	}

	return false
}

// CanAccess checks if a role can access a resource
func CanAccess(role Role, resource string) bool {
	// Map resources to permissions
	resourcePermissions := map[string]Permission{
		"employees": PermissionManageEmployees,
		"kpi":        PermissionManageKPI,
		"finance":    PermissionManageFinance,
		"reports":    PermissionViewReports,
		"projects":   PermissionManageProjects,
		"crm":        PermissionManageCRM,
		"settings":   PermissionManageSettings,
	}

	permission, ok := resourcePermissions[resource]
	if !ok {
		return false
	}

	return HasPermission(role, permission)
}



