<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar bg-dark collapse show">
    <div class="position-sticky pt-3 mt-4">
      <ul class="nav flex-column">
        <li v-for="(route, index) in getRoutes()" :key="index" class="nav-item">
          <router-link :to="route.to" class="nav-link text-info">
            <span class="material-icons-outlined">{{ route.icon }}</span> {{ route.text }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "SidebarMenu",
  methods: {
    getRoutes() {
      const sessionData = JSON.parse(localStorage.getItem("session"));

      const token = JSON.parse(atob(sessionData.token.split('.')[1]));

      const rolesFromSession = token.ROLES;

      return this.routes.filter(route => {
        if (rolesFromSession.includes('ADMIN')) {
          return true;
        } else {
          let canView = false;
          rolesFromSession.forEach(sRole => {
            if (route.requiredRole.includes(sRole)) {
              canView = true;
            }
          });

          return canView;
        }
      });
    }
  },
  data() {
    return {
      routes: [
        {
          to: '/',
          icon: 'home',
          text: 'Home',
          requiredRole: ['ADMIN', 'USER']
        },
        {
          to: '/users',
          icon: 'people_outline',
          text: 'User',
          requiredRole: ['ADMIN']
        },
        {
          to: '/question',
          icon: 'quiz',
          text: 'Question',
          requiredRole: ['ADMIN', 'USER']
        },
        {
          to: '/surveys',
          icon: 'poll',
          text: 'Survey',
          requiredRole: ['ADMIN', 'USER']
        },
        {
          to: '/feedbacks',
          icon: 'reviews',
          text: 'Feedback',
          requiredRole: ['ADMIN', 'USER']
        },
        {
          to: '/factory',
          icon: 'factory',
          text: 'Factory',
          requiredRole: ['ADMIN', 'USER']
        },
        {
          to: '/language',
          icon: 'language',
          text: 'Language',
          requiredRole: ['ADMIN']
        },
        {
          to: '/translation',
          icon: 'translate',
          text: 'Translation',
          requiredRole: ['ADMIN']
        }
      ]
    }
  }
}
</script>

<style scoped>
.sidebar {
  min-height: 100vh;
}

.nav-item {
  text-transform: uppercase;
  text-align: left;
}

.row > * {
  padding-right: 0;
  padding-left: 0;
}

.material-icons-outlined {
  bottom: -5px;
  position: relative;
  margin-right: 10px;
}
</style>