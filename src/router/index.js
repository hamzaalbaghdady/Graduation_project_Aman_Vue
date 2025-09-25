import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import Main from '@/components/dashboard_main.vue'

import Users from '@/components/dashboard_users.vue'
import ViewUsers from '@/components/View_user.vue'

import Ambulances from '@/components/dashboard_Ambulances.vue'
import ViewAmbulance from '@/components/View_ambulance.vue'
import AddAmbulance from '@/components/Add_ambulance.vue'
import EditAmbulance from '@/components/Edit_ambulance.vue'
import Emergencies from '@/components/dashboard_Emergencies.vue'

import AddEmergency from '@/components/Add_emergency.vue'
import ViewEmergency from '@/components/View_emergency.vue'
import EditEmergency from '@/components/Edit_emergency.vue'
import AddEmergencyType from '@/components/Add_emergency_type.vue'
import EditEmergencyType from '@/components/Edit_emergency_type.vue'

import Dispatchers from '@/components/dashboard_dispatchers.vue'
import ViewDispatchers from '@/components/View_dispatcher.vue'
import AddDispatchers from '@/components/Add_dispatcher.vue'
import EditDispatchers from '@/components/Edit_dispatcher.vue'

import Roles_Permissions from '@/components/dashboard_roles_permission.vue'
import AddRole from '@/components/Add_role.vue'
import AddPermission from '@/components/Add_permission.vue'
import EditRole from '@/components/Edit_role.vue'
import EditPermission from '@/components/Edit_permission.vue'

import Drivers_Crews from '@/components/dashboard_drivers_crews.vue'
import AddCrewMembers from '@/components/Add_crew_member.vue'
import EditCrewMembers from '@/components/Edit_crew_member.vue'

import Reports from '@/components/dashboard_reports.vue'
import Profile from '@/components/dashboard_profile.vue'

import History from '@/components/dashboard_history.vue'
import Settings from '@/components/dashboard_settings.vue'
import Log from '@/components/audit_log.vue'
import Sos from '@/components/sos_monitor.vue'
import Page404 from '@/components/404_page.vue'
import Page403 from '@/components/403_page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '/',
          name: 'main',
          component: Main,
        },
        // #Users
        {
          path: 'users',
          name: 'Users',
          component: Users,
        },
        {
          path: 'users/:id',
          name: 'ViewUsers',
          component: ViewUsers,
        },
        // #Ambulances
        {
          path: 'ambulances',
          name: 'Ambulances',
          component: Ambulances,
        },
        {
          path: 'ambulances/:id',
          name: 'ViewAmbulance',
          component: ViewAmbulance,
        },
        {
          path: 'ambulances/add',
          name: 'AddAmbulance',
          component: AddAmbulance,
        },
        {
          path: 'ambulances/edit/:id',
          name: 'EditAmbulance',
          component: EditAmbulance,
        },
        // #Emergencies
        {
          path: 'emergencies',
          name: 'Emergencies',
          component: Emergencies,
        },
        {
          path: 'emergencies/add',
          name: 'AddEmergency',
          component: AddEmergency,
        },
        {
          path: 'emergencies/:id',
          name: 'ViewEmergency',
          component: ViewEmergency,
        },
        {
          path: 'emergencies/edit/:id',
          name: 'EditEmergency',
          component: EditEmergency,
        },
        {
          path: 'emergencies/types/add',
          name: 'AddEmergencyType',
          component: AddEmergencyType,
        },
        {
          path: 'emergencies/types/edit/:id',
          name: 'EditEmergencyType',
          component: EditEmergencyType,
        },
        // #Dispatchers
        {
          path: 'dispatchers',
          name: 'Dispatchers',
          component: Dispatchers,
        },
        {
          path: 'dispatchers/:id',
          name: 'ViewDispatchers',
          component: ViewDispatchers,
        },
        {
          path: 'dispatchers/add',
          name: 'AddDispatchers',
          component: AddDispatchers,
        },
        {
          path: 'dispatchers/edit/:id',
          name: 'EditDispatchers',
          component: EditDispatchers,
        },
        // #Roles & Permissions
        {
          path: 'roles-permissions',
          name: 'Roles_Permissions',
          component: Roles_Permissions,
        },
        {
          path: '/roles-permissions/role/add',
          name: 'AddRole',
          component: AddRole,
        },
        {
          path: '/roles-permissions/role/edit/:id',
          name: 'EditRole',
          component: EditRole,
        },
        {
          path: '/roles-permissions/permission/edit/:id',
          name: 'EditPermission',
          component: EditPermission,
        },
        {
          path: 'roles-permissions/permission/add',
          name: 'AddPermission',
          component: AddPermission,
        },
        {
          path: 'reports',
          name: 'Reports',
          component: Reports,
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile,
        },

        {
          path: 'drivers-crews',
          name: 'Drivers_Crews',
          component: Drivers_Crews,
        },
        {
          path: 'drivers-crews/add',
          name: 'AddCrewMembers',
          component: AddCrewMembers,
        },
        {
          path: 'drivers-crews/edit/:id',
          name: 'EditCrewMembers',
          component: EditCrewMembers,
        },
        {
          path: 'history',
          name: 'History',
          component: History,
        },
        {
          path: 'settings',
          name: 'Settings',
          component: Settings,
        },
        {
          path: 'log',
          name: 'Log',
          component: Log,
        },
        {
          path: 'sos',
          name: 'Sos',
          component: Sos,
        },

        // Last route
        {
          path: '/:pathMatch(.*)*',
          name: 'Page404',
          component: Page404,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
  ],
})

export default router
