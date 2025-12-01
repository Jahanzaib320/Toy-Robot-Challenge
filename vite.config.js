import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({ plugins:[react()], 

    base: "/Toy-Robot-Challenge/",
    server: {
        open: true,
        port: 3001,
    },
})
