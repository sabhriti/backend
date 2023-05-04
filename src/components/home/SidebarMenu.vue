<template>
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar bg-dark collapse show">
        <div class="position-sticky pt-3 mt-4">
            <ul class="nav flex-column">
                <li v-for="(route, index) in getRoutes()" :key="index" class="nav-item border-bottom nav-main-item">
                    <template v-if="route.children">
                        <a class="nav-link text-info" href="javascript:void(0);" @click="toggleChildren">
                            <span class="material-icons-outlined">{{ route.icon }}</span>
                            {{ route.text }}
                            <span class="material-icons-outlined" v-if="showChildren">arrow_drop_up</span>
                            <span class="material-icons-outlined" v-else>arrow_drop_down</span>

                        </a>
                        <Transition>
                            <ul v-if="showChildren" class="nav flex-column">
                                <template v-for="(subRoute, i) in route.children" :key="i">
                                    <li class="nav-item list-unstyled border-top nav-children-item">
                                        <router-link :to="route.to + subRoute.to"  class="nav-link text-info ms-3">
                                            <span class="material-icons-outlined nav-children-icon">{{
                                                subRoute.icon
                                                }}</span>
                                            {{ subRoute.text }}
                                        </router-link>
                                    </li>
                                </template>
                            </ul>
                        </Transition>
                    </template>
                    <template v-else>
                        <router-link :to="route.to" class="nav-link text-info">
                            <span class="material-icons-outlined">{{ route.icon }}</span> {{ route.text }}
                        </router-link>
                    </template>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import LocalStorage from "@/util/local_storage";

export default {
    name: "SidebarMenu",
    methods: {
        getRoutes() {
            const sessionData = LocalStorage.get("session");

            if (sessionData) {
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
        toggleChildren() {
            this.showChildren = !this.showChildren
        }
    },
    data() {
        return {
            showChildren: false,
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
                    to: '/business-unit',
                    icon: 'factory',
                    text: 'Business Unit',
                    requiredRole: ['ADMIN', 'USER']
                },
                {
                    to: '/question',
                    icon: 'quiz',
                    text: 'Question',
                    requiredRole: ['ADMIN', 'USER'],
                    children: [
                        {
                            to: '/framework',
                            icon: 'filter_frames',
                            text: 'Framework',
                            requiredRole: ['ADMIN', 'USER']
                        },
                        {
                            to: '/category',
                            icon: 'category',
                            text: 'Category',
                            requiredRole: ['ADMIN', 'USER']
                        },
                        {
                            to: '',
                            icon: 'question_answer',
                            text: 'Questions',
                            requiredRole: ['ADMIN', 'USER']
                        }
                    ]
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

.nav-main-item {
    border-bottom-color: #455766 !important;
}

.nav-children-item {
    border-top-color: #455766 !important;
    font-size: 15px;
}

.nav-children-icon {
    font-size: 15px;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>