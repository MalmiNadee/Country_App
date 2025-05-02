//mock auth service
export const authService = {
    login: async(email, password) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    user: {
                        id:'123',
                        email,
                        name: email.split('@')[0],
                        token: 'mock-token',
                        password,
                    }
                })
            }, 500);
        })
    },

    register: async(email, password, name) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    user: {
                        id:Date.now().toString(),
                        email,
                        name,
                        token: 'mock-token',
                        password
                    }
                })
            }, 500);
        })
    },

    logout: async() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 200);
        })
    },

}