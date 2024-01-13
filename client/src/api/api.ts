const apiRoutes = {
    auth: {
        register: '/auth/register',
        login: '/auth/login',
        updateUser: '/auth/user/update',
        updateProfile: '/auth/user/profile-picture'
    },
    users: {
        get: '/users'
    },
    products:  {
        recent: '/products/recent',
        hotsales : '/products/hotsales',
        popular: '/products/popular',
        get: '/products',
        search: '/products/search'
    },
    cart:{
        add: '/cart/add',
        increment:'/cart/increment',
        decrement: '/cart/decrement'
    }
}

export default apiRoutes;